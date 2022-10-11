import { Box, Button, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { SktMsgContext } from '../../context/Socket.context';


function UserInput() {
    const context = useContext(SktMsgContext);
    const [message, setMessage] = useState<string>("");
    const sendMessagehandler = () => {
        if (message.length > 0) {
            if (context.isUpdating) {
                
                context.updateMessage(message);
                setMessage("");
                return;
            }

            context.sendMessage(message);
            setMessage("");
        }
    }
    useEffect(() => {
        context.isUpdating && setMessage(context.updatingMessage.message);
    }, [context.isUpdating, context.updatingMessage]);


    return (
        <Box sx={{ width: "90%", margin: 'auto', position: 'relative', top: '1rem' }}>
            <TextField
                sx={{ width: "100%", margin: "auto" }}
                id="outlined-multiline-static"
                placeholder='message ...'
                multiline
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
            />
            <Button sx={{ position: "absolute", right: "0.5rem", bottom: "0.5rem" }} variant="contained" onClick={sendMessagehandler} >{context.isUpdating ? 'Update Message' : 'Send Message'}</Button>
        </Box>
    )
}

export default UserInput