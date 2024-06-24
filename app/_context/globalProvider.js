"use client";

import { createContext, useContext, useEffect, useState } from "react";
import themes from "./themes";
import toast from "react-hot-toast";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
  const { user } = useUser();
  const [currentTheme, setCurrentTheme] = useState(0);
  const [loading, setLoading] = useState(false);
  const theme = themes[currentTheme];
  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalValue,setModalValue]=useState("");
  const [modalId,setModalId]=useState("");

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const allTasks = async () => {
    setLoading(true);

    try {
      const res = await axios.get("/api/tasks");

      const sorted = res.data.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      setTasks(sorted);
      setLoading(false);
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    }
  };

  const updateTask = async (task) => {
    try {
      const res = await axios.put("/api/tasks", task);

      toast.success("Task updated successfully");
      allTasks();
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    }
  };

  const deleteTask=async (id)=>{
    try {
      const res = await axios.delete(`/api/tasks/${id}`);

      toast.success("Task Deleted successfully");
      allTasks();
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    }
  }

  const completedTasks = tasks.filter((task) => task.isCompleted === true);
  const importantTasks = tasks.filter((task) => task.isImportant === true);
  const incompleteTasks = tasks.filter((task) => task.isCompleted === false);

  useEffect(() => {
    if (user) allTasks();
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        tasks,
        setTasks,
        loading,
        allTasks,
        updateTask,
        modal,
        openModal,
        closeModal,
        deleteTask,
        modalValue,
        setModalValue,
        modalId,
        setModalId,
        completedTasks,
        importantTasks,
        incompleteTasks,
      }}
    >
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
