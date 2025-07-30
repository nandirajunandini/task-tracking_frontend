import React from 'react';

const priorityColors = {
  High: 'bg-red-100 text-red-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Low: 'bg-green-100 text-green-800',
  Critical: 'bg-purple-100 text-purple-800'
};

const statusColors = {
  Pending: 'bg-gray-100 text-gray-800',
  'In Progress': 'bg-blue-100 text-blue-800',
  Completed: 'bg-green-100 text-green-800',
  'On Hold': 'bg-orange-100 text-orange-800',
  Cancelled: 'bg-red-100 text-red-800'
};

const TaskCard = ({ task, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{task.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500">Assigned To</p>
            <p className="font-medium">{task.assignedToName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Department</p>
            <p className="font-medium">{task.department}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Due Date</p>
            <p className="font-medium">{new Date(task.dueDate).toLocaleDateString()}</p>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${statusColors[task.status]}`}>
            {task.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;