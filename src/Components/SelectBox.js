import React from 'react';
import { Select } from 'antd';
const { Option } = Select;

function SelectBox({options, handleChange, type}) {

    return (
        <div style={{margin : "auto"}}>
            <Select defaultValue={options[0].value} className='header-selectbox' onChange={(e)=>{
                handleChange(e, type);
            }}>
                {
                    options.map(item=>{
                        return(
                            <Option key={item.id} value={item.value}>{item.name}</Option>
                        )
                    })
                }
            </Select>
        </div>
    )
}

export default SelectBox
