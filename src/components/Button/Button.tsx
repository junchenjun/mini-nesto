import React, { MouseEventHandler } from "react";
import styles from './Button.module.css';

export interface ButtonProps {
    title: String,
    ghost?: Boolean,
    disabled?: Boolean,
    onClick: MouseEventHandler<HTMLButtonElement>,
    className?: string
}
 
const Button = ({title, ghost, disabled, onClick ,className}: ButtonProps) =>  {

    return (
        <button 
            onClick={disabled ? () => {} : onClick}
            className={`${styles.container} ${ghost ? styles.ghost : ''} ${disabled ? styles.disabled : ''} ${className}`}
        >
            {title}
        </button>
    );
};
 
export default Button;