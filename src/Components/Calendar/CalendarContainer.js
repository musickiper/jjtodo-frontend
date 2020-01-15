import React, {useState} from "react";
import "react-day-picker/lib/style.css";
import {gql} from "apollo-boost";
import {useQuery} from "react-apollo-hooks";
import {CircularProgress} from "@material-ui/core";
import CalendarPresenter from "./CalendarPresenter";
import {DateUtils} from "react-day-picker";

const ALL_MY_TASKS = gql`
    query allMyTasks {
        allMyTasks {
            id
            title
            dueDate
        }
    }
`;

const CalendarContainer = ({history}) => {
    const [tasks, setTasks] = useState([]);
    // GraphQL Queries
    const {data, loading} = useQuery(ALL_MY_TASKS);

    const handleDayClick = (day) => {
        const tasks = data.allMyTasks.filter(
            (task) => DateUtils.isSameDay(new Date(task.dueDate), day)
        );
        setTasks(tasks);
    };

    const handleClickTask = (id) => {
        history.push(`/task/${id}`);
    };

    if (!loading && data && data.allMyTasks) {
        const days = data.allMyTasks.map(task => new Date(task.dueDate));

        return (
            <CalendarPresenter
                selectedDays={days}
                onClickDay={handleDayClick}
                tasks={tasks}
                onClickTask={handleClickTask}
            />
        );
    } else {
        return <CircularProgress/>;
    }
};

export default CalendarContainer;
