import React, { useEffect, useState } from "react";
import ProductTable from "../../components/ProductTable/ProductTable";
import { useDispatch } from 'react-redux';
import { setApplication } from "../ApplicationsPage/applicationsPageSlice";
import Application from "../../components/Application/Application";
 
const HomePage = () =>  {
    const [editApp, setEditApp] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setApplication(null));
    },[]);

    return editApp ? 
        <Application submitTitle="Apply" setEditApp={setEditApp}/>
    :  <ProductTable setEditApp={setEditApp}/>;
};
 
export default HomePage;