import React, {useState} from "react";
import TaskPresenter from "./TaskPresenter";
import {useMutation, useQuery} from "react-apollo-hooks";
import {CREATE_SUB_TASK, DELETE_SUB_TASK, TASK_BY_ID, UPDATE_SUB_TASK, UPDATE_TASK} from "./TaskQueries";
import {CircularProgress} from "@material-ui/core";
import {toast} from "react-toastify";

const TaskContainer = ({match, history}) => {
    const {taskId} = match.params;

    const [newTitle, setNewTitle] = useState(undefined);
    const [newDesc, setNewDesc] = useState(undefined);
    const [newCategory, setNewCategory] = useState(undefined);
    const [newStatus, setNewStatus] = useState(undefined);
    const [newDueDate, setNewDueDate] = useState(undefined);
    const [newSubTask, setNewSubTask] = useState(undefined);

    const {data, loading, refetch} = useQuery(TASK_BY_ID, {
        variables: {taskId}
    });
    const updateTask = useMutation(UPDATE_TASK)[0];
    const createSubTask = useMutation(CREATE_SUB_TASK)[0];
    const updateSubTask = useMutation(UPDATE_SUB_TASK)[0];
    const deleteSubTask = useMutation(DELETE_SUB_TASK)[0];

    const onCreateSubTask = async (e) => {
        if (e.key !== "Enter") {
            return;
        }
        try {
            await createSubTask({
                variables: {
                    text: newSubTask,
                    parentTaskId: taskId
                }
            });
            await refetch();
            await setNewSubTask("");
        } catch (e) {
            console.error(e);
            toast.error("Creating sub task failed");
        }
    };

    const onClickSubTask = async (id, done) => {
        try {
            await updateSubTask({
                variables: {
                    subTaskId: id,
                    done: done
                }
            });
            await refetch();
        } catch (e) {
            console.error(e);
            toast.error("Updating sub task failed");
        }
    };

    const onDeleteSubTask = async (id) => {
        try {
            await deleteSubTask({
                variables: {
                    subTaskId: id
                }
            });
            await refetch();
        } catch (e) {
            console.error(e);
            toast.error("Deleting sub task failed");
        }
    };

    const onUpdateTask = async (id) => {
        try {
            await updateTask({
                variables: {
                    taskId: id,
                    title: newTitle,
                    desc: newDesc,
                    dueDate: newDueDate,
                    status: newStatus,
                    categoryText: newCategory
                }
            });
            await history.push("/");
            await window.location.reload();
        } catch (e) {
            console.error(e);
            toast.error("Updating task failed");
        }
    };

    if (!loading && data && data.taskById) {
        return (
            <TaskPresenter
                data={data.taskById}
                newTitle={newTitle}
                setNewTitle={setNewTitle}
                newDesc={newDesc}
                setNewDesc={setNewDesc}
                newCategory={newCategory}
                setNewCategory={setNewCategory}
                newStatus={newStatus}
                setNewStatus={setNewStatus}
                newDueDate={newDueDate}
                setNewDueDate={setNewDueDate}
                newSubTask={newSubTask}
                setNewSubTask={setNewSubTask}
                onCreateSubTask={onCreateSubTask}
                onClickSubTask={onClickSubTask}
                onDeleteSubTask={onDeleteSubTask}
                onUpdateTask={onUpdateTask}
            />
        );
    } else {
        return <CircularProgress/>;
    }
};

export default TaskContainer;
