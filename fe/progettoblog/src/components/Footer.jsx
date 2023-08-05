import React from 'react'
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <div className='d-flex justify-content-center'>
        <footer className='d-flex flex-column justify-content-center align-items-center my-2 footer-container'>
            <img style={{ width: '50px' }} src={logo}/>
            <h1 style={{ fontSize: '15px' }}>Made with ❤️ by Janus.sol</h1>
            </footer>
    </div>
  )
}

export default Footer