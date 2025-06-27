import React from 'react';
import './ProfileField.css';

function ProfileField({ label, value, onChange, readOnly = false, placeholder = '' }) {
  return (
    <div className="profile-field">
      <div className="field-label">{label}</div>
      <div className="field-input">
        {readOnly ? (
          <div className="field-value">{value || placeholder}</div>
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange && onChange(e.target.value)}
            className="field-input-element"
            placeholder={placeholder}
          />
        )}
      </div>
    </div>
  );
}

export default ProfileField;