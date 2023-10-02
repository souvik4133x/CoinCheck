import { Avatar, Box, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import avatarSrc from "../assets/myimage.jpeg"

const Footer = () => {
  return <Box
      bgColor={"blackAlpha.900"}
      color={"whiteAlpha.700"}
      minH={"48"}
      px={"16"}
      py={["16", "8"]}
    >
      <Stack direction={["column", "row"]} h={"full"} alignItems={"center"}>
        <VStack w={"full"} alignItems={["center", "flex-start"]}>
          <Text fontWeight={"bold"}>About Us</Text>
          <Text
            fontSize={"sm"}
            letterSpacing={"widest"}
            textAlign={["center", "left"]}
          >
          Welcome to my personal crypto trading project. I am committed to
            providing high-quality trading services completely free of charge.
            My goal is to help you navigate the exciting world of cryptocurrency
            without any cost barriers.
          </Text>
        </VStack>

        <VStack>
          <Avatar boxSize={"28"} mt={["4", "0"]} src={avatarSrc} />
          <Text>Our Founder</Text>
        </VStack>
      </Stack>
    </Box>;
};

export default Footer;

