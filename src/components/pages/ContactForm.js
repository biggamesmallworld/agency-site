import React, {Component} from 'react';
import Field from '../common/Field';
import {withFormik} from 'formik';
import * as Yup from 'yup';


const fields = {
    sections: [
        [
            {
                name: 'name',
                elementName: 'input',
                type: 'text',
                placeholder: 'Your name'
        
            },
            {
                name: 'email',
                elementName: 'input',
                type: 'text',
                placeholder: 'Your email'
        
            },
            {
                name: 'phone',
                elementName: 'input',
                type: 'text',
                placeholder: 'Your phone'
        
            }
        ],
        [
            {
                name: 'message',
                elementName: 'textarea',
                type: 'textarea',
                placeholder: 'Your message'
        
            }
        ]
    ]
}

class ContactForm extends Component {
    
    render() {
        return (
            <div>
                <section className="page-section" id="contact">
                    <div className="container">
                        <div className="text-center">
                            <h2 className="section-heading text-uppercase">Contact Us</h2>
                            <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                        </div>
                        <div name="sentMessage" noValidate="noValidate" >
                            <form onSubmit={this.props.handleSubmit} id="contactForm" className="row align-items-stretch mb-5">
                                {fields.sections.map((section, sectionIndex) => {
                                    return (
                                        <div key={sectionIndex} className="col-md-6">
                                            {section.map((field, i) => {
                                                return <Field 
                                                        key={i} 
                                                        {...field}
                                                        value={this.props.values[field.name]}
                                                        name={field.name}
                                                        onChange={this.props.handleChange}
                                                        onBlur={this.props.handleBlur}
                                                        touched={(this.props.touched[field.name])}
                                                        errors={this.props.errors[field.name]}
                                                    />
                                            })}
                                        </div>

                                    )
                                })}
                            </form>
                            <div className="text-center">
                                <div id="success"></div>
                                <button 
                                    className="btn btn-primary btn-xl text-uppercase" 
                                    type="submit"
                                    onClick={this.props.handleSubmit}
                                >
                                    Send Message
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}


export default withFormik({
    mapPropsToValues: () => ({
        name: '',
        email: '',
        phone: '',
        message: '',
    }),
    validationSchema: Yup.object().shape({
        name: Yup.string().min(3, 'You need more characters').required('You must give us your name'),
        email: Yup.string().email('You need to enter a valid email').required('You must give us your email'),
        phone: Yup.number().min(10, 'You need to enter a complete phone number').max(15, 'That is too many digits').required('You must give us your phone'),
        message: Yup.string().min(500, 'You need to provide us more detailed info').required('You must submit a message'),
    }),
    handleSubmit: (values, {setSubmitting}) => {
        console.log('Values', values);
        alert("You've submitted the form", JSON.stringify(values));
    }
})(ContactForm);

