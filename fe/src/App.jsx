// src/App.jsx
import React, { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import AddUser from './components/AddUser'; // Đây sẽ là form
import ResultTable from './components/ResultTable';
import EditUserForm from './components/EditUserForm';
import Modal from './components/Modal'; // <-- 1. Import Modal
import './App.css'; // <-- Import App.css

function App() {
  const [keyword, setKeyword] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State quản lý modal
  const [editing, setEditing] = useState(null); // (Dùng lại) Nếu != null -> Mở Modal Sửa
  const [isAdding, setIsAdding] = useState(false); // <-- 2. State mới -> Mở Modal Thêm

  // ... (useEffect fetch data không đổi) ...
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json()).then(data => {
        setUsers(data);
        setLoading(false);
      }).catch(err => setLoading(false));
  }, []);

  // --- Cập nhật các hàm xử lý ---

  const handleAddUser = (userFormData) => {
    const newUser = { ...userFormData, id: Date.now() };
    setUsers([...users, newUser]);
    setIsAdding(false); // <-- 3. Đóng modal sau khi thêm
  };

  const handleDeleteUser = (userId) => {
    // (Thêm) Yêu cầu xác nhận trước khi xóa
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleEditClick = (userToEdit) => {
    const userCopy = { ...userToEdit, address: { ...userToEdit.address } };
    setEditing(userCopy); // Mở modal Sửa
  };

  const handleSaveUser = (updatedUser) => {
    setUsers(prevUsers =>
      prevUsers.map(u => (u.id === updatedUser.id ? updatedUser : u))
    );
    setEditing(null); // Đóng modal Sửa
  };

  // Hàm đóng modal chung (dùng cho nút Hủy)
  const handleCancel = () => {
    setIsAdding(false);
    setEditing(null);
  };

  // ... (filteredUsers không đổi) ...
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(keyword.toLowerCase()) ||
    user.email.toLowerCase().includes(keyword.toLowerCase())
  );

  if (loading) return <div>Đang tải dữ liệu...</div>;

  return (
    <div className="App">
      <h1>Dashboard Quản lý Người dùng</h1>
      
      <SearchForm onChangeValue={setKeyword} />
      
      {/* 4. Nút để mở Modal Thêm */}
      <button onClick={() => setIsAdding(true)} style={{marginTop: '15px'}}>
        Thêm Người Dùng Mới
      </button>
      
      <hr />
      
      <ResultTable 
        users={filteredUsers} 
        onDelete={handleDeleteUser}
        onEdit={handleEditClick} 
      />

      {/* --- 5. Logic hiển thị MODAL --- */}

      {/* Modal Thêm */}
      {isAdding && (
        <Modal onClose={handleCancel}>
          <AddUser 
            onAdd={handleAddUser} 
            onCancel={handleCancel} // Truyền hàm Hủy vào
          />
        </Modal>
      )}

      {/* Modal Sửa */}
      {editing && (
        <Modal onClose={handleCancel}>
          <EditUserForm 
            user={editing} 
            onSave={handleSaveUser} 
            onCancel={handleCancel} // Truyền hàm Hủy vào
          />
        </Modal>
      )}

    </div>
  );
}

export default App;