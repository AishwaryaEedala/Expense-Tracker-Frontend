import React, { Component } from 'react';
import AppNav from './AppNAv';
import'./App.css'

class Home extends Component {
    state = {  } 
    render() { 
        return (
            <div className='backgroung-container' >
                <div>
            <h2 style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
                Welcome to Expense App!
            </h2>
            </div>
            </div>
        );
    }
}
 
export default Home;