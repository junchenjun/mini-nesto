import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { setApplication, updateApplication } from "../../views/ApplicationsPage/applicationsPageSlice";
import { Product } from "../../views/HomePage/homePageSlice";
import Button from "../Button/Button";
import Loading from "../Loading/Loading";
import ProductTable from "../ProductTable/ProductTable";
import SectionTitle from "../SectionTitle/SectionTitle";
import styles from './Application.module.css';

interface ApplicationProps {
    submitTitle: String,
    setEditApp: Function
}
 
const Application = ({submitTitle, setEditApp}: ApplicationProps) =>  {
    const [applicant, setApplicant] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
    });
    const [selectOtherProduct, setSelectOtherProduct] = useState(false);

    const dispatch = useAppDispatch();

    const {application, status} = useAppSelector((state) => state.applications);
    const {products} = useAppSelector((state) => state.products);

    useEffect(() => {
        if(application) {
            setApplicant(application.applicants[0]);
        }
    }, [application]);

    const selectedProduct = products && products.find(p => p.id === application?.productId);

    const submit = () => {
        const newApp = {applicants: [applicant], productId: selectedProduct?.id};
        application && dispatch(updateApplication({
            app: newApp,
            id: application.id
        }));
        setEditApp(false);
    };

    const renderSelectedProduct = () => {
        if (!selectedProduct) return null;
        const productValues = [
            {
                title: 'Name',
                value: selectedProduct.name
            },
            {
                title: 'Rate',
                value: selectedProduct.rate
            },
            {
                title: 'Lender',
                value: selectedProduct.lenderName
            },
            {
                title: 'Type',
                value: selectedProduct.type
            },
        ];
        return (
            <div className={styles['section-content'] + ' ' + styles['selected-product']}>
                {productValues.map(p => {
                    return (
                        <div className={styles['product']} key={p.title}>
                            <p className={styles['product-title']}>{p.title + ':'}</p>
                            <p  className={styles['product-value']}>{p.value}</p>
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderContactForm = () => {
        const contact = [
            {
                title: 'First name',
                value: applicant.firstName,
                name: 'firstName',
                placeholder: 'John',
                type: 'text'
            },
            {
                title: 'Last name',
                value: applicant.lastName,
                name: 'lastName',
                placeholder: 'Doe',
                type: 'text'
            },
            {
                title: 'Email',
                value: applicant.email,
                name: 'email',
                placeholder: 'mail@example',
                type: 'email'
            },
            {
                title: 'phone',
                value: applicant.phone,
                name: 'phone',
                placeholder: '123-456-7890',
                type: 'tel'
            },
        ];
        return (
            <div className={styles['section-content']}>
                <form className={styles.form}>
                    {contact.map(i => {
                        return (
                            <label className={styles['form-item']} key={i.name}>
                                <span className={styles['form-title']}>{i.title + ':'}</span>
                                <input
                                    placeholder={i.placeholder}
                                    className={styles['form-input']}
                                    name={i.name}
                                    type={i.type}
                                    value={i.value}
                                    onChange={(e) => setApplicant({...applicant, [i.name]: e.target.value})} />
                            </label>
                        );
                    })}
                </form>
            </div>
        );
    };

    const isButtonEnabled = applicant.firstName && applicant.lastName && applicant.email && applicant.phone && selectedProduct;

    if (status !== 'idle') {
        return <Loading />;
    }

    return selectOtherProduct ? (
        <ProductTable updateProdduct={(product: Product) => {
            setSelectOtherProduct(false);
            const newApp = {...application, applicants: [applicant], productId: product.id};
            dispatch(setApplication(newApp));
        }}/>
    ) : (
        <div className={styles.containter}>
            <div className={styles['section-left']}>
                <SectionTitle title={'Selected product'} />
                {renderSelectedProduct()}
                <Button ghost className={styles['select-button']} title={'Select another product'} onClick={() => setSelectOtherProduct(true)}/>
            </div>
            <div className={styles['section-right']}>
                <SectionTitle title={'Contact me'} />
                {renderContactForm()}
                <div className={styles['buttons']}>
                    <Button ghost onClick={() => setEditApp(false)} title={'Cancel'}/>
                    <Button disabled={!isButtonEnabled} onClick={submit} title={submitTitle}/>
                </div>
            </div>
        </div>
    );
};
 
export default Application;