import React, { useEffect, useState } from "react";
import { getProfile } from "./../services/fetch"; // importa tu fetch.js

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data);
      } catch (err) {
        setError("No autorizado o token inválido ❌");
      }
    };

    fetchProfile();
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  if (!user) return <p>Cargando perfil...</p>;
  
  return (
    <div className="profile">
      <h2>Perfil de usuario</h2>
      <p>ID: {user.id}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;
