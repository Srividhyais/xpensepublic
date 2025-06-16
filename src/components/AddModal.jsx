import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

export default function Modal({ isOpen, setIsOpen, children }) {
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: 1000, // Ensure it's above content when shown, but not lingering
    },
    content: {
      width: "95%",
      maxWidth: "572px",
      top: "50%",
      left: "50%",
      transform: "translateX(-50%) translateY(-50%)",
      height: "fit-content",
      maxHeight: "90vh",
      background: "rgba(239, 239, 239, 0.85)",
      border: "0",
      borderRadius: "15px",
      padding: "2rem",
    },
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      style={customStyles}
    >
      {children}
    </ReactModal>
  );
}
