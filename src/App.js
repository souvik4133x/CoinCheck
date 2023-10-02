import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Coins from './components/Coins';
import Home from "./components/Home";
import Exchanges from "./components/Exchanges";
import CoinDetails from "./components/CoinDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { auth, db } from "./components/Firebase";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { Switch } from "@chakra-ui/react";
import { doc, onSnapshot } from "firebase/firestore";
function App(){
    const [user, setUser] = useState(null);
    const [watchlist, setWatchlist] = useState([]);
    const[arr,setArr]=useState([]);

   

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [user]);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user?.uid);
      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          console.log(coin.data().coins);
          setWatchlist(coin.data().coins);
        } else {
          console.log("No Items in Watchlist");
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

    return (
        <Router>
            <Header user={user} watchlist={watchlist} arr={arr}/>
            <Routes>
                <Route path="/" Component={Home}></Route>
                <Route path="/coins" element={<Coins user={user} watchlist={watchlist} setArrFunc={setArr} />}></Route>
                <Route path="/exchanges" Component={Exchanges}></Route>
                <Route path="/coin/:id" Component={CoinDetails}></Route>
            </Routes>
           
      
            <Footer/>
        </Router>
    );
}
export default App ;