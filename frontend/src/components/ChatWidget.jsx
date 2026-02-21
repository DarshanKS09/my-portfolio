import React, { useEffect, useMemo, useRef, useState } from "react";
import "./ChatWidget.css";

const normalizeBaseUrl = (value) => {
  const trimmed = (value || "").trim().replace(/\/$/, "");
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.includes("onrender.com") || trimmed.includes("vercel.app")) {
    return `https://${trimmed}`;
  }
  return trimmed;
};

const API_BASE_URL = normalizeBaseUrl(process.env.REACT_APP_BACKEND_URL || "");
const CHAT_URL_CANDIDATES = API_BASE_URL
  ? [`${API_BASE_URL}/chat`, `${API_BASE_URL}/api/chat`, `${API_BASE_URL}/fetch`, `${API_BASE_URL}/api/fetch`]
  : Array.from(
      new Set(
        [
          typeof window !== "undefined" ? `${window.location.origin}/chat` : "",
          typeof window !== "undefined" ? `${window.location.origin}/api/chat` : "",
          typeof window !== "undefined" ? `${window.location.origin}/fetch` : "",
          typeof window !== "undefined" ? `${window.location.origin}/api/fetch` : "",
          "/chat",
          "/api/chat",
          "/fetch",
          "/api/fetch",
        ].filter(Boolean)
      )
    );

const parseErrorMessage = async (response) => {
  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.toLowerCase().includes("application/json");
  let errorDetail = `Chat request failed with status ${response.status}`;

  if (isJson) {
    const errorData = await response.json();
    if (typeof errorData?.detail === "string" && errorData.detail.trim()) {
      errorDetail = errorData.detail;
    }
  }
  return { errorDetail, isJson };
};

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
      let lastError = null;

      for (const chatUrl of CHAT_URL_CANDIDATES) {
        try {
          const response = await fetch(chatUrl, {
            method: "POST",
            mode: "cors",
            credentials: "omit",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage }),
          });

          if (!response.ok) {
            const { errorDetail } = await parseErrorMessage(response);

            // Continue trying fallback endpoints for route-not-found style failures.
            if (response.status === 404 || response.status === 405) {
              lastError = new Error(`${errorDetail} (${chatUrl})`);
              continue;
            }

            throw new Error(errorDetail);
          }

          const contentType = response.headers.get("content-type") || "";
          const isJson = contentType.toLowerCase().includes("application/json");
          if (!isJson) {
            lastError = new Error(`Backend returned non-JSON response from ${chatUrl}`);
            continue;
          }

          const data = await response.json();
          const reply = typeof data.reply === "string" ? data.reply : "I don't know.";
          setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
          return;
        } catch (attemptError) {
          const message = attemptError instanceof Error ? attemptError.message : "Failed to fetch";
          lastError = new Error(`${message} (${chatUrl})`);
        }
      }

      throw (
        lastError ||
        new Error(
          "Unable to reach backend /chat. Set REACT_APP_BACKEND_URL to your backend Render URL."
        )
      );
    } catch (err) {
      const fallbackMessage = "Unable to reach the assistant right now. Please try again.";
      const message =
        err instanceof Error && err.message ? err.message : fallbackMessage;
      setError(message);
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
