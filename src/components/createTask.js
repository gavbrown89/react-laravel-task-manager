import React, { Component } from 'react';
import axios from 'axios';
import {
    Button,
    Input,
    Form,
} from 'react-bootstrap';

class NewTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            errors: [],
        }
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleCreateNewProject = this.handleCreateNewProject.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);       
    }

    handleFieldChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleCreateNewProject (event) {
        event.preventDefault()

        const { history } = this.props

        const project = {
          name: this.state.name,
          description: this.state.description
        }

        axios.post('/api/projects', project)
          .then(response => {
            // redirect to the homepage
            history.push('/tasks')
          })
          .catch(error => {
            this.setState({
              errors: error.response.data.errors
            })
          })
      }

    hasErrorFor (field) {
        return !!this.state.errors[field]
    }

    renderErrorFor (field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            )
        }
    }

    render() {
        return (
            <div className='container py-4'>
                <div className='row justify-content-center card-container'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>Create new task</div>
                            <div className='card-body'>
                                <Form onSubmit={this.handleCreateNewTask}>
                                    <Form.Group className='form-group'>
                                        <Form.Label htmlFor='name'>Task Name</Form.Label>
                                        <Form.Control type='text' 
                                            id='name'
                                            className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
                                            name='name'
                                            value={this.state.name}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor('name')}
                                    </Form.Group>
                                    <Form.Group className='form-group'>
                                        <Form.Label htmlFor='description'>Task Description</Form.Label>
                                        <Form.Control as="textarea" rows="10" 
                                            id='description'
                                            className={`form-control ${this.hasErrorFor('description') ? 'is-invalid' : ''}`}
                                            name='description'
                                            value={this.state.description}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor('description')}
                                    </Form.Group>
                                    <Button
                                        onClick={this.handleCreateNewProject}
                                    >
                                    Create
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default NewTask;