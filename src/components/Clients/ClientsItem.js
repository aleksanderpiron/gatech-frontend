import React from 'react';

const ClientsItem=({clientData:{_id, name, email, address:{city, street, houseNumber}, age, sex, avatar}})=>{
    return(
        <div id={_id} className="client">
            <div className={sex?"client__avatar client--female":"client__avatar client--male"}>
                <img src={avatar} alt=""/>
            </div>
            <div className="client__info">
                <p className="client__name">{name}</p>
                <a className='client__mail' href={`mailto:${email}`}>{email}</a>
                <ul className="client__details">
                    <li><span>Age:</span><span>{age}</span></li>
                    <li><span>Gender:</span><span>{sex?'Female':'Male'}</span></li>
                    <li><span>Address:</span><span>{`${street} ${houseNumber}, ${city}`}</span></li>
                </ul>
            </div>
        </div>
    )
}

export default ClientsItem;