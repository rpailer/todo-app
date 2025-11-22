import { Checkbox, ListItemText } from "@mui/material";
import DeleteOutlined  from "@mui/icons-material/DeleteOutlined";
import { IconButton, List, ListItem, Paper } from "@mui/material";

export default function TodoList (props) {

    const {todos, onDelete, onToggle} = props;

    console.log(todos);

    return (
        <Paper>
            <List>
                {todos.list && todos.list.map((todo, idx) => {
                    return (
                        <ListItem key={todo._id} divider={idx !== todos.list.length - 1}
                           secondaryAction={
                                <IconButton aria-label="Delete Todo" onClick={() => onDelete(todo._id)}>
                                    <DeleteOutlined />
                                </IconButton>
                           }>
                            <Checkbox checked={todo.finished} onClick={() => onToggle(todo._id)}/>
                            <ListItemText>{todo.text}</ListItemText>
                            <ListItemText>{todo.dueDate}</ListItemText>
                        </ListItem>

                    );
                })}
            </List>
        </Paper>
    );
}