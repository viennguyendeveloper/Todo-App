import React, { createContext, useState, useEffect, ReactNode } from "react";
import {
  loadTasksFromLocalStorage,
  saveTasksToLocalStorage,
} from "../utils/storageUtils";
import { fetchTasks } from "../services/taskService";
import { Task } from "../types";

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  toggleTaskCompletion: (id: number) => void;
  deleteTask: (id: number) => void;
  isLoading: boolean;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const storedTasks = loadTasksFromLocalStorage();
    if (storedTasks.length) {
      setTasks(storedTasks);
    } else {
      const fetchAndSetTasks = async () => {
        setIsLoading(true);
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
        saveTasksToLocalStorage(fetchedTasks);
        setIsLoading(false);
      };
      fetchAndSetTasks();
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
      value={{ tasks, addTask, toggleTaskCompletion, deleteTask, isLoading }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
