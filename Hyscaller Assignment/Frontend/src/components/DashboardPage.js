import React, { useState, useEffect } from 'react';
import './Dash.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';
import DetailedPropertyView from './DetailedPropertyView';
import { v4 as uuidv4 } from 'uuid';


const DashboardPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [properties, setProperties] = useState(() => {
    try {
      const storedProperties = localStorage.getItem('properties');
      return storedProperties ? JSON.parse(storedProperties) : [];
    } catch (error) {
      console.error('Error loading from local storage:', error);
      return [];
    }
  });
  const [viewDetailedProperty, setViewDetailedProperty] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); // Default email

  useEffect(() => {
    try {
      localStorage.setItem('properties', JSON.stringify(properties));
    } catch (error) {
      console.error('Error saving to local storage:', error);
    }
  }, [properties]);

  const handleEdit = (property) => {
    setSelectedProperty(property);
    setShowModal(true);
  };


useEffect(() => {
  // Fetch user information after authentication
  const fetchUserInfo = async () => {
    try {
      const response = await fetch('http://localhost:8081/userInfo'); // Assuming you have an endpoint to fetch user info
      const data = await response.json();
      setName(data.name);
      setEmail(data.email);
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  };

  // Fetch user properties when the dashboard component 
  const fetchUserProperties = async () => {
    try {
      const response = await fetch(`http://localhost:8081/user_properties`);
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error('Error fetching user properties:', error);
    }
  };

  fetchUserInfo();
  fetchUserProperties();
}, []);


const PropertyCard = ({ property, onViewDetails, onEdit, onDelete }) => (
  <div className="property-card" onClick={() => onViewDetails(property)}>
    <img
      src={property.picture}
      alt={property.name}
      style={{ height: '150px', width: '150px', objectFit: 'cover', borderRadius: '5px 5px 0 0' }}
    />
    <div className="property-details">
      <p>Location: {property.location}</p>
      <p>Price: {property.price}</p>
    </div>
  </div>
);

const generateUniqueId = () => {
  return uuidv4();
};


  const handleAddProperty = (newProperty) => {
    const newPropertyWithId = { id: generateUniqueId(), ...newProperty };
    setProperties((prevProperties) => [...prevProperties, newPropertyWithId]);
    setShowModal(false);
    setSelectedProperty(null);
  };

  const handleUpdate = (updatedProperty) => {
    const updatedProperties = properties.map((property) =>
      property.id === updatedProperty.id ? updatedProperty : property
    );
    setProperties(updatedProperties);
    setShowModal(false);
    setSelectedProperty(null);
  };

  const handleDelete = (property) => {
    const updatedProperties = properties.filter((p) => p.id !== property.id);
    setProperties(updatedProperties);
    setShowModal(false);
    setSelectedProperty(null);
    setViewDetailedProperty(null);
  };

  const handleCancel = () => {
    setShowModal(false);
    setSelectedProperty(null);
  };

  const handleViewDetails = (property) => {
    setViewDetailedProperty(property);
  };
  useEffect(() => {
    // Get name and email from query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const nameFromUrl = urlParams.get('name');
    const emailFromUrl = urlParams.get('email');
    if (nameFromUrl) setName(nameFromUrl);
    if (emailFromUrl) setEmail(emailFromUrl);
  }, []);

  return (
    <div>
      <div className="nav">
        <div className="left">
          <p>DreamHome Realty!</p>
        </div>
        <div className="right">
          <input
            className="input"
            type="text"
            placeholder="search.."
          />
          <button className="btn">Search</button>
        </div>
      </div>

      {viewDetailedProperty ? (
        <DetailedPropertyView
          property={viewDetailedProperty}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onClose={() => setViewDetailedProperty(null)}
        />
      ) : (
        <div>
          <div className="details">
            <p className="svg">
              <FontAwesomeIcon icon={faRightFromBracket} />
            </p>
            <p>{name}</p> 
            <p>{email}</p>
          </div>

          <button className="btn" onClick={() => setShowModal(true)}>
            Add new Property
          </button>

          <div className="property-cards-container">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onViewDetails={handleViewDetails}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}

      {showModal && (
        <Modal
          onClose={handleCancel}
          onSubmit={handleAddProperty}
          property={selectedProperty}
          editMode={!!selectedProperty}
          onUpdate={handleUpdate}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default DashboardPage;
