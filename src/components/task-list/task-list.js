import React from "react";
import TaskListItem from "../task-list-item";
import "./task-list.css";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";

const TaskList = ({ todos, setTodos, onUpdate, onDeleted, onToggleDone, onToggleImportant, onEdit }) => {

    const handleOnDragEnd = (result) => {
        if (!result.destination) return

        const tasks = Array.from(todos)
        const [reorderedTask] = tasks.splice(result.source.index, 1)
        tasks.splice(result.destination.index, 0, reorderedTask)
        tasks.forEach((task, index) => {
            task.orderIndex = index
        })
        setTodos(tasks);
        onUpdate(tasks)
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="todos">
                {(provided) => (
                    <ul className="p-0 todo-list" {...provided.droppableProps} ref={provided.innerRef}>
                        {todos.map((item, index) => {
                            const { id } = item;
                            return (
                                <Draggable key={id} draggableId={item.id + item.label + item.description} index={index}>
                                    {(provided, snapshot) => (
                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={`list-group-item ${snapshot.isDragging ? "dragging" : ""}`}>
                                            <TaskListItem {...item}
                                                onDeleted={() => onDeleted(id)}
                                                onToggleDone={() => onToggleDone(id)}
                                                onToggleImportant={() => onToggleImportant(id)}
                                                onEdit={onEdit} />
                                        </li>
                                    )}
                                </Draggable>
                            )
                        })}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>

    );
}

export default TaskList;