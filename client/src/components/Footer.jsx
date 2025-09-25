import React from "react";
import './footer.css';
import { 
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPinterestP,
  FaTiktok, FaYoutube, FaHeart, FaShoppingBag, FaShippingFast,
  FaShieldAlt, FaHeadset, FaArrowRight, FaEnvelope
} from 'react-icons/fa';
import { SiMastercard, SiVisa, SiPaypal, SiApplepay } from 'react-icons/si';

function Footer() {
  return (
    <footer className="footer">
      {/* Animated Background */}
      <div className="footer-bg-animation"></div>
      
      <div className="footer-container">
        {/* Main Content */}
        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-section brand-section">
            <div className="brand-logo">
              <FaShoppingBag className="logo-icon" />
              <span>Exclusive</span>
            </div>
            <p className="brand-description">
              Discover the latest trends in fashion and lifestyle. 
              We bring you quality products with fast delivery and 
              exceptional customer experience.
            </p>
            <div className="trust-badges">
              <div className="trust-item">
                <FaShippingFast className="trust-icon" />
                <span>Free Shipping</span>
              </div>
              <div className="trust-item">
                <FaShieldAlt className="trust-icon" />
                <span>Secure Payment</span>
              </div>
              <div className="trust-item">
                <FaHeadset className="trust-icon" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Quick Links with Hover Effects */}
          <div className="footer-section">
            <h4 className="section-title">
              <span>Quick Links</span>
              <div className="title-underline"></div>
            </h4>
            <ul className="links-list">
              <li>
                <a href="/about" className="link-item">
                  <FaArrowRight className="link-icon" />
                  <span>About Us</span>
                  <div className="link-hover-effect"></div>
                </a>
              </li>
              <li>
                <a href="/contact" className="link-item">
                  <FaArrowRight className="link-icon" />
                  <span>Contact</span>
                  <div className="link-hover-effect"></div>
                </a>
              </li>
              <li>
                <a href="/blog" className="link-item">
                  <FaArrowRight className="link-icon" />
                  <span>Blog</span>
                  <div className="link-hover-effect"></div>
                </a>
              </li>
              <li>
                <a href="/careers" className="link-item">
                  <FaArrowRight className="link-icon" />
                  <span>Careers</span>
                  <div className="link-hover-effect"></div>
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-section">
            <h4 className="section-title">
              <span>Categories</span>
              <div className="title-underline"></div>
            </h4>
            <ul className="categories-list">
              <li>
                <a href="/men" className="category-item">
                  <div className="category-dot"></div>
                  <span>Men's Fashion</span>
                </a>
              </li>
              <li>
                <a href="/women" className="category-item">
                  <div className="category-dot"></div>
                  <span>Women's Fashion</span>
                </a>
              </li>
              <li>
                <a href="/electronics" className="category-item">
                  <div className="category-dot"></div>
                  <span>Electronics</span>
                </a>
              </li>
              <li>
                <a href="/accessories" className="category-item">
                  <div className="category-dot"></div>
                  <span>Accessories</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-section newsletter-section">
            <h4 className="section-title">
              <span>Newsletter</span>
              <div className="title-underline"></div>
            </h4>
            <p>Subscribe to get updates on new arrivals and special offers</p>
            <div className="newsletter-form">
              <div className="input-group">
                <FaEnvelope className="input-icon" />
                <input type="email" placeholder="Enter your email" />
                <button className="subscribe-btn">
                  <span>Subscribe</span>
                  <div className="btn-hover-effect"></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Social & Payment Section */}
        <div className="footer-middle">
          <div className="social-section">
            <h4>Follow Us</h4>
            <div className="social-icons">
              {[
                { icon: FaFacebookF, color: '#1877f2', name: 'Facebook' },
                { icon: FaInstagram, color: '#e4405f', name: 'Instagram' },
                { icon: FaTwitter, color: '#1da1f2', name: 'Twitter' },
                { icon: FaTiktok, color: '#ff0050', name: 'TikTok' },
                { icon: FaYoutube, color: '#ff0000', name: 'YouTube' },
                { icon: FaPinterestP, color: '#bd081c', name: 'Pinterest' }
              ].map((social, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="social-icon"
                  style={{ '--social-color': social.color }}
                  aria-label={social.name}
                >
                  <social.icon />
                  <div className="social-tooltip">{social.name}</div>
                  <div className="social-wave"></div>
                </a>
              ))}
            </div>
          </div>

          <div className="payment-section">
            <h4>Secure Payments</h4>
            <div className="payment-icons">
              <SiVisa className="payment-icon" />
              <SiMastercard className="payment-icon" />
              <SiPaypal className="payment-icon" />
              <SiApplepay className="payment-icon" />
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>
              &copy; 2025 All copy rights reserved <FaHeart className="heart-icon" />This Site is Designed and Developed by <a>Trio Developers </a>
            </p>
            <div className="footer-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/cookies">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;