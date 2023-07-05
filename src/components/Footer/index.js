import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <ul className="contact-item-list">
      <li>
        <FaGoogle className="contacts-icon" />
      </li>
      <li>
        <FaTwitter className="contacts-icon" />
      </li>
      <li>
        <FaInstagram className="contacts-icon" />
      </li>
      <li>
        <FaYoutube className="contacts-icon" />
      </li>
    </ul>
    <p className="contact-text">Contact us</p>
  </div>
)
export default Footer
