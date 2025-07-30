import React, { useEffect, useState } from "react";

const TaskStats = () => {
  const [stats, setStats] = useState([]);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/task-stats`);
      if (!res.ok) throw new Error("Failed to fetch task stats");
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("❌ Error fetching stats:", err);
      setError("Failed to load stats.");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Task Stats</h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="space-y-2">
          {stats.map((stat, index) => (
            <p key={index}>
              {getStatusEmoji(stat.status)} {stat.status}: {stat.count}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

const getStatusEmoji = (status) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "✅";
    case "in progress":
      return "🕒";
    case "pending":
      return "📝";
    default:
      return "📌";
  }
};

export default TaskStats;
