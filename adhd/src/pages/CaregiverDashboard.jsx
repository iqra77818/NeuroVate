import { useState } from "react";

export default function CaregiverDashboard() {
  const [showForm, setShowForm] = useState(false);
  const [caregivers, setCaregivers] = useState([
    {
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "123-456-7890",
      status: "Pending",
    },
    {
      name: "Bob Smith",
      email: "bob@example.com",
      phone: "987-654-3210",
      status: "Accepted",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCaregiver = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    const newCaregiver = {
      ...formData,
      status: "Pending",
    };

    setCaregivers((prev) => [...prev, newCaregiver]);
    setFormData({ name: "", email: "", phone: "" });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen flex flex-col  items-center bg-pink-200 justify-start p-8  ">
      <h1 className="text-4xl font-notoserif font-bold mb-6 text-pink-600 ">
        Caregiver Dashboard
      </h1>

      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 space-y-4">
        {caregivers.map((cg, index) => (
          <div
            key={index}
            className="border border-gray-300  p-4 rounded-md flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-lg text-gray-800">{cg.name}</p>
              <p className="text-sm text-gray-600 ">{cg.email}</p>
              <p className="text-sm text-gray-600 ">{cg.phone}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                cg.status === "Accepted"
                  ? "bg-green-200 text-green-800"
                  : "bg-yellow-200 text-yellow-800"
              }`}
            >
              {cg.status}
            </span>
          </div>
        ))}

        {/* Add Caregiver Button */}
        <div className="text-center">
          <button
            onClick={() => setShowForm(!showForm)}
            className="mt-4 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
          >
            {showForm ? "Cancel" : "Add Caregiver"}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <form
            onSubmit={handleAddCaregiver}
            className="mt-4 space-y-4 bg-pink-50 p-4 rounded-lg"
          >
            <div>
              <label className="block text-sm text-gray-700  mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-pink-500 "
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700  mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-pink-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700  mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-pink-500 "
              />
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                Save Caregiver
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
