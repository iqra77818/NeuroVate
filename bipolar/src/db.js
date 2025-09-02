import { db } from "./firebase";
import { collection, addDoc, getDocs, query, where, updateDoc, doc } from "firebase/firestore";

export async function getCaregivers(patientId) {
  const q = query(collection(db, "caregivers"), where("patientId", "==", patientId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function addCaregiver(patientId, caregiver) {
  await addDoc(collection(db, "caregivers"), {
    patientId,
    ...caregiver,
    accepted: false
  });
}

export async function acceptCaregiver(caregiverId) {
  const ref = doc(db, "caregivers", caregiverId);
  await updateDoc(ref, { accepted: true });
}
