import { useState, useRef } from 'react';
import { Camera, Check } from 'lucide-react';
import './ProfilePhoto.css';
import { useDispatch, useSelector } from 'react-redux';
import { uploadProfilePhoto } from '../redux/apiCalls/profileApiCall';
import { toast } from 'react-toastify';

function ProfilePhoto({ profilePhoto, onPhotoSave }) {
  const [isHovering, setIsHovering] = useState(false);
  const [pendingPhoto, setPendingPhoto] = useState(null);
  const [pendingPhotoUrl, setPendingPhotoUrl] = useState(null);
  const [isSavingPhoto, setIsSavingPhoto] = useState(false);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth || {});

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Validate file type and size
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please upload a JPEG or PNG image');
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Image size must be under 5MB');
        return;
      }
      if (pendingPhotoUrl) {
        URL.revokeObjectURL(pendingPhotoUrl);
      }
      const url = URL.createObjectURL(file);
      setPendingPhoto(file);
      setPendingPhotoUrl(url);
    }
  };

  const handleSavePhoto = async () => {
    if (!pendingPhoto) return;
    if (!user?.token) {
      toast.error('Please log in to save photo');
      return;
    }

    setIsSavingPhoto(true);
    try {
      const formdata = new FormData()
      formdata.append("image",pendingPhoto)
      const response = dispatch(uploadProfilePhoto(formdata));
      onPhotoSave(response); // Update ProfileEditor state
      toast.success('Profile photo updated successfully');
      if (pendingPhotoUrl) {
        URL.revokeObjectURL(pendingPhotoUrl);
      }
      setPendingPhoto(null);
      setPendingPhotoUrl(null);
      setIsSavingPhoto(false);
    } catch (err) {
      toast.error(err.message || 'Failed to upload photo');
      setIsSavingPhoto(false);
    }
  };

  const handleCancelPhoto = () => {
    if (pendingPhotoUrl) {
      URL.revokeObjectURL(pendingPhotoUrl);
    }
    setPendingPhoto(null);
    setPendingPhotoUrl(null);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const displayPhotoUrl = pendingPhotoUrl || profilePhoto;

  return (
    <div className="profile-photo-container">
      <div
        className="profile-photo-wrapper"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={triggerFileInput}
      >
        {displayPhotoUrl ? (
          <img
            src={displayPhotoUrl}
            alt="Profile"
            className="profile-photo-img"
          />
        ) : (
          <div className="profile-photo-placeholder">
            <span>?</span>
          </div>
        )}
        <div className={`profile-photo-overlay ${isHovering ? 'visible' : ''}`}>
          <Camera size={24} />
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/jpeg,image/jpg,image/png"
          className="file-input"
          disabled={isSavingPhoto}
        />
      </div>
      {pendingPhoto && (
        <div className="photo-actions">
          <button
            onClick={handleSavePhoto}
            disabled={isSavingPhoto}
            className="save-photo-btn"
          >
            <Check size={16} />
            {isSavingPhoto ? 'Saving...' : 'Save Photo'}
          </button>
          <button
            onClick={handleCancelPhoto}
            disabled={isSavingPhoto}
            className="cancel-photo-btn"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfilePhoto;