import React from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskStats from "../components/TaskStats";

const TaskPage = () => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 space-y-4">
        <TaskForm />
        <TaskList />
      </div>
      <TaskStats />
    </div>
  );
};

export default TaskPage;
