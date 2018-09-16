import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';

import { Link } from 'react-router-dom';

import Spinner from '../layout/Spinner';

class Clients extends Component {

    render() {

        const clients = this.props.clients;


        if( clients ) {
            const total = clients.reduce((total, client) => {
                return total + parseFloat(client.balance.toString());
            }, 0);

            if( clients.length > 0) {
                return (
                    <Fragment>
                        <div className="row">
                            <div className="col-sm-6">
                                <h2><i className="fa fa-users" /> Clients</h2>
                            </div>
                            <div className="col-sm-6 text-right flex-middle">
                                $ { parseFloat(total).toFixed(2) }
                            </div>
                        </div>
                        <div className="row">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Balance</th>
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    clients.map(client => {
                                        return <tr key={client.id}>
                                                    <td>{client.firstName}{' '}{client.lastName}</td>
                                                    <td>{client.email}</td>
                                                    <td>{client.phone}</td>
                                                    <td>${' '}{parseFloat(client.balance).toFixed(2)}</td>
                                                    <td>
                                                        <Link to={`/client/${client.id}`} className='btn btn-secondary'>
                                                            <i className="fa fa-arrow-circle-right" />
                                                            {' '}Details
                                                        </Link>
                                                    </td>
                                                </tr>
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </Fragment>
                )
            } else {
                return (
                    <div className="row">
                        <div className="col-sm-6">
                            <h2><i className="fa fa-users" /> No clients</h2>
                        </div>
                    </div>
                )
            }


        } else {
            return <Spinner />
        }
    }
}

Clients.propTypes = {
    firestore: PropTypes.object.isRequired,
    clients: PropTypes.array,
};

export default compose(
    firestoreConnect([{ collection: 'clients' }]),
    connect((state, props) => ({
        clients: state.firestore.ordered.clients
    }))
)(Clients);
