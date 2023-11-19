import React, { useState } from "react";
import "./task-list-item.css";

const TaskListItem = ({ id, label, onDeleted, onToggleDone, onToggleImportant, onEdit, done, important, timestamp }) => {

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    label: label,
  })

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = () => {
    onEdit(id, formData.label)
    setIsEditing(false)
  }

  const handleCancelClick = () => {
    setIsEditing(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  return (
    <div className={`todo-list-item d-flex justify-content-between ${done ? "done" : ""} ${important ? "important" : ""}`}>
      <div className="todo-list-item-info w-100 d-flex flex-column justify-content-evenly" onClick={isEditing ? null : onToggleDone}>
        {isEditing ? (
          <>
            <input
              className="todo-list-item-label"
              type="text"
              name="label"
              value={formData.label}
              onChange={handleInputChange}
            />
          </>
        ) : (
          <>
            <p
              className="todo-list-item-label">
              {label}
            </p>
            <p className="todo-list-item-timestamp">{timestamp}</p>
          </>
        )}

      </div>
      <div className="todo-list-item-buttons">
        {isEditing ? (
          <>
            <button type="button"
              className="btn btn-outline-success btn-sm float-end"
              onClick={handleSaveClick}
            >
              <i className="fa-solid fa-check"></i>
            </button>
            <button type="button"
              className="btn btn-outline-danger btn-sm float-end"
              onClick={handleCancelClick}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </>
        ) : (
          <>
            <button type="button"
              className="btn btn-outline-warning btn-sm float-end"
              onClick={onToggleImportant}>
              <i className="fa-solid fa-exclamation"></i>
            </button>
            <button type="button"
              className="btn btn-outline-success btn-sm float-end"
              onClick={handleEditClick}
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </button>
            <button type="button"
              className="btn btn-outline-danger btn-sm float-end"
              onClick={onDeleted}>
              <i className="fa-regular fa-trash-can" />
            </button>
          </>
        )}
      </div>
    </div>
  );

}

export default TaskListItem