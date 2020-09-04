import React, { Component } from 'react'
import './todo.css';
import { connect } from 'react-redux';
import { addTodo, changeFilter, markComplete, deleteTodo } from './../redux/actions/todo';
import { getTodosByFilter } from './../redux/selectors/todo';
import { getContacts, contactFirstNameById, contactLastNameById } from './../redux/selectors/contact';
import { addContact } from './../redux/actions/contact';

class Todos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            overlayFormShow:false,
            taskDescription: '',
            assignedTo: 1,
            error: '',
            staticContacts: [
                {
                    firstName:'Dawn',
                    lastName:'Pearl',
                    email:'D@gmail.com',
                    comments:''
                },
                {
                    firstName:'Kel',
                    lastName:'Pearl',
                    email:'K@gmail.com',
                    comments:''
                },
                {
                    firstName:'Wayne',
                    lastName:'White',
                    email:'W@gmail.com',
                    comments:''
                }
            ]
        }      
    }
///////////////////////////////////////////////
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

getAssignedToOptions = () => {
    if (!this.props.contactsList) {
        return;
    }

    const assignedToMarkup = this.props.contactsList.map((contact) => {
        return (
            <option key={contact.id} value={contact.id}>{contact.firstName[0]}. {contact.lastName}</option>
        );
    });

    return (
        <select onChange={this.updatAssignedTo} className="form-control" id="assigned-to">
            {assignedToMarkup}
        </select>
    );
}

controlFormVisibility = () => {
    if (!this.state.overlayFormShow) {
        return null;
    }

    return ( //When adding task a pop up needs to show
        <div id="overlay-form" className="row">
            <div className="col-12">
                <div className="form-conatiner p-5">
                    <form className="bg-white px-5 py-5">
                        <div className="text-right">
                            <i onClick={this.hideOverlayForm} className="fa fa-times pointer" aria-hidden="true"></i>
                        </div>
                        <div className="form-group">
                            <label htmlFor="task-description">Task Description</label>
                            <input maxLength="30" onChange={this.updateTaskDescription} type="task" className="form-control" id="task-description" placeholder="Enter Task Description" />
                        </div>
                        <div>
                            <label htmlFor="assigned-to">Assigned To: </label>
                            {this.getAssignedToOptions()}
                        </div>
                        <div className="text-center pt-3">
                            <button onClick={this.addTask} type="submit" className="btn btn-success text-uppercase">Submit</button>
                        </div>
                        {this.showError()}
                    </form>
                </div>
            </div>
        </div>
    );
}

updateTaskDescription = (e) => {
    this.setState({
        taskDescription: e.target.value
    })
}
updatAssignedTo = (e) => {
    this.setState({
        assignedTo: e.target.value
    })
}

addTask = (e) => {
    e.preventDefault();
    
    //validation
    if (!this.state.taskDescription || (this.state.taskDescription.length == 0)
        || !this.state.assignedTo || (this.state.assignedTo.length == 0)
    ) {
        this.setState({
            error: 'Task Description and Assigned To are required.'
        });
        return;
    }
    //length validation
    if (this.state.taskDescription.length > 30) {
        this.setState({
            error: 'Task Description can not be more than 30 char. long.'
        });
        return;
    }

    this.setState({
        error: ''
    });
    
    this.props.addTodo(this.state);
    this.setState({
        assignedTo: 1
    })
    this.hideOverlayForm();
    this.showAllTask();
}
//////Active Commands
showOverlayForm = () => {
    this.setState({
        overlayFormShow: true
    });
}
hideOverlayForm = () => {
    this.setState({
        overlayFormShow: false
    });
}
showCompleteTask = () => {
    this.props.changeFilter('completed');
}
showNoncompleteTask = () => {
    this.props.changeFilter('active');
}
showAllTask = () => {
    this.props.changeFilter('all');
}
/////Will show active icons changing status 
showTodoList = () => {
    if (!this.props.todosList) {
        return;
    }
    const listMarkup = this.props.todosList.map((element, index) => {
        return (
            <tr key={element.id}>
                <td>{ element.taskDescription }</td>
                <td>
                    { contactFirstNameById(this.props.contactsList, element.assignedTo)[0] }.
                    &nbsp; {/*Will auto place full last but not firsst name*/}
                    { contactLastNameById(this.props.contactsList, element.assignedTo)}
                </td>
                <td className="text-success">{ element.completed?'COMPLETED':'' }</td>
                <td className="text-center text-danger">
                    <i data-index={index} onClick={() => this.props.deleteTodo(element.id)} className="pointer fa fa-trash" aria-hidden="true"></i>
                </td>
                <td className="text-center">
                    { this.showCorrectMarkup(element) }
                </td>
            </tr>
        )
    });

    return listMarkup;
}

showCorrectMarkup = (element) => {
    if (element.status.toLowerCase().trim() === 'completed') {
        return;//icon hide once click on mark complete
    }

    return (
        <i onClick={() => this.props.markComplete(element.id)} className="fa fa-square pointer" aria-hidden="true"></i>
    )
        
}

componentDidMount = () => {
    this.showAllTask();

    this.state.staticContacts.map((staticContact) => {
        const existingContact = this.props.contactsList.filter(contact => (contact.email === staticContact.email));
        if (existingContact.length) {
            return true;
        }
        this.props.addContact(staticContact);
        return true;
    });

}////////////////////
render() {
    return (
        <>
            {/* button row */}
            <div className="row">
                <div className="col-6">
                    <button className={(this.props.filter === 'all')?'active':''} onClick={this.showAllTask}>All</button>
                    <button className={(this.props.filter === 'active')?'active':''} onClick={this.showNoncompleteTask}>Active</button>
                    <button className={(this.props.filter === 'completed')?'active':''} onClick={this.showCompleteTask}>Completed</button>
                </div>
                <div className="col-6 text-right">
                    <button className="Add" onClick={this.showOverlayForm}>Add Task</button> {/*will name a pop-up overlay*/}
                </div>
            </div>
             {/* table row */}
            <div className="row">
               <div className="col-12">
                   <div id="list">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Task Description </th>
                                    <th scope="col">Assigned To</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Delete</th>
                                    <th scope="col">Mark Complete</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.showTodoList() }
                            </tbody>
                        </table>
                   </div>
                </div>
            </div>
             {/* m row */}
            { this.controlFormVisibility() }
        </>

    )
}
}
const mapStateToProps = state => {
    console.log('STATE', state);
    const filter = state.todo.filter;
    return {
        todosList: getTodosByFilter(state.todo.todosList, filter),
        filter: filter,
        contactsList: getContacts(state.contact.contactsList),
    }
}

const mapDispatchToProps = dispatch => ({
    addTodo: (state) => dispatch(addTodo(state)),
    changeFilter: filter => dispatch(changeFilter(filter)),
    markComplete: id => dispatch(markComplete(id)),
    deleteTodo: id => dispatch(deleteTodo(id)),
    addContact: (data) => dispatch(addContact(data))
});
      
export default connect(mapStateToProps, mapDispatchToProps)(Todos);
