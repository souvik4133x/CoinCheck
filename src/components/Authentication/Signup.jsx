/*
import { Box, Button, Input } from '@chakra-ui/react';
import React, { useState } from 'react'
import { auth } from '../Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';


const Signup=()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const handleSubmit = async () => {
        if (password !== confirmPassword) {
         alert("password mismatch");
        }

        try {
            const result = await createUserWithEmailAndPassword(
              auth,
              email,
              password
            );
            console.log(result);
        alert(`${result.user.email}`);
            
      
       
          } catch (error) {
           alert(`${error.message}`);
            return;
          }
    }



  return  <Box
  p={3}
  display="flex"
  flexDirection="column"
  gap="20px"
>
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
  <Input
    variant="outlined"
    placeholder="Confirm Password"
    type="password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
  />
  <Button
    variant="contained"
    size="lg"
    bg="#EEBC1D"
    color="white"
   onClick={handleSubmit}
  >
    Sign Up
  </Button>
</Box>;
  
}

export default Signup
*/import { Box, Button, Input, Alert, AlertIcon } from '@chakra-ui/react';
import React, { useState } from 'react'
import { auth } from '../Firebase';
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from 'firebase/auth';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState(null);

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setAlert({
        type: "error",
        message: "Password mismatch",
      });
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);

      await sendEmailVerification(result.user);
      if (!result.user.emailVerified) {
        setTimeout(() => {
          window.alert("A verification email has been sent to your inbox. Please verify your account before logging in.");
        }, 10);
        await signOut(auth);
    return;
      }
      setAlert({
        type: "success",
        message: `Sign Up Successful. Welcome ${result.user.email}`,
      });
      console.log(result);
    } catch (error) {
      setAlert({
        type: "error",
        message: error.message,
      });
    }
  }

  const closeAlert = () => {
    setAlert(null);
  }

  return (
    <Box
      p={3}
      display="flex"
      flexDirection="column"
      gap="20px"
    >
      {alert && (
        <Alert status={alert.type} mb={4} onClose={closeAlert}>
          <AlertIcon />
          {alert.message}
        </Alert>
      )}
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
      <Input
        variant="outlined"
        placeholder="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button
        variant="contained"
        size="lg"
        bg="#EEBC1D"
        color="white"
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
}

export default Signup;
