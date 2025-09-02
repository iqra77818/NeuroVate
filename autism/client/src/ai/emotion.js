import * as faceapi from "face-api.js";

export const loadModels = async () => {
  const MODEL_URL = "/models"; // must match the folder name inside public/
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
  ]);
};

export const detectEmotion = async (videoEl) => {
  if (!videoEl) return null;
  const detections = await faceapi
    .detectSingleFace(videoEl, new faceapi.TinyFaceDetectorOptions())
    .withFaceExpressions();

  if (detections?.expressions) {
    const sorted = Object.entries(detections.expressions).sort((a, b) => b[1] - a[1]);
    return { emotion: sorted[0][0], confidence: sorted[0][1] };
  }
  return null;
};

