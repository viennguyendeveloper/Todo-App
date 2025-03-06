import React from "react";
import TaskItem from "./TaskItem";
import { useTasks } from "../context/useTasks";

const TaskList: React.FC = () => {
  const { tasks, isLoading } = useTasks();

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center text-gray-500 mt-6">Loading...</div>;
    }

    if (!tasks.length) {
      return (
        <li className="text-center text-gray-500 mt-6">
          Nothing here yet, add your first task!
        </li>
      );
    }

    return tasks.map((task) => <TaskItem key={task.id} task={task} />);
  };

  return (
    <ul className="flex-1 h-full overflow-auto space-y-4 w-full max-w-xl mt-6 bg-white p-6 rounded-lg shadow-lg custom-scrollbar">
      {renderContent()}
    </ul>
  );
};

export default TaskList;
