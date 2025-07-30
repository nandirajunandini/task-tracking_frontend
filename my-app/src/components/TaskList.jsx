import React from "react";

const tasks = [
  { id: 1, title: "", assignedTo: "", status: "" },
  { id: 2, title: "", assignedTo: "", status: "" },
];

const TaskList = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Tasks List</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">Title</th>
            <th>Assigned To</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-t">
              <td className="py-2">{task.title}</td>
              <td>{task.assignedTo}</td>
              <td>{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
