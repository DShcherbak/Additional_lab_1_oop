

// src/components/logout-button.js

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const {user} = useAuth0();
  return (
    <button
      className="btn btn-danger btn-block"
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
        {user.email}
    </button>
  );
};

export default LogoutButton;


