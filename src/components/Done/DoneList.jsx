import React, { useState } from 'react';
import { useSearch, useTasks } from '../../context/TaskContext';
import Done from './Done';
import DoneHeader from './DoneHeader';

const DoneList = ({ onChanged }) => {
    const tasks = useTasks();
    const search = useSearch();
    const filteredTasks = tasks.filter((task) => task.category === 'done')

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
            <div className="rounded-lg bg-teal-500 p-4">
                {/* header */}
                <DoneHeader handleSort={handleSort} tasks={tasks} />
                {
                    sortedTasks.length == 0 ? <div>
                        <h1>No data found</h1>
                    </div> : <div>
                        {
                            sortedTasks.filter((task) => task.category === "done").map((item) => <Done key={item.id}
                                item={item}
                                onChanged={onChanged}
                            />)
                        }

                    </div>
                }

            </div>
        </div>
    )
}

export default DoneList