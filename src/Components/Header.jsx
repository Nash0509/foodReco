import React from 'react'
import './header.css'
import { IoMdRocket } from 'react-icons/io';

const Header = () => {
  return (
    <div style={{fontFamily:'sans-serif', margin:'0', color:'whitesmoke', backgroundColor:'black', padding:'1rem', borderRadius:'5px'}} className='head1'>
      <div className='brand'>
      <h1>Kalorie.ai <IoMdRocket /></h1>
      </div>
      <div className='headc'>
        <ul>
          <li><a href='/'>Founders</a></li>
          <li><a href='/'>Innovation</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Header