import React from 'react';
import Images from '../Images/AccT.png';
import { Navbar, Nav } from 'react-bootstrap';

class NavBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          active: 'project' /*Project to be "Home*/
      }
    }