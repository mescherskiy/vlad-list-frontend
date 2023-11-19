import React, { useState, useEffect } from "react";
import $ from "jquery";
import TaskList from "../task-list";
import TaskStatusFilter from "../task-status-filter";
import TaskAddForm from "../task-add-form";

import "./app.css";

const App = () => {

    const [todoData, setTodoData] = useState([])

    const [filter, setFilter] = useState("All")

    useEffect(() => {
        fetchTasks()
    }, [])

    const baseUrl = "http://localhost:8080/api/tasks"

    const fetchTasks = () => {
        $.ajax({
            url: baseUrl,
            method: "GET",
            success: (data) => {
                setTodoData(data)
            },
            error: (error) => {
                console.error("Error fetching tasks: ", error)
            }
        })
    }

    const addNewTask = (label) => {
        const newTask = {
            label,
            timestamp: new Date().toLocaleString()
        }
        
        $.ajax({
            url: baseUrl + "/create",
            method: "POST",
            data: JSON.stringify(newTask),
            contentType: "application/json",
            success: () => {
                fetchTasks()
            },
            error: (error) => {
                console.error("Error creating task: ", error)
            }
        })
    }

    const editTask = (id, label) => {
        
        const task = {
            label,
            timestamp: new Date().toLocaleString()
        }

        const prevData = todoData

        setTodoData((prevTodoData) => {
            return prevTodoData.map((task) => 
            task.id === id
                ? {
                    ...task,
                    label: task.label,
                    timestamp: task.timestamp
                } : task)
        })

        $.ajax({
            url: `${baseUrl}/update/${id}`,
            method: "PUT",
            data: JSON.stringify(task),
            contentType: "application/json",
            success: () => {
                fetchTasks()
            },
            error: (error) => {
                setTodoData(prevData)
                console.error("Error updating task: ", error)
            }
        })
    }

    const updateTasks = (tasks) => {

        $.ajax({
            url: baseUrl + "/update",
            method: "PUT",
            data: JSON.stringify(tasks),
            contentType: "application/json",
            success: () => {
                setTodoData(tasks)
            },
            error: (error) => {
                console.log("Error updating task order on the server: ", error)
            }
        })
    }

    const deleteTask = (id) => {
        $.ajax({
            url: `${baseUrl}/delete/${id}`,
            method: "DELETE",
            success: () => {
                fetchTasks()
            },
            error: (error) => {
                console.error("Error deleting task: ", error)
            }
        })
    }

    const toggleProperty = (id, propName) => {
        const task = todoData.find(el => el.id === id)
        const updatedTask = { ...task, [propName]: !task[propName] }

        $.ajax({
            url: `${baseUrl}/update/${id}`,
            method: "PUT",
            data: JSON.stringify(updatedTask),
            contentType: "application/json",
            success: () => {
                fetchTasks()
            },
            error: (error) => {
                console.error("Error updating task by property: ", error)
            }
        })
    }

    const onToggleDone = (id) => {
        toggleProperty(id, "done")
    }

    const onToggleImportant = (id) => {
        toggleProperty(id, "important")
    }

    const filterTasks = (tasks, filter) => {
        switch (filter) {
            case "All":
                return tasks
            case "Active":
                return tasks.filter((task) => !task.done)
            case "Done":
                return tasks.filter((task) => task.done)
            default:
                return tasks
        }
    }

    const doneCount = todoData?.filter((el) => el.done).length;
    const todoCount = todoData?.length - doneCount;

    return (
        <div className="todo-app">
            <h1>ToDo List</h1>
            <div className="top-panel d-flex justify-content-between">
                <div>{todoCount} more to do, {doneCount} done</div>
                <TaskStatusFilter onFilterChange={setFilter} activeFilter={filter}/>
            </div>
            <TaskAddForm onAdded={addNewTask} />
            <TaskList
                todos={filterTasks(todoData, filter)}
                setTodos={setTodoData}
                onDeleted={deleteTask}
                onToggleDone={onToggleDone}
                onToggleImportant={onToggleImportant}
                onEdit={editTask} 
                onUpdate={updateTasks}/>

        </div>
    );
}

export default App;