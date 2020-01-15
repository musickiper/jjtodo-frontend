import { gql } from "apollo-boost";

export const ALL_MY_TASKS_AND_ALL_CATEGORIES = gql`
  query allMyTasks {
    allMyTasks {
      id
      title
      dueDate
      status
      category {
        text
      }
    }
    allCategories {
      text
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

export const DELETE_TASK = gql`
  mutation deleteTask($taskId: String!) {
    deleteTask(taskId: $taskId) {
      id
    }
  }
`;
