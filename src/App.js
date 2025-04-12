import React, { useState, useEffect } from 'react';
import AddCandidateForm from './components/AddCandidateForm';
import CandidatesTable from './components/CandidatesTable';
import axios from 'axios';

const App = () => {
  const [candidates, setCandidates] = useState([]);

  const fetchCandidates = async () => {
    const res = await axios.get('https://truleeinnovate.onrender.com/api/candidates');
    setCandidates(res.data);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Candidate Management</h1>
      <AddCandidateForm onAdd={fetchCandidates} />
      <CandidatesTable candidates={candidates} />
    </div>
  );
};

export default App;
