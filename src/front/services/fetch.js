const API_URL ="https://shiny-invention-5gg6wxg57xjph9q4-3001.app.github.dev/api";

// Registro de usuario
export const register = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg || "Error en el registro");
    }

    return data;
  } catch (error) {
    console.error("Error en register:", error);
    throw error;
  }
};

// Login de usuario
export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    // Siempre parsea el JSON primero
    const data = await response.json();

    // Manejo de errores
    if (!response.ok) {
      // Mostrar mensaje enviado por el backend si existe
      throw new Error(data.msg || "Error en el login");
    }

    // Verifica que haya token
    if (!data.token) {
      throw new Error("No se recibió token del servidor");
    }

    // Guarda el token en localStorage para rutas protegidas
    localStorage.setItem("token", data.token);

    return data; // puedes devolver usuario y token
  } catch (error) {
    console.error("Error en login:", error);
    throw error; // lanza error para que lo capture el frontend
  }
};


// Obtener perfil (ruta protegida)
export const getProfile = async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("No autorizado o token inválido ❌");

    const data = await response.json();
    dispatch({ type: "set_perfilUsuario", payload: data });
    return data;
  } catch (error) {
    console.error("Error en getProfile:", error);
    throw error;
  }
};
