import React, { useState } from "react";
import '../styles/Dashboard.css';
const UpdateProfile = () => {
  const [oldEmail, setOldEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const handleUpdateProfile = () => {
    fetch("http://localhost:5000/dashboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        old_email: oldEmail,
        new_username: newUsername,
        new_email: newEmail,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          alert("Profile updated successfully");
        } else {
          alert(`Error updating profile: ${data.message}`);
        }
      })
      .catch((error) => console.error("Error updating profile:", error));
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <label>Old Email: </label>
      <input
        type="email"
        value={oldEmail}
        onChange={(e) => setOldEmail(e.target.value)}
      />
      <br />
      <label>New Username: </label>
      <input
        type="text"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
      />
      <br />
      <label>New Email: </label>
      <input
        type="email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
      />
      <br />
      <button onClick={handleUpdateProfile}>Update Profile</button>
    </div>
  );
};

export default UpdateProfile;
