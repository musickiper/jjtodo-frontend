import React, { useState } from "react";
import TaskPresenter from "./TaskPresenter";
import { useQuery } from "react-apollo-hooks";
import { TASK_BY_ID } from "./TaskQueries";
import { CircularProgress } from "@material-ui/core";
import useInput from "../../Hooks/useInput";

const TaskContainer = ({ match }) => {
  const { taskId } = match.params;

  const newTitle = useInput("");
  const newDesc = useInput("");
  const newCategory = useInput("");
  const [newStatus, setNewStatus] = useState("");
  const [newDueDate, setNewDueDate] = useState(undefined);

  const { data, loading, refetch } = useQuery(TASK_BY_ID, {
    variables: { taskId }
  });

  if (!loading && data && data.taskById) {
    return (
      <TaskPresenter
        data={data.taskById}
        newTitle={newTitle}
        newDesc={newDesc}
        newCategory={newCategory}
        newStatus={newStatus}
        setNewStatus={setNewStatus}
        newDueDate={newDueDate}
        setNewDueDate={setNewDueDate}
      />
    );
  } else {
    return <CircularProgress />;
  }
};

export default TaskContainer;
