import getFirebaseAdmin from "../firebase";

export default defineEventHandler(async (event) => {
  try {
    const firestore = getFirebaseAdmin();
    const body = await readBody(event);

    console.log("Received body:", body);

    if (!body.projectName || !body.description || !body.duration || !body.startDate || !body.landSize) {
      throw createError({
        statusCode: 400,
        statusMessage: "Fill all project details"
      });
    }

    const docRef = await firestore.collection("projects").add({
      projectName: body.projectName,
      description: body.description,
      duration: body.duration,
      startDate: body.startDate,
      landSize: body.landSize,
      createdAt: new Date()
    });

    return {
      message: "Project added successfully",
      id: docRef.id
    };
  } catch (error) {
    console.error("Error adding project:", error);  // Log the error
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error"
    });
  }
});
