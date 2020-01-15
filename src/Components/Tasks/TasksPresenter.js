import React from "react";
import styled from "styled-components";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const Wrapper = styled.div`
  width: 70vh;
  height: 90vh;
  padding-top: 3vh;
  background-color: white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputBox = styled.div`
  width: 70vh;
  display: flex;
  justify-content: center;
`;

const Input = styled.input`
  width: 60vh;
  height: 5vh;
  background-color: #f1f3f5;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 2rem;
  padding: 0.5rem;
  ::placeholder {
    color: #757575;
  }
`;

const Tasks = styled.div`
  width: 60vh;
  height: 80vh;
  margin: 2vh;
  padding: 2vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ced4da;
  border-radius: 4px;
  overflow-y: scroll;
`;

const Task = styled.div`
  width: 55vh;
  font-size: 5vh;
  padding: 2vh;
  margin-bottom: 5vh;
  border: 1px solid #555555;
  border-radius: 4px;
  display: flex;
  background-color: #f1f3f5;
  text-decoration: ${({done}) => (done ? `line-through` : `none`)};
`;

const Title = styled.div`
  width: 30vh;
  color: #555555;
  &:hover {
    opacity: 50%;
    cursor: pointer;
  }
`;

const Status = styled.div`
  width: 10vh;
  height: 100%;
  font-size: 0.5rem;
  font-weight: bold;
  color: #555555;
  display: flex;
  align-items: center;
`;

const Label = styled.div`
  width: 5vh;
  heigth: 100%;
  color: ${({dueClose}) => (dueClose ? `#f44336` : `#85BF30`)};
  margin: auto 2.5vh;
  display: flex;
  justify-contents: center;
  align-items: center;
  svg {
    width: 100%;
    height: 100%;
    ${({dueClose}) => dueClose && (
    `
        animation: blink 2s ease-in infinite;
        @keyframes blink {
            from, to { opacity: 1 }
            50% { opacity: 0 }
        }
    `
    )};
  }
`;

const Button = styled.div`
  width: 5vh;
  height: 100%;
  margin-left: 2.5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  svg {
    width: 100%;
    height: 100%;
  }
  &:hover {
    opacity: 50%;
    cursor: pointer;
  }
`;

const TasksPresenter = ({newTask, tasks, onSubmit, onDelete, onClick}) => {
    // Check due date is close or not
    const IsDueClose = ({dueDate}) => {
        if (!dueDate) {
            return false;
        }
        const THREE_DAYS_TO_MSECS = 259200000;
        dueDate = new Date(dueDate);
        const curDate = Date.now();
        return dueDate.getTime() - curDate < THREE_DAYS_TO_MSECS;
    };

    return (
        <Wrapper>
            <InputBox>
                <Input
                    placeholder={"New Task"}
                    {...newTask}
                    type={"text"}
                    onKeyDown={onSubmit}
                />
            </InputBox>
            <Tasks>
                {tasks.map(task => (
                    <Task key={task.id} done={task.status === "COMPLETE"}>
                        <Title onClick={() => onClick(task.id)}>{task.title}</Title>
                        <Status>{task.status || "PROGRESS"}</Status>
                        <Label dueClose={IsDueClose(task)}>
                            <AccessTimeIcon/>
                        </Label>
                        <Button onClick={() => onDelete(task.id)}>
                            <HighlightOffIcon/>
                        </Button>
                    </Task>
                ))}
            </Tasks>
        </Wrapper>
    );
};

export default TasksPresenter;
