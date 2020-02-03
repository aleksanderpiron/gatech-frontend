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
    [sortValue, setSortValue] = useState({value:'default', direction:true}),

    //Functionalities

    filterByName=useCallback(()=>{
        let updatedClients = [...ClientsJson.data];
        if(searchValue !== ''){
            updatedClients = updatedClients.filter(({name})=>{
                return name.toLowerCase().includes(searchValue.toLowerCase());
            });
        };
        return updatedClients;
    }, [searchValue]),

    sortBy=useCallback((arrayToSort)=>{
        let updatedClients = [...arrayToSort];
        const {value, direction} = sortValue;
        switch(value){
            case 'email':
                if(direction){
                    updatedClients = updatedClients.sort((a, b)=>{
                        if(a.email.toLowerCase() < b.email.toLowerCase()) { return -1; }
                        if(a.email.toLowerCase() > b.email.toLowerCase()) { return 1; }
                        return 0;
                    })
                }
                else if(!direction){
                    updatedClients = updatedClients.sort((a, b)=>{
                        if(a.email.toLowerCase() < b.email.toLowerCase()) { return 1; }
                        if(a.email.toLowerCase() > b.email.toLowerCase()) { return -1; }
                        return 0;
                    });
                }
            break;
            case 'age':
                if(direction){
                    updatedClients = updatedClients.sort((a, b)=>{
                        if(parseInt(a.age) < parseInt(b.age)) { return -1; }
                        if(parseInt(a.age) > parseInt(b.age)) { return 1; }
                        return 0;
                    });
                }
                else if(!direction){
                    updatedClients = updatedClients.sort((a, b)=>{
                        if(parseInt(a.age) < parseInt(b.age)) { return 1; }
                        if(parseInt(a.age) > parseInt(b.age)) { return -1; }
                        return 0;
                    });
                }
            break;
            default:
                updatedClients = filterByName();
            break;
        };
        return updatedClients;
    }, [sortValue, filterByName]);

    //Effects
    useEffect(()=>{
        setClientsArray(ClientsJson.data);
    }, []);
    
        //Filter & sort effect
    useEffect(()=>{
        let updatedArray = filterByName();
        updatedArray = sortBy(updatedArray);
        setClientsArray(updatedArray);
    }, [searchValue, filterByName, sortValue, sortBy]);

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
                className='search-input'
                value={searchValue}
                change={setSearchValue}/>
                <Sort 
                sortValue={sortValue}
                setSortValue={setSortValue}/>
            </div>
            <div className="clients__body">
                {clientBodyContent}
            </div>
            <div className="clients__footer">
                <p>Made by <a href="mailto:pironaleksander@gmail.com">Aleksander Piron</a></p>
            </div>
        </div>
    );
}

export default Client;