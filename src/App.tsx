import { Box } from '@mui/material';
import { useContext } from 'react';
import './App.css';
import MessageField from './components/MessageScreen/MessageField';
import { SktMsgContext } from './context/Socket.context';
import Login from './components/Login';

function App() {
  const context = useContext(SktMsgContext);
  const isLoggedin = context.isLoggedin;
  return (
    <Box className="App">
      {isLoggedin ? <MessageField />: <Login/>}
    </Box>
  );
}

export default App;
