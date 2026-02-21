import React, { useEffect, useMemo, useRef, useState } from "react";
import "./ChatWidget.css";

const API_BASE_URL = (process.env.REACT_APP_BACKEND_URL || "").replace(/\/$/, "");
const CHAT_URL = API_BASE_URL ? `${API_BASE_URL}/chat` : "/chat";

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi, I can answer questions about my resume and portfolio.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  const canSend = useMemo(() => input.trim().length > 0 && !isLoading, [input, isLoading]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const sendMessage = async (event) => {
    event.preventDefault();
    const userMessage = input.trim();
    if (!userMessage || isLoading) return;

    setError("");
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        let errorDetail = `Chat request failed with status ${response.status}`;
        try {
          const errorData = await response.json();
          if (typeof errorData?.detail === "string" && errorData.detail.trim()) {
            errorDetail = errorData.detail;
          }
        } catch (_ignored) {
          // Ignore JSON parse errors and keep status-based message.
        }
        throw new Error(errorDetail);
      }

      const data = await response.json();
      const reply = typeof data.reply === "string" ? data.reply : "I don't know.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to reach the assistant right now. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-widget-root">
      {isOpen && (
        <div className="chat-widget-panel" role="dialog" aria-label="AI Assistant">
          <div className="chat-widget-header">
            <h3>AI Assistant</h3>
            <button
              type="button"
              className="chat-widget-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              x
            </button>
          </div>

          <div className="chat-widget-messages">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`chat-bubble ${message.role}`}>
                {message.content}
              </div>
            ))}
            {isLoading && <div className="chat-bubble assistant loading">Thinking...</div>}
            <div ref={messagesEndRef} />
          </div>

          {error && <div className="chat-widget-error">{error}</div>}

          <form className="chat-widget-input-row" onSubmit={sendMessage}>
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about experience, projects, skills..."
              disabled={isLoading}
              className="chat-widget-input"
            />
            <button type="submit" disabled={!canSend} className="chat-widget-send">
              {isLoading ? "..." : "Send"}
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className="chat-widget-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
      >
        {isOpen ? "Close" : "Ask AI"}
      </button>
    </div>
  );
}

export default ChatWidget;
