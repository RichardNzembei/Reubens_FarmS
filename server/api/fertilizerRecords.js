import getFirebaseAdmin from "../firebase";
import { FieldValue } from "firebase-admin/firestore";

export default defineEventHandler(async (event) => {
  setResponseHeaders(event, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });

  if (event.node.req.method === "OPTIONS") {
    return { message: "CORS preflight passed" };
  }

  try {
    const firestore = getFirebaseAdmin();
    if (!firestore) {
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to initialize Firestore",
      });
    }

    if (event.node.req.method === "POST") {
      const body = await readBody(event);
      if (!body.projectId) {
        throw createError({
          statusCode: 400,
          statusMessage: "Missing projectId",
        });
      }
      if (!body.date || !body.type || !body.quantity) {
        throw createError({
          statusCode: 400,
          statusMessage: "Missing required fields for fertilizer record",
        });
      }

      const newRecord = {
        id: Date.now(),
        date: body.date,
        type: body.type,
        quantity: body.quantity,
        notes: body.notes || "",
        createdAt: new Date(),
      };

      console.log("New fertilizer record:", newRecord);

      const projectRef = firestore.collection("projects").doc(body.projectId);
      const projectSnap = await projectRef.get();
      if (!projectSnap.exists) {
        throw createError({
          statusCode: 404,
          statusMessage: "Project not found",
        });
      }
      await projectRef.update({
        fertilizerTable: FieldValue.arrayUnion(newRecord),
      });

      return {
        message: "Fertilizer record added successfully",
        id: newRecord.id,
      };
    }

    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed",
    });
  } catch (error) {
    console.error("Error adding fertilizer record:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
