import React, { useEffect, useState } from 'react';
import useSocket from '../hooks/useSocket';

export default function Dashboard({ token }) {
  const socketRef = useSocket(token);
  const [notifications, setNotifications] = useState([]);

  // Caregivers state (start with 2 dummy caregivers)
  const [caregivers, setCaregivers] = useState([
    { id: 1, name: 'John Doe', phone: '123-456-7890', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', phone: '987-654-3210', email: 'jane@example.com' },
  ]);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });

  useEffect(() => {
    const s = socketRef.current;
    if (!s) return;
    s.on('caregiver_notification', (n) => {
      setNotifications(prev => [n, ...prev].slice(0, 100));
    });
    return () => { s?.off('caregiver_notification'); };
  }, [socketRef.current]);

  // Handle form input change
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) return alert('Please fill all fields');
    // Add new caregiver to the list (assign unique id)
    const newCg = { id: Date.now(), ...formData };
    setCaregivers(prev => [...prev, newCg]);
    setFormData({ name: '', phone: '', email: '' });
    setShowForm(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl text-sky-900 font-bold mb-2">Caregiver Dashboard</h1>
      <p className="text-gray-600 mb-6">Manage access and share your health data with trusted contacts</p>

      <div className="mb-6">
        {/* Title and Add Caregiver Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl text-sky-900 mt-10 font-semibold">Caregivers</h2>
          <button
            className="px-7 py-4 text-lg bg-sky-600 mt-8 text-white rounded hover:bg-blue-700"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : '+ Add Caregiver'}
          </button>
        </div>

        {/* Caregiver list */}
        <div className="space-y-4">
          {caregivers.map(cg => (
            <div key={cg.id} className="border rounded p-4 shadow bg-white">
              <h3 className="font-semibold text-lg">{cg.name}</h3>
              <p>Phone: {cg.phone}</p>
              <p>Email: {cg.email}</p>
            </div>
          ))}
        </div>

        {/* Add caregiver form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="mt-4 bg-gray-50 p-4 rounded shadow space-y-3">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded px-2 py-1"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded px-2 py-1"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded px-2 py-1"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Add
            </button>
          </form>
        )}
      </div>

      {/* Notifications Section */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Notifications</h3>
        <ul>
          {notifications.length === 0 && <li className="text-gray-400">No notifications yet</li>}
          {notifications.map((n, i) => (
            <li key={i} className="border-b py-2 text-sm">
              <div className="font-medium">{n.type}</div>
              <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(n, null, 2)}</pre>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


