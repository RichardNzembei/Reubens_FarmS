import getFirebaseAdmin from "../firebase";
import * as admin from "firebase-admin";

export default defineEventHandler(async (event) => {
  setResponseHeaders(event, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
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

    if (event.node.req.method === "GET") {
      const snapshot = await firestore
        .collection("projects")
        .orderBy("createdAt", "desc")
        .get();
      const projects = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return projects;
    }

    if (event.node.req.method === "POST") {
      const body = await readBody(event);
      if (
        !body.projectName ||
        !body.description ||
        !body.duration ||
        !body.startDate ||
        !body.landSize
      ) {
        throw createError({
          statusCode: 400,
          statusMessage: "Fill all project details",
        });
      }

      const docRef = await firestore.collection("projects").add({
        projectName: body.projectName,
        description: body.description,
        duration: body.duration,
        startDate: body.startDate,
        landSize: body.landSize,
        sprayingTable: [],
        fertilizerTable: [],
        createdAt: new Date(),
      });

      return { message: "Project added successfully", id: docRef.id };
    }

    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed",
    });
  } catch (error) {
    console.error("Error handling project request:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
