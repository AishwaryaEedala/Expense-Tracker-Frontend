import React,{useEffect, useState} from 'react';
import { deleteExpense,getExpenses } from '../Services/ExpenseService';
import Moment from 'react-moment';  
import {useNavigate} from 'react-router-dom'
import { NumericFormat } from 'react-number-format';
import './style.css';

const GetExpensesComponent = () => {
    const [expenses,setExpenses]=useState([]);
    const [totalRupees,setTotalRupees]=useState(0);
    const navigator = useNavigate();
    useEffect(()=>{
       getAllExpenses();
},[])
function getAllExpenses(){
    getExpenses().then((response)=>{
        setExpenses(response.data);
        calculateTotalRupees(response.data);           
    }).catch(error =>{
        console.error(error);
    });
    
};
const calculateTotalRupees=(data)=>{
    let sum = 0;
    data.forEach(expenses => {
        sum = sum + parseInt(expenses.rupees);
    });
    setTotalRupees(sum);
};
function addNewExpense(){
    navigator('/add-expense')
}
function updateExpense(id){
    navigator(`/edit-expense/${id}`)
}
function removeExpense(id){
    if(window.confirm("Are you sure you want to delete the expense")){
    console.log(id);
    deleteExpense(id).then((response)=>{
        getAllExpenses();
    }).catch(error=>{
        console.error(error);
    });
}
}
  return (
    
    <div className="background-container"> 
    
        <div className="total-salary-box">
           <p className="total-salary form-text-font">Spent so Far : <span>₹{totalRupees}</span></p>
        </div>
        <br/>
        <h2 className='text-center form-text-font'>EXPENSE LIST</h2>
        <br/>
        <div className="table-container">
        <table className="table table-striped table-bordered table-font ">
            <thead >
                <tr>
                <th >ID</th>
                   <th>DESCRIPTION</th>
                   <th>LOCATION</th>
                   <th> COST </th>
                   <th> DATE</th>
                   <th> CATEGORY</th>
                   <th>ACTION</th>
                </tr>
            </thead>
            <tbody>{
            expenses.map( expense =>
                <tr key={expense.id}>
                <td>{expense.id}</td>
                <td>{expense.description}</td> 
                <td>{expense.location}</td>
                <td>{new Intl.NumberFormat("en-IN",{style: "currency",currency: "INR"}).format(parseInt(expense.rupees))}</td>
                <td><Moment date={expense.expensedate} format="YYYY/MM/DD"/></td>
                <td>{expense.category_name}</td>                    
                <td>
                    <button className='btn btn-info' onClick={()=>updateExpense(expense.id)}>Edit</button>
                    <button className="btn btn-danger delete button"onClick={()=>removeExpense(expense.id)}style={{marginLeft:'10px'}}><i className="fas fa-times"></i></button>
                </td>
    
  </tr>)
}

            </tbody>
        </table>
        </div>
        </div>
    

  )
}

export default GetExpensesComponent
