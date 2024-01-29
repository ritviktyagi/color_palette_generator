import React from "react";

const CustomToast = ({ selectedColor, showToastMessage, setShowToastMessage }) => {
    var timer = setTimeout(() => {
    setShowToastMessage(false)    
    }, 2000);
    // clearTimeout(timer);

  return showToastMessage ? (
    <div className="toast-container text-white px-4 py-2 rounded-pill show">
      Color {selectedColor.toUpperCase()} copied to your clipboard
    </div>
  ) : ("")
};

export default CustomToast;
