import API from '../../utils/api';

export const login = (email, pass) => {
    return (dispatch => {
        API.login(email, pass, res => {
            console.log("Result", res.data);
            dispatch({
                type: 'LOGIN',
                payload: {
                    email: email,
                    token: res.data.id,
                    userId: res.data.userId
                }
            })
            API.getUser(res.data.userId, res.data.id, res2 => {
                console.log('Auth Actions res:', res2.data);
                dispatch({
                    type: 'AFTER_LOGIN',
                    payload: res2.data
                })
            })
        });
    })
}

export const adminRegister = (name, email, pass) => {
    return null; //write this fxn to add a new admin user
}

export const register = (name, email, pass) => {
    return dispatch => {
        API.register(name, email, pass, res => {
            if(res.status === 200) {
                dispatch(login(email, pass));
            } else {
                if(res) {
                    dispatch({
                        type: 'SHOW_ERROR',
                        payload: 'There was an error, do you already have an account?'
                    })
                }
            }
        })
    }
}