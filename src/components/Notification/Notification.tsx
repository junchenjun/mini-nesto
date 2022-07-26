import React, { useEffect, useState } from "react";
import styles from './Notification.module.css';
import { clearNotification } from "./notificationSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
 
const Notification = () =>  {
    const [visible, setVisible] = useState(false);
    const dispatch = useAppDispatch();
    const {desc, type} = useAppSelector((state) => state.notification);

    useEffect(() => {
        if(desc && type ) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [desc, type]);


    useEffect(() => {
        if(visible) {
            const timer = setTimeout(() => dispatch(clearNotification()), 3000);
            return () => {
                clearTimeout(timer);
            };
        }
    },[visible]);

    return visible ? (
        <div className={`${styles.container} ${styles[type]}`}>
            <p className={styles.title}>{(type==='success' ? '✅ ' : '❌ ') + desc}</p>
        </div>
    ) : null;
};
 
export default Notification;