import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import classes from '../../styles/components/LayoutComponents/Toast.module.css'

export default function Toast() {
    const { toastInfo: { open, message, type }, setToastInfo } = useContext(GlobalContext);

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                setToastInfo({ message, type, open: false });
            }, 3000);
        };
    }, [open]);

    return (
        <div className={`${classes.container} ${classes[type]} ${open ? classes.open : ''}`}>
            <p>{message}</p>
        </div>
    );
};