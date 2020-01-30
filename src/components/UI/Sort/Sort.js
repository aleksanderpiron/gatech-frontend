import React from 'react';

const Sort=({sortValue:{value}, setSortValue})=>{
    const changeHandler=(name)=>{
        if(name === value){
            setSortValue((prevValue)=>{
                const {value} = prevValue,
                direction = !prevValue.direction;
                return {value, direction}
            })
        }
        else{
            setSortValue({value:name, direction:false});
        }
    }
    return(
        <div className="sort">
            <p>Sort by:</p>
            <div className="sort__inner">
                <button className="sort__item" onClick={()=>{changeHandler('')}}>
                    None
                </button>
                <button className="sort__item" onClick={()=>{changeHandler('name')}}>
                    Name
                </button>
                <button className="sort__item" onClick={()=>{changeHandler('age')}}>
                    Age
                </button>
            </div>
        </div>
    )
}

export default Sort;