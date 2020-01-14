import React from 'react';
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import {gql} from "apollo-boost";
import {useQuery} from "react-apollo-hooks";
import AppRouter from "./Router";

const Wrapper = styled.div``;

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
        </Wrapper>
    );
}

export default App;
