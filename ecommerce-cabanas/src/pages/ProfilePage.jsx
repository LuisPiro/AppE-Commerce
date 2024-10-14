// src/pages/ProfilePage.jsx
import { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';

const ProfilePage = () => {
  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      // Aquí podrías agregar más lógica para cargar datos del usuario, si es necesario.
    }
  }, [token]);

  if (!user) {
    return <h2>Please login to see your profile</h2>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default ProfilePage;
