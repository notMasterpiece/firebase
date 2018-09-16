import React from 'react';
import './spinner.css';

const Spinner = () => {
    return (
        <div className="cs-loader">
            <div className="cs-loader-inner">
                <label>	●</label>
                <label>	●</label>
                <label>	●</label>
                <label>	●</label>
                <label>	●</label>
                <label>	●</label>
            </div>
        </div>
    );
};

export default Spinner;
