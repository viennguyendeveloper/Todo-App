import React from 'react';
import TaskItem from './TaskItem';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  toggleTaskCompletion: (id: number) => void;
  deleteTask: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, toggleTaskCompletion, deleteTask }) => {
  return (
    <ul className='flex-1 h-full overflow-auto space-y-4 w-full max-w-xl mt-6 bg-white p-6 rounded-lg shadow-lg custom-scrollbar'>
      {tasks.map(task => (
        <TaskItem
          key={task.id} 
          task={task} 
          toggleTaskCompletion={toggleTaskCompletion} 
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
