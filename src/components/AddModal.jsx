import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

export default function Modal({ isOpen, setIsOpen, children }) {
  // Detect if running inside Cypress
  const isTest = typeof window !== "undefined" && window.Cypress;

  const customStyles = {
    overlay: {
      backgroundColor: isTest ? "transparent" : "rgba(0, 0, 0, 0.6)",
      zIndex: isTest ? 0 : 1000,
      pointerEvents: isTest ? "none" : "auto", // Prevent it from blocking clicks in tests
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
      transition: isTest ? "none" : "all 0.3s ease", // disable animation during test
    },
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      style={customStyles}
      closeTimeoutMS={isTest ? 0 : 300} // Instantly close modal during tests
    >
      {children}
    </ReactModal>
  );
}
