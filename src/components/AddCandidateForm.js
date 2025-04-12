import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import './AddCandidateForm.css';

const skillOptions = [
  { label: 'JavaScript', value: 'JavaScript' },
  { label: 'React', value: 'React' },
  { label: 'Node.js', value: 'Node.js' },
  { label: 'Python', value: 'Python' },
];

const AddCandidateForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    gender: '', experience: '', skills: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      skills: form.skills.map(skill => skill.value)
    };

    try {
      const res = await axios.post('http://localhost:5000/api/candidates', payload);
      onAdd(res.data);
      setForm({ name: '', phone: '', email: '', gender: '', experience: '', skills: [] });
    } catch (err) {
      console.error('❌ Error adding candidate:', err.message);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
      <input placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
      <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />

      <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })} required>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      <select value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} required>
        <option value="">Experience</option>
        <option value="1 Year">1 Year</option>
        <option value="2 Years">2 Years</option>
        <option value="3 Years">3 Years</option>
      </select>

      <Select
        isMulti
        options={skillOptions}
        value={form.skills}
        onChange={selected => setForm({ ...form, skills: selected })}
        placeholder="Select Skills"
      />

      <button type="submit">Add Candidate</button>
    </form>
  );
};

export default AddCandidateForm;
