// Modal.js

import React, { useState, useEffect } from 'react';

const Modal = ({ onClose, onSubmit, property, editMode, onUpdate, onCancel }) => {
  const [name, setName] = useState('');
  const [picture, setPicture] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (property) {
      setName(property.name || '');
      setPicture(property.picture || ''); // Initialize picture state
      setLocation(property.location || '');
      setPrice(property.price || '');
      setDescription(property.description || '');
    }
  }, [property]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    if (!name || !location || !price) {
      alert('Please fill out all required fields.');
      return;
    }

    const propertyData = {
      name,
      picture,
      location,
      price,
      description,
    };

    if (editMode) {
      onUpdate(propertyData);
    } else {
      onSubmit(propertyData);
    }

    onClose();
  };

  return (
    <div className="modal-overlay" style={styles.modalOverlay}>
      <div className="modal" style={styles.modal}>
        <button className="close-btn" onClick={onClose} style={styles.closeButton}>
          &times;
        </button>
        <h2 style={styles.heading}>{editMode ? 'Edit Property' : 'Add New Property'}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} />

          <label style={styles.label}>Picture:</label>
          <input type="file" onChange={handleImageChange} />

          <label style={styles.label}>Location:</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} style={styles.input} />

          <label style={styles.label}>Price:</label>
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} style={styles.input} />

          <label style={styles.label}>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={styles.textarea} />

          <button type="submit" style={styles.submitButton}>
            {editMode ? 'Update' : 'Add'}
          </button>
          {editMode && (
            <button type="button" onClick={onCancel} style={styles.cancelButton}>
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
};


const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    background: '#fff',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    maxWidth: '400px',
    width: '100%',
    position: 'relative',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    color: '#333',
    cursor: 'pointer',
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    color: '#333',
  },
  input: {
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '3px',
    fontSize: '14px',
  },
  textarea: {
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '3px',
    fontSize: '14px',
  },
  submitButton: {
    background: '#007BFF',
    color: '#fff',
    padding: '10px',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  cancelButton: {
    background: '#ccc',
    color: '#333',
    padding: '10px',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
  },
};

export default Modal;
