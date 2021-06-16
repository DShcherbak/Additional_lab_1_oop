

// src/components/auth-nav.js

import React from "react";
import AuthenticationButton from "./authentication-button";
import styles from "../styles/Navbar.module.css"

const AuthNav = () => (
    <div className={styles.authButtonWrapper}>
      <div className={styles.authButton}>
        <AuthenticationButton />
      </div>
    </div>
);

export default AuthNav;


