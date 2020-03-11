import React, { Component } from 'react';
import axios from 'axios';
import {
    Form,
    Button,
} from 'react-bootstrap';
import {
    reducer as formReducer,
    reduxForm,
    Field,
} from 'redux-form';
import { BrowserRouter  } from 'react-router-dom';

var validate = require("validate.js");

const formField = ({
    label,
    input,
    type,
    name,
    className,
    meta: { touched, error, warning }
}) => (
<div className="form-group">
    {
        label &&
        <label htmlFor={name}>{label}</label>
    }
    <input {...input } name={name} type={type} className={
        `${className} ${
            touched && (
                (error && 'is-invalid')
            )
        }`
    } />
    {
        touched &&
            (error && <span className="invalid-feedback">{error}</span>)
    }
</div>
);

const validatorSignInForm = (values) => {
    const result = validate(values, {
        name: {
            presence: {
                message: '^Please enter your name.'
            },
        },       
        email: {
            presence: {
                message: '^Please enter your email address.'
            },
            email: {
                message: '^Please enter a valid email address.'
            }
        },
        password: {
            presence: {
                message: '^Please enter your password.'
            }
        }
    });
    return result;
}

export default class RegisterAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);       
        this.switchForm = this.switchForm.bind(this);            
    }

    handleChangePassword (event) {
        this.setState({ password: event.target.value });
    }   
    handleChange (event) {
        this.setState({ name: event.target.value, email: event.target.value, password: event.target.value });
    } 

    handleSubmit(e) {
        e.preventDefault();
        console.log('Name: ', this.state.name );       
        console.log('Email: ', this.state.email );
        console.log('Password: ', this.state.password );       
        axios({ 
            url: '/api/register',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            data: {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
            }           
        })
        .then( (response) => {
            console.log('data: ', response.data);
        })
        .catch(error => {
            console.log(error);
        })         
    
      }  
      
      switchForm() {
        this.props.history.push('/');
      }      

    render() {
        const { handleSubmit, submitting } = this.props;
        return (
            <div className='home-bg'>
                <div className='container'>
                    <div className='row justify-content-center card-container'>
                        <div className='col-md-6 col-lg-6 col-sm-12'>
                            <div className='card'>
                                <div className='card-body'>
                                    <h2 className='text-center font-weight-light mb-4'>Register your account</h2>
                                    <Form onSubmit={this.handleSubmit}>
                                    <Form.Group className='form-group'>
                                            <Form.Label>Your name</Form.Label>
                                            <Form.Control 
                                                name='name'
                                                type='text'
                                                component={formField}
                                                label='name'
                                                id='name'
                                                value={this.state.name}
                                                onChange={ e => this.setState({ name : e.target.value }) }                                           
                                            />
                                            </Form.Group>                                   
                                        <Form.Group className='form-group'>
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control 
                                                name='email'
                                                type='email'
                                                component={formField}
                                                label='email'
                                                id='email'
                                                value={this.state.email}
                                                onChange={ e => this.setState({ email : e.target.value }) }                                           
                                            />
                                            </Form.Group>
                                            <Form.Group className='form-group'>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control 
                                                name='password'
                                                type='password'
                                                component={formField}
                                                label='password'
                                                id='password'
                                                value={this.state.password}
                                                onChange={ e => this.setState({ password : e.target.value }) }                                           
                                            />
                                        </Form.Group>
                                        <div className='form-group mt-4'>
                                            <Button
                                                type='submit'
                                                className='btn btn-primary form-submit'
                                                disabled={submitting}
                                            >
                                                Submit
                                            </Button>
                                        </div>
                                        <div style={{ flexDirection: 'row', marginTop: 50}}>
                                        <Button 
                                            onClick={this.switchForm} 
                                            className='switch-form-btn' 
                                            >
                                                Login
                                            </Button>                                        
                                            <Button 
                                            className='switch-form-btn disabled'
                                            disabled={true}                                      
                                            >
                                                Register
                                            </Button>                                        
                                        </div>                                   
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>   
            </div>         
        )
    }
}