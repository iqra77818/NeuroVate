import * as faceapi from 'face-api.js';

// simple in-memory labeled descriptors (demo only)
const labeled = [];

export async function loadFamilyModels(){
  const MODEL_URL = '/models';
  await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
  await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
  await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
}

// add labeled image (File)
export async function addLabeledImage(label, file){
  const img = await faceapi.bufferToImage(file);
  const detection = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
  if (!detection) return null;
  const desc = new Float32Array(detection.descriptor);
  labeled.push(new faceapi.LabeledFaceDescriptors(label, [desc]));
  return true;
}

export async function recognizeImage(file){
  if (labeled.length === 0) return { recognized: false };
  const img = await faceapi.bufferToImage(file);
  const detection = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
  if (!detection) return { recognized: false };
  const matcher = new faceapi.FaceMatcher(labeled, 0.6);
  const best = matcher.findBestMatch(detection.descriptor);
  return { recognized: best.label !== 'unknown', label: best.label, distance: best.distance };
}
