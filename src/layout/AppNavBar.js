import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firebaseConnect} from 'react-redux-firebase';

import {Link} from 'react-router-dom';

class AppNavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuth: false
        }
    }

    componentWillReceiveProps() {
        const {auth} = this.props;
        if (auth.uid) {
            this.setState({isAuth: true})
        } else {
            this.setState({isAuth: false})
        }
    }

    logout = () => {
        const {firebase} = this.props;
        firebase.logout();
    };


    render() {

        const {isAuth} = this.state;

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to={'/'} className="nav-link" href="#">Home <span className="sr-only">(current)</span></Link>
                        </li>
                    </ul>
                    {
                        isAuth ?
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link to={'/setting'}
                                              className="nav-link"
                                        >Setting</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/'}
                                              className="nav-link"
                                              onClick={this.logout}
                                        >Logout</Link>
                                    </li>
                                </ul>
                            :
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link to={'/login'} className="nav-link">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/singup'} className="nav-link">Sing Up</Link>
                                    </li>
                                </ul>

                    }
                </div>
            </nav>
        );
    }
}

AppNavBar.propTypes = {
    firebase: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};


export default compose(
    firebaseConnect(),
    connect((state, props) => ({
        auth: state.firebase.auth
    }))
)(AppNavBar);