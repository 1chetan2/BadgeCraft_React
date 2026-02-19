import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    organizationName: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(formData);
      alert("Registration Successful");
      navigate("/");
    } catch (error) {
      alert("Registration Failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="card">
        <h2>BadgeCraft</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="organizationName"
            placeholder="Organization Name"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            required
          />

          <button type="submit">Create Account</button>
        </form>

        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;


