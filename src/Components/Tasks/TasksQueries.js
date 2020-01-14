import {gql} from "apollo-boost";

export const ALL_MY_TASKS = gql`
    query allMyTasks {
        allMyTasks {
            id
            title
            dueDate
            status
        }
    }
`;

export const CREATE_TASK = gql`
    mutation createTask($title: String!) {
        createTask(title: $title) {
            id
            title
            dueDate
            status
        }
    }
`;
