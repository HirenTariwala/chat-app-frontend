import { Box } from '@mui/material';
import { useContext } from 'react';
import { SktMsgContext } from '../../context/Socket.context';
import ChatMessage from './ChatMessage';

import Header from './Header';
import UserInput from './UserInput';

function MessageField() {
    const context = useContext(SktMsgContext);
    const messages = context.messages;
    return (
        <Box>
            <Header />
            <Box sx={{ display: 'block', height: "70vh", overflow: "scroll", overflowY: 'hidden', overflowX: 'hidden' }}>
                {
                    messages.map((message: { message: string, username: string, time: string, }) => <>{message.message.length > 0 && <ChatMessage key={message.time} message={message} />} </>)
                }
            </Box>
            <UserInput />
        </Box>
    )
}

export default MessageField