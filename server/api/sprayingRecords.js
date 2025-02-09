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
      if (!body.serialNo || !body.tradeName || !body.regNo || !body.date) {
        throw createError({
          statusCode: 400,
          statusMessage: "Missing required fields for spraying record",
        });
      }

      const newRecord = {
        id: Date.now(),
        serialNo: body.serialNo,
        tradeName: body.tradeName,
        regNo: body.regNo,
        activeIngredients: body.activeIngredients || "",
        manufacturer: body.manufacturer || "",
        agent: body.agent || "",
        uses: body.uses || "",
        date: body.date,
        createdAt: new Date(),
      };

      console.log("New spraying record:", newRecord);
      const projectRef = firestore.collection("projects").doc(body.projectId);
      const projectSnap = await projectRef.get();
      
      if (!projectSnap.exists) {
        throw createError({
          statusCode: 404,
          statusMessage: "Project not found",
        });
      }

      await projectRef.update({
        sprayingTable: FieldValue.arrayUnion(newRecord),
      });

      return {
        message: "Spraying record added successfully",
        id: newRecord.id,
      };
    }

    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed",
    });
  } catch (error) {
    console.error("Error adding spraying record:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
