import { useState, useEffect } from "react";
import Papa from "papaparse";
import { useLottie } from "lottie-react";
import groovyWalkAnimation from "../../assets/json/loader.json";
import { collection, getDocs } from "firebase/firestore";
import {db} from '../../firebase';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Index() {

  const options = {
    animationData: groovyWalkAnimation,
    loop: true
  };
  const [todos, setTodos] = useState([]);
 
  const fetchPost = async () => {
     
      await getDocs(collection(db, "todos"))
          .then((querySnapshot)=>{               
              const newData = querySnapshot.docs
                  .map((doc) => ({...doc.data(), id:doc.id }));
              setTodos(newData);                
              console.log(newData);
          })
     
  }
 
  useEffect(()=>{
      fetchPost();
  }, [])
  const { View } = useLottie(options);
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);
  // loader show hide
  const [isLoad, setIsLoad] = useState('none');
  //State to store the values
  const [values, setValues] = useState([]);
  
  const changeHandler = (event) => {
    setIsLoad('block');
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        results.data.forEach(function (item, index) {
          var myHeaders = new Headers();
          myHeaders.append("Authorization", "key=AAAAFjfHjOw:APA91bFRGy3wmjJ2GpqzTYSGuuaL-WIzCxn9BZuajNGmaDKyXkF8q18-EitujYqn2bcfT0mHoBvFS5mAIhs3slZ0DlMXJ3iPKK6yhQunMAV4jLbulqEIQRrTwxQ5MUCBitdA9DpvvLFz");
          myHeaders.append("Content-Type", "application/json");
          console.log('items are');
          console.log(item.id);
          todos.forEach(function (todo,indexTodo){
            console.log(todo.id);
            if(todo.id == item.id) {
            var raw = JSON.stringify({
              "to": todo.tokenList[0],
              "notification": {
                  "title": item.name,
                  "body": item.body,
                  "sound": "default"
              },
              "content_available": true,
              "data": {
                  userId:'123',
                  userFrom:"admin"
              },
              "priority": "high"
              });
              //console.log(raw);
              var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
              };
    
              fetch("https://fcm.googleapis.com/fcm/send", requestOptions)
              .then(response => response.text())
              .then(result => console.log(result))
              .catch(error => console.log('error', error));
            }
            else{
              console.log('sorry did not match!')
            }
          })
          
      
        });
        setIsLoad('none');
        // Parsed Data Response in array format
        setParsedData(results.data);
        
        console.log(valuesArray);
        // Filtered Values
        setValues(valuesArray);
      },
    });
  }; 
  
  const sortData = (event) =>{
    if (event.target.value === 'A - Z') 
      {// 👇️ sort by String property ASCENDING (A - Z)
        const strAscending = [...todos].sort((a, b) =>
        a.user.name > b.user.name ? 1 : -1,
      );
      setTodos(strAscending); 
      }
    if (event.target.value === 'Z - A')
      {
        // 👇️ sort by String property DESCENDING (Z - A)
          const strDescending = [...todos].sort((a, b) =>
          a.user.name > b.user.name ? -1 : 1,
        );
        setTodos(strDescending); 
      }
    
  }
  return (
    <div>
      <br/>
      <br/><br/>
     <br />
     <Container>
        <Row>
          <Col></Col>
          <Col>
            <Form.Control 
              type="file" 
              name="file"
              onChange={changeHandler}
              accept=".csv" />
          </Col>
          <Col>
            
          </Col>
        </Row>
      </Container>
      
      <div style={{margin: '0 auto',width: '50px',display: isLoad }}>
        {View}
      </div>
      </div>
  );
} 

export default Index;
