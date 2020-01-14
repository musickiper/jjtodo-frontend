import React from "react";
import TasksPresenter from "./TasksPresenter";
import { useMutation, useQuery } from "react-apollo-hooks";
import { CircularProgress } from "@material-ui/core";
import { ALL_MY_TASKS, CREATE_TASK, DELETE_TASK } from "./TasksQueries";
import useInput from "../../Hooks/useInput";
import { toast } from "react-toastify";

const TasksContainer = ({ history }) => {
  // States
  const newTask = useInput("");

  // GraphQL Queries
  const { data, loading, refetch } = useQuery(ALL_MY_TASKS);
  const createTask = useMutation(CREATE_TASK)[0];
  const deleteTask = useMutation(DELETE_TASK)[0];

  const onSubmit = async ({ key, target }) => {
    if (key !== "Enter") {
      return;
    }
    try {
      // Create new task
      await createTask({
        variables: { title: newTask.value }
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
        variables: { taskId: taskId }
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

  if (!loading && data && data.allMyTasks) {
    return (
      <TasksPresenter
        newTask={newTask}
        tasks={data.allMyTasks}
        onSubmit={onSubmit}
        onDelete={onDelete}
        onClick={onClick}
      />
    );
  } else {
    return <CircularProgress />;
  }
};

export default TasksContainer;
