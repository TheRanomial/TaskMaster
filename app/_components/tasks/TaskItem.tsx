"use client";

import { useGlobalState } from "@/app/_context/globalProvider";
import styled from "styled-components";
import formatDate from "@/app/_utils/formatDate";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTransition } from "react";
import CreateContent from "../Modals/CreateContent";
import UpdateContent from "../Modals/UpdateContent";
import Modal from "../Modals/Modal";

interface Props {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  id: string;
  isImportant: boolean;
}

export default function TaskItem({
  title,
  description,
  date,
  isCompleted,
  isImportant,
  id,
}: Props) {
  const {
    theme,
    updateTask,
    deleteTask,
    openModal,
    setModalValue,
    modalValue,
    modal,
    setModalId,
    modalId,
  } = useGlobalState();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("Do you want to delete this booking")) {
      startTransition(() => deleteTask(id));
    }
  };

  function handleModal(val: string) {
    setModalValue(val);
    setModalId(id);
    openModal();
  }

  return (
    <TaskItemStyled theme={theme}>
      {modal &&
        (modalValue === "edit" ? (
          <Modal content={<UpdateContent id={id} />} />
        ) : (
          ""
        ))}
      <h1>{title}</h1>
      <p>{description}</p>
      <p className="date">{formatDate(date)}</p>
      <div className="task-footer">
        {isCompleted ? (
          <button
            className="completed"
            onClick={() => {
              const task = {
                id,
                isCompleted: !isCompleted,
              };

              updateTask(task);
            }}
          >
            Completed
          </button>
        ) : (
          <button
            className="incomplete"
            onClick={() => {
              const task = {
                id,
                isCompleted: !isCompleted,
              };

              updateTask(task);
            }}
          >
            Incomplete
          </button>
        )}

        {isImportant && <button className="important">Important</button>}

        <button className="edit" onClick={() => handleModal("edit")}>
          <EditIcon />
        </button>
        <button className="delete" onClick={handleDelete}>
          <DeleteIcon />
        </button>
      </div>
    </TaskItemStyled>
  );
}

const TaskItemStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.borderColor2};

  height: 18rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .date {
    margin-top: auto;
  }

  > h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .task-footer {
    display: flex;
    align-items: center;
    gap: 1rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 0.5rem;
        color: ${(props) => props.theme.colorGrey2};
      }
    }

    .edit {
      margin-left: auto;
    }

    .completed,
    .incomplete {
      display: inline-block;
      padding: 0.3rem 0.8rem; /* Reduced padding */
      font-size: 0.9rem; /* Reduced font size */
      background: ${(props) => props.theme.colorDanger};
      border-radius: 30px;
    }

    .important {
      display: inline-block;
      padding: 0.3rem 0.8rem; /* Reduced padding */
      font-size: 0.9rem; /* Reduced font size */
      background: #37b7c3;
      border-radius: 30px;
    }

    .completed {
      background: ${(props) => props.theme.colorGreenDark} !important;
    }
  }
`;
