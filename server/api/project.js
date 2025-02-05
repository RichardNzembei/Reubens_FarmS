import getFirebaseAdmin from "../firebase";
export default defineEventHandler(async (event) => {
  const firestore = getFirebaseAdmin();
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
      statusMessage: "fill all projects details",
    });
  }

  const useRef = await firestore.collection("projects").add({
    projectName: body.projectName,
    description: body.description,
    duration: body.duration,
    startDate: body.startDate,
    landSize: body.landSize,
    createdAt: new Date()
  });
  return {
    message:"project added successfully", id:useRef.id
  };
});
