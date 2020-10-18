import React, {Component} from 'react'

class Field extends Component {

    render() {        

        const errMessage = this.props.errors;
        
        return (
            <div className="form-group">
                {this.props.elementName === 'input' ? 
                    <input 
                        className="form-control" 
                        id={this.props.name} 
                        type={this.props.type} 
                        placeholder={this.props.placeholder} 
                        required="required" 
                        data-validation-required-message="Please enter your email address." 
                        value={this.props.value}
                        name={this.props.name}
                        onChange={this.props.onChange}
                        onBlur={this.props.onBlur}
                    />
                : 
                    <textarea 
                        className="form-control" 
                        rows="9"
                        id={this.props.name} 
                        placeholder={this.props.placeholder} 
                        required="required" 
                        data-validation-required-message="Please enter a message."
                        value={this.props.value}
                        name={this.props.name}
                        onChange={this.props.onChange}
                        onBlur={this.props.onBlur}
                    />
                }
                {this.props.touched && 
                    <p className="help-block text-danger">
                        <span>{errMessage}</span>
                    </p>
                }
            </div>
        )
    }

}

export default Field;

