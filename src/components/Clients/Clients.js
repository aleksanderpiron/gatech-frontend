import React, { useState, useEffect, useCallback } from 'react';
import ClientsJson from './clients.json';
import ClientsItem from './ClientsItem';
import Input from '../UI/Input/Input';
import './Clients.scss';

const Client =()=>{
    const [clientsArray, setClientsArray] = useState([]),
    [fiteredClients, setfiteredClients] = useState([]),
    [searchValue, setSearchValue] = useState('');

    const filterByName=useCallback(()=>{
        const newFiltered = clientsArray.filter(({name})=>{
            return name.toLowerCase().includes(searchValue.toLowerCase());
        });
        setfiteredClients(newFiltered);
    }, [clientsArray, searchValue])

    useEffect(()=>{
        setClientsArray(ClientsJson.data);
    }, []);

    useEffect(()=>{
        filterByName();
    }, [searchValue, filterByName]);

    // Render client items
    let clientBodyContent = <p>Empty</p>;
    if(clientsArray.length>0){
        if(searchValue!=='' && fiteredClients.length>0){
            clientBodyContent = fiteredClients.map(cl=>{
                return <ClientsItem key={cl._id} clientData={cl}/>
            });
        }
        else if(searchValue!=='' && fiteredClients.length===0){
            clientBodyContent = <p className="client-not-found">Oops! It looks like client named <span>{searchValue}</span> doesn't exist.<br/> Try with different name.</p> 
        }
        else if(searchValue===''){
            clientBodyContent = clientsArray.map(cl=>{
                return <ClientsItem key={cl._id} clientData={cl}/>
            });
        }
    }
    return(
        <div className="clients">
            <div className="clients__header">
                <Input 
                value={searchValue}
                change={(e)=>setSearchValue(e.target.value)}/>
            </div>
            <div className="clients__body">
                {clientBodyContent}
            </div>
            <div className="clients__footer">

            </div>
        </div>
    )
}

export default Client;