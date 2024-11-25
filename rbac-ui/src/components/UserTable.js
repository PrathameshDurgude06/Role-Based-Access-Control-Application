import React, { useEffect, useState } from "react";
import axios from "axios";

function UserTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <table className="table-auto w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2">ID</th>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Role</th>
          <th className="px-4 py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="text-center">
            <td className="px-4 py-2">{user.id}</td>
            <td className="px-4 py-2">{user.name}</td>
            <td className="px-4 py-2">{user.email}</td>
            <td className="px-4 py-2">{user.role}</td>
            <td className="px-4 py-2">{user.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
