import { Grid } from '@mui/material'
//import styles from '../styles/Home.module.css'
import NavBar from '../components/NavBar'
import TodoList from '../components/TodoList'
import { useRouter } from 'next/router'
import TodoAdd from '../components/TodoAdd'
import { v4 as uuidv4 } from 'uuid';

const storePath = 'todoStore';

export default function Home(todos) {
  const router = useRouter();

  const onDelete = async (id) => {
    console.log("onDelete: " + id);
    let todo = todos.list.find(t => t._id === id);
    let response = await fetch('/api/' + storePath, {
      method: 'DELETE',
      body: JSON.stringify(todo),
    });

    // get the data
    let data = await response.json();

    if (data.success) {
    } else {
    }

    router.replace(router.asPath);
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
  
      let response = await fetch('/api/' + storePath, {
        method: 'PUT',
        body: JSON.stringify(newTodo),
      });
  
      // get the data
      let data = await response.json();
  
      if (data.success) {
      } else {
      }
  
      router.replace(router.asPath);  
    }
  }

  const onCreate = async (input) => {
    console.log("onCreate:");
    console.log(input);
    let todo = {
      _id: uuidv4(),
      text: input,
      finished: false,
    }
    let response = await fetch('/api/' + storePath, {
      method: 'POST',
      body: JSON.stringify(todo),
    });

    // get the data
    let data = await response.json();

    if (data.success) {
    } else {
    }

    router.replace(router.asPath);
  }

  return (
    <div >
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

export async function getServerSideProps(ctx) {
  // get the current environment
  let { SERVER_URL } = process.env;
  if (!SERVER_URL) {
    SERVER_URL = "http://127.0.0.1:3000";
  }
  console.log("SERVER_URL=" + SERVER_URL);

  // request posts from api
  let response = await fetch(`${SERVER_URL}/api/` + storePath);
  // extract the data
  let data = await response.json();

  return {
      props: {
          list: data['message'].list,
      },
  };
}
