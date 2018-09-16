import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';

import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';

import Spinner from '../layout/Spinner';


class AddClient extends Component {
    constructor(props) {
        super(props);
    }


    onSubmit = e => {
        e.preventDefault();

        const { client, firestore, history } = this.props;

        const newClient = {
            firstName: this.firstName.value,
            lastName: this.lastName.value,
            phone: this.phone.value,
            email: this.email.value,
            balance: this.balance.value == '' ? 0 : this.balance.value
        };

        // update in firestore
        firestore.update({collection: 'clients', doc: client.id}, newClient )
            .then(history.push('/'))

    };


    render() {
        const {client} = this.props;
        console.log(client);
        if(client) {

            return (
                <div className="row">
                    <div className="col-sm-12">
                        <Link to='/' className='btn'>
                            <i className="fas fa-arrow-circle-left" />
                            {' '}
                            Back to dashboard
                        </Link>
                    </div>
                    <div className="card" style={{width: '100%'}}>
                        <div className="card-header">Edit client</div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor={client.firstName}>First Name</label>
                                    <input
                                        type="text"
                                        className='form-control'
                                        name='firstName'
                                        required
                                        defaultValue={client.firstName}
                                        ref={el => this.firstName = el}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor={client.lastName}>Last Name</label>
                                    <input
                                        type="text"
                                        className='form-control'
                                        name='lastName'
                                        required
                                        defaultValue={client.lastName}
                                        ref={el => this.lastName = el}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor={client.email}>email</label>
                                    <input
                                        type="text"
                                        className='form-control'
                                        name='email'
                                        required
                                        defaultValue={client.email}
                                        ref={el => this.email = el}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor={client.phone}>phone</label>
                                    <input
                                        type="text"
                                        className='form-control'
                                        name='phone'
                                        required
                                        defaultValue={client.phone}
                                        ref={el => this.phone = el}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor={client.balance}>balance</label>
                                    <input
                                        type="text"
                                        className='form-control'
                                        name='balance'
                                        required
                                        defaultValue={client.balance}
                                        ref={el => this.balance = el}
                                    />
                                </div>
                                <div className="form-group">
                                    <button type='submit' className='btn'>Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <Spinner/>
        }

    }
}

AddClient.propTypes = {
    firestore: PropTypes.object.isRequired,
    client: PropTypes.object
};

export default compose(
    firestoreConnect(props => [
        { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
    ]),
    connect(({firestore: {ordered}}, props) => ({
        client: ordered.client && ordered.client[0]
    }))
)(AddClient);
