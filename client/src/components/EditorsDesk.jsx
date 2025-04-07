import { useState } from "react";
import { useAuth } from "../store/auth";
import { Close } from "@mui/icons-material";

function QuoteModal(isOpen, onClose) {
  if (!isOpen) return null;
  return (
    <div className="quote-modal">
      <button onClick={onClose}>
        <Close className="close-icon" />
      </button>
      <textarea rows={10} cols={40} placeholder="Enter new quote"></textarea>
    </div>
  );
}

const sampleQuote =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus expedita at neque sequi alias natus aspernatur voluptas est beatae eveniet.";
export default function EditorsDesk() {
  const [showModal, setShowModal] = useState(false);
  const [quote, setQuote] = useState(sampleQuote);
  const changeQuote = () => {
    setQuote();
  };
  const { user } = useAuth();
  return (
    <section className="editors-desk">
      {showModal && (
        <QuoteModal isOpen={showModal} onClose={() => setShowModal(false)} />
      )}
      <div className="editor-quote">{quote}</div>
      {user && user.isAdmin && (
        <button className="edit-quote" onClick={() => setShowModal(true)}>
          Change Quote
        </button>
      )}
    </section>
  );
}
