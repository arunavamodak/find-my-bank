import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import AllBanks from "./AllBanks";
import BankDetails from "./BankDetails";
import Favourites from "./Favourites";
import Structure from "../Components/Structure";

function Index() {
    
    const WrappedComponent = (component) =>{
        return(
            <Structure component={component}></Structure>
        )
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={WrappedComponent(<AllBanks/>)}/>
                <Route path="/all-banks" element={WrappedComponent(<AllBanks/>)} />
                <Route path="/favourites" element={WrappedComponent(<Favourites/>)} />
                <Route path="/bank-details/:id" element={WrappedComponent(<BankDetails/>)} />
            </Routes>
        </BrowserRouter>
    )
}

export default Index;