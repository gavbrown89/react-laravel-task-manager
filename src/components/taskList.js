import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
        }
    }

    componentDidMount() {
        axios.get('/api/projects').then(response => {
            this.setState({
                projects: response.data,
                outstandingTasks: response.data.length,
            });
            console.log('Projects', this.state.projects)           
        });    
    }

    render() {
        const { projects } = this.state;     
   
        return (
            <div className='container py-4'>
                <div className='row justify-content-center card-container'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'>All tasks</div>
                            <div className='card-body'>
                                {(this.state.outstandingTasks == 1) &&
                                  <div>
                                    <p>You have <strong>{this.state.outstandingTasks}</strong> outstanding task</p>
                                  </div>                              
                                }
                                {(this.state.outstandingTasks == 0 || this.state.outstandingTasks > 1) &&
                                    <div>
                                        <p>You have <strong>{this.state.outstandingTasks}</strong> outstanding tasks</p>
                                    </div>                                
                                }
                                <Link className='btn btn-primary btn-sm mb-3' to='/create'>
                                    Create new task
                                </Link>
                                <ul className='list-group listgroup-flush'>
                                    {projects.map(project => (
                                        <Link
                                            className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                                            to={`/${project.id}`}
                                            key={project.id}
                                        >
                                        {project.name}
                                        <span className='badge badge-primary badge-pill'>
                                            {project.tasks_count}
                                        </span>
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TaskList;