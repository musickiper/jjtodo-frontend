import { gql } from "apollo-boost";

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
