import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

export default function CaregiverDashboard() {
  const user = auth.currentUser;
  const [isPatient, setIsPatient] = useState(true); // assume patient by default
  const [caregivers, setCaregivers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [caregiverName, setCaregiverName] = useState("");
  const [caregiverEmail, setCaregiverEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Check whether logged-in user is a caregiver
  const checkIfCaregiver = async () => {
    if (!user) return;
    const q = query(
      collection(db, "caregivers"),
      where("caregiverEmail", "==", user.email)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      setIsPatient(false); // If this user email is in caregiverEmail, they are a caregiver
    } else {
      setIsPatient(true);
    }
  };

  // Fetch caregivers added by this patient
  const fetchPatientCaregivers = async () => {
    if (!user) return;
    const q = query(
      collection(db, "caregivers"),
      where("patientId", "==", user.uid)
    );
    const querySnapshot = await getDocs(q);
    setCaregivers(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  // Fetch requests for this caregiver
  const fetchCaregiverRequests = async () => {
    if (!user) return;
    const q = query(
      collection(db, "caregivers"),
      where("caregiverEmail", "==", user.email)
    );
    const querySnapshot = await getDocs(q);
    setRequests(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  // Add caregiver (patient only)
  const addCaregiver = async () => {
    if (!caregiverName || !caregiverEmail) {
      alert("Please fill all fields");
      return;
    }
    await addDoc(collection(db, "caregivers"), {
      patientId: user.uid,
      caregiverName,
      caregiverEmail,
      phone,
      status: "pending",
    });
    setCaregiverName("");
    setCaregiverEmail("");
    setPhone("");
    fetchPatientCaregivers();
  };

  // Accept caregiver request (caregiver only)
  const acceptRequest = async (id) => {
    const docRef = doc(db, "caregivers", id);
    await updateDoc(docRef, { status: "accepted" });
    fetchCaregiverRequests();
  };

  useEffect(() => {
    if (!user) return;
    checkIfCaregiver();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    if (isPatient) {
      fetchPatientCaregivers();
    } else {
      fetchCaregiverRequests();
    }
  }, [user, isPatient]);

  if (!user) {
    return (
      <div className="p-6 dark:text-white">
        <h2>Please log in to view dashboard.</h2>
      </div>
    );
  }

  return (
    <div className="p-6 dark:text-white">
      {isPatient ? (
        <>
          <h2 className="text-xl font-bold mb-4">Patient Dashboard</h2>

          <div className="mb-4 flex flex-col gap-2 max-w-sm">
            <input
              className="border p-2 dark:bg-gray-800"
              placeholder="Caregiver Name"
              value={caregiverName}
              onChange={(e) => setCaregiverName(e.target.value)}
            />
            <input
              className="border p-2 dark:bg-gray-800"
              placeholder="Caregiver Email"
              value={caregiverEmail}
              onChange={(e) => setCaregiverEmail(e.target.value)}
            />
            <input
              className="border p-2 dark:bg-gray-800"
              placeholder="Phone (optional)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button
              onClick={addCaregiver}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add Caregiver
            </button>
          </div>

          <h3 className="text-lg font-semibold mt-4">Pending Caregivers</h3>
          {caregivers.filter(c => c.status === "pending").length === 0 ? (
            <p>No pending caregivers.</p>
          ) : (
            <ul className="list-disc pl-6">
              {caregivers.filter(c => c.status === "pending").map(c => (
                <li key={c.id}>
                  {c.caregiverName} ({c.caregiverEmail})
                </li>
              ))}
            </ul>
          )}

          <h3 className="text-lg font-semibold mt-4">Accepted Caregivers</h3>
          {caregivers.filter(c => c.status === "accepted").length === 0 ? (
            <p>No accepted caregivers.</p>
          ) : (
            <ul className="list-disc pl-6">
              {caregivers.filter(c => c.status === "accepted").map(c => (
                <li key={c.id}>
                  {c.caregiverName} ({c.caregiverEmail})
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">Caregiver Dashboard</h2>

          <h3 className="text-lg font-semibold">Requests for You</h3>
          {requests.filter(r => r.status === "pending").length === 0 ? (
            <p>No pending requests.</p>
          ) : (
            <ul className="list-disc pl-6">
              {requests.filter(r => r.status === "pending").map(r => (
                <li key={r.id} className="flex items-center gap-2">
                  Patient ID: {r.patientId}
                  <button
                    onClick={() => acceptRequest(r.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Accept
                  </button>
                </li>
              ))}
            </ul>
          )}

          <h3 className="text-lg font-semibold mt-4">Accepted Patients</h3>
          {requests.filter(r => r.status === "accepted").length === 0 ? (
            <p>No accepted patients.</p>
          ) : (
            <ul className="list-disc pl-6">
              {requests.filter(r => r.status === "accepted").map(r => (
                <li key={r.id}>Patient ID: {r.patientId}</li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}



