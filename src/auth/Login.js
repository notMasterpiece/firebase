import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {firebaseConnect} from 'react-redux-firebase';

class Login extends Component {
    state = {
        email: '',
        password: ''

    };

    onChange = e => this.setState({ [e.target.name] : e.target.value });

    onSubmit = e => {
        e.preventDefault();
        const {firebase} = this.props;
        const {email, password} = this.state;

        firebase.login({ email, password })
            .then(() => {})
            .catch(err => alert(err))
    };

    render() {

        const {email, password} = this.state;

        return (
            <div className="row">
                <div className="col-sm-6 mx-auto">
                    <div className="card mt-3">
                        <div className="card-body">
                            <h1 className='text-center pb-3 pt-3'>
                                <i className="fa fa-lock" /> login
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
                                <input type="submit" value="Submit" className={'btn btn-primary btn-block'}/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    firebase: PropTypes.object.isRequired
};

export default firebaseConnect()(Login);
