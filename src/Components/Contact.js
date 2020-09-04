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