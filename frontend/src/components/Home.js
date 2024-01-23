import React, { useState } from "react";
import '../styles/Home.css';

const Home = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);

      // Basic client-side validation
      if (!formData.username || !formData.email || !formData.password) {
        alert("Please fill in all fields");
        return;
      }

      const response = await fetch("http://localhost:5000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message) {
          alert(data.message);
          // Reset the form after successful registration
          setFormData({
            username: "",
            email: "",
            password: "",
          });
        } else {
          console.error("Unexpected response format:", data);
        }
      } else {
        console.error(
          "Server responded with an error:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error during registration:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>User Registration</h1>
      <label>
        Username:
        <input
          type="text"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </label>
      <br />
      <button onClick={handleRegister} disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </div>
  );
};

export default Home;
