import React from "react";
import styled from "styled-components";
import InputIcon from '@material-ui/icons/Input';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import DateRangeIcon from '@material-ui/icons/DateRange';
import {gql} from "apollo-boost";
import {useMutation} from "react-apollo-hooks";
import {withRouter} from "react-router-dom";

const Wrapper = styled.div`
  width: 10vh;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: white;
  margin-left: 4vh;
  border-radius: 4px;
`;

const Link = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  &:hover {
    opacity: 50%;
    cursor:pointer;
  }
`;

const LinkCaption = styled.span`
  font-size: 0.3rem;
  opacity: 50%;
`;

const LOCAL_LOG_OUT = gql`
    mutation logUserOut {
        logUserOut @client
    }
`;

const SideBar = ({history}) => {
    const localLogoutMutation = useMutation(LOCAL_LOG_OUT)[0];

    const handleLogOut = async () => {
        try {
            await localLogoutMutation();
            await history.push("/");
        } catch (e) {
            console.error(e);
        }
    };

    const handleTodo = () => {
        history.push("/");
    };

    const handleCalendar = () => {
        history.push("/calendar");
    };

    return (
        <Wrapper>
            <Link onClick={handleLogOut}>
                <InputIcon/>
                <LinkCaption>Log Out</LinkCaption>
            </Link>
            <Link onClick={handleTodo}>
                <FormatListBulletedIcon/>
                <LinkCaption>To Do</LinkCaption>
            </Link>
            <Link onClick={handleCalendar}>
                <DateRangeIcon/>
                <LinkCaption>Calendar</LinkCaption>
            </Link>
        </Wrapper>
    );
};

export default withRouter(SideBar);
