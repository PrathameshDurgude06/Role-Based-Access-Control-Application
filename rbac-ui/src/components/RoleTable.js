import React, { useEffect, useState } from "react";
import axios from "axios";

function RoleTable() {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/roles")
      .then((response) => setRoles(response.data))
      .catch((error) => console.error("Error fetching roles:", error));
  }, []);

  return (
    <table className="table-auto w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2">ID</th>
          <th className="px-4 py-2">Role Name</th>
          <th className="px-4 py-2">Permissions</th>
        </tr>
      </thead>
      <tbody>
        {roles.map((role) => (
          <tr key={role.id} className="text-center">
            <td className="px-4 py-2">{role.id}</td>
            <td className="px-4 py-2">{role.name}</td>
            <td className="px-4 py-2">{role.permissions.join(", ")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RoleTable;
