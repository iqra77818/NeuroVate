import React, { useState } from 'react';
import API, { setAuthToken } from '../api/api';

export default function SignIn({ onLogin }){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [err,setErr]=useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const r = await API.post('/auth/login', { email, password });
      const token = r.data.token;
      setAuthToken(token);
      onLogin(token);
    } catch (e) {
      setErr('Login failed — check seeded credentials (patient1@example.com / password)');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Patient Sign In</h2>
      {err && <div className="bg-red-100 text-red-700 p-2 mb-2">{err}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input placeholder="Email" className="w-full p-2 border rounded" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Password" type="password" className="w-full p-2 border rounded" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full bg-sky-500 text-white py-2 rounded">Sign In</button>
        <div className="text-sm text-gray-500">Seeded demo: patient1@example.com / password</div>
      </form>
    </div>
  );
}
