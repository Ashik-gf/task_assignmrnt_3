import React, { useState } from 'react';
import { useSearch, useTasks } from '../../context/TaskContext'; // Assuming context provides search and tasks
import Todo from './Todo';
import TodoHeader from './TodoHeader';

const TodosList = ({ onChanged }) => {
    const tasks = useTasks();
    const search = useSearch();

    const [sortDirection, setSortDirection] = useState('asc');

    const filteredTasks = tasks.filter((task) => task.category === 'todo');
    const searchedTasks = search
        ? filteredTasks.filter((task) =>
            task.taskName.toLowerCase().includes(search.toLowerCase())
        )
        : filteredTasks;

    const sortedTasks = searchedTasks.slice().sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });

    const handleSort = () => {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };

    return (
        <div className="mb-4 w-full px-2 sm:w-1/2 md:w-1/4">
            <div className="rounded-lg bg-indigo-600 p-4">
                <TodoHeader handleSort={handleSort} tasks={tasks} />
                {sortedTasks.length === 0 ? (
                    <div>
                        <h1>No Data Found</h1>
                    </div>
                ) : (
                    <div>
                        {sortedTasks.map((item) => (
                            <Todo key={item.id} item={item} onChanged={onChanged} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TodosList;