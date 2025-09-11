import React from 'react'
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <div className="footer">
   
      <div className='icons'>
        <FaFacebook />
        <FaGithub />
        <FaLinkedin />
        <FaInstagram />
      </div>
    </div>
  );
}
