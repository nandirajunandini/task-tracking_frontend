import React from "react";

const TaskForm = () => {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-lg font-semibold mb-2">Assign New Task</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="border p-2 rounded" placeholder="Task Title" />
        <input className="border p-2 rounded" placeholder="Assigned To" />
        <textarea className="col-span-2 border p-2 rounded" placeholder="Description"></textarea>
        <button className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Assign Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
