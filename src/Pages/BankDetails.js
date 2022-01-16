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

    console.log(data);

    return (
        <>
            {
                data
                    ?
                        <div className='bank-detail-container'>
                            <h1 className='bank-name'>{data.bank_name}</h1>
                            <h3 className='detail-secondary'>Bank ID : {data.bank_id}</h3>
                            <h3 className='detail-secondary'>IFSC : {data.ifsc}</h3>
                            <h3 className='detail-secondary'>Branch : {data.branch}</h3>
                            <h3 className='detail-secondary'>Address : {data.address}</h3>
                            <h3 className='detail-secondary'>City : {data.city}</h3>
                            <h3 className='detail-secondary'>District : {data.district}</h3>
                            <h3 className='detail-secondary'>State : {data.state}</h3>
                        </div>
                    :
                        <Loader/>
            }
        </>
    )
}

export default BankDetails;
