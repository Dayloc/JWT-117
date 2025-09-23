import React, { useState } from "react";
import { register } from "./../services/fetch";


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const data = await register(email, password);
      setSuccess("Registro exitoso ✅");
      console.log("Usuario registrado:", data);
    } catch (err) {
      setError("Error al registrar ❌");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Registro</h2>
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
          <button type="submit">Registrarse</button>
        </form>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </div>
    </div>
  );
};

export default Register;
