import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import AllBanks from "./AllBanks";
import BankDetails from "./BankDetails";
import Favourites from "./Favourites";
import Structure from "../Components/Structure";
import NotFound from "./NotFound";

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
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Index;