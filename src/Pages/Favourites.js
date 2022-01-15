import React, { useState } from 'react';
import { Table } from 'antd';
import { Link } from "react-router-dom";
import { HeartOutlined, HeartFilled} from '@ant-design/icons';

function AllBanks() {
    const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem("favourites")));

    const addToFavourites = (record) =>{
        if(favourites.length){
            const newData = [...favourites].concat(record);
            localStorage.setItem("favourites", JSON.stringify(newData));
            setFavourites(newData);
        }
        else{
            localStorage.setItem("favourites", JSON.stringify([record]));
            setFavourites([record]);
        }
    }

    const removeFromFavourites = (record) =>{
        const t = favourites.filter(item=>item["ifsc"]!==record["ifsc"]);
        localStorage.setItem("favourites", JSON.stringify(t));
        setFavourites(t);
    }

    const columns = [
        {
            title: 'BANK ID',
            dataIndex: 'bank_id',
            key: 'bank_id',
        },
        {
          title: 'IFSC',
          dataIndex: 'ifsc',
          key: 'ifsc',
          render : (data, record)=>{
            return(
                <Link 
                    to={`/bank-details/${data}`}
                    state={{ record: record }}
                >
                    {data}
                </Link>
            )
          }
        },
        {
            title: 'BANK NAME',
            dataIndex: 'bank_name',
            key: 'bank_name',
        },
        {
          title: 'BRANCH',
          dataIndex: 'branch',
          key: 'branch',
        },
        {
            title: 'ADDRESS',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'CITY',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: 'DISTRICT',
            dataIndex: 'district',
            key: 'district',
        },
        {
            title: 'STATE',
            dataIndex: 'state',
            key: 'state',
        },
        {
            title : "FAVOURITE",
            render : (data, record) =>{
                if(favourites && favourites.find((item)=>record["ifsc"] === item["ifsc"])){
                    return (
                        <div className='table-favourite-icon-container'>
                            <HeartFilled className='table-favourite-active' onClick={()=>{
                                removeFromFavourites(record);
                            }}/>
                        </div>
                    )
                }
                else{
                    return(
                        <div className='table-favourite-icon-container'>
                            <HeartOutlined className='table-favourite-inactive' onClick={()=>{
                                addToFavourites(record);
                            }}/>
                        </div>
                    )
                }
            }
        }
    ];


    return (
        <div>
            <div className='header-outer'>
                <h1 className='header-title'>Favourites</h1>
            </div>
            <Table 
                scroll={{ x: 1200 }}
                columns={columns} 
                dataSource={favourites}
            />
        </div>
    )
}

export default AllBanks;
