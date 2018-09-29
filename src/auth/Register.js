import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {firebaseConnect} from 'react-redux-firebase';

class Register extends Component {
    state = {
        email: '',
        password: '',
        error: null

    };

    onChange = e => this.setState({ [e.target.name] : e.target.value });

    onSubmit = e => {
        e.preventDefault();
        const {firebase} = this.props;
        const {email, password} = this.state;

        // Register with firbase
        firebase.createUser({email, password})
            .catch(error => this.setState({error: error.message}))
    };

    render() {

        const {email, password, error} = this.state;

        return (
            <div className="row">
                <div className="col-sm-6 mx-auto">
                    <div className="card mt-3">
                        <div className="card-body">
                            {
                                error &&
                                <div className="alert alert-danger" role="alert">{error}</div>
                            }
                            <h1 className='text-center pb-3 pt-3'>
                                Sing Up
                            </h1>
                            <form className="form-group" onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email" className={'btn-block'}>
                                        Email
                                        <input
                                            type="text"
                                            required
                                            name={'email'}
                                            placeholder={'Email'}
                                            value={email}
                                            className={'form-control'}
                                            onChange={this.onChange}
                                        />
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className={'btn-block'}>
                                        Password
                                        <input
                                            type="password"
                                            required
                                            name={'password'}
                                            placeholder={'password'}
                                            className={'form-control'}
                                            value={password}
                                            onChange={this.onChange}
                                        />
                                    </label>
                                </div>
                                <input type="submit" value="Register" className={'btn btn-primary btn-block'}/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    firebase: PropTypes.object.isRequired
};

export default firebaseConnect()(Register);
