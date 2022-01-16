import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from "react-router-dom";
import Loader from '../Components/Loader';
import { CITIES } from "../library/Constants";

function BankDetails() {
    const [data, setData] = useState({});
    const { state } = useLocation();
    const { ifsc_code : ifscCode } = useParams();

    useEffect(()=>{
        if(state && state.record){
            setData(state.record);
        }
        else{
            let data = null;
            CITIES.forEach(item=>{
                const t = JSON.parse(localStorage.getItem(`bankData:${item.value}`)) ? JSON.parse(localStorage.getItem(`bankData:${item.value}`))["data"] : null;
                if(!data && t){
                    data = t.find(element => element.ifsc == ifscCode);
                }
            });
            setData(data);
        }
    }, [ifscCode]);

    return (
        <>
            {
                data
                    ?
                        <div>{data.bank_name}</div>
                    :
                        <Loader/>
            }
        </>
    )
}

export default BankDetails;
