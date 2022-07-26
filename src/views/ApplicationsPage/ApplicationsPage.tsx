import React, { useEffect, useState } from "react";
import styles from './ApplicationsPage.module.css';
import { ApplicationType, getApplications, setApplication } from "./applicationsPageSlice";
import Button from "../../components/Button/Button";
import { fetchProducts } from "../HomePage/homePageSlice";
import Application from "../../components/Application/Application";
import { useAppDispatch, useAppSelector } from "../../store";
 
const ApplicationsPage = () =>  {
    const [editApp, setEditApp] = useState(false);
    const dispatch = useAppDispatch();
    const { allApplications } = useAppSelector((state) => state.applications);
    const {products} = useAppSelector((state) => state.products);

    useEffect(() => {
        !allApplications?.length && dispatch(getApplications());
    }, [allApplications]);

    useEffect(() => {
        !products?.length && dispatch(fetchProducts());
    }, [products]);

    const onClick = (item: ApplicationType) => {
        dispatch(setApplication(item));
        setEditApp(true);
    };

    const renderApplication = (app: ApplicationType) => {
        const isDataValid = app.applicants[0]?.firstName && app.applicants[0]?.lastName &&
        app.applicants[0]?.phone && app.applicants[0]?.email && products?.find(p => p.id === app.productId)?.name;

        const data = [
            {
                title: 'Product',
                value: products?.find(p => p.id === app.productId)?.name
            },
            {
                title: 'Name',
                value: app.applicants[0]?.firstName + ' ' + app.applicants[0]?.lastName
            },
            {
                title: 'Phone',
                value: app.applicants[0]?.phone
            },
            {
                title: 'Email',
                value: app.applicants[0]?.email
            }
        ];

        return isDataValid && (
            <div className={styles.application} key={app.id}>
                <div className={styles.content}>
                    {data.map(i => {
                        return (
                            <div className={styles.item} key={i.title}>
                                <p className={styles['item-title']}>{i.title}:</p>
                                <p className={styles['item-value']}>{i.value}</p>
                            </div>
                        );
                    })}
                </div>
                <div className={styles.footer}>
                    <span className={styles.date}>{app.createdAt}</span>
                    <Button ghost onClick={() => onClick(app)} title="Edit"/>
                </div>
            </div>
        );
    };

    return editApp ?
        <Application submitTitle="Update application" setEditApp={setEditApp}/>
     :
     (
        <div className={styles.containter}>
            {allApplications && allApplications.map(app => {
                return renderApplication(app);
            })}
        </div>
    );
};
 
export default ApplicationsPage;