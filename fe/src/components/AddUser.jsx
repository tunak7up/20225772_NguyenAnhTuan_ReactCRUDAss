// src/components/AddUser.jsx
import React, { useState } from 'react';

const initialFormState = {
  name: "", username: "", email: "",
  address: { street: "", suite: "", city: "" },
  phone: "", website: ""
};

// Nhận thêm props 'onCancel' từ App
function AddUser({ onAdd, onCancel }) {
  const [user, setUser] = useState(initialFormState);

  // ... (Hàm handleChange không đổi) ...
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (["street", "suite", "city"].includes(id)) {
      setUser({ ...user, address: { ...user.address, [id]: value } });
    } else {
      setUser({ ...user, [id]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.name === "" || user.username === "") {
      alert("Vui lòng nhập Name và Username!");
      return;
    }
    onAdd(user);
    // Không cần reset form (vì modal sẽ đóng)
  };

  return (
    <div>
      {/* Tiêu đề nằm trong Modal */}
      <h3>Thêm người dùng mới</h3>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input id="name" type="text" value={user.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="username">Username: </label>
          <input id="username" type="text" value={user.username} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input id="email" type="email" value={user.email} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="city">City: </label>
          <input id="city" type="text" value={user.address.city} onChange={handleChange} />
        </div>
        
        <div style={{marginTop: '15px'}}>
          <button type="submit">Thêm</button>
          
          {/* Nút Hủy (type="button" để không submit form) */}
          <button type="button" onClick={onCancel} style={{backgroundColor: '#6c757d'}}>
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddUser;