import React, { useState, useEffect, useCallback } from 'react';
import ClientsJson from './clients.json';
import ClientsItem from './ClientsItem';
import Sort from '../UI/Sort/Sort';
import Input from '../UI/Input/Input';
import './Clients.scss';

const Client=()=>{
    //State
    const [clientsArray, setClientsArray] = useState([]),
    [searchValue, setSearchValue] = useState(''),
    [sortValue, setSortValue] = useState({value:'', direction:false}),

    //Functionalities
    filterByName=useCallback(()=>{
        console.log('filtr');
        let updatedClients = ClientsJson.data;
        if(searchValue !== ''){
            updatedClients = updatedClients.filter(({name})=>{
                return name.toLowerCase().includes(searchValue.toLowerCase());
            });
        };
        setClientsArray(updatedClients);
    }, [searchValue]),

    sortClients=useCallback(()=>{
        console.log('sort');
        let updatedClients;
        const {value, direction} = sortValue;
        switch(value){
            case 'name':
                if(direction){
                    updatedClients = clientsArray.sort((a, b)=>{
                        if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
                        if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
                        return 0;
                    })
                }
                else if(!direction){
                    updatedClients = clientsArray.sort((a, b)=>{
                        if(a.name.toLowerCase() < b.name.toLowerCase()) { return 1; }
                        if(a.name.toLowerCase() > b.name.toLowerCase()) { return -1; }
                        return 0;
                    })
                }
            break;
            case 'age':
                updatedClients = ClientsJson.data
            break;
            default:
                updatedClients = ClientsJson.data;
            break;
        };
        setClientsArray(updatedClients);
    }, [sortValue, clientsArray]);

    //Effects
    useEffect(()=>{
        console.log('effect1')
        setClientsArray(ClientsJson.data);
    }, []);

    useEffect(()=>{
        console.log('effect2')
        filterByName();
    }, [searchValue, filterByName]);

    useEffect(()=>{
        console.log('effect3')
        sortClients();
    }, [sortValue, sortClients]);
    // Render client items
    let clientBodyContent = <p>Loading...</p>;
    if(clientsArray.length>0){
        clientBodyContent = clientsArray.map(cl=>{
            return <ClientsItem key={cl._id} clientData={cl}/>
        });
    }
    else if(searchValue!=='' && clientsArray.length===0){
        clientBodyContent = <p className="client-not-found">Oops! It looks like client named <span>{searchValue}</span> doesn't exist.<br/> Try with different name.</p> 
    }
    return(
        <div className="clients">
            <div className="clients__header">
                <Input 
                value={searchValue}
                change={(e)=>setSearchValue(e.target.value)}/>
                <Sort 
                sortValue={sortValue}
                setSortValue={setSortValue}/>
            </div>
            <div className="clients__body">
                {clientBodyContent}
            </div>
            <div className="clients__footer">

            </div>
        </div>
    );
}

export default Client;