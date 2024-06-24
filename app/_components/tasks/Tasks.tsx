"use client";

import { useGlobalState } from "@/app/_context/globalProvider";
import styled from "styled-components";
import CreateContent from "../Modals/CreateContent";
import TaskItem from "./TaskItem";
import { Key, useState } from "react";
import Button from "../Button/Button";
import Modal from "../Modals/Modal";
import UpdateContent from "../Modals/UpdateContent";
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface Props {
  Tasktitle: string;
}

export default function Tasks({ Tasktitle }: Props) {
  const { theme, tasks, openModal, modal, modalValue, setModalValue } =
    useGlobalState();

  function handleModal(val: string) {
    setModalValue(val);
    openModal();
  }

  return (
    <TaskStyled theme={theme}>
      {modal &&
        (modalValue === "add" ? <Modal content={<CreateContent />} /> : "")}
      <h1>{Tasktitle}</h1>

      <div className="tasks grid">
        {tasks.map(
          (task: {
            id: any;
            title: any;
            description: any;
            date: any;
            isCompleted: any;
            isImportant: any;
          }) => (
            <TaskItem
              key={task.id}
              title={task.title}
              description={task.description}
              date={task.date}
              isCompleted={task.isCompleted}
              isImportant={task.isImportant}
              id={task.id}
            />
          )
        )}
        <button className="create-task" onClick={() => handleModal("add")}>
          <AddCircleIcon/>
        </button>
      </div>
    </TaskStyled>
  );
}

const TaskStyled = styled.main`
  position: relative;
  padding: 2rem;
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  .btn-rounded {
    position: fixed;
    top: 4.9rem;
    right: 5.1rem;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;

    background-color: ${(props) => props.theme.colorBg};
    border: 2px solid ${(props) => props.theme.borderColor2};
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.3);
    color: ${(props) => props.theme.colorGrey2};
    font-size: 1.4rem;

    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 768px) {
      top: 3rem;
      right: 3.5rem;
    }
  }

  .tasks {
    margin: 2rem 0;
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background-color: ${(props) => props.theme.colorPrimaryGreen};
      border-radius: 0.5rem;
    }
  }

  .create-task {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    height: 18rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    transition: all 0.3s ease;

    i {
      font-size: 1.5rem;
      margin-right: 0.2rem;
    }

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;
