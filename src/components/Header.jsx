import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Box, Button, HStack } from "@chakra-ui/react";
import AuthModal from './Authentication/AuthModal';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase';
import Sidebar from './Authentication/Sidebar';

const Header = ({user,watchlist,arr}) => {

  return (
    <>
    <HStack p={"4"} shadow={"base"} bgGradient='linear(to-l, #7928CA, #FF0080)' spacing={["30", "22"]}>
      <Button variant={"unstyled"} color={"white"}>
        <Link to="/">Home</Link>
      </Button>
      <Button variant={"unstyled"} color={"white"}>
        <Link to="/exchanges">Exchanges</Link>
      </Button>
      <Button variant={"unstyled"} color={"white"}>
        <Link to="/coins">Coins</Link>
      </Button>
      {user ? (
        <Sidebar user={user} watchlist={watchlist} arr={arr}/>
      ) : (
        <AuthModal variant={"unstyled"} color={"white"} />
      )}
     
    </HStack>
</>

  );
}

export default Header;
