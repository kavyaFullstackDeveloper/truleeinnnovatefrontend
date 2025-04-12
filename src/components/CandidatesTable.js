import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CandidatesTable = () => {
  const [candidates, setCandidates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch candidates from backend
    axios.get('https://truleeinnovate.onrender.com/api/candidates')
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

  const handleDelete = (id) => {
    // Call backend to delete candidate
    axios.delete(`https://truleeinnovate.onrender.com/api/candidates/${id}`)
      .then(res => {
        console.log(res.data.message);
        // Remove the deleted candidate from the local state
        setCandidates(candidates.filter(candidate => candidate._id !== id));
      })
      .catch(err => {
        console.error("Error deleting candidate:", err);
      });
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
            <th>Actions</th>  {/* Added column for delete button */}
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
                <td>
                  {/* Delete Button */}
                  <button onClick={() => handleDelete(candidate._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No candidates found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CandidatesTable;
