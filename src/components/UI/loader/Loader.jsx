import React from 'react';
import { ProgressBar } from  'react-loader-spinner';
import styles from './Loader.module.css';

const Loader = () => {
    return (
        <div className={styles.loader}>
            <ProgressBar
                height="80"
                width="80"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass="progress-bar-wrapper"
                borderColor = '#F4442E'
                barColor = '#51E5FF'
            />
        </div>
    );
};

export default Loader;