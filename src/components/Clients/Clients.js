import React, { useState, useEffect, useCallback } from 'react';

const Clients =()=>{
    const [clients, setClients] = useState([]),
    getClients=async()=>{

    }
    useEffect(()=>{
        getClients();
    }, [getClients])
    return(
        <div className="clients">

        </div>
    )
}

export default Clients;