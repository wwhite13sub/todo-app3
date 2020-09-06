import React, { Component } from 'react'
import Images from '../Images/TodoImg.jpg'

class Home extends Component {

    render() {
        return (
            
            <div className="container">
               <img src={Images} className="AppImg" alt="logo" />
                <div className="chart">
                <p><strong>Project Name: </strong>Accomplish Todo</p>
                <p><strong>Project Due Date: </strong>12/20/21</p>
                <p><strong>Project Objective: </strong>Create Todo List Web Application</p>
                <p><strong>Project Participants: </strong> D.Pearl,  K.Pearl,  W.White,</p>
                <br></br>
                <br></br>
              
    
            </div>
            </div>
            
        )
    }
}
export default Home;
