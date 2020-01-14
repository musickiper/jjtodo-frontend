import React from 'react';
import styled from 'styled-components';

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
  background-color: #F1F3F5;
  border: 1px solid #CED4DA;
  border-radius: 4px;
  font-size: 2rem;
  padding: 0.5rem;
  ::placeholder {
    color: #757575;
  }
`;

const TasksBox = styled.div`
  width: 60vh;
  height: 80vh;
  margin: 2vh;
  padding: 2vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #CED4DA;
  border-radius: 4px;
  overflow: scroll;
`;

const TasksPresenter = ({newTask, tasks, onSubmit}) => {
    return (
        <Wrapper>
            <InputBox>
                <Input placeholder={"New Task"} {...newTask} type={"text"} onKeyDown={onSubmit}/>
            </InputBox>
            <TasksBox>
                {tasks.map(task => <div key={task.id}>{task.id}</div>)}
            </TasksBox>
        </Wrapper>
    );
};

export default TasksPresenter;
