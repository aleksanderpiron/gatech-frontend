import React from 'react';
import './Input.scss';

const Input=({name, label, value, change})=>{
    return(
        <label>
            <p>{label}</p>
            <input
            onChange={change}
            type="text"
            value={value}
            name={name}/>
            <div className="line"></div>
        </label>
    )
}

export default Input;