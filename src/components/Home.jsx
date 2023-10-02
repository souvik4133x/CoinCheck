import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import btcSrc from "../assets/btc.jpg";
import { motion } from "framer-motion";


const Home = () => {
  return (
    <Box bgColor={"blackAlpha.900"} w={"full"} h={"full"} display="flex" flexDir="column" alignItems="center" justifyContent="center">
      <Text
        fontSize={"6xl"}
        textAlign={"center"}
        fontWeight={"thin"}
        color={"whiteAlpha.700"}
        mb={8} // Add margin to create space between text and image
      >
      CoinCheck
      </Text>
      <motion.div
        style={{
          height: "80vh",
        }}
        animate={{
          translateY: "20px",
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Image
          w={"full"}
          h={["full","full"]}
          objectFit={"contain"}
          src={btcSrc}
          style={{
            filter: "grayscale(1)", // Convert the image to grayscale
            zIndex: 1,
          }}
        />
         
      </motion.div>
    </Box>
  );
};

export default Home;


