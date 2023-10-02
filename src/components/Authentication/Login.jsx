import { Box, Button, Input, Stack, Alert, AlertIcon } from "@chakra-ui/react";
import { useState } from "react";
import { auth } from "../Firebase";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null);
  
 
  const handleSubmit = async () => {

    if (!email || !password) {
      setAlert({
        type: "error",
        message: "Please fill all the fields.",
      });
      return;
    }

    try {
      const auth = getAuth(); 
      const result = await signInWithEmailAndPassword(auth, email, password);
    
      if (!result.user.emailVerified) {
        
      
      setTimeout(() => {
        window.alert('Email Verification Required: Before you can log in, please check your email for a verification link . If you did not receive an email, please check your spam folder.');
      }, 1); 
      await signOut(auth); // Sign the user out if email is not verified.
     return ;
    }
    setTimeout(() => {
      window.alert(`Login Successful. Welcome, ${result.user.email}! You are now logged in to your account.`);
    }, 1);
    
  }catch (error) {
      setAlert({
        type: "error",
        message: error.message,
      });
    }
  };
  

  const closeAlert = () => {
    setAlert(null);
  };

  return (
    <Box p={3}>
      {alert && (
        <Alert status={alert.type} mb={4} onClose={closeAlert}>
          <AlertIcon />
          {alert.message}
        </Alert>
      )}
      <Stack spacing={3}>
        <Input
          variant="outlined"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          variant="outlined"
          placeholder="Enter Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="solid"
          size="lg"
          onClick={handleSubmit}
          colorScheme="yellow"
          bg="#EEBC1D" 
          color="white" 
        >
          Login
        </Button>

      </Stack>
      
    </Box>
  );
};

export default Login;

/*
import { Box, Button, Input, Stack, Alert, AlertIcon } from "@chakra-ui/react";
import { useState } from "react";
import { auth } from "../Firebase";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import ErrorComponent from "../ErrorComponent";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null);

  const[al,setAl]=useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        type: "error",
        message: "Please fill all the fields.",
        open: true, // Open the alert when there's an error
      });
      return;
    }

    try {
      const auth = getAuth(); 
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (!result.user.emailVerified) {
        signOut(auth);
      setAl(true);
      }
      
    } catch (error) {
     
    }
  };

  

  return (
    <Box p={3}>
     
      <Stack spacing={3}>
        <Input
          variant="outlined"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          variant="outlined"
          placeholder="Enter Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="solid"
          size="lg"
          onClick={handleSubmit}
          colorScheme="yellow"
          bg="#EEBC1D" 
          color="white" 
        >
          Login
        </Button>
      </Stack>
      
    </Box>
  );
};

export default Login;
*/