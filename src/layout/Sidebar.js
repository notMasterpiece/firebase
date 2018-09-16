import React from 'react';
import {Link} from 'react-router-dom';

const Sidebar = () => {
    return (
        <Link to='/client/add' className="btn btn-success" >
            <i className="fa fa-plus" style={{paddingRight: '10px'}}></i>
            Add
        </Link>
    );
};

export default Sidebar;
