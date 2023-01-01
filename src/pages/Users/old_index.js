import React,{useState} from "react";
import { collection, addDoc } from "firebase/firestore";
import {db} from '../../firebase';

const App = () => {
  const [user,setUser] = useState({
      name: "",
      email: "",
  })
  let name, value;
  const getUserData =(event)=>{
    name = event.target.name;
    value = event.target.value;
    setUser({...user, [name]:value});
  }
  const postData = async(e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        user: user,    
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return <>
      
      
    <form methos="POST">
      <label>Enter your name:
        <input type="text" name="name" 
        placeholder="Enter your name" 
        value={user.name} 
        onChange={getUserData} 
        required/>
      </label><br/><br/>
      <label>Enter your email:
        <input type="text" name="email" 
        placeholder="Enter your email" 
        value={user.email} 
        onChange={getUserData} 
        required/>
      </label><br/><br/>
      <button onClick={postData}>Submit</button>
    </form>
  </>;
};

export default App;
