import React, { Component } from 'react';
import Field from '../common/Field';
import {withFormik} from 'formik';
import {connect} from 'react-redux';
import * as Yup from 'yup';
import * as AuthActions from '../../store/actions/authActions'


const fields = [
    {name: 'email', elementName: 'input', type: 'email', placeholder: 'Your email'},    
    {name: 'name', elementName: 'input', type: 'text', placeholder: 'Your name'},
    {name: 'password', elementName: 'input', type: 'password', placeholder: 'Your password'},
    {name: 'password2', elementName: 'input', type: 'password', placeholder: 'Password again'},

]

class Signup extends Component {
    render() {
        return (
            <div className="login-page">
                <div className="container">
                    <div className="login-form shadow rounded">
                        <div className='row'>
                            <h1 className="w-100 text-center">Signup</h1>
                        </div>
                        <div>
                            <form className="row" onSubmit={e => {
                                e.preventDefault();
                                this.props.register(this.props.values.name, this.props.values.email, this.props.values.password);
                            }}>
                                {fields.map((field, index) => {
                                    return (
                                        <div className="col-md-6" key={index}>
                                            <Field
                                                {...field}
                                                value={this.props.values[field.name]}
                                                name={field.name}
                                                onChange={this.props.handleChange}
                                                onBlur={this.props.handleBlur}
                                                touched={(this.props.touched[field.name])}
                                                errors={this.props.errors[field.name]}

                                            />
                                        </div>
                                    )
                                })}
                                <div className="col-md-12">
                                    <p className="text-danger text-center">{this.props.auth.error || ''}</p>
                                    <button className="btn btn-primary">
                                        Signup
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        register: (name, email, pass) => {
            dispatch(AuthActions.register(name, email, pass));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withFormik({
    mapPropsToValues: () => ({
        email: '',
        name: '',
        password: '',
        password2: '',
    }),
    validationSchema: Yup.object().shape({
        name: Yup.string().required('We need your name'),
        email: Yup.string().email('Invalid Email').required('You must give us your email'),
        password: Yup.string().min(8, 'Your password must be at least 8 characters long').required('You need to enter your password'),
        password2: Yup.string().required('You need to enter your password again').test('pass-match', 'Passwords don\'t match', function(value){
            const {password} = this.parent;
            return password === value;
        })
    }),
    handleSubmit: (values, {setSubmitting}, login) => {
        console.log('Login attempt with', values);
        //login(values.email, values.password);
    }
})(Signup));