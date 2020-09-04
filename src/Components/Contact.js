import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { addContact } from './../redux/actions/contact';
import { getContacts } from './../redux/selectors/contact';
import  {changeActive } from './../redux/actions/navbar';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            comments: '',
            error: '',
            success: ''
        }      
    }

    showError = () => {
        if (!this.state.error.length) {
            return;
        }

        return (
            <div className="alert alert-danger mt-3" role="alert">
                {this.state.error}
            </div>
        );
    }

    showSuccess = () => {
        if (!this.state.success.length) {
            return;
        }

        return (
            <div className="alert alert-success mt-3" role="alert">
                {this.state.success}
            </div>
        );
    }

    handleFirstNameChange = (e) => {
        this.setState({
            firstName: e.target.value
        });
    }
    handleLastNameChange = (e) => {
        this.setState({
            lastName: e.target.value
        });
    }
    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value
        });
    }
    handleCommentsChange = (e) => {
        this.setState({
            comments: e.target.value
        });
    }

    addContact = (e) => {
        e.preventDefault();
        
        //validation
        if (!this.state.firstName || (this.state.firstName.length == 0)
            || !this.state.lastName || (this.state.lastName.length == 0)
            || !this.state.email || (this.state.email.length == 0)
            || !this.state.comments || (this.state.comments.length == 0)
        ) {
            this.setState({
                error: 'First Name, Last Name, Email and Comments are required.',
                success: ''
            });
            return;
        }

        //check length
        if (this.state.firstName.length > 20
            || this.state.lastName.length > 20
            || this.state.comments.length > 20
        ) {
            this.setState({
                error: 'All the inputs can be max of 20 char. length.',
                success: ''
            });
            return;
        }

        //email validation
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(this.state.email.toLowerCase())) {
            this.setState({
                error: 'Please enter a valid email.',
                success: ''
            });
            return;
        }

        this.setState({
            error: ''
        });
        
        // deleted adding contacts function once submit on contact from, caused too many small errors
        this.props.history.push("/Todos");
        this.props.changeActive('todos');
        this.cleanForm();
    }

    cleanForm = () => {
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            comments: '',
            success: 'New Contact has been added.'
        });
    }


render() {
    return (
        <div id="name" className="row">
            <div className="col-12">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control maxLength="20" value={this.state.firstName} onChange={this.handleFirstNameChange} type="text" placeholder="Enter First Name" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control maxLength="20" value={this.state.lastName} onChange={this.handleLastNameChange} type="text" placeholder="Enter Last Name" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control value={this.state.email} onChange={this.handleEmailChange} type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1" >
                  <Form.Label>Comments</Form.Label>
                  <Form.Control maxLength="100" value={this.state.comments} onChange={this.handleCommentsChange} as="textarea" rows="3" />
                </Form.Group>
                <Button onClick={this.addContact} variant="primary" type="submit" >
                  Submit
                </Button>
                {this.showError()}
                {this.showSuccess()}
            </div>
        </div>
    )
}
}

const mapStateToProps = state => {
    return {
        contactsList: getContacts(state.contact.contactsList),
    }
}

const mapDispatchToProps = dispatch => ({
    addContact: (state) => dispatch(addContact(state)),
    changeActive: (name) => dispatch(changeActive(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);