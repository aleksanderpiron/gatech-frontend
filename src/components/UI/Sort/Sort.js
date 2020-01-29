import React from 'react';

const Sort=()=>{
    return(
        <div className="sort">
            <p>Sort by:</p>
            <div className="sort__inner">
                <div className="sort__item">
                    Name
                </div>
                <div className="sort__item">
                    Price
                </div>
            </div>
        </div>
    )
}

export default Sort;