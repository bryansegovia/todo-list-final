import { useState } from "react";
import { TextField, Button } from "@mui/material";
import {login} from '../services/authService'
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate= useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await login(email, password);
        navigate('/todos');  // Redirige a la página de tareas después de iniciar sesión
      } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        alert('Credenciales incorrectas');
      }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
    </form>
  );
}

export default LoginPage;
