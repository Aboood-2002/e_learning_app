import { useState } from 'react';
import { X } from 'lucide-react';
import ProfilePhoto from './ProfilePhoto';
import ProfileField from './ProfileField';
import './ProfileEditor.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../redux/apiCalls/profileApiCall';
import { toast } from 'react-toastify';

function ProfileEditor({ initialProfile, onSave, onClose }) {
  const [profile, setProfile] = useState({
    userName: initialProfile?.userName || '',
    email: initialProfile?.email || '',
    profilePhoto: initialProfile?.profilePhoto || '',
  });
  //const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth || {});

  const handlePhotoSave = (file) => {
    const url = URL.createObjectURL(file);
    const updatedProfile = { ...profile, photoUrl: url };
    setProfile(updatedProfile);
    // Immediately save the photo update to the parent
    onSave(updatedProfile);
  };

  const updateField = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleSave = async () => {
    if (!user?.token) {
      toast.error('Please log in to save profile');
      onClose();
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('userName', profile?.userName);
      formData.append('email', profile?.email);
      formData.append('password', profile?.password);

      dispatch(updateProfile(user?._id,formData));
      toast.success('Profile updated successfully');
      onSave(profile);
      setIsLoading(false);
      onClose();
    } catch (err) {
      toast.error(err.message || 'Failed to update profile');
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-editor-overlay">
      <div className="profile-editor">
        <div className="profile-editor-header">
          <button onClick={onClose} className="close-btn">
            <X size={20} />
          </button>
          <ProfilePhoto
            profilePhoto={profile?.profilePhoto?.url} 
            onPhotoSave={handlePhotoSave}
          />
          <div className="profile-display">
            <h3>{profile?.userName || 'User'}</h3>
            <p>{profile?.email || 'No email'}</p>
          </div>
        </div>
        <div className="profile-fields">
          <ProfileField
            label="Name"
            value={profile.userName}
            onChange={(value) => updateField('userName', value)}
          />
          <ProfileField
            label="Email account"
            value={profile.email}
            onChange={(value) => updateField('email', value)}
          />
          <ProfileField
            label="Password"
            value={profile.password || ''}
            onChange={(value) => updateField('password', value)}
            placeholder="add new password"
          />
        </div>
        <div className="profile-editor-footer">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="save-btn"
          >
            {isLoading ? 'Saving...' : 'Save Change'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileEditor;