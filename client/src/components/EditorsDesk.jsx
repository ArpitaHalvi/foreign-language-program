import { useState } from "react";
import { useAuth } from "../store/auth";
import { Close, Edit, FormatQuote } from "@mui/icons-material";
import { toast } from "react-toastify";
import { SlideInOnScroll } from "./SlideInOnScroll";

const sampleQuote =
  "Learning a new language is not just about words. it's about opening doors to new worlds.";

export default function EditorsDesk() {
  const [showModal, setShowModal] = useState(false);
  const [quote, setQuote] = useState(() => {
    return localStorage.getItem("quote") || sampleQuote;
  });
  const [newQuote, setNewQuote] = useState("");
  const changeQuote = (e) => {
    e.preventDefault();
    setQuote(newQuote);
    localStorage.setItem("quote", newQuote);
    toast.success("Quote changed successfully!");
    setShowModal(false);
  };
  const { user } = useAuth();
  return (
    <section className="editors-desk">
      {showModal && (
        <div className="quote-modal">
          <button onClick={() => setShowModal(false)}>
            <Close className="close-icon" />
          </button>
          <form onSubmit={changeQuote}>
            <textarea
              rows={7}
              cols={40}
              placeholder="Enter new quote"
              onChange={(e) => setNewQuote(e.target.value)}
            ></textarea>
            <button type="submit">Edit</button>
          </form>
        </div>
      )}
      <h2>From the Editor&apos;s Desk</h2>
      {/* <div className="editor-quote">
        <FormatQuote className="quote-icon" />
        <p>{quote}</p>
        {user && user.isAdmin && (
          <button className="edit-quote" onClick={() => setShowModal(true)}>
            <Edit className="edit-icon" />
          </button>
        )}
      </div> */}
      <div className="editor-quote-container">
        <SlideInOnScroll>
          <div className="editor-quote">
            <FormatQuote className="quote-icon" />
            <p>{quote}</p>
            {user && user.isAdmin && (
              <button className="edit-quote" onClick={() => setShowModal(true)}>
                <Edit className="edit-icon" />
              </button>
            )}
          </div>
        </SlideInOnScroll>
      </div>
    </section>
  );
}
