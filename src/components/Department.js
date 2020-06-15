import React, { Component } from 'react';
import axios from 'axios';
import { Button, ButtonToolbar } from 'react-bootstrap';
import moment from "moment";
import { AddDeptModal } from './AddDeptModal';
import { EditDeptModal } from './EditDeptModal'
import { Table } from 'react-bootstrap'
export class Department extends Component {

    constructor(props) {
        super(props);
        this.state = { dept: [], addModalShow: false, editModalShow: false };
    }
    componentDidMount() {
        this.refreshList();
    }
    refreshList = () => {
        axios.get('https://ntycrudapp.herokuapp.com/list')
            .then(response => {
                this.setState({ dept: response.data })

            })
            .catch(error => {
                console.log(error);
            });
        // this.setState({
        //     dept: [
        //         { "departmentID": 1, "departmentName": 'IT' },
        //         { "departmentID": 2, "departmentName": 'HR' },
        //         { "departmentID": 3, "departmentName": 'Sales' },
        //         { "departmentID": 4, "departmentName": 'WEB' },
        //         { "departmentID": 5, "departmentName": 'Hardware' },

        //     ]
        // })
    }
    componentDidUpdate() {
        this.refreshList();
    }

    deleteDepartment(deptId) {
        console.log("deptId", deptId);
        if (window.confirm('Are you sure?')) {
            fetch(`https://ntycrudapp.herokuapp.com/delete?_id=${deptId}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
        }

    }
    render() {

        const { dept, id, name, dob, gender, dep, sal, res } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false })
        let editModalClose = () => this.setState({ editModalShow: false })
        return (


            <div>
                <Table className='mt-4' striped bordered hover size='sm'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date Of Birth</th>
                            <th>Gender</th>
                            <th>Department</th>
                            <th>Salary</th>
                            <th>Resume</th>
                            <th>Created At</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dept.map((dep) =>
                            <tr key={dep._id}>
                                <td>{dep.name}</td>
                                <td>{(new Date(dep.dateOfBirth )).toLocaleDateString().toString() }</td>
                                <td>{dep.sex}</td>
                                <td>{dep.department}</td>
                                <td>{dep.salary}</td>
                                <td>{dep.resume}</td>
                                <td>{ moment(dep.createdAt).fromNow()}</td>
                               
                                <td><ButtonToolbar>
                                    <Button className="mr-2" variant='info' onClick={() => this.setState({
                                        editModalShow: true,
                                        id: dep._id,
                                        name: dep.name,
                                        dob: (new Date(dep.dateOfBirth )).toLocaleDateString().toString() ,
                                        gender: dep.sex,
                                        dep: dep.department,
                                        sal: dep.salary,
                                        
                                    })}>Edit
                                </Button>
                                    <Button className="mr-2" variant='danger' onClick={() => this.deleteDepartment(dep._id)}>Delete
                                </Button>
                                    <EditDeptModal show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        id={dep._id}
                                        name={dep.name}
                                        dob={(new Date(dep.dateOfBirth )).toLocaleDateString().toString() }
                                        gender={dep.sex}
                                        dep={dep.department}
                                        sal={dep.salary}
                                    />
                                </ButtonToolbar></td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant="primary" onClick={() => this.setState({ addModalShow: true })}>
                        Add New Record
            </Button>
                    <AddDeptModal
                        show={this.state.addModalShow}
                        onHide={addModalClose}
                    />
                </ButtonToolbar>
            </div>
        )
    }
}