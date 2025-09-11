"use client"
import { useEffect, useState } from "react";
import axios from "axios"

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [LastName, setLastName] = useState("")
  const [Age, setAge] = useState("")
  const [Task, setTask] = useState("")

  const addTask = () => {
    if (LastName.trim() && Age.trim() && Task.trim()) {
      axios.post("http://localhost:3000/addtodo", {
        LastName,
        Age,
        Task
      }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      })
      setTasks([...tasks, { LastName, Age, Task }]);
    } else {
      alert("fill require")
    }
    setLastName("")
    setAge("")
    setTask("")
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  function getAllTask() {
    axios.get("http://localhost:3000/getalltodo")
      .then((res) => {
        setTasks(res.data.data);
      }).catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    getAllTask()
  }, [])

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">📝 To-Do List</h1>

      <div className="grid grid-rows-4 gap-3">
        <input
          type="text"
          value={LastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className="flex-1 border rounded-lg px-3 py-2 "
        />
        <input
          type="text"
          value={Age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
          className="flex-1 border rounded-lg px-3 py-2 "
        />
        <input
          type="text"
          value={Task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="New Task"
          className="flex-1 border rounded-lg px-3 py-2 "
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <ul className="mt-4 space-y-2">
        <li className="flex justify-between items-center bg-gray-700 font-bold text-white px-3 py-2">
           <h1>
              Last Name
            </h1>
            <h2>

              Age
            </h2>
            <h3>

              Task
            </h3>
            <button
              onClick={() => deleteAllTask(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              ✖
            </button>
        </li>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-lg "
          >
            <h1>
              {task.LastName}
            </h1>
            <h2>

              {task.Age}
            </h2>
            <h3>

              {task.Task}
            </h3>

            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
