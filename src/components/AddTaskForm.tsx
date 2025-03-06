import React, { useState } from "react";
import { PlusIcon } from "../icons/Plus";

interface AddTaskFormProps {
  addTask: (newTask: { title: string; completed: boolean }) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ addTask }) => {
  const [taskTitle, setTaskTitle] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      addTask({ title: taskTitle, completed: false });
      setTaskTitle("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center space-x-4 p-4"
    >
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Add a new task"
        className="flex-1 py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 cursor-pointer"
      >
        <PlusIcon />
      </button>
    </form>
  );
};

export default AddTaskForm;
