import React, { Component } from 'react';
import {BrowserRouter, Route, BrowserRouter as Router, Routes, Switch} from 'react-router-dom';
import './App.css'; 
import GetExpensesComponent from './Components/GetExpensesComponent';
import AppNAv from './AppNAv';
import ExpensesComponent from'./Components/ExpensesComponent'
import Home from './Home';
import '@fortawesome/fontawesome-free/css/all.min.css'


class App extends Component {
    state = {  } 
    render() { 
        return (
            <>
                <BrowserRouter>
                <AppNAv/>
                <div className="container">
                </div>
                <Routes>
                <Route path = '/expenses' element={<GetExpensesComponent/>}></Route>
                <Route path='/home' element={<Home/>}></Route>
                <Route path='/'element={<GetExpensesComponent/>}></Route>
                <Route path='/add-expense'element={<ExpensesComponent/>}></Route>
                <Route path='/edit-expense/:id'element={<ExpensesComponent/>}></Route>
                
                
            
                </Routes>
                </BrowserRouter>
               
            </>
            
        );
    }
}
 
export default App;