const Modal = ({ children, idReference }) => {
  return (
    <div className="w3-modal" style={{ display: "block" }}>
      <div
        className="w3-modal-content w3-text-white w3-card-4 w3-round-large w3-padding"
        style={{ backgroundColor: "#0f2274cc", width: "40rem" }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
