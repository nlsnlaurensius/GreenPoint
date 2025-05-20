import React, { useEffect, useState } from 'react';
import api from '../../api';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [editRoleId, setEditRoleId] = useState(null);
  const [editRoleValue, setEditRoleValue] = useState('user');

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/users');
      if (res.data.success) setUsers(res.data.payload);
      else setError(res.data.message || 'Failed to fetch users.');
    } catch (e) {
      setError('Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter(u =>
        u.username.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, users]);

  const handleDelete = async id => {
    if (!window.confirm('Delete this user?')) return;
    setSubmitting(true);
    try {
      const res = await api.delete(`/users/${id}`);
      if (res.data.success) fetchUsers();
      else setError(res.data.message || 'Failed to delete user.');
    } catch (e) {
      setError('Failed to delete user.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditRole = (id, currentRole) => {
    setEditRoleId(id);
    setEditRoleValue(currentRole);
  };

  const handleRoleChange = e => {
    setEditRoleValue(e.target.value);
  };

  const handleSaveRole = async (id) => {
    setSubmitting(true);
    setError('');
    try {
      const res = await api.put(`/users/${id}`, { role: editRoleValue });
      if (res.data.success) {
        fetchUsers();
        setEditRoleId(null);
      } else {
        setError(res.data.message || 'Failed to update role.');
      }
    } catch (e) {
      setError('Failed to update role.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-[#004828] text-white flex flex-col items-center justify-center">
      <main className="container mx-auto px-4 sm:px-6 py-8 flex-1 flex flex-col items-center justify-center">
        <h1 className="text-3xl sm:text-5xl font-bold text-[#00A86L] mb-4 sm:mb-8 text-center drop-shadow-lg">Manage Users</h1>
        <button
          onClick={() => window.location.href = '/admin'}
          className="mb-4 bg-[#00A86B] text-white px-4 py-2 rounded-full text-xs sm:text-base font-semibold shadow hover:bg-[#00C890] transition duration-300"
        >
          Back to Dashboard
        </button>
        <input
          type="text"
          placeholder="Search by username or email..."
          className="mb-4 px-4 py-2 rounded-md w-full max-w-xs bg-gray-700 border border-gray-600 text-white focus:ring-[#00C890] focus:border-[#00C890]"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {error && <div className="bg-red-800 border border-red-600 text-red-200 px-4 py-3 rounded relative mb-4 max-w-4xl mx-auto">{error}</div>}
        <div className="bg-gray-800 p-2 sm:p-4 rounded-xl shadow-lg max-w-4xl mx-auto overflow-x-auto w-full">
          {loading ? <div className="text-center py-4">Loading...</div> : (
            <table className="min-w-full divide-y divide-gray-700 text-xs sm:text-base">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-medium text-gray-300 uppercase tracking-wider">Username</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-medium text-gray-300 uppercase tracking-wider">Email</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-medium text-gray-300 uppercase tracking-wider">Role</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-gray-700 transition-colors duration-200">
                    <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-normal break-words font-medium text-white max-w-[100px] sm:max-w-xs">{user.username}</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-normal break-words text-gray-300 max-w-[100px] sm:max-w-xs">{user.email}</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-4">
                      {editRoleId === user.id ? (
                        <>
                          <select value={editRoleValue} onChange={handleRoleChange} className="bg-gray-700 border border-gray-600 rounded-md px-2 py-1 text-white">
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                          <button onClick={() => handleSaveRole(user.id)} className="ml-2 bg-[#00A86B] px-2 py-1 rounded text-xs" disabled={submitting}>Save</button>
                          <button onClick={() => setEditRoleId(null)} className="ml-1 text-gray-400 hover:text-gray-200 text-xs">Cancel</button>
                        </>
                      ) : (
                        <>
                          <span className="capitalize">{user.role}</span>
                          <button onClick={() => handleEditRole(user.id, user.role)} className="ml-2 text-[#00C890] hover:text-[#00A86B] text-xs">Edit</button>
                        </>
                      )}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap text-right font-medium">
                      <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-700 text-xs sm:text-base px-2 sm:px-4 py-1 sm:py-2" disabled={submitting}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
