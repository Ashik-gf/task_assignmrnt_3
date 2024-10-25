

export default function taskReducers(tasks, action) {
    console.log(tasks);
    switch (action.type) {
        case "added": {
            return [
                ...tasks,
                {
                    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
                    taskName: action.newTask.taskName,
                    description: action.newTask.description,
                    dueDate: action.newTask.dueDate,
                    category: action.newTask.category
                }
            ]
        }
        case "deleted":
            {
                return tasks.filter((task) => task.id !== action.id)
            }
        case "update": {
            return tasks.map((task) => {
                if (task.id === action.newTask.id) {
                    return action.newTask
                } else {
                    return task;
                }
            })

        }
        default: {
            throw Error(`No action matched with ${action.type}`);
        }


    }
}