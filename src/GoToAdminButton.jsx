import React from 'react';
import { useNavigate } from 'react-router-dom';

function GoToAdminButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/admin');
  };

  return (
    <button onClick={handleClick}>
      Go to Admin
    </button>
  );
}

export default GoToAdminButton;
