import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    //  clear old token
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    const res = await login({
      email: formData.email,
      password: formData.password,
    });

    const token = res.data.token;

    //  store token properly
    if (formData.remember) {
      localStorage.setItem("token", token);
    } else {
      sessionStorage.setItem("token", token);
    }

    navigate("/dashboard");
  } catch (error) {
    alert("Invalid credentials");
  }
};

  return (
    <div className="auth-container">
      <div className="card">
        <h2>BadgeCraft</h2>

        <form onSubmit={handleSubmit}>
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
          <br />  <br />
          <div className="remember">
           
              <div><input type="checkbox" name="remember" onChange={handleChange} /></div>
               <div>Remember Me</div>
          
          </div>
            <br />  

          <button type="submit">Sign In</button>
          
        </form>
        

        <p>
          Don’t have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
