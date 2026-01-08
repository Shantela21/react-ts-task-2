import React from 'react'
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>© {year} Links Vault — Built with React</p>
      <div className="icons" role="navigation" aria-label="Social links">
        <a href="#" aria-label="Facebook" className="icon-link"><FaFacebook /></a>
        <a href="#" aria-label="GitHub" className="icon-link"><FaGithub /></a>
        <a href="#" aria-label="LinkedIn" className="icon-link"><FaLinkedin /></a>
        <a href="#" aria-label="Instagram" className="icon-link"><FaInstagram /></a>
      </div>
    </footer>
  );
}
