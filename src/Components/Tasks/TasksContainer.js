import React from 'react';
import TasksPresenter from "./TasksPresenter";
import {useMutation, useQuery} from "react-apollo-hooks";
import {CircularProgress} from "@material-ui/core";
import {ALL_MY_TASKS, CREATE_TASK} from "./TasksQueries";
import useInput from "../../Hooks/useInput";

const TasksContainer = () => {
    // States
    const newTask = useInput("");

    // GraphQL Queries
    const {data, loading, refetch} = useQuery(ALL_MY_TASKS);
    const createTask = useMutation(CREATE_TASK)[0];

    const onSubmit = async ({key,target}) => {
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
        } catch (e) {
            console.error(e);
        }
    };

    if (!loading && data && data.allMyTasks) {
        return (
            <TasksPresenter
                newTask={newTask}
                tasks={data.allMyTasks}
                onSubmit={onSubmit}
            />
        );
    } else {
        return <CircularProgress/>;
    }
};

export default TasksContainer;
