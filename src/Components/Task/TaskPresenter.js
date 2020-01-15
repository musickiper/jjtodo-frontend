import React, {useEffect} from "react";
import styled from "styled-components";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const Wrapper = styled.div`
  width: 140vh;
  height: 90vh;
  padding-top: 3vh;
  background-color: white;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  align-items: center;
  border: 1px solid #f1f3f5;
  padding: 3vh;
  overflow-y: scroll;
  div {
    margin-bottom: 2vh;
  }
`;

const Input = styled.div`
  width: 60vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  span {
    margin-right: 2vh;
    font-size: 1rem;
    font-weight: bold;
  }
  input {
    width: 100%;
    padding: 1vh;
    border-radius: 4px;
    border: 1px solid #555555;
  }
  textarea {
    border-radius: 4px;
    border: 1px solid #555555;
  }
  div {
    display: flex;
    flex-direction: column;
    width: 25vh;
    select {
      border: 1px solid #555555;
      padding: 1vh;
    }
    span {
      margin-bottom: 1vh;
    }
  }
`;

const Calendar = styled.div`
  text-align: center;
  font-weight: bold;
`;

const SubTasks = styled.div`
  width: 60vh;
  height: 30vh;
  border: 1px solid #555555;
  border-radius: 4px;
  display: flex;
  padding: 2vh;
  align-items: center;
  flex-direction: column;
  overflow-y: scroll;
`;

const SubTask = styled.div`
  width: 50vh;
  border: 1px solid #555555;
  border-radius: 4px;
  padding: 2vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: ${({done}) => done ? "line-through" : "none"};
  &:hover {
    background-color: #F1F3F5;
  }
`;

const SubTaskText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor:pointer;
  }
`;

const SubTaskButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor:pointer;
  }
`;

const Button = styled.div`
  width: 50%;
  border-radius: 4px;
  padding: 2vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3797F0;
  color: white;
  &:hover {
    cursor:pointer;
    opacity: 50%;
  }
`;

const STATUS_OPTIONS = ["PROGRESS", "PENDING", "COMPLETE"];

const TaskPresenter = ({
                           data: {id, title, desc, dueDate, status, category, subTasks, files},
                           newTitle,
                           setNewTitle,
                           newDesc,
                           setNewDesc,
                           newCategory,
                           setNewCategory,
                           newStatus,
                           setNewStatus,
                           newDueDate,
                           setNewDueDate,
                           newSubTask,
                           setNewSubTask,
                           onCreateSubTask,
                           onClickSubTask,
                           onDeleteSubTask,
                           onUpdateTask
                       }) => {
    useEffect(() => {
        // Initialize states with data from db
        setNewTitle(title);
        setNewDesc(desc);
        setNewCategory(category ? category.text : undefined);
        setNewStatus(status);
        setNewDueDate(new Date(dueDate));
    }, [
        title,
        setNewTitle,
        desc,
        setNewDesc,
        category,
        setNewCategory,
        status,
        setNewStatus,
        dueDate,
        setNewDueDate
    ]);

    return (
        <Wrapper>
            <Form>
                <Input>
                    <span>Title</span>
                    <input type={"text"} value={newTitle || ""} onChange={e => setNewTitle(e.target.value)}/>
                </Input>
                <Input>
                    <span>Description</span>
                    <textarea
                        rows="5"
                        cols="100"
                        value={newDesc || ""}
                        onChange={e => setNewDesc(e.target.value)}
                    />
                </Input>
                <Input>
                    <div>
                        <span>Status</span>
                        <select
                            value={newStatus ? newStatus : "PROGRESS"}
                            onChange={e => setNewStatus(e.target.value)}
                        >
                            {STATUS_OPTIONS.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <span>Category</span>
                        <input
                            value={newCategory || ""}
                            onChange={e => setNewCategory(e.target.value)}
                        />
                    </div>
                </Input>
                <Calendar>
                    <span>Due Date</span>
                    <br/>
                    <DayPicker
                        selectedDays={[newDueDate]}
                        onDayClick={day => setNewDueDate(day)}
                    />
                </Calendar>
            </Form>
            <Form>
                <Input>
                    <input
                        placeholder={"Enter a new sub task"}
                        value={newSubTask || ""}
                        onChange={(e) => setNewSubTask(e.target.value)}
                        onKeyPress={onCreateSubTask}
                    />
                </Input>
                <SubTasks>
                    {subTasks.map(({id, text, done}) =>
                        <SubTask key={id} done={done}>
                            <SubTaskText onClick={() => onClickSubTask(id, done)}>{text}</SubTaskText>
                            <SubTaskButtons>
                                {done
                                    ? <>
                                        <CheckBoxIcon onClick={() => onClickSubTask(id, done)}/>
                                        <DeleteForeverIcon onClick={() => onDeleteSubTask(id)}/>
                                    </>
                                    : <CheckBoxOutlineBlankIcon onClick={() => onClickSubTask(id, done)}/>
                                }
                            </SubTaskButtons>
                        </SubTask>
                    )}
                </SubTasks>
                <Button onClick={() => onUpdateTask(id)}>Update Task</Button>
            </Form>
        </Wrapper>
    );
};

export default TaskPresenter;
