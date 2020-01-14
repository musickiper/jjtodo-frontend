import React, { useEffect } from "react";
import styled from "styled-components";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

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

const Form = styled.div`
  display: flex;
  flex-direction: column;
  height: 70vh;
  align-items: center;
  border: 0.5rem solid #f1f3f5;
  padding: 3vh;
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
    border: 0.5rem solid #555555;
  }
  textarea {
    border-radius: 4px;
    border: 0.5rem solid #555555;
  }
  div {
    display: flex;
    flex-direction: column;
    width: 25vh;
    select {
      border: 0.5rem solid #555555;
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

const STATUS_OPTIONS = ["PROGRESS", "PENDING", "COMPLETE"];

const TaskPresenter = ({
  data: { id, title, desc, dueDate, status, category, subTasks, files },
  newTitle,
  newDesc,
  newCategory,
  newStatus,
  setNewStatus,
  newDueDate,
  setNewDueDate
}) => {
  useEffect(() => {
    // Initialize status state with data from db
    setNewStatus(status);

    // Initialize dueDate state with data from db
    setNewDueDate(new Date(dueDate));
  }, [status, setNewStatus, dueDate, setNewDueDate]);

  return (
    <Wrapper>
      <Form>
        <Input>
          <span>Title</span>
          <input name="title" id="title" placeholder={title} {...newTitle} />
        </Input>
        <Input>
          <span>Description</span>
          <textarea
            name="desc"
            id="desc"
            placeholder={desc}
            rows="10"
            cols="100"
            {...newDesc}
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
              name="category"
              id="category"
              placeholder={category}
              {...newCategory}
            />
          </div>
        </Input>
        <Calendar>
          <span>Due Date</span>
          <br />
          <DayPicker
            selectedDays={[newDueDate]}
            onDayClick={day => setNewDueDate(day)}
          />
        </Calendar>
      </Form>
    </Wrapper>
  );
};

export default TaskPresenter;
