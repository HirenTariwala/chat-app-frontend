import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { useContext } from 'react';
import { SktMsgContext } from '../../context/Socket.context';

function Header() {
    const context = useContext(SktMsgContext);
    const username = context.username;
    const logout = context.logout;
    return (
        <AppBar position="static" sx={{ background: "#FFBC01" }}>
            <Toolbar variant="dense" sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", height: "56px" }}>
                    <Typography variant="h6" color="inherit" component="div" sx={{ display: "flex", alignItems: "center", height: "100%" }}>
                        Years Chat,
                    </Typography>
                    <Typography variant="caption" display="block" component="div" sx={{ height: "100%", paddingTop: "25px" }} gutterBottom>
                        logged in as {username}
                    </Typography>
                </Box>
                <Box>
                    <Button onClick={logout} sx={{ fontWeight: "600", color: "#ffffff" }} >
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header