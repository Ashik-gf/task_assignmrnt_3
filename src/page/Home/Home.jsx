import React, { useState } from 'react'
import { toast } from 'react-toastify'
import AddTaskBord from '../../components/AddTaskBord/AddTaskBord'
import ProjectHeader from '../../components/AddTaskBord/ProjectHeader'
import DoneList from '../../components/Done/DoneList'
import Header from '../../components/Navbar/Header'
import SideBar from '../../components/Navbar/SideBar'
import OnProgressList from '../../components/OnProgress/OnProgressList'
import RevisedList from '../../components/Revised/RevisedList'
import TodosList from '../../components/Todo/TodosList'
import { useDispatch } from '../../context/TaskContext'

export const initialState = [
    {
        id: 0,
        taskName: "",
        description: "",
        dueDate: '',
        category: ""
    }
]
const Home = () => {
    const [open, setOpen] = useState(false);
    const [updateTasks, setUpdateTasks] = useState(null);
    const dispatch = useDispatch()

    const handelAddModal = () => {
        setOpen(!open)
        setUpdateTasks(null)
    }
    // onSavehandel Tasks
    const handelOnSave = (newTask, isAdd) => {
        if (isAdd) {
            toast.success(`${newTask.taskName} add successfully!`);
            return dispatch({
                type: "added",
                newTask,
            })

        } else {
            toast.success(`${newTask.taskName} Update successfully!`);
            return dispatch({
                type: "update",
                newTask
            })
        }
        setUpdateTasks(null);
        setOpen(false)
    }
    const handelChange = (task) => {
        setUpdateTasks(task);
        setOpen(true)
    }

    return (
        <div className="bg-gray-900 text-white">
            {
                open ? <div className=' absolute top-0 right-0 bg-gray-300 w-full h-full'>
                    <AddTaskBord
                        onAddhandel={handelAddModal}
                        onSave={handelOnSave}
                        onUpdateTasks={updateTasks}
                    />
                </div> : <div className="flex h-screen">
                    <SideBar />
                    <main className="flex-1 overflow-y-auto overflow-x-hidden">
                        <Header />
                        {/* <!-- Project Content --> */}
                        <div className="mx-auto max-w-7xl p-6">
                            <ProjectHeader onAddhandel={handelAddModal} />
                            <div className="-mx-2 mb-6 flex flex-wrap">
                                {/* <!-- Todo --> */}

                                <TodosList
                                    onChanged={handelChange}
                                />
                                {/* <!-- On Progress --> */}
                                <OnProgressList
                                    onChanged={handelChange}
                                />
                                {/* <!-- Done --> */}
                                <DoneList
                                    onChanged={handelChange}
                                />
                                {/* <!-- Revised --> */}
                                <RevisedList
                                    onChanged={handelChange}
                                />
                            </div>
                        </div>
                    </main>
                </div>
            }
        </div>
    )
}

export default Home