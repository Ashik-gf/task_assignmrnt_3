import React, { useState } from 'react';
import { toast } from 'react-toastify';


const AddTaskBord = ({ onAddhandel, onSave, onUpdateTasks, }) => {

    const [task, setTask] = useState(onUpdateTasks || {
        taskName: "",
        description: "",
        dueDate: "",
        category: "",
    })
    const [messages, setMessages] = useState({});
    // const [isAdd, setIsAdd] = useState(Object.is(onUpdateTasks, null))
    const [isAdd] = useState(!onUpdateTasks)
    const handelChange = (e) => {
        const name = e.target.name;
        let value = e.target.value
        setTask({
            ...task,
            [name]: value,
        }
        )
    }
    const handelSubmit = () => {
        const hasEmptyFields = !Object.values(task).every((field) => field);

        if (hasEmptyFields) {
            // Find the first empty field and set its corresponding error message
            const emptyField = Object.keys(task).find((key) => !task[key]);
            setMessages({ [emptyField]: emptyField });
            toast.success(messages.taskName || messages.category || messages.dueDate || messages.description || "Required fields are missing");
        } else {
            // Clear error messages if all fields are filled
            setMessages({});
            // Proceed with saving the task
            onSave(task, isAdd);
            setTask({
                taskName: "",
                description: "",
                dueDate: "",
                category: "",
            });
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 bg-opacity-25 p-4 text-white">

            <div className="w-full max-w-md rounded-lg bg-gray-800 shadow-xl">
                <div className="p-6">
                    <h2 className="mb-6 text-2xl font-bold text-green-400">Create Task</h2>
                    <form >
                        <div className="mb-4">
                            <label
                                htmlFor="taskName"
                                className="mb-1 block text-sm font-medium text-gray-300"
                            >
                                Task Name
                            </label
                            >
                            <input
                                type="text"
                                id="taskName"
                                name="taskName"
                                value={task.taskName}
                                onChange={handelChange}
                                required
                                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="description"
                                className="mb-1 block text-sm font-medium text-gray-300"
                            >Description</label
                            >
                            <textarea
                                id="description"
                                name="description"
                                value={task.description}
                                onChange={handelChange}
                                rows="3"
                                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="dueDate"
                                className="mb-1 block text-sm font-medium text-gray-300"
                            >Due Date</label
                            >
                            <input
                                type="date"
                                id="dueDate"
                                name="dueDate"
                                required
                                value={task.dueDate}
                                onChange={handelChange}
                                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="category"
                                className="mb-1 block text-sm font-medium text-gray-300"
                            >Category</label
                            >
                            <select
                                id="category"
                                name="category"
                                required
                                value={task.category}
                                onChange={handelChange}
                                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option disabled value="">Category</option>
                                <option value="todo">To-Do</option>
                                <option value="inprogress">On Progress</option>
                                <option value="done">Done</option>
                                <option value="revised">Revised</option>
                            </select>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={onAddhandel}
                                type="button"
                                className="rounded-md border border-gray-600 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handelSubmit}
                                type="button"
                                className="rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                {
                                    isAdd ? "Create Task" : "Update"
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddTaskBord