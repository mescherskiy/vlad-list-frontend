import React, { useState } from "react";

import "./task-add-form.css";

const TaskAddForm = ({ onAdded }) => {

    const [formData, setFormData] = useState({
        label: "",
        description: ""
    })

    const handleFormDataChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const { label, description } = formData

    const onSubmit = (e) => {
        e.preventDefault()
        onAdded(label, description)
        setFormData({
            label: "",
            description: ""
        })
    }

    return (
        <form className="item-add-form d-flex mb-3"
            onSubmit={onSubmit}>
            <div className="list-group w-100">
                <input type="text"
                    className="list-group-item"
                    onChange={handleFormDataChange}
                    placeholder="Label"
                    value={label}
                    name="label"
                />

                <input type="text"
                    className="list-group-item"
                    onChange={handleFormDataChange}
                    placeholder="Description"
                    value={description}
                    name="description"
                />
            </div>
            <button className="btn btn-outline-secondary">
                Add task
            </button>
        </form>
    )
}

export default TaskAddForm