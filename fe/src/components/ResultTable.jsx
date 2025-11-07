

import React from 'react';

// Nhận users (đã lọc), onDelete, onEdit từ App
function ResultTable({ users, onDelete, onEdit }) {
  
  // Không cần state, không cần useEffect, không cần lọc ở đây nữa

  return (
    <div>
      <h3>Kết quả ({users.length})</h3>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên (Name)</th>
            <th>Email</th>
            {/* <th>Username (từ API)</th> */}
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                {/* <td>{u.username}</td> */}
                <td>
                  {/* Gọi hàm từ App truyền xuống */}
                  <button onClick={() => onEdit(u)}>Sửa</button>
                  <button onClick={() => onDelete(u.id)}>Xóa</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Không tìm thấy người dùng nào.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ResultTable;