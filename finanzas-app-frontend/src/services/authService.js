const API_URL = process.env.REACT_APP_API_URL;

export async function login(email, password) {
  const res = await fetch(`${API_URL}/usuarios/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error('Credenciales inválidas');
  return await res.json();
}

export async function register(nombre, email, password) {
  const res = await fetch(`${API_URL}/usuarios/registrar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, password }),
  });

  if (!res.ok) throw new Error('Error al registrar usuario');
  return await res.json();
}
