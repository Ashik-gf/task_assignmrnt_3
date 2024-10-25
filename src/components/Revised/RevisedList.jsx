import React, { useState } from 'react'
import { useSearch, useTasks } from '../../context/TaskContext'
import Revised from './Revised'
import RevisedHeader from './RevisedHeader'


const RevisedList = ({ onChanged }) => {
    const tasks = useTasks();
    const search = useSearch();
    const filteredTasks = tasks.filter((task) => task.category === 'revised')
    const [sortDirection, setSortDirection] = useState('asc')
    const searchedTasks = search
        ? filteredTasks.filter((task) =>
            task.taskName.toLowerCase().includes(search.toLowerCase())
        )
        : filteredTasks;

    const sortedTasks = searchedTasks.slice().sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        if (sortDirection === 'asc') {
            return dateA - dateB; // Ascending
        } else {
            return dateB - dateA; // Descending
        }
    });
    const handleSort = () => {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };
    return (
        <div className="mb-4 w-full px-2 sm:w-1/2 md:w-1/4">
            <div className="rounded-lg bg-rose-500 p-4">
                <RevisedHeader handleSort={handleSort} tasks={tasks} />
                {
                    sortedTasks.length == 0 ? <div>
                        <h1>No Data Found</h1>
                    </div> : <div> {
                        sortedTasks.filter((task) => task.category === "revised").map((item) => <Revised
                            key={item.id}
                            item={item}
                            onChanged={onChanged}
                        />)
                    }</div>
                }


            </div>
        </div>
    )
}

export default RevisedList