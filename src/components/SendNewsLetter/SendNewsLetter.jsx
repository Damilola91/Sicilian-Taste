import { useState } from "react";
import "./SendNewsletter.css";

const SendNewsletter = () => {
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [html, setHtml] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject || (!text && !html)) {
      setResponseMessage(
        "Please provide a subject and at least one content field (text or HTML)."
      );
      setIsError(true);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/send-newsletter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subject, text, html }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setResponseMessage(
          `Newsletter sent successfully to ${data.result.sentTo} recipients.`
        );
        setHtml(""), setText("");
        setSubject("");
        setIsError(false);
      } else {
        setResponseMessage(`Error: ${data.message}`);
        setIsError(true);
      }
    } catch (error) {
      setResponseMessage("An error occurred while sending the newsletter.");
      setIsError(true);
    }
  };

  return (
    <div className="newsletter-container">
      <h2 className="newsletter-title">Send Newsletter</h2>
      <form className="newsletter-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="subject" className="form-label">
            Subject:
          </label>
          <input
            type="text"
            id="subject"
            className="form-input"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text" className="form-label">
            Text Content:
          </label>
          <textarea
            id="text"
            className="form-textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="html" className="form-label">
            HTML Content:
          </label>
          <textarea
            id="html"
            className="form-textarea"
            value={html}
            onChange={(e) => setHtml(e.target.value)}
          />
        </div>
        <button type="submit" className="form-button">
          Send Newsletter
        </button>
      </form>
      {responseMessage && (
        <p className={`form-response ${isError ? "error" : "success"}`}>
          {responseMessage}
        </p>
      )}
    </div>
  );
};

export default SendNewsletter;
