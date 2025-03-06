import React from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import { TaskProvider } from "./context/TaskContext";

const App: React.FC = () => {
  return (
    <TaskProvider>
      <div className="flex flex-col place-items-center mx-auto m-full bg-gray-100">
        <div className="h-screen max-w-[700px] w-full flex flex-col items-center p-6">
          <h1 className="text-4xl font-semibold text-gray-800 my-6">
            Task Manager
          </h1>
          <AddTaskForm />
          <TaskList />
        </div>
      </div>
    </TaskProvider>
  );
};

export default App;
