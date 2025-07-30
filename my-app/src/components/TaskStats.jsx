import React from "react";

const TaskStats = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Task Stats</h2>
      <div className="space-y-2">
        <p>✅ Completed: 10</p>
        <p>🕒 In Progress: 4</p>
        <p>📝 Pending: 2</p>
      </div>
    </div>
  );
};

export default TaskStats;
