import React, { useEffect, useState, useCallback } from 'react';
import { CITIES, SEARCH_CATEGORIES, CACHE_CLEARING_INTERVAL } from "../library/Constants";
import { Table, notification } from 'antd';
import { Link } from "react-router-dom";
import SelectBox from "../Components/SelectBox";
import SearchBox from "../Components/SearchBox";
import HeaderButton from "../Components/HeaderButton";
import { debounce } from "lodash";
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import Loader from "../Components/Loader";
import { getBanks } from "../library/HttpService";
import { willCacheClear } from "../library/helpers";

function AllBanks() {
    const [data, setData] = useState([]);
    const [city, setCity] = useState(CITIES[0].value);
    const [searchCategory, setSearchCategory] = useState(SEARCH_CATEGORIES[0].value);
    const [searchQuery, setSearchQuery] = useState("");
    const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem("favourites")));
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
       refreshData(city);
    }, []);

    const refreshData = (currentCity) =>{
        const data = JSON.parse(localStorage.getItem(`bankData:${currentCity}`));
        if(data && !willCacheClear(data["timestamp"])){
            setData(data["data"]);
        }
        else{
            setLoading(true);
            getBanks(currentCity).then(res=>{
                setData(res.data);
                localStorage.setItem(`bankData:${currentCity}`, JSON.stringify({
                    data : res.data,
                    timestamp : new Date().getTime()
                }));
                setLoading(false);
            }).catch(err=>{
                console.log(err);
                setData([]);
                notification["error"]({
                    message: 'Error in fetching data',
                    description: `${err.message}`
                  });
                setLoading(false);
            });
        }
    }

    useEffect(()=>{
        refreshData(city);
    }, [city]);

    const handleChange = (data, key) =>{
        if(key === "city"){
            setCity(data);
        }
        else if(key === "search_category"){
            setSearchCategory(data);
        }
        else{
            reloadSearch(data);
        }
    }

    const reloadSearch = useCallback(
        debounce((data) => setSearchQuery(data), 300),
        []
    );

    const getData = () =>{
        let t = null;
        if(searchQuery){
            t  = [...data].filter((item)=>item[searchCategory].toUpperCase().search(searchQuery.toUpperCase())!==-1);
            return t;
        }
        else{
            return data;
        }
    }

    const addToFavourites = (record) =>{
        if(favourites && favourites.length){
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

    const clearCache = () =>{
        CITIES.forEach(item=>{
            localStorage.removeItem(`bankData:${item.value}`);
        });
    }

    return (
        <>
            {
                loading ? 
                <Loader/> : null
            }
            <div>
                <div className='header-outer'>
                    <h1 className='header-title'>All Banks</h1>
                    <div className='header-filters'>
                        <SelectBox options={CITIES} type="city" handleChange={handleChange}/>
                        <SelectBox options={SEARCH_CATEGORIES} type="search_category" handleChange={handleChange}/>
                        <SearchBox type="search_query" handleChange={handleChange}/>
                        <HeaderButton handleClick={()=>{
                            clearCache();
                        }}
                        text="Clear Cache"
                        />
                    </div>
                </div>
                <Table 
                    scroll={{ x: 1200 }}
                    columns={columns} 
                    dataSource={getData()}
                />
            </div>
        </>
    )
}

export default AllBanks;
