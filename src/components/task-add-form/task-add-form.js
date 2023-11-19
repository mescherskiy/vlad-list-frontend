import React, { useState } from "react";

import "./task-add-form.css";

const TaskAddForm = ({ onAdded }) => {

    const [formData, setFormData] = useState({
        label: "",
    })

    const handleFormDataChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const { label } = formData

    const onSubmit = (e) => {
        e.preventDefault()
        onAdded(label)
        setFormData({
            label: "",
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
            </div>
            <button className="btn btn-outline-secondary">
                Add task
            </button>
        </form>
    )
}

export default TaskAddForm