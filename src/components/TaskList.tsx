import React from "react";
import TaskItem from "./TaskItem";
import { useTasks } from "../context/useTasks";

const TaskList: React.FC = () => {
  const { tasks } = useTasks();

  return (
    <ul className="flex-1 h-full overflow-auto space-y-4 w-full max-w-xl mt-6 bg-white p-6 rounded-lg shadow-lg custom-scrollbar">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};

export default TaskList;
