import React from 'react';
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import {gql} from "apollo-boost";
import {useQuery} from "react-apollo-hooks";
import AppRouter from "./Router";
import SideBar from "./SideBar";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F1F3F5;
`;

const QUERY = gql`
    {
        isLoggedIn @client
    }
`;

function App() {
    const {
        data: {isLoggedIn}
    } = useQuery(QUERY);
    return (
        <Wrapper>
            <AppRouter isLoggedIn={isLoggedIn}/>
            {isLoggedIn && <SideBar/>}
            <ToastContainer position={toast.POSITION.BOTTOM_LEFT}/>
        </Wrapper>
    );
}

export default App;
