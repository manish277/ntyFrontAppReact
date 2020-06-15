import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton'
export class EditDeptModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deps: ['HR', 'Designer', 'Developer', 'Sales'],gender:['male','female','other'],snackBarOpen: false, snackBarMsg: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    snackBarClose = (event) => {
        this.setState({
            snackBarOpen: false
        })
    }
    handleSubmit(event) {
        event.preventDefault();
        try {
            
        } catch (error) {
            
        }
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        fetch(`https://ntycrudapp.herokuapp.com/update?_id=${event.target.Departmentid.value}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: event.target.DepartmentName.value,
                dateOfBirth: event.target.DepartmentDOB.value,
                sex: event.target.DepartmentGender.value,
                department: event.target.Department.value,
                salary: event.target.DepartmentSalary.value,
                resume: event.target.DepartmentResume.value
            })
        }).then(res => {
            res.json()
        }).then(result => {
            console.log(result)
            this.setState({ snackBarOpen: true, snackBarMsg: "Update Successfully" })
        }).catch(err => console.log(err));
        // this.setState({ snackBarOpen: true, snackBarMsg: "Some error occurred" })
    }
    render() {
        return (
            <div className="container">
                <Snackbar
                    anchorOrigin={{ vertical: 'cenet', horizontal: 'center' }}
                    open={this.state.snackBarOpen}
                    autoHideDuration={3000}
                    onClose={this.snackBarClose}
                    message={<span id="messege-id">{this.state.snackBarMsg}</span>}
                    action={[
                        <IconButton key="close" aria-label="Close" color="inherit" onClick={this.snackBarClose}>
                            x
    </IconButton>
                    ]}
                />
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Employee
              </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId='Departmentid'>
                                        <Form.Label>Employee ID</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="depid"
                                            required
                                            disabled
                                            defaultValue={this.props.id}
                                            placeholder="Department ID"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId='DepartmentName'>
                                        <Form.Label> Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            required
                                            defaultValue={this.props.name}
                                            placeholder="Department Name"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId='DepartmentDOB'>
                                        <Form.Label>Date of Birth</Form.Label>
                                        
                                        <Form.Control
                                            type="date"
                                            name="dateOfBirth"
                                            required
                                            defaultValue={this.props.dob}
                                                
                                            placeholder="Date of Birth"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId='DepartmentGender'>
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Control as="select"  defaultValue={this.props.gender}>
                                        {this.state.gender.map(gender=>
                                            <option key={gender}>{gender}</option>
                                            )}
                                    </Form.Control>
                                    </Form.Group>
                                   
                                    <Form.Group controlId='Department'>
                                    <Form.Label>Department</Form.Label>
                                    <Form.Control as="select" defaultValue={this.props.dep} >
                                    {this.state.deps.map(dep=>
                                        <option key={dep}>{dep}</option>
                                        )}
                                </Form.Control>
                                </Form.Group>

                                    <Form.Group controlId='DepartmentSalary'>
                                        <Form.Label>Salary</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="salary"
                                            required
                                            defaultValue={this.props.sal}

                                            placeholder="Salary"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId='DepartmentResume'>
                                        <Form.Label>Resume</Form.Label>
                                        <Form.Control
                                            type="file"
                                            name="resume"
                                            required
                                            defaultValue={this.props.res}
                                            placeholder="Resume"
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">Update</Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}