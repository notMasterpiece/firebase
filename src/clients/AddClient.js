import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {firestoreConnect} from 'react-redux-firebase';


import {Link} from 'react-router-dom';

class AddClient extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: 'Vasul',
            lastName: 'Pankiv',
            phone: '',
            email: '',
            balance: ''
        };
    }


    onSubmit = e => {
        e.preventDefault();

        const newClient = this.state;


        // add to firebase
        const {firestore, history} = this.props;
        firestore.add({collection: 'clients'}, newClient)
            .then( () => history.push('/') );

    };


    onChange = e => this.setState({ [e.target.name] : e.target.value });


    render() {

        const {firstName, lastName, phone, email, balance} = this.state;

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
                    <div className="card-header">Add client</div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor={firstName}>First Name</label>
                                <input
                                    type="text"
                                    className='form-control'
                                    name='firstName'
                                    required
                                    onChange={this.onChange}
                                    value={firstName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor={lastName}>Last Name</label>
                                <input
                                    type="text"
                                    className='form-control'
                                    name='lastName'
                                    required
                                    onChange={this.onChange}
                                    value={lastName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor={email}>email</label>
                                <input
                                    type="text"
                                    className='form-control'
                                    name='email'
                                    required
                                    onChange={this.onChange}
                                    value={email}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor={phone}>phone</label>
                                <input
                                    type="text"
                                    className='form-control'
                                    name='phone'
                                    required
                                    onChange={this.onChange}
                                    value={phone}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor={balance}>balance</label>
                                <input
                                    type="text"
                                    className='form-control'
                                    name='balance'
                                    required
                                    onChange={this.onChange}
                                    value={balance}
                                />
                            </div>
                            <div className="form-group">
                                <button type='submit' className='btn'>Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

AddClient.propTypes = {
    firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(AddClient);
