import React, { useRef } from 'react';
import './Sort.scss';

const Sort=({sortValue:{value, direction}, setSortValue})=>{
    const changeHandler=(name)=>{
        if(name === value){
            setSortValue((prevValue)=>{
                const {value} = prevValue,
                direction = !prevValue.direction;
                return {value, direction}
            })
        }
        else{
            setSortValue({value:name, direction:true});
        }
    },
    activeRef = useRef(null),
    options = ['default', 'email', 'age'],
    content = options.map(opt=>{
        return <button
        key={`sort_${opt}`}
        ref={opt===value?activeRef:null}
        className={opt===value?"sort__item sort__item--active":"sort__item"}
        onClick={()=>{changeHandler(opt)}}>
            {opt}
        </button>
    });
    let bgStyles,
    sortBgClasses = "sort__bg ";
    if(activeRef.current !== null){
        bgStyles ={
            width:`${activeRef.current.offsetWidth}px`,
            left:`${activeRef.current.offsetLeft}px`,
        }
    }
    if(value === 'default'){
        sortBgClasses += 'sort__bg--default '
    }
    if(!direction){
        sortBgClasses += 'sort__bg--descending '
    }
    return(
        <div className="sort">
            <p>Sort by:</p>
            <div className="sort__inner">
                {content}
                <div className={sortBgClasses} style={bgStyles}></div>
            </div>
        </div>
    )
}

export default Sort;