import React,{useState,useEffect} from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import {db} from '../../firebase';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const App = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (event) => {setShow(true);setUserId(event.currentTarget.id);setUserName(event.currentTarget.name)}
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [todos, setTodos] = useState([]);

  const fetchPost = async () => {
     
    await getDocs(collection(db, "users"))
        .then((querySnapshot)=>{               
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
            setUsers(newData);                
            console.log(newData);
        })
        console.log(users);

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
const selectMsg = (event) =>{
  if(event.target.value === 'other'){
    var x = document.getElementById('msgField');
    x.classList.remove("hidden");
  }
  else{
    setMessage(event.target.value);
    var u = document.getElementById('msgField');
    u.classList.add("hidden");
  }
}
const msgSent = () =>{
  console.log(message);
  console.log(userId);
  setShow(false);

        var myHeaders = new Headers();
          myHeaders.append("Authorization", "key=AAAAFjfHjOw:APA91bFRGy3wmjJ2GpqzTYSGuuaL-WIzCxn9BZuajNGmaDKyXkF8q18-EitujYqn2bcfT0mHoBvFS5mAIhs3slZ0DlMXJ3iPKK6yhQunMAV4jLbulqEIQRrTwxQ5MUCBitdA9DpvvLFz");
          myHeaders.append("Content-Type", "application/json");
          console.log('items are');
          console.log(userId);
          todos.forEach(function (todo,indexTodo){
            console.log(todo.id);
            if(todo.id == userId) {
            var raw = JSON.stringify({
              "to": todo.tokenList[0],
              "notification": {
                  "title": userName,
                  "body": message,
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
}
const sortData = (event) =>{
  if (event.target.value === 'A - Z') 
    {// 👇️ sort by String property ASCENDING (A - Z)
      const strAscending = [...users].sort((a, b) =>
      a.name > b.name ? 1 : -1,
    );
    setUsers(strAscending); 
    }
  if (event.target.value === 'Z - A')
    {// 👇️ sort by String property DESCENDING (Z - A)
      const strDescending = [...users].sort((a, b) =>
        a.name > b.name ? -1 : 1,
      );
      setUsers(strDescending); 
    }
  
}
  return <>
    <div class="container-fluid">
      <Container>
        <Row>
          <Col></Col>
          <Col></Col>
          <Col>
          <InputGroup className="mb-3">
            <Form.Control
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              type="text" 
              placeholder="Search here!" 
              onChange={event => setQuery(event.target.value)}
            />
          </InputGroup>
          </Col>
          <Col>
            <Form.Select aria-label="Default select example" onChange={sortData}>
              <option value="A - Z">A - Z</option>
              <option value="Z - A">Z - A</option>
            </Form.Select>
          </Col>
        </Row>
      </Container>
      
      <Table striped responsive size="lg">
        <tbody>
          <tr>
            <th>User Id</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>User Company</th>
            <th>Action</th>
          </tr>
          {users.filter(user => {
            if (query === '') {
              return user;
            } else if (user.name.toLowerCase().includes(query.toLowerCase())) {
              return user;
            }
          }).map((value, index) => {
            return (
              <tr key={index}>
                <td>{value.userId}</td>
                <td>{value.name}</td>
                <td>{value.email}</td>
                <td>{value.company}</td>
                <td><Button id={value.userId} data-name={value.name} variant="dark" onClick={handleShow}>Send Message</Button></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select or Add Message Below!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select aria-label="Default select example" onChange={selectMsg}>
            <option>Open this select message</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
            <option value="other">Other</option>
          </Form.Select>
          <br/>
          <InputGroup className="hidden" id="msgField">
            <Form.Control
              placeholder="Write message here!"
              aria-label="Message"
              aria-describedby="basic-addon1"
              onChange={event => setMessage(event.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" onClick={msgSent}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
  </>;
};

export default App;
