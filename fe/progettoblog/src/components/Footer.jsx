import React from 'react'
import logo from '../assets/logo.png';
import { useTheme } from './ThemeContext';

const Footer = () => {
  const { theme } = useTheme();
  return (
    <div className={`d-flex justify-content-center ${theme === 'dark' ? 'dark-theme' : ''}`}>
        <footer className={`mt-4 d-flex flex-column justify-content-center align-items-center my-2 footer-container ${theme === 'dark' ? 'dark-theme' : ''}`}>
            <img style={{ width: '50px' }} src={logo}/>
            <h1 style={{ fontSize: '15px' }}>Made with ❤️ by Janus.sol</h1>
            </footer>
    </div>
  )
}

export default Footer
