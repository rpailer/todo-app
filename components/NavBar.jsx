import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { useRouter } from 'next/router'

export default function NavBar () {

    const [anchorEl, setAnchorEl] = useState(null);

    const router = useRouter();

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        console.log("Handle menu " + event.target.id);
        setAnchorEl(null);
        switch (event.target.id) {
            case "todo":
                router.push("/");
                return;
            default:
                router.push("/");
                return;

        }
        
    
    
    };
    
    return (
        <div>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuClick}>
                <MenuIcon />
              </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem id="todo" onClick={handleClose}>TODOs</MenuItem>
                  
                  
                </Menu> 
                <Typography variant="h6">
                TODO App Rudi
              </Typography>
            </Toolbar>
          </AppBar>
        </div>

    );
}