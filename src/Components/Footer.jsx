import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle} className='foot'>
      <div>
        <h3>Contact Us</h3>
        <p>Email: info@example.com</p>
        <p>Phone: +1 (123) 456-7890</p>
      </div>

      <div>
        <h3>Follow Us</h3>
        <p>Facebook | Twitter | Instagram</p>
      </div>

      <div>
        <h3>Address</h3>
        <p>1234 Street Name, City, Country</p>
      </div>

      <div>
        <h3>Newsletter</h3>
        <p>Subscribe to our newsletter for updates.</p>
        {/* Add a subscription form or link here */}
      </div>
    </footer>
  );
};

const footerStyle = {
  background: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '2rem',
  bottom: 0,
  display: 'flex',
  justifyContent: 'space-around'
};

export default Footer;
