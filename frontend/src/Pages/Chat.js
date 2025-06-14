import React, { useState } from "react";

const AIChat = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!window.puter?.ai?.chat) {
      console.error("Puter SDK not loaded");
      return;
    }

    setLoading(true);
    try {
      const res = await window.puter.ai.chat(query);
      setResponse(res.message.content);
    } catch (err) {
      console.error("Chat error:", err);
      setResponse("Error occurred while fetching response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Ask something:</h2>
      <input
        type="text"
        className="border px-2 py-1 w-full mb-2"
        placeholder="Enter your question........"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading || !query.trim()}
      >
        {loading ? "Loading..." : "Submit"}
      </button>
      {response && (
        <div className="mt-4 p-3 border rounded bg-gray-100">
          <h3 className="font-semibold mb-1">Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default AIChat;
