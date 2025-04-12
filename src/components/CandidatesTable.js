import React from 'react';

const CandidatesTable = ({ candidates }) => {
  return (
    <div>
      <h2>Candidate List</h2>
      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead style={{ backgroundColor: '#f2f2f2' }}>
          <tr>
            <th>Name</th><th>Phone</th><th>Email</th>
            <th>Gender</th><th>Experience</th><th>Skills</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.phone}</td>
              <td>{c.email}</td>
              <td>{c.gender}</td>
              <td>{c.experience}</td>
              <td>{c.skills.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidatesTable;
