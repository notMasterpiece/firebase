import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';

import { Link } from 'react-router-dom';

import Spinner from '../layout/Spinner';

// react-confirm-alert
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

class ClientDetail extends Component {
    
    state = {
        showBalanceUpdateForm : false,
        balance: '',
        balanceError : false
    };

    changeUpdateForm = e => {
        const re = /^[0-9\b]+$/;
        if (e.target.value == '' || re.test(e.target.value)) {
            this.setState({
                balance: e.target.value,
                balanceError: false
            })
        } else {
            this.setState({
                balanceError: true
            })
        }
    };


    balanceSubmit = e => {
        e.preventDefault();
        const { balance } = this.state;
        const { client, firestore } = this.props;


        // update in firestore
        const updateBalance = { balance };
        firestore.update({collection: 'clients', doc: client.id}, updateBalance );
        this.setState({ balance: ''});

    };

    onDeleteClick = () => {
        const {client, firestore, history} = this.props;

        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='react-confirm-alert-body'>
                        <p>Are you sure to delete</p>
                        <h1>{client.firstName} {' '} {client.lastName}</h1>

                        <button className='btn btn-dark m-r-10' onClick={() => {
                            onClose();
                            firestore.delete({collection: 'clients', doc: client.id})
                                .then(history.push('/'))
                        }}>Yes</button>
                        <button className={'btn btn-dark'} onClick={onClose}>No</button>
                    </div>
                )
            }
        })
    };
    
    render() {

        const { client } = this.props;
        const { showBalanceUpdateForm, balance, balanceError } = this.state;

        if(client) {
            return (
                <div className='clientDetail'>
                    <div className="row">
                        <div className="col-sm-6">
                            <Link to='/' className='btn btn-link'>
                                <i className="fas fa-arrow-circle-left" />
                                {' '}
                                Back to dashboard
                            </Link>
                        </div>
                        <div className="col-sm-6">
                            <div className="btn-group float-right">
                                <Link to={`/client/edit/${client.id}`} className='btn btn-dark'> Edit </Link>
                                <button
                                    className='btn btn-danger'
                                    onClick={this.onDeleteClick}
                                >Delete</button>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="card">
                        <h3 className="card-header">
                            {client.firstName} {' '} {client.lastName}
                        </h3>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-8">
                                    <h4>
                                        ClientID:
                                        <span className="text-secondary">{` ${client.id}`}</span>
                                    </h4>
                                </div>
                                <div className="col-sm-4">
                                    <h3 className='float-right'>
                                        Balance: $
                                        <span className={`${client.balance > 0 ? 'text-success' : 'text-danger'}`}>
                                            {' '}{parseFloat(client.balance).toFixed(2)}
                                        </span>
                                        {' '}
                                        {
                                            showBalanceUpdateForm ?
                                                <i className="fa fa-pen-alt" onClick={() => this.setState({showBalanceUpdateForm: !this.state.showBalanceUpdateForm})} />
                                                    :
                                                <i className="fa fa-pencil-alt" onClick={() => this.setState({showBalanceUpdateForm: !this.state.showBalanceUpdateForm})} />
                                        }

                                    </h3>
                                    {
                                        showBalanceUpdateForm &&
                                        <form onSubmit={this.balanceSubmit}>
                                            <div className="input-group">
                                                <input
                                                    name='balance'
                                                    value={balance}
                                                    type="text"
                                                    onChange={this.changeUpdateForm}
                                                    placeholder='Add new balance...'
                                                    ref={el => this.balanseInput = el}
                                                    className='form-control'/>
                                                <button
                                                    type='submit'
                                                    className='btn btn-success'
                                                >
                                                    Update
                                                </button>
                                            </div>
                                            {
                                                balanceError &&
                                                <p className="text-danger">Write only numbers</p>
                                            }

                                        </form>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <ul className="list-group">
                        <li className="list-group-item">Email: {client.email}</li>
                        <li className="list-group-item">Phone: {client.phone}</li>
                    </ul>
                </div>
            );
        } else {
            return <Spinner />
        }


    }
}

ClientDetail.propTypes = {
    client: PropTypes.object
};

export default compose(
    firestoreConnect(props => [
        { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
    ]),
    connect(({firestore: {ordered}}, props) => ({
        client: ordered.client && ordered.client[0]
    }))
)(ClientDetail);
