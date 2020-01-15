import React, {useState} from "react";
import TasksPresenter from "./TasksPresenter";
import {useMutation, useQuery} from "react-apollo-hooks";
import {CircularProgress} from "@material-ui/core";
import {ALL_MY_TASKS_AND_ALL_CATEGORIES, CREATE_TASK, DELETE_TASK} from "./TasksQueries";
import useInput from "../../Hooks/useInput";
import {toast} from "react-toastify";

const TasksContainer = ({history}) => {
    // States
    const [term, setTerm] = useState("");
    const [status, setStatus] = useState("");
    const [category, setCategory] = useState("");
    const newTask = useInput("");

    // GraphQL Queries
    const {data, loading, refetch} = useQuery(ALL_MY_TASKS_AND_ALL_CATEGORIES);
    const createTask = useMutation(CREATE_TASK)[0];
    const deleteTask = useMutation(DELETE_TASK)[0];

    const onSubmit = async ({key, target}) => {
        if (key !== "Enter") {
            return;
        }
        try {
            // Create new task
            await createTask({
                variables: {title: newTask.value}
            });
            await refetch(); // Trigger refetching data from server
            target.value = ""; // Clean input box
            toast.success("Create task succeed");
        } catch (e) {
            console.error(e);
            toast.error("Create task failed");
        }
    };

    const onDelete = async taskId => {
        try {
            await deleteTask({
                variables: {taskId: taskId}
            });
            await refetch(); // Trigger refetching data from server
            toast.success("Delete task succeed");
        } catch (e) {
            console.error(e);
            toast.error("Delete task failed");
        }
    };

    const onClick = taskId => {
        history.push(`/task/${taskId}`);
    };

    const filteringTasks = (tasks) => {
        // Filtered by search
        tasks = tasks.filter(task => task.title.startsWith(term) || task.title.endsWith(term));

        // Filtered by status
        if (status !== "") {
            tasks = tasks.filter(task => task.status === status);
        }

        // Filtered by category
        if (category !== "") {
            tasks = tasks.filter(task => task.category.text === category);
        }
        return tasks;
    };

    if (!loading && data && data.allMyTasks) {
        const tasks = data.allMyTasks;
        const categories = data.allCategories;

        return (
            <TasksPresenter
                term={term}
                setTerm={setTerm}
                setStatus={setStatus}
                newTask={newTask}
                tasks={filteringTasks(tasks)}
                categories={categories}
                setCategory={setCategory}
                onSubmit={onSubmit}
                onDelete={onDelete}
                onClick={onClick}
            />
        );
    } else {
        return <CircularProgress/>;
    }
};

export default TasksContainer;
