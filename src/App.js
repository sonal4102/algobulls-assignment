import './App.css';

import { Todos } from "./MyComponents/Todos.tsx";

import { AddTodo } from "./MyComponents/AddTodo.tsx";

import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import { Modal } from "antd";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  let initTodo ;
  let testData = [
    {
      sno: "111",
      title: "title",
      desc: "desc",
      tags: ["tags"],
      status: "status",
      date: "date",
      date2: "date2",
    },
  ];
  if (localStorage.getItem("todos") === null) {
    initTodo = [ ];
  }
  else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
   /// initTodo = [...initTodo,...testData];
  }
  const [todos, setTodos] = useState(initTodo);
  const [isEdit, setIsEditing] = useState(false);
  const [editing, setEditing] = useState();
  const onEdit = (record) =>{
    console.log(record, " Inside onEdit")
    setIsEditing(true);
    setEditing(()=>{
      return record;
    });
    setTimeout( () =>{
      // 
       console.log( " Inside Timeout");
    }, 5000);
    console.log(editing, " Inside onEdit");
  }
  const resetEditing = () => {
    setIsEditing(false);
    setEditing({});
  };
  const onDelete = (todo) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.value) {
       
        console.log("I am ondelete of todo", todo);

        setTodos(
          todos.filter((e) => {
            return e !== todo;
          })
        );
        console.log("deleted", todos);
        localStorage.setItem("todos", JSON.stringify(todos));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: ` data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });
       
      }
    });
  
  }
  const editTodo = (sno,title, desc, tags, status, date, date2) => {
    console.log(
      "I am Editing this todo",
    );
     const myTodo = {
       sno: sno,
       title: title,
       desc: desc,
       tags: tags,
       status: status,
       date: date,
       date2: date2,
     };
    // let temp = todos;
    // for(let i=0;i<todos.length;i++){
    //   if(todos[i].sno==myTodo.sno){
    //     myTodo.date2 = todos[i].date2;
    //     temp[i] = myTodo;
    //   }
    // }
    // setTodos(temp);
    setTodos(
      todos.map((item) => {
        if (item.sno !== myTodo.sno) {
          return item;
        } else return myTodo;
      })
    );
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const addTodo = (title, desc, tags, status, date, date2) => {
    console.log(
      "I am adding this todo",
      title,
      desc,
      tags,
      status,
      date,
      date2
    );
    let sno;
    if (todos.length === 0) {
      sno = 0;
    } else {
      sno = todos[todos.length - 1].sno + 1;
    }
    tags = [...new Set (tags)];
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
      tags:tags,
      status:status,
      date:date,
      date2:date2
    };
    setTodos([...todos, myTodo]);
    console.log(myTodo);
  };
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  return (
    <>
      <Router>
        {/* <Header title="My Todos List" searchBar={false} /> */}
        {/* <AddTodo addTodo={addTodo} />
      <Todos todos={todos} onDelete={onDelete} />  */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AddTodo addTodo={addTodo} />
                <Todos todos={todos} onDelete={onDelete} onEdit={onEdit} />
                <Modal
                  title=""
                  visible={isEdit}
                  okText="Save"
                  onCancel={() => {
                    resetEditing();
                  }}
                  okText="Done"
                  onOk={() => {
                    // setTodos((pre) => {
                    //   return pre.map((todo) => {
                    //     if (todo.id === editing.id) {
                    //       return editing;
                    //     } else {
                    //       return todo;
                    //     }
                    //   });
                    // });
                    setTodos(todos);
                    resetEditing();
                  }}
                >
                  <AddTodo addTodo={addTodo} editTodo={editTodo} editing={editing} isEdit={isEdit} />
                </Modal>
              </>
            }
          />

          {/* <Route path="/about" element={<About />} /> */}

          {/* <Route exact path="/" render={()=>{
            return(
            <>
            <AddTodo addTodo={addTodo} />
            <Todos todos={todos} onDelete={onDelete} /> 
            </>)
          }}> 
          </Route>
          <Route exact path="/about">
            <About />
          </Route>  */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
