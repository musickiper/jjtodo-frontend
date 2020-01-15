import DayPicker from "react-day-picker";
import React from "react";
import styled from "styled-components";

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

const CalendarBox = styled.div`
  text-align: center;
  font-weight: bold;
`;

const Tasks = styled.div`
  width: 40vh;
  height: 40vh;
  border: 1px solid #555555;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1vh;
`;

const Task = styled.div`
  width: 35vh;
  height: 5vh;
  border: 1px solid #555555;
  border-radius: 4px;
  margin-bottom: 1vh;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #50A0FA;
    color: white;
  }
`;


const CalendarPresenter = ({selectedDays, onClickDay, tasks, onClickTask}) => {
    return (
        <Wrapper>
            <CalendarBox>
                <span>Due Date</span>
                <br/>
                <DayPicker
                    selectedDays={[...selectedDays]}
                    onDayClick={onClickDay}
                />
            </CalendarBox>
            <Tasks>
                {tasks.map(({id, title}) => (
                    <Task key={id} onClick={() => onClickTask(id)}>{title}</Task>
                ))}
            </Tasks>
        </Wrapper>
    );
};

export default CalendarPresenter;
