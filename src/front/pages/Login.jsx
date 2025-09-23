import React, { useState } from "react";
import { login } from "./../services/fetch";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // Hook para redirección

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const data = await login(email, password);
      setSuccess("Login exitoso 🚀");
      console.log("Usuario logueado:", data);

      // Redirigir a /profile después de 1 segundo
      setTimeout(() => {
        navigate("/profile");
      }, 1000);

    } catch (err) {
      setError("Credenciales inválidas ❌");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Iniciar sesión</button>
        </form>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <p>
          Si aún no se ha registrado por favor <Link to="/register">registrese</Link>...
        </p> 
      </div>
    </div>
  );
};

export default Login;
