import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { firebaseApp } from "./firebase";
import axios from "axios";
import React from "react";
const db = getFirestore(firebaseApp);

export function getTasks(
  uid: string,
  setTodos: React.Dispatch<React.SetStateAction<Task[] | undefined>>
) {
  console.log("Getting todos for user: " + uid);


  axios.get(`http://localhost:5000/todo/getAllTodoList`, {
    params: {
      uid
    }
  })
    .then(res => {
      const data = res.data;
      console.log(data)
      setTodos(data.todos)
    })
    .catch(err => {
      console.log(err)
    })

}

export function callCreateTask(
  uid: string,
  task: Task
): Promise<any> {
  return axios.post(`http://localhost:5000/todo/createTodo`, {
    uid, ...task
  })
}

export function callEditTask(uid: string, task: Task): Promise<any> {
  return axios.put(`http://localhost:5000/todo/updateTodo`, {
    uid, ...task
  })
}

export function deleteTask(uid: string, taskID: string): Promise<any> {
  return axios.delete(`http://localhost:5000/todo/deleteTodo`, {
    data: {
      uid: uid, id: taskID
    }
  })
}
