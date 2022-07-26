import React, { useEffect } from "react";
import styles from './ProductTable.module.css';
import Button from "../Button/Button";
import { createApplication } from "../../views/ApplicationsPage/applicationsPageSlice";
import SectionTitle from "../SectionTitle/SectionTitle";
import { fetchProducts, Product } from "../../views/HomePage/homePageSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import { setNotification } from "../Notification/notificationSlice";
import Loading from "../Loading/Loading";

interface ProductTableProps {
    setEditApp?: Function,
    updateProdduct?: Function
}
 
const ProductTable = ({setEditApp, updateProdduct}: ProductTableProps) =>  {
    const dispatch = useAppDispatch();
    const {products, status} = useAppSelector((state) => state.products);

    useEffect(() => {
        !products?.length && dispatch(fetchProducts());
    }, [products]);

    const onClick = (item: Product) => {
        // update
        if(updateProdduct) {
            dispatch(setNotification({desc: 'New product selected', type: 'success'}));
            return updateProdduct(item);
        }
        // Create
        dispatch(createApplication(item.id));
        setEditApp && setEditApp(true);
    };

    const renderItem = (item: Product, type: string) => {
        return item.type === type && (
            <tr key={item.id}>
                <td>
                    {item.name}
                    <br/>
                </td>
                <td>{item.bestRate + '%'}</td>
                <td>
                    {item.lenderName}
                    <Button ghost onClick={() => onClick(item)} title={'Select'} className={styles['mobile-button']}/>
                </td>
                <td className={styles.button}>
                    <Button onClick={() => onClick(item)} ghost title={'Select'}/>
                </td>
            </tr>
        );
    };

    const renderTable = (products: Product[], type: string) => {
        return (
            <table className={styles["product-table"]}>
                <thead className={styles["product-thead"]}>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Rate</th>
                        <th scope="col">Lender</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map((i) => {
                        return renderItem(i, type);
                    })}
                </tbody>
            </table>
        );
    };

    if (status !== 'idle') {
        return <Loading />;
    }

    return products ? (
        <div>
            <SectionTitle title={'Variable rates'} />
            {renderTable(products, 'VARIABLE')}
            <SectionTitle title={'Fixed rates'} />
            {renderTable(products, 'FIXED')}
        </div>
    ) : null;
};
 
export default ProductTable;