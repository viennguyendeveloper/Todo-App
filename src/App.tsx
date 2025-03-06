import axios from "axios";
import React, { useEffect, useState } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching tasks:", error);
      });
  }, []);

  const addTask = (newTask: { title: string; completed: boolean }) => {
    const newTaskWithId = { ...newTask, id: Date.now() };
    setTasks([...tasks, newTaskWithId]);
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="flex flex-col place-items-center mx-auto m-full bg-gray-100">
      <div className="h-screen max-w-[700px] w-full flex flex-col items-center p-6">
        <h1 className="text-4xl font-semibold text-gray-800 my-6">
          Task Manager
        </h1>
        <div className="w-full max-w-xl bg-white p-2 rounded-lg shadow-lg">
          <AddTaskForm addTask={addTask} />
        </div>
        <TaskList
          tasks={tasks}
          toggleTaskCompletion={toggleTaskCompletion}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
};

export default App;
