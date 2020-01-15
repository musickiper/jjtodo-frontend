import {gql} from "apollo-boost";

export const TASK_BY_ID = gql`
    query taskById($taskId: String!) {
        taskById(taskId: $taskId) {
            id
            title
            desc
            dueDate
            status
            category {
                id
                text
            }
            subTasks {
                id
                text
                done
            }
            files {
                id
                url
            }
        }
    }
`;

export const UPDATE_TASK = gql`
    mutation updateTask(
        $taskId: String!
        $title: String
        $desc: String
        $dueDate: String
        $status: String
        $categoryText: String
        $subTasks: [String!]
        $files: [String!]
    ) {
        updateTask(
            taskId: $taskId
            title: $title
            desc: $desc
            dueDate: $dueDate
            status: $status
            categoryText: $categoryText
            subTasks: $subTasks
            files: $files
        ) {
            id
        }
    }
`;

export const CREATE_SUB_TASK = gql`
    mutation createSubTask($text: String!, $parentTaskId: String!) {
        createSubTask (text:$text, parentTaskId:$parentTaskId) {
            id
        }
    }
`;

export const UPDATE_SUB_TASK = gql`
    mutation updateSubTask($subTaskId: String!, $done: Boolean!) {
        updateSubTask (subTaskId: $subTaskId, done: $done) {
            id
        }
    }
`;

export const DELETE_SUB_TASK = gql`
    mutation deleteSubTask($subTaskId: String!) {
        deleteSubTask (subTaskId: $subTaskId) {
            id
        }
    }
`;
