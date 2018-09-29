import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {allowRegistration, disableBalanceOnAdd, disableBalanceOnEdit} from '../action/settingsAction'

class Setting extends Component {

    handleAllowRegistration = () => {
        const {allowRegistration} = this.props;
        allowRegistration();
    };

    handleDisableBalanceOnAdd = () => {
        const {disableBalanceOnAdd} = this.props;
        disableBalanceOnAdd();
    };

    handleDisableBalanceOnEdit = () => {
        const {disableBalanceOnEdit} = this.props;
        disableBalanceOnEdit();
    };

    render() {
        const { allowRegistration, disableBalanceOnAdd, disableBalanceOnEdit } = this.props.settings;
        return (
            <Fragment>
                <div className="row">
                    <div className="col-sm-12">
                        <Link to='/' className='btn btn-link'>
                            <i className="fas fa-arrow-circle-left" />
                            {' '}
                            Back to dashboard
                        </Link>

                    </div>
                </div>
                <div className="card">
                    <div className="card-header">Edit Settings</div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label>
                                    Allow Registration {' '}
                                    <input
                                        type="checkbox"
                                        name='allowRegistration'
                                        checked={!!allowRegistration}
                                        onChange={this.handleAllowRegistration}
                                    />
                                </label>
                            </div>

                            <div className="form-group">
                                <label>
                                    Disable Balance On Add {' '}
                                    <input
                                        type="checkbox"
                                        name='disableBalanceOnAdd'
                                        checked={!!disableBalanceOnAdd}
                                        onChange={this.handleDisableBalanceOnAdd}
                                    />
                                </label>
                            </div>

                            <div className="form-group">
                                <label>
                                    Disable Balance On Edit {' '}
                                    <input
                                        type="checkbox"
                                        name='disableBalanceOnEdit'
                                        checked={!!disableBalanceOnEdit}
                                        onChange={this.handleDisableBalanceOnEdit}
                                    />
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </Fragment>
        );
    }
}

Setting.propTypes = {
    auth: PropTypes.object.isRequired,
    settings:PropTypes.object.isRequired,
    allowRegistration: PropTypes.func.isRequired,
    disableBalanceOnAdd: PropTypes.func.isRequired,
    disableBalanceOnEdit: PropTypes.func.isRequired
};

export default connect(state => ({
    auth: state.firebase.auth,
    settings: state.settings
}), {allowRegistration, disableBalanceOnAdd, disableBalanceOnEdit})(Setting);
