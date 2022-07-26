import React from "react";
import styles from './LangButton.module.css';
import { useTranslation } from 'react-i18next';

const LangButton = () =>  {
    const { i18n } = useTranslation();

    return (
        <div className={styles.container}>
            <a 
                className={`${styles.button} ${styles.left} ${i18n.language === 'fr-CA' && styles.selected}`}
                onClick={() => i18n.language !== 'fr-CA' && i18n.changeLanguage('fr-CA')}
            >
                FR
            </a>
            <a 
                className={`${styles.button} ${styles.right} ${i18n.language === 'en-CA' && styles.selected}`}
                onClick={() => i18n.language !== 'en-CA' && i18n.changeLanguage('en-CA')}
            >
                EN
            </a>
        </div>
    );
};
 
export default LangButton;