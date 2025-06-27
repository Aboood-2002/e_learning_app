import { User, LogOut, X } from 'lucide-react';
import './ProfileCard.css';

function ProfileCard({ profile, onEdit, onLogout, onClose }) {
  return (
    <div className="profile-card-overlay">
      <div className="profile-card">
        <button onClick={onClose} className="close-btn">
          <X size={20} />
        </button>
        
        <div className="profile-header">
          <div className="profile-photo-large">
            {profile?.profilePhoto?.url ? (
              <img 
                src={profile?.profilePhoto?.url} 
                alt="Profile" 
              />
            ) : (
              <div className="profile-placeholder">
                <span>?</span>
              </div>
            )}
          </div>
          
          <div className="profile-info">
            <h2>{profile.userName}</h2>
            <p>{profile.email}</p>
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-row">
            <span className="detail-label">Mobile</span>
            <span className="detail-value">{profile.mobileNumber || 'Not set'}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Location</span>
            <span className="detail-value">{profile.location}</span>
          </div>
        </div>

        <div className="button-group">
          <button
            onClick={onEdit}
            className="edit-profile-btn"
          >
            <User size={18} />
            <span>Edit Profile</span>
          </button>
          
          <button
            onClick={onLogout}
            className="logout-btn-bottom"
            title="Log out"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;