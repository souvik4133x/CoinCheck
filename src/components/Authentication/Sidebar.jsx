/*
import React from 'react';

const Sidebar = ({ user }) => {
    console.log(user);
  return (
    <div>
      {user && user.email ? (
        <p>User Display Name: {user.email}</p>
      ) : (
        <p>User Display Name not available</p>
      )}

    </div>
  );
};

export default Sidebar;
*/
import React, { useState } from "react";
import { Box, IconButton, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { Avatar, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { auth, db } from "../Firebase";

import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";



export default function Sidebar({ user, watchlist ,arr}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
 

 
  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );

     
    } catch (error) {
      
    }
  };
  //console.log(watchlist, coins);

  const logOut = () => {
    signOut(auth);
    /*setAlert({
      open: true,
      type: "success",
      message: "Logout Successful!",
    });
    */

    onClose();
  };

 /* const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };
  */

  return (
    <>
      <Avatar
        onClick={onOpen}
        style={{
          height: 38,
          width: 38,
          marginLeft: 15,
          cursor: "pointer",
          backgroundColor: "#EEBC1D",
        }}
        src={user.photoURL}
        alt={user.displayName || user.email}
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader fontFamily="monospace" fontSize="20px">
              Profile
            </DrawerHeader>
            <DrawerBody display="flex" flexDirection="column" alignItems="center">
              <Avatar
                className="picture"
                src={user.photoURL}
                alt={user.displayName || user.email}
                boxSize={200}
                cursor="pointer"
                backgroundColor="#EEBC1D"
                objectFit="contain"
              />
              <span
                style={{
                  width: "100%",
                  fontSize: 25,
                  textAlign: "center",
                  fontWeight: "bold",
                  wordWrap: "break-word",
                }}
              >
                {user.displayName || user.email}
              </span>
             
              <VStack
      className="classes.watchlist"
      w="100%"
      bgColor="gray"
      borderRadius="10px"
      p={5}
      pt={3}
      align="center"
      spacing={3}
      overflowY="scroll"
    >
      <Text fontSize="xl" textShadow="0 0 5px black">
        Watchlist
      </Text>
      {arr.map((coin) => {
        
        if (watchlist.includes(coin.id)) {
          return (
            <Box
              key={coin.id}
              className="classes.coin"
              p={3}
              borderRadius="5px"
              color="black"
              w="100%"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bgColor="#EEBC1D"
              boxShadow="0 0 3px black"
            >
              <Text>{coin.name}</Text>
              <Box display="flex" gap={2} alignItems="center">
                
                <Text>{coin.current_price.toFixed(2)}</Text>
                <IconButton
                  as={AiFillDelete}
                  fontSize="16"
                  cursor="pointer"
                  onClick={() => removeFromWatchlist(coin)}
                />
              </Box>
            </Box>
          );
        } else {
          return null;
        }
      })}
    </VStack>
              
                
              <Button
                variant="contained"
                className="logout"
                onClick={logOut}
                width="100%"
                backgroundColor="#EEBC1D"
                color="white"
                marginTop={3}
              >
                Log Out
              </Button>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
