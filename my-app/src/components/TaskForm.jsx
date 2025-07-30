import React, { useState } from "react";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, assignedTo, description }),
      });

      if (!response.ok) throw new Error("Failed to assign task");
      setMessage("✅ Task assigned successfully!");

      // Reset form
      setTitle("");
      setAssignedTo("");
      setDescription("");
    } catch (err) {
      console.error("❌ Error:", err);
      setMessage("❌ Failed to assign task");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-lg font-semibold mb-2">Assign New Task</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
        <input
          className="border p-2 rounded"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          className="border p-2 rounded"
          placeholder="Assigned To"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          required
        />
        <textarea
          className="col-span-2 border p-2 rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button
          type="submit"
          className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Assign Task
        </button>
      </form>
      {message && <p className="mt-2 text-sm text-center">{message}</p>}
    </div>
  );
};

export default TaskForm;
