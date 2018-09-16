import React, {Component} from 'react';

import Clients from '../clients/Clients';
import Sidebar from './Sidebar';

class Dashboard extends Component {
    render() {
        return (
            <div className='row'>
                <div className="col-sm-10">
                    <Clients />
                </div>
                <div className="col-sm-2">
                    <Sidebar />
                </div>
            </div>
        );
    }
}


export default Dashboard;
