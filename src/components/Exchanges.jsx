import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import {

  Container,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";


const Exchanges = () => {

  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


  useEffect(() => {

    //calling exchanges data 
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges?perpage=10000`);

        setExchanges(data);
        setLoading(false);

      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchExchanges();
  }, []);

  if (error)
    return <ErrorComponent message={"Error While Fetching Exchanges"} />;


  return <Container maxW={"container.lg"}>
    {loading ? (<Loader />) : (
      <>
        <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
          {exchanges.map((i) => (
            <ExchangeCard
              key={i.id}
              name={i.name}
              img={i.image}
              rank={i.trust_score_rank}
              url={i.url}
            />
          ))}
        </HStack>
      </>)}
  </Container>;

}


const ExchangeCard = ({ name, img, rank, url }) => (
  <a href={url} target="_blank" rel="noopener noreferrer">
    <VStack
      w={"140px"}
      maxW={"100%"}
      shadow={"lg"}
      p={"4"}
      borderRadius={"lg"}
      transition={"transform 0.3s"}
      m={"4"}
      _hover={{
        transform: "scale(1.05)",
        shadow: "xl",
      }}
    >
      <Image
        src={img}
        w={"10"}
        h={"10"}
        objectFit={"contain"}
        alt={"Exchange"}
      />
      <Heading size={"md"} noOfLines={1} textAlign="center">
        {name}
      </Heading>
      <Text noOfLines={1} fontSize="sm" textAlign="center">
        Rank: {rank}
      </Text>
    </VStack>
  </a>
);



export default Exchanges;
