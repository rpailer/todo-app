import { AppBar, Toolbar, Typography } from "@mui/material";

export default function NavBar() {

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            TODO App - Thomas Winter
          </Typography>
        </Toolbar>
      </AppBar>
    </div>

  );
}