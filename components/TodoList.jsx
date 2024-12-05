import { Checkbox, ListItemSecondaryAction, ListItemText } from "@mui/material";
import { IconButton, List, ListItem, Paper } from "@mui/material";

export default function TodoList(props) {

    const { todos, onDelete, onToggle } = props;

    console.log(todos);

    return (
        <Paper>
            <List>
                {todos.list && todos.list.map((todo, idx) => {
                    return (
                        <ListItem key={todo._id} divider={idx !== todos.list.length - 1}>
                            <Checkbox checked={todo.finished} onClick={() => onToggle(todo._id)} />
                            <ListItemText>{todo.text}</ListItemText>
                            <ListItemText>{todo.dueDate}</ListItemText>
                            <ListItemSecondaryAction>
                                <IconButton>
                                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => onDelete(todo._id)} x="0px" y="0px" width="1.4rem" height="1.4rem" viewBox="0 0 24 24">
                                        <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"></path>
                                    </svg>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>

                    );
                })}
            </List>
        </Paper>
    );
}