import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../Firebase";
import GoogleButton from "react-google-button";

const useStyles = () => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      width: 400,
     // backgroundColor:red,
      color: "white",
      borderRadius: 10,
    },
    google: {
      padding: 24,
      paddingTop: 0,
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      gap: 20,
      fontSize: 20,
    },
  });
  
  
  
 
  

function AuthModal({ setAlFunc}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [value, setValue] = useState(0);
    const classes = useStyles();

    const handleChange = (newValue) => {
        setValue(newValue);
    };

   
  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
       /* setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${res.user.email}`,
          type: "success",
        });
        */
 
     //   handleClose();
      })
      .catch((error) => {
       /* setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
        */
       alert('Retry!Something wrong');
        return;
      });
  };

    return (
        <>
            <Button onClick={onOpen}   style={{ color: 'white', backgroundColor: 'transparent' }}>Login</Button>

            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Login</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Tabs variant='soft-rounded' colorScheme='green' value={value} onChange={handleChange}>
                            <TabList>
                                <Tab>Login</Tab>
                                <Tab>Sign Up</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <Login></Login>
                                </TabPanel>
                                <TabPanel>
                                    <Signup></Signup>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                        <Box className={classes.google}>
              <span>OR</span>
              <GoogleButton
                style={{ width: "100%", outline: "none" }}
                onClick={signInWithGoogle}
              />
            </Box>

                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AuthModal;

