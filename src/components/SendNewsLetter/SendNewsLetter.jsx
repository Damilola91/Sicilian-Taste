import { useState } from "react";

const SendNewsletter = () => {
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [html, setHtml] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject || (!text && !html)) {
      setResponseMessage(
        "Please provide a subject and at least one content field (text or HTML)."
      );
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
      } else {
        setResponseMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setResponseMessage("An error occurred while sending the newsletter.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Send Newsletter</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Subject:
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Text Content:
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            HTML Content:
            <textarea
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />
          </label>
        </div>
        <button
          type="submit"
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Send Newsletter
        </button>
      </form>
      {responseMessage && (
        <p style={{ marginTop: "20px" }}>{responseMessage}</p>
      )}
    </div>
  );
};

export default SendNewsletter;
