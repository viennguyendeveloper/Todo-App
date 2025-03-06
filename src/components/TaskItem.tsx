import React from "react";
import { useTasks } from "../context/useTasks";
import { CheckIcon } from "../icons/Check";
import { CircleIcon } from "../icons/Circle";
import { TrashIcon } from "../icons/Trash";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTaskCompletion, deleteTask } = useTasks();

  return (
    <li
      className={`flex items-center justify-between p-4 mb-2 rounded-lg shadow-lg 
        ${
          task.completed
            ? "bg-green-100 text-green-700 line-through"
            : "bg-white text-gray-800"
        }
        hover:bg-green-50 hover:scale-105 transform transition-transform duration-700 ease-in-out`}
        style={{ animation: "fadeIn 0.3s forwards" }}
    >
      <span
        onClick={() => toggleTaskCompletion(task.id)}
        className="cursor-pointer flex items-center space-x-2"
      >
        <div className="w-6 h-6">
          {task.completed ? <CheckIcon /> : <CircleIcon />}
        </div>
        <span>{task.title}</span>
      </span>
      <div className="flex space-x-2">
        <button
          onClick={() => deleteTask(task.id)}
          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200 cursor-pointer"
        >
          <TrashIcon />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
