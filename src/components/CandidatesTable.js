import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CandidatesTable = () => {
  const [candidates, setCandidates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    gender: '',
    experience: '',
    skills: [],
  });

  const limit = 10;

  const fetchCandidates = () => {
    const params = {
      page: currentPage,
      limit,
      ...filters,
    };

    if (filters.skills.length) {
      params.skills = filters.skills.join(',');
    }

    axios
      .get('https://truleeinnovate.onrender.com/api/candidates', { params })
      .then((res) => {
        setCandidates(res.data.candidates);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.error('Error fetching candidates:', err);
      });
  };

  useEffect(() => {
    fetchCandidates();
  }, [currentPage, filters]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = (id) => {
    axios.delete(`https://truleeinnovate.onrender.com/api/candidates/${id}`).then(() => {
      setCandidates(candidates.filter((c) => c._id !== id));
    });
  };

  const filteredCandidates = candidates.filter((c) =>
    [c.name, c.phone, c.email].some((field) =>
      field.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div>
      <h2>Candidate List</h2>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search by name, phone, or email"
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ padding: '5px', marginBottom: '10px' }}
      />

      {/* 🎯 Filters */}
      <div style={{ marginBottom: '20px' }}>
        <select onChange={(e) => setFilters({ ...filters, gender: e.target.value })}>
          <option value="">Filter by Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <select onChange={(e) => setFilters({ ...filters, experience: e.target.value })}>
          <option value="">Filter by Experience</option>
          <option value="1 Year">1 Year</option>
          <option value="2 Years">2 Years</option>
          <option value="3 Years">3 Years</option>
        </select>

        <select
          multiple
          onChange={(e) =>
            setFilters({
              ...filters,
              skills: Array.from(e.target.selectedOptions).map((o) => o.value),
            })
          }
        >
          <option value="JavaScript">JavaScript</option>
          <option value="React">React</option>
          <option value="Node.js">Node.js</option>
          <option value="Python">Python</option>
        </select>
      </div>

      {/* 📊 Candidate Table */}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Experience</th>
            <th>Skills</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCandidates.length ? (
            filteredCandidates.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.phone}</td>
                <td>{c.email}</td>
                <td>{c.gender}</td>
                <td>{c.experience}</td>
                <td>{c.skills.join(', ')}</td>
                <td>
                  <button onClick={() => handleDelete(c._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No matching candidates found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ⏮ Pagination Controls */}
      <div style={{ marginTop: '20px' }}>
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
          ◀ Prev
        </button>
        <span style={{ margin: '0 10px' }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default CandidatesTable;
