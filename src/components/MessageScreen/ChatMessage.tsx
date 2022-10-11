import { Box, IconButton, MenuItem, Tooltip, Typography, Menu } from '@mui/material'
import { useContext, useState } from 'react'
import { SktMsgContext } from '../../context/Socket.context'
import MoreVertIcon from '@mui/icons-material/MoreVert';

function ChatMessage({ message }: { message: { message: string; username: string; time: string } }) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const context = useContext(SktMsgContext);
    const username = context.username;
    let component;
    if (username === message.username) {
        const dateTime = new Date(message.time);
        component = <Box key={message.time} sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", margin: "2.5rem 2rem" }}>
            <Typography variant="caption" display="block" component="div" gutterBottom>
                {dateTime.getHours() + ':' + dateTime.getMinutes()}
            </Typography>
            <Box key={message.time} sx={{ display: "flex", flexDirection: "row", }}>
                <Typography variant="caption" display="block" component="div" gutterBottom sx={{ background: "#EFEFEF", display: "flex", justifyContent: "flex-end", width: "fit-content", padding: "8px 25px", borderRadius: "7px" }}>
                    {message.message}
                </Typography>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <MoreVertIcon />
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={() => context.editMessage(message)}>
                        Edit
                    </MenuItem>
                    <MenuItem onClick={() => context.deleteMessage(message.time)}>
                        Delete
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
    }
    else {
        const dateTime = new Date(message.time);
        component = <Box key={message.time} sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", margin: "2.5rem 2rem" }}>

            <Typography variant="caption" display="block" component="div" gutterBottom>
                {message.username} ,{dateTime.getHours() + ':' + dateTime.getMinutes()}
            </Typography>
            <Typography variant="caption" display="block" component="div" gutterBottom sx={{ color: "#ffffff", background: "#0971F1", display: "flex", justifyContent: "flex-start", width: "fit-content", padding: "8px 25px", borderRadius: "7px", maxWidth: '45%' }}>
                {message.message}
            </Typography>
        </Box>
    }
    return (
        <Box>
            {component}
        </Box >
    )
}

export default ChatMessage