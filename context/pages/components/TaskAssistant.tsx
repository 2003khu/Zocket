import { useState } from "react";
import axios from "axios";

const TaskAssistant = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const fetchAIResponse = async () => {
    const result = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: query }],
    }, {
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}` }
    });

    setResponse(result.data.choices[0].message.content);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">AI Task Assistant</h2>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="border p-2 w-full" />
      <button onClick={fetchAIResponse} className="bg-green-500 text-white px-4 py-2 mt-2">Get Suggestion</button>
      <p className="mt-2">{response}</p>
    </div>
  );
};

export default TaskAssistant;
