import { Button, Heading, Image, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "./Firebase";
import { doc, setDoc } from "firebase/firestore";

const CoinCard = ({ id, name, img, symbol, price, currencySymbol = "₹" ,user,watchlist}) =>{
  const [buttonClicked, setButtonClicked] = useState(false);


  const inWatchlist = watchlist.includes(id);
  const addToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        {
          coins: watchlist ? [...watchlist, id] : [id],
        },
        { merge: true }
      );
      setButtonClicked(true); 
    
      
      
    } catch (error) {
      console.error("Error adding to watchlist:", error);
      return;
    }
  };
  
  const removeFromWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !==id) },
        { merge: true }
      );

     
    } catch (error) {
     
    }
  };
  
return( 

    <VStack
     w={"140px"}
     maxW={"80%"}
     shadow={"lg"}
     p={"4"}
     borderRadius={"lg"}
     transition={"transform 0.7s"}
     m={"4"}
     _hover={{
       transform: "scale(1.2)",
       shadow: "xl",
     }}
    >
      <Link to={`/coin/${id}`}>
      <Image
        src={img}
        w={"10"}
        h={"10"}
        objectFit={"contain"}
        alt={"Exchange"}
      />
      <Heading size={"md"} noOfLines={1}>
        {symbol}
      </Heading>

      <Text noOfLines={1}>{name}</Text>
      <Text noOfLines={1}>{price ? `${currencySymbol}${price}` : "NA"}</Text>
      </Link>
      {user && (
            <Button
              variant="outlined"
              style={{
                width: "100%",
                height: 40,
                backgroundColor: inWatchlist ? "#ff0000" : "#EEBC1D",
              }}
              onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
            >
              {inWatchlist ? "Remove" : "Add"}
            </Button>
          )}
      

    </VStack>
  
  
         
);
            }


export default CoinCard;