import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiChevronLeft, FiCalendar, FiUser, FiClock, FiMessageSquare, FiPaperclip, FiSend } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import tasks from '../data/tasks'; // Temporary mock data

const TaskDetailPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [task, setTask] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [attachments, setAttachments] = useState([]);

  // Simulate API fetch
  useEffect(() => {
    const fetchTask = async () => {
      setIsLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        const foundTask = tasks.find((t) => t.id === parseInt(id));
        setTask(foundTask);
        setComments(foundTask?.comments || []);
      } catch (error) {
        console.error('Error fetching task:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    setIsSubmittingComment(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newComment = {
        id: Date.now(),
        userName: 'Current User',
        userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        text: commentText,
        date: new Date().toISOString(),
      };

      setComments([newComment, ...comments]);
      setCommentText('');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newAttachments = files.map(file => ({
        id: Date.now() + Math.random(),
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        type: file.type.split('/')[1] || 'file',
      }));
      setAttachments([...attachments, ...newAttachments]);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-blue-200 rounded-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-48"></div>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-3">Task Not Found</h1>
          <p className="text-gray-600 mb-5">
            The task you're looking for doesn't exist or may have been removed.
          </p>
          <Link
            to="/tasks"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <FiChevronLeft className="mr-2" />
            Back to Tasks
          </Link>
        </div>
      </div>
    );
  }

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'Completed';

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6">
          <Link
            to="/tasks"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <FiChevronLeft className="mr-1" />
            Back to Tasks
          </Link>
        </div>

        {/* Main Task Card */}
        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          {/* Task Header */}
          <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-gray-50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center space-x-3">
                  <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
                  <Badge label={task.priority} type="priority" />
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {task.department} Department • Created {formatDistanceToNow(new Date(task.createdAt))} ago
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <StatusBadge status={task.status} />
              </div>
            </div>
          </div>

          {/* Task Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Left Column - Main Task Info */}
            <div className="lg:col-span-2 p-6 border-r border-gray-200">
              {/* Description */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <FiMessageSquare className="mr-2 text-blue-500" />
                  Description
                </h2>
                <div className="prose max-w-none text-gray-700 bg-gray-50 p-4 rounded-lg">
                  {task.description}
                </div>
              </div>

              {/* Task Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <DetailItem
                  icon={<FiUser className="text-blue-500" />}
                  title="Assigned To"
                  value={task.assignedToName}
                  subtext={task.assignedToRole}
                />
                <DetailItem
                  icon={<FiUser className="text-blue-500" />}
                  title="Assigned By"
                  value={task.assignedByName}
                  subtext={task.assignedByRole}
                />
                <DetailItem
                  icon={<FiClock className="text-blue-500" />}
                  title="Created At"
                  value={new Date(task.createdAt).toLocaleDateString()}
                  subtext={formatDistanceToNow(new Date(task.createdAt)) + ' ago'}
                />
                <DetailItem
                  icon={<FiCalendar className={isOverdue ? 'text-red-500' : 'text-blue-500'} />}
                  title="Due Date"
                  value={new Date(task.dueDate).toLocaleDateString()}
                  subtext={
                    isOverdue ? (
                      <span className="text-red-500">Overdue by {formatDistanceToNow(new Date(task.dueDate))}</span>
                    ) : (
                      formatDistanceToNow(new Date(task.dueDate)) + ' remaining'
                    )
                  }
                />
              </div>

              {/* Attachments */}
              {attachments.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-800 mb-3">Attachments</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {attachments.map((file) => (
                      <div key={file.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
                        <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-xs font-medium text-blue-800">{file.type}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                          <p className="text-xs text-gray-500">{file.size}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Comments */}
            <div className="p-6">
              <div className="sticky top-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Discussion</h2>

                {/* Comment Form */}
                <div className="mb-6">
                  <div className="flex items-start space-x-3">
                    <img
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      alt="User"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        rows={3}
                        placeholder="Add a comment..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="flex justify-between items-center mt-2">
                        <label className="cursor-pointer text-gray-500 hover:text-gray-700">
                          <input
                            type="file"
                            className="hidden"
                            multiple
                            onChange={handleFileUpload}
                          />
                          <FiPaperclip className="inline mr-1" />
                          <span className="text-sm">Attach files</span>
                        </label>
                        <button
                          onClick={handleAddComment}
                          disabled={!commentText.trim() || isSubmittingComment}
                          className={`flex items-center px-4 py-2 rounded-lg ${
                            commentText.trim()
                              ? 'bg-blue-600 hover:bg-blue-700 text-white'
                              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          } transition`}
                        >
                          {isSubmittingComment ? (
                            'Posting...'
                          ) : (
                            <>
                              <FiSend className="mr-2" />
                              Post
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.length > 0 ? (
                    comments.map((comment) => (
                      <div key={comment.id} className="flex space-x-3">
                        <img
                          src={comment.userAvatar || 'https://randomuser.me/api/portraits/women/44.jpg'}
                          alt={comment.userName}
                          className="w-10 h-10 rounded-full flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-gray-800">{comment.userName}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {formatDistanceToNow(new Date(comment.date))} ago
                                </p>
                              </div>
                              <button className="text-gray-400 hover:text-gray-600">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                </svg>
                              </button>
                            </div>
                            <p className="text-gray-700 mt-2">{comment.text}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-gray-400 mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 mx-auto"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-500">No comments yet. Start the discussion!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const DetailItem = ({ icon, title, value, subtext }) => (
  <div className="flex items-start space-x-3">
    <div className="flex-shrink-0 mt-1">{icon}</div>
    <div>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-lg font-semibold text-gray-800">{value}</p>
      {subtext && <p className="text-sm text-gray-500 mt-1">{subtext}</p>}
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'Pending':
        return 'bg-gray-100 text-gray-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'On Hold':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles()}`}
    >
      {status}
    </span>
  );
};

const Badge = ({ label, type }) => {
  const getPriorityStyles = () => {
    switch (label) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      case 'Critical':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        type === 'priority' ? getPriorityStyles() : ''
      }`}
    >
      {label}
    </span>
  );
};

export default TaskDetailPage;