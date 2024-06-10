import React,{useEffect, useState} from 'react';
import { getExpenses } from '../Services/ExpenseService';
const TotalSpent = () => {
    const [expenses,setExpenses]=useState([]);
    const [totalRupees,setTotalRupees]=useState(0);
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
return(
    <div className='row mt-3'>
    <div className='alert alert primary'>
        <span> Spent So Far :{totalRupees}</span>
        </div>

    </div>
)
}
export default TotalSpent