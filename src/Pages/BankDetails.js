import React from 'react';
import { useLocation } from "react-router-dom";

function BankDetails() {
    const {state} = useLocation();
    console.log(state);

    return (
        <div>
            Details
        </div>
    )
}

export default BankDetails
