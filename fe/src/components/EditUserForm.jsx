// src/components/EditUserForm.jsx
import React, { useState, useEffect } from 'react';

// Nhận 'onCancel'
function EditUserForm({ user, onSave, onCancel }) {
  const [formData, setFormData] = useState(user);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  // ... (Hàm handleChange không đổi) ...
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (["street", "suite", "city"].includes(id)) {
      setFormData({ ...formData, address: { ...formData.address, [id]: value } });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div>
      <h3>Sửa người dùng: {user.name}</h3>
      <form onSubmit={handleSubmit}>
        {/* ... (Các input fields không đổi) ... */}
        <div>
          <label htmlFor="name">Name: </label>
          <input id="name" type="text" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="username">Username: </label>
          <input id="username" type="text" value={formData.username} onChange={handleChange} />
        </div>
        {/* ... (vv) ... */}

        <div style={{marginTop: '15px'}}>
          <button type="submit">Lưu thay đổi</button>
          
          {/* Nút Hủy gọi onCancel */}
          <button type="button" onClick={onCancel} style={{backgroundColor: '#6c757d'}}>
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUserForm;