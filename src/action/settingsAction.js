import {
    DISABLE_BALANCE_ON_ADD,
    DISABLE_BALANCE_ON_EDIT,
    ALLOW_REGISTRATION
} from './types';


export const disableBalanceOnAdd = () => {
    // get action from localStorage
    const setting = JSON.parse(localStorage.getItem('localStorageSetting'));
    setting.disableBalanceOnAdd = !setting.disableBalanceOnAdd;

    localStorage.setItem('localStorageSetting', JSON.stringify(setting));

    return {
        type: DISABLE_BALANCE_ON_ADD,
        payload: setting.disableBalanceOnAdd
    }
};

export const disableBalanceOnEdit = () => {

    // get action from localStorage
    const setting = JSON.parse(localStorage.getItem('localStorageSetting'));
    setting.disableBalanceOnEdit = !setting.disableBalanceOnEdit;

    localStorage.setItem('localStorageSetting', JSON.stringify(setting));

    return {
        type: DISABLE_BALANCE_ON_EDIT,
        payload: setting.disableBalanceOnEdit
    }
};

export const allowRegistration = () => {

    // get action from localStorage
    const setting = JSON.parse(localStorage.getItem('localStorageSetting'));
    setting.allowRegistration = !setting.allowRegistration;

    localStorage.setItem('localStorageSetting', JSON.stringify(setting));

    return {
        type: ALLOW_REGISTRATION,
        payload: setting.allowRegistration
    }
};