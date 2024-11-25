import React, { useState } from "react";
import axios from "axios";

function PermissionForm() {
  const [permissionName, setPermissionName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/permissions", { name: permissionName })
      .then(() => {
        alert("Permission added!");
        setPermissionName("");
      })
      .catch((error) => console.error("Error adding permission:", error));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border border-gray-300 rounded-md">
      <label className="block mb-2">
        Permission Name:
        <input
          type="text"
          value={permissionName}
          onChange={(e) => setPermissionName(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md"
        />
      </label>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
        Add Permission
      </button>
    </form>
  );
}

export default PermissionForm;
