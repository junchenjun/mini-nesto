import React from "react";
import styles from './SectionTitle.module.css';
 
interface SectionTitleProps {
    title: string,
}

const SectionTitle = ({title} : SectionTitleProps)=>  {

    return (
        <p className={styles["section-title"]}>
            {title}
        </p>
    );
};
 
export default SectionTitle;