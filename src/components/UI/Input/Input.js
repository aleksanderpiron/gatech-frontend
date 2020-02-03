import React from 'react';
import './Input.scss';

const Input=({name, value, change, className})=>{
    const click=(e)=>{
        e.preventDefault();
        change('');
    };
    return(
        <label>
            <input
            className={value!==''?className+' filled':className}
            onChange={(e)=>{change(e.target.value)}}
            type="text"
            value={value}
            name={name}/>
            <div className="line"></div>
            <div className="clear" onMouseDown={click}></div>
        </label>
    )
}

export default Input;