import React from 'react';
import './Detail.css'

const DetailedPropertyView = ({ property, onEdit, onDelete, onClose }) => (
  <div className="property-details-page">
    <h4 className='property-name'>{property.name}</h4>
    <img
      src={property.picture}
      alt={property.name}
      className="property-image"
    />
    <div className="property-details">
      <p className="property-price">Price: {property.price}</p>
      <p className="property-location">Location: {property.location}</p>
      <p1 className='property-about'>About This Property :</p1>
      <p className="property-description">Description: {property.description}</p>
      <div className="action-buttons">
        <button className="edit-button" onClick={() => onEdit(property)}>
          Edit Property
        </button>
        <button className="delete-button" onClick={() => onDelete(property)}>
           Delete Property
        </button>
      </div>
    </div>
    <button className="close-button" onClick={onClose}>
      Back to Property List
    </button>
  </div>
);

export default DetailedPropertyView;
