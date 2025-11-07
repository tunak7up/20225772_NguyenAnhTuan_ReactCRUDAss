import React from 'react';
//component tao o buoc 2

function SearchForm({ onChangeValue }) {
  return (
    <div>
      <h3>Tìm kiếm</h3>
      <input
        type="text"
        placeholder="Nhập tên hoặc email để tìm..."
        onChange={(e) => onChangeValue(e.target.value)}
        style={{ width: '300px' }}
      />
    </div>
  );
}

export default SearchForm;