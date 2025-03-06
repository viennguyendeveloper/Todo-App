import axios from 'axios';
import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  toggleTaskCompletion: (id: number) => void;
  deleteTask: (id: number) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const saveTasksToLocalStorage = (tasks: Task[]) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      axios
        .get("https://jsonplaceholder.typicode.com/todos?_limit=5")
        .then((response) => {
          setTasks(response.data);
          saveTasksToLocalStorage(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching tasks:", error);
        });
    }
  }, []);

  const addTask = (newTask: Task) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const toggleTaskCompletion = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, toggleTaskCompletion, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
