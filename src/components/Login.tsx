import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useContext, useState } from 'react'
import { SktMsgContext } from '../context/Socket.context';

function Login() {
  const context = useContext(SktMsgContext);
  const [username, setUsername] = useState('');
  const [error, setError] = useState(false);
  const errorText = "Please enter username with more then 2 letters";
  const login = context.login;
  const loginHandler = () => {
    if(!checkError()){
      login(username);
    }
  }
  const checkError  = () => {
    if (username.length > 2){
      setError(false);
      return false;
    }
    setError(true);
    return true;
  }
  return (
    <Box sx={{ display: "flex", height: '100vh', alignItems: 'center', justifyContent: "center", flexDirection: "column" }}>
      <Box sx={{ display: "flex", width: "300px", alignItems: 'center', justifyContent: "center", flexDirection: "column" }}>
        <Typography variant="subtitle2" display="block" component="div" sx={{ width: "100%" }} gutterBottom>
          Wellcome to YearsChat!
          <br/>
          Please Enter your name below and click "Log in"
        </Typography>
        <TextField id="outlined-basic" label="User Name" variant="outlined" sx={{ width: "100%" }} value={username} onChange={(e)=> {
          checkError();
          setUsername(e.target.value);
          }} />
        <Typography variant="subtitle2" display="block" component="div" sx={{ width: "100%", color: "#ff0000" }} gutterBottom>
          {error && errorText}
        </Typography>
        <Button variant="contained" onClick={loginHandler} sx={{ background: "#FFBC01", color: "#ffffff", marginTop: "2rem", width: "100%", "&:hover": { background: "#dea300" } }}>Login</Button>
      </Box>
    </Box>
  )
}

export default Login