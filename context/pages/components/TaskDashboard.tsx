import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("https://your-backend.com");

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    socket.on("taskUpdate", (updatedTasks) => {
      setTasks(updatedTasks);
    });

    return () => {
      socket.off("taskUpdate");
    };
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Task Dashboard</h1>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className="border p-2 my-2">
            {task.name} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskDashboard;
