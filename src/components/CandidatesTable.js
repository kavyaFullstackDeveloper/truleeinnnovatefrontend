import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CandidatesTable = () => {
  const [candidates, setCandidates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch candidates from backend
    axios.get('http://localhost:5000/api/candidates')
      .then(res => {
        setCandidates(res.data);
      })
      .catch(err => {
        console.error("Error fetching candidates:", err);
      });
  }, []);

  // Filter candidates based on search query
  const filteredCandidates = candidates.filter(candidate => {
    return (
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.phone.includes(searchQuery) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <h2>Candidate List</h2>
      
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name, phone, or email"
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px', padding: '5px', fontSize: '14px' }}
      />
      
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Experience</th>
            <th>Skills</th>
          </tr>
        </thead>
        <tbody>
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map(candidate => (
              <tr key={candidate._id}>
                <td>{candidate.name}</td>
                <td>{candidate.phone}</td>
                <td>{candidate.email}</td>
                <td>{candidate.gender}</td>
                <td>{candidate.experience}</td>
                <td>{candidate.skills.join(', ')}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No candidates found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CandidatesTable;
