import React, { useState,useEffect } from 'react';
import axios from "axios";
import moment from "moment/moment";
//import ReactDOM from 'react-dom';
import './App.css';

function App() {
 
  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');
  const [price,setPrice]=useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/api/transcations`);
        console.log("Fetched Transactions:", result.data); // Debugging
        setTransactions(result.data); // Directly set the array of transactions
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };
  
    fetchTransactions();
  }, []);
  
  
  // const getTransction=async()=>
  // {
  //   const result=await axios.get(`http://localhost:8080/api/transactions`);
  //   console.log("API Response:", result.data);
  //   return result.data;
    
  // }

  const  submitHandler= async (e)=>
  {
    e.preventDefault();   
    console.log(name,datetime,description,price);
    //const price=name.split(separator:'')[0];//name:name.Substring(price.length+1) 
     await axios.post(`http://localhost:8080/api/transaction/create`,
      { name, datetime, description,price },
       {headers: { "Content-Type": "application/json" },}
    )
    .then((res)=>
    {
      console.log(res.data,"successfully posted data");
      setName('');
      setDatetime('');
      setDescription('');
      setPrice('');
    })
    .catch((err)=> console.log(err));
    
  }

  let balance = 0;
  // const formattedDate ='';
  for (const transaction of transactions) {
    balance = balance + transaction.price;
  }

  balance = balance.toFixed(2);
  const fraction = balance.split(".")[1];
  balance = balance.split(".")[0];

  return (
    <main>
    <h1 className={"price " + (balance < 0 ? "redd" : "greenn")}>₹ {balance}<span>{fraction}</span></h1>
    <form onSubmit={submitHandler}>
      <div className="basics">
      <input type="text"  value={name} onChange={e=>setName(e.target.value)} placeholder="{'+200  new samsung tv'}" />
      <input type="datetime-local"  value={datetime} onChange={e=>setDatetime(e.target.value)} />
     
      </div >
      <div className="price">
      <input type='number' value={price} onChange={e=>setPrice(e.target.value)} placeholder="{'Enter a price'}" />
      </div>
     
     <div className="description">
     <input type="text"  placeholder="{'description'}" value={description}
      onChange={e=>setDescription(e.target.value)}/>
     </div>

     <button type="submit"> Add New Transcation</button>
     {/* {transactions.length} */}

    

    
     <div className="transactions">
        {transactions.length > 0 && transactions.map((transaction) => (

      <div className='transcation'>

        <div className='left'>
        <div className='name'>{transaction.name}</div>
        <div className='description'>{transaction.description} </div>
        </div>

        <div className='right'>
          <div  className={"price " + (transaction.price < 0 ? "red" : "green")}> ₹ {transaction.price}</div>
          <div className='datetime'> {moment(transaction.datetime).utc().format("DD MMM hh:mm")}</div>
        </div>

      </div>

       ))}
  </div>
    
  </form>

</main>
  );
}

export default App;

//onchange helps to tarck changes and update its variables when usestate cahnges component 
 //get rerender then name is passes as prop to value and its updates
