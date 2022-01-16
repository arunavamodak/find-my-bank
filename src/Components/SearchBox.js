import React from 'react';
import { Input } from 'antd';

function SearchBox({handleChange, type }) {
    return (
        <div style={{margin : "auto"}}>
            <Input placeholder="Enter Query" allowClear className='header-searchbar' onChange={(e)=>{
                handleChange(e.target.value.trim(), type);
            }}/>
        </div>
    )
}

export default SearchBox;