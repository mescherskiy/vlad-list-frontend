import React from "react";
import TaskListItem from "../task-list-item";
import "./task-list.css";

const TaskList = ({ todos, onDeleted, onToggleDone, onEdit }) => {

    const elements = todos.map((item) => {
        const { id } = item;
        return (
            <li key={id} className="list-group-item">
                <TaskListItem {...item}
                    onDeleted={() => onDeleted(id)}
                    onToggleDone={() => onToggleDone(id)} 
                    onEdit={onEdit}/>
            </li>
        )
    });

    return (
        <ul className="list-group todo-list">
            {elements}
        </ul>
    );
}

export default TaskList;