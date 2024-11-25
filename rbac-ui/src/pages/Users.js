import { useState, useEffect } from 'react';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([
    { name: 'John Doe', email: 'johndoe@example.com', role: 'Admin' },
    { name: 'Jane Smith', email: 'janesmith@example.com', role: 'User' },
    // ... more users
  ]);
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilteredUsers(
        users.filter(user =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }, 300); // Debounce delay in milliseconds

    return () => clearTimeout(timer); // Cleanup timeout on unmount or when searchTerm changes
  }, [searchTerm, users]);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Users List</h1>
      <input
        type="text"
        placeholder="Search users"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border-b p-2">Name</th>
            <th className="border-b p-2">Email</th>
            <th className="border-b p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <tr key={user.email}>
                <td className="border-b p-2">{user.name}</td>
                <td className="border-b p-2">{user.email}</td>
                <td className="border-b p-2">{user.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center border-b p-2">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
