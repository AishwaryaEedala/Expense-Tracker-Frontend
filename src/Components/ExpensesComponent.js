import React, { useEffect, useState } from 'react'
import AppNAv from '../AppNAv';
import { createExpense, getExpense, getExpenses, updateExpense } from '../Services/ExpenseService'
import { getCategories } from '../Services/CategoryService';
import { useNavigate,useParams,Link } from 'react-router-dom'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import CurrencyInput from 'react-currency-input-field';
import './style.css';

const ExpensesComponent = () => {
    const [categories,setCategories]=useState([]);
    const [description,setDescription]=useState(''); 
    const [expensedate,setExpensedate]=useState(null);
    const [location,setLocation]=useState('');
    const [rupees,setRupees] =useState('');
    const [category_name,setCategory_name]=useState(null);    

    useEffect(()=>{
        getAllCategories();
 },[])
 function getAllCategories(){
     getCategories().then((response)=>{
         setCategories(response.data);           
     }).catch(error =>{
         console.error(error);
     })
     
 }


    const{id}=useParams();


    const [errors,setErrors]=useState({
        description:'',
        location:'',
        rupees:'',
        expensedate:'',
        category_name:''
    })
   

    const navigator=useNavigate();
    useEffect(()=>{
        if(id){
            getExpense(id).then((response)=>{
                setDescription(response.data.description);
                setLocation(response.data.location);
                console.log(response.data.rupees,'gffkhghm');
                setRupees(response.data.rupees);
                setExpensedate(new Date(response.data.expensedate));
                setCategory_name(response.data.category_name);
            }).catch(error => {
                console.error(error);
            })
        }
    },[id])
    function saveOrUpdateExpense(e){
        e.preventDefault();
        if(validateForm()){
            const expense ={description,location,rupees,expensedate,category_name};
            console.log(expense)
            if(id){
                updateExpense(id, expense).then((response)=>{
                console.log(response.data);
                navigator('/expenses')
                }).catch(error=>{
                    console.error(error);
                })

            }else{
                createExpense(expense).then((response)=>{
                console.log(response.data);
                navigator('/expenses')
            }).catch(error=> {
                console.error(error);
            })

            }   
        }
    
    }
    const validateForm =()=>{
        let isValid =true;
        const errors={};
        if(!description.trim()){
            errors.description="Enter the Description of the Expense!";
            isValid=false;
        }
            if(description.length >30){
            errors.description="Description can't be more than 30 letters!";
            isValid=false;
        }
          else if(description.length < 3){
            errors.description="Description can't be less than 3 letters!";
            isValid=false;
        }
        else if((!/^[a-zA-Z]+$/.test(description))){
            errors.description="Description can only contain Letters!";
            isValid=false;
        }
        if(!location.trim()){
            errors.location="Enter Location of the Expense!";
            isValid=false;
        }
        if(location.length >30){
            errors.location="Location can't be more than 30 letters!";
            isValid=false;
        }
        else if(location.length < 3){
            errors.location="Location can't be less than 3 letters!";
            isValid=false;
        }
        else if((!/^[a-zA-Z]+$/.test(location))){
            errors.location="Location can only contain Letters!";
            isValid=false;
        }
        
        if(!rupees.trim()){
            errors.rupees="Enter Cost of the Expense!";
            isValid=false;
        }
        if(rupees.length >30){
            errors.rupees="Cost can't be more than 30 integers!";
            isValid=false;
        }
        if(!expensedate){
            errors.expensedate="Select Date of the Expense!";
            isValid=false;
        } 
        if(expensedate && expensedate > new Date()){
            errors.expensedate="Date can't be in the future!";
            isValid=false;
        }
        if(!category_name){
            errors.category_name="Enter Category of the Expense!"
            isValid=false;
        }
        
            setErrors(errors);
            return isValid;
    };

    
    function pageTitle(){
        if(id){
            return <h2 className='text-center form-text-font'>Edit Expense</h2>
        }
        else{
            return <h2 className='text-center form-text-font'>Add Expense</h2>
        }
    }

  return (
    <div className='container'>        
        <br/><br/>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>   
            <br/>
               {
                pageTitle()
               }            
                <div className='card-body'></div>
                <form>
                    <div className='form-group mb-2'>
                        <label className='form-label form-text-font'>Description</label>
                        <input type='text'
                        placeholder='Enter Description of the Expense'
                        name='description'
                        value={description}
                        className={`form-control ${errors.description ? 'is-invalid':''}`}
                        onChange={(e) =>setDescription(e.target.value)}>
                        </input>
                        {errors.description && <div className='invalid-feedback'>{errors.description}</div>}
                    </div>
                    <div className='form-group mb-2'>
                        <label className='form-label form-text-font '>Location</label>
                        <input type='text'
                        placeholder='Enter Location of the Expense'
                        name='location'
                        value={location}
                        className={`form-control ${errors.location ? 'is-invalid':''}`}
                        onChange={(e) =>setLocation(e.target.value)}>
                        </input>
                        {errors.location &&<d5v className='invalid-feedback'>{errors.location}</d5v>}
                    </div>
                    <div className='form-group mb-2'>
                        <label className='form-label form-text-font'>Cost</label>
                        <CurrencyInput
                        placeholder='Enter Cost of the Expense'
                        name='rupees'
                        id='rupees'
                        value={rupees}
                        className={`form-control ${errors.rupees ? 'is-invalid':''}`}
                        onValueChange={(value) => setRupees(value)}
                            prefix="₹"
                            decimalSeparator="."
                            thousandSeparator=","
                            allowNegativeValue={false}/>
                        {errors.rupees &&<div className='invalid-feedback'>{errors.rupees}</div>}
                    </div>
                    <div className='form-group mb-2'>
                        <label className='form-label form-text-font'>Date</label>
                        <div>
                        <DatePicker
                        selected={expensedate}
                        dateFormat="YYYY/MM/dd"
                        placeholderText="Select Expense Date"
                        className={`form-control ${errors.expensedate ? 'is-invalid':''}`}
                        onChange={(date) =>{
                            console.log("Selected Date:", date);
                            setExpensedate(date);
                        }}
                        />
                        {errors.expensedate && <div className="test-danger mt-2 validation-text">{errors.expensedate}</div>}
                        </div>
                    </div>
                    <div className='form-group mb-2'>
                        <label className='form-label form-text-font'>Category</label>
                        <div>
                        <select 
                        selected={category_name}
                        onChange={(e) =>setCategory_name(e.target.value)}>
                        
                     <option>Select Category</option>
                     {categories.map( category =>
                    <option id={category.id} >
                    {category.category_name} 
                    </option>
                    )}
                    </select>
                    </div>
                        {errors.category_name &&<div className="test-danger mt-2 validation-text">{errors.category_name}</div>}

                    </div>
                    <button className='btn btn-success' onClick={saveOrUpdateExpense}>Save</button>
                </form>
                {errors.category_name &&<div className='invalid-feedback'>{errors.category_name}</div>}
            </div>
        </div>

    </div>
  )
}


export default ExpensesComponent
