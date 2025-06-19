import React, { useState } from 'react';
import './AddressCard.css';

const AddressCard = ({ userAddress }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCard = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className={`address-container ${isOpen ? 'open' : ''}`}>
      <div className="address-header" onClick={toggleCard}>
        <h3>Saved Address</h3>
        <button className="toggle-button">{isOpen ? '−' : '+'}</button>
      </div>

      {isOpen && (
        <div className="address-content">
          {userAddress ? (
            <div className="address-fields">
              <div><span>Name:</span> {userAddress.name}</div>
              <div><span>Phone:</span> {userAddress.phoneNo}</div>
              <div><span>Address:</span> {userAddress.addressLine}</div>
              <div><span>City:</span> {userAddress.city}</div>
              <div><span>Postal Code:</span> {userAddress.postalCode}</div>
              <div><span>Country:</span> {userAddress.country}</div>
            </div>
          ) : (
            <p className="no-address">No address saved yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AddressCard;
