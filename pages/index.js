import Grid from '@mui/material/Grid'
import NavBar from '../components/NavBar'
import TodoList from '../components/TodoList'
import { useRouter } from 'next/router'
import TodoAdd from '../components/TodoAdd'
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react'

/* enable for todos in memory */
//const storePath = 'todoStore';

/* enable for todos in Cloudant DB */
const storePath = 'dbTodoStore';


export default function Home() {

  const def = {
    "list":[]
  };

  const [todos, setTodos] = useState(def)
  const [isLoading, setLoading] = useState(true)

  let baseUrl = "";
  if (process.env.BASE) {
    baseUrl = process.env.BASE
  }
 
  useEffect(() => {
    let url = baseUrl + '/api/' + storePath;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
//        console.log(data);
        setTodos(data.message)
        setLoading(false)
      })
  }, [])



  const router = useRouter();

  const onDelete = async (id) => {
    console.log("onDelete: " + id);
    let todo = todos.list.find(t => t._id === id);

    let url = baseUrl + '/api/' + storePath;
    let response = await fetch(url, {
      method: 'DELETE',
      body: JSON.stringify(todo),
    });

    // get the data
    let data = await response.json();

    if (data.success) {
    } else {
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTodos(data.message)
      });
  }

  const onToggle = async (id) => {
    console.log("onToggle: " + id);
    if (todos.list) {
      let todo = todos.list.find(t => t._id === id);
      let newTodo = {
        ...todo,
        finished: !todo.finished
      }
      console.log("newTodo:");
      console.log(newTodo);

      let url = baseUrl + '/api/' + storePath;
      let response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(newTodo),
      });
  
      // get the data
      let data = await response.json();
  
      if (data.success) {
      } else {
      }
  
      fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTodos(data.message)
      });
    }
  }

  const onCreate = async (input) => {
    console.log("onCreate:");
    console.log(input);
    let todo = {
      _id: uuidv4(),
      text: input,
      fsinished: false,
    }
    let url = baseUrl + '/api/' + storePath;
    console.log(url);
    let response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(todo),
    });

    // get the data
    let data = await response.json();
    console.log("create");
    console.log(data);

    if (data.success) {
    } else {
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTodos(data.message)
      });
  }

  return (
    <div>
      <Grid container direction="column" alignItems="stretch" spacing={1}>
        <Grid item>
          <NavBar/>
        </Grid>
        <Grid item>
          <TodoAdd onCreate={onCreate}/>
        </Grid>
        <Grid item>
          <TodoList todos={todos} onDelete={onDelete} onToggle={onToggle}/>
        </Grid> 
      </Grid>
    </div>
  )
}

// export async function getServerSideProps(ctx) {
//   // get the current environment
//   let { SERVER_URL } = process.env;
//   if (!SERVER_URL) {
//     SERVER_URL = "http://127.0.0.1:3000";
//   }
//   console.log("SERVER_URL=" + SERVER_URL);

//   // request posts from api
//   let response = await fetch(`${SERVER_URL}/api/` + storePath);
//   // extract the data
//   let data = await response.json();

//   return {
//       props: {
//           list: data['message'].list,
//       },
//   };
// }
