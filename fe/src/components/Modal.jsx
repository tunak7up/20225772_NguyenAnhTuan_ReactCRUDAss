// src/components/Modal.jsx
import React from 'react';
import '../Modal.css'; // Import file CSS

/**
 * Component Modal
 * @param {object} props
 * @param {function} props.onClose - Hàm được gọi khi modal đóng (click overlay hoặc nút X)
 * @param {React.ReactNode} props.children - Nội dung bên trong modal (sẽ là form)
 */
function Modal({ onClose, children }) {

  // Hàm xử lý khi click vào lớp phủ
  const handleOverlayClick = (e) => {
    // Chỉ đóng khi click vào chính overlay (không phải content bên trong)
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        
        {/* Nút X để đóng */}
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>
        
        {/* Nội dung (Form) sẽ được render ở đây */}
        {children}
        
      </div>
    </div>
  );
}

export default Modal;