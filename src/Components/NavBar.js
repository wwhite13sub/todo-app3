import React from 'react';
import Images from '../Images/AccT.png';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import  {changeActive } from './../redux/actions/navbar';

class NavBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          active: 'project' /*Project to be "Home*/
      }
    }
    /*Command Props for active Nav*/
    changeActiveToProject = () => {
        this.props.changeActive('project');
       }
       changeActiveToTodo = () => {
         this.props.changeActive('todos');
       }
       changeActiveToContact = () => {
         this.props.changeActive('contact');
       }

    
    render() {
        return ( 
          <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
            <img src={Images} className="AppImg2" alt="logo" />
            <Link onClick={this.changeActiveToProject} className={(this.props.active==='project'?'active bar':'bar')} to="/">
              Project
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Link onClick={this.changeActiveToTodo} className={(this.props.active==='todos'?'active bar':'bar')} to="/Todos">
                    Todo
                </Link>
                <Link onClick={this.changeActiveToContact} className={(this.props.active==='contact'?'active bar':'bar')} to="/Contact">
                    Contact
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar> 
        );
      };
    }
    const mapStateToProps = state => {
        console.log('state', state);
          return {
              active: state.navbar.active
          }
      }
      
      const mapDispatchToProps = dispatch => ({
          changeActive: (name) => dispatch(changeActive(name))
      });
      export default connect(mapStateToProps, mapDispatchToProps)( NavBar );