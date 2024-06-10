import React from 'react';

import './App.css'; 

const AppNAv = () => {
  
  return (
    <div>
      <header>
        
        
         <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between">
          <a className="navbar-brand form-text-font" href="/">
            <img src="/logo.png" alt="logo" className="navbar-logo"/>
            Expense Tracker Application</a>
        <button className="navbar-toggler"  type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
         
             </button>
             <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
           
                   <ul className="navbar-nav ml-auto">
                     <li className="nav-item active">
                      <a className="nav-link form-text-font" href="/home">Home</a>
                     </li>
                     <li className="nav-item active">
                       <a className="nav-link form-text-font" href="/add-expense">Add Expense</a>
                     </li>
                     <li className="nav-item active">
                       <a className="nav-link form-text-font" href="/"> Expenses</a>
                     </li>
                   </ul>
             </div>
        </nav>
      </header>

      
    </div>
  )
}

export default AppNAv
