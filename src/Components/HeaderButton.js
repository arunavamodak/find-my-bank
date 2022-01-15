import React from 'react';
import { Button } from "antd";

function HeaderButton({handleClick, text}) {
    return (
        <div style={{margin : "auto"}}>
            <Button type="primary" className='header-button' onClick={handleClick}>{text}</Button>
        </div>
    )
}

export default HeaderButton;