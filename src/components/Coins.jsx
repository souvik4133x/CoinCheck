import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import {
  Alert,
  AlertIcon,
  Button,
  Container,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  
} from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import CoinCard from "./CoinCard";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./Firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";

import { VStack, Text, Box, IconButton } from "@chakra-ui/react";
import { AiFillDelete } from "react-icons/ai";

const Coins = ({user,watchlist,setArrFunc}) => {

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  

 


  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };
  const btns = new Array(102).fill(1);

  useEffect(() => {

    //calling exchanges data 
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
        //console.log(data);
        setCoins(data);
        setArrFunc(data);
        setLoading(false);
        
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency, page]);

  if (error)
    return <ErrorComponent message={"Error While Fetching Coins"} />;


  return <Container maxW={"container.lg"}>
    {loading ? (<Loader />) : (
      <>
     
        <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
          <HStack spacing={"4"}>
            <Radio value={"inr"}>INR</Radio>
            <Radio value={"usd"}>USD</Radio>
            <Radio value={"eur"}>EUR</Radio>
          </HStack>
        </RadioGroup>

        <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
          {coins.map((i) => (
            <CoinCard
              id={i.id}
              key={i.id}
              name={i.name}
              price={i.current_price}
              img={i.image}
              symbol={i.symbol}
              currencySymbol={currencySymbol}
              user={user}
              watchlist={watchlist}
            />
          ))}
        </HStack>

        <HStack w={"full"} overflowX={"auto"} p={"8"}>
          {btns.map((item, index) => (
            <Button
              key={index}
              bgColor={"blackAlpha.900"}
              color={"white"}
              onClick={() => changePage(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
        </HStack>


      </>)}
  </Container>;

}
/*
const Watchlist = ({coinb,watchlist,user}) => {
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
  return (
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
      {coins.map((coin) => {
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
                <Text>{coin.symbol}</Text>
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
  );
};
*/



export default Coins;