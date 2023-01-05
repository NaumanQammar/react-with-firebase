import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import  { Navigate } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));
  const users = [{ username: "admin", password: "password" }];
  function validateForm() {

    return username.length > 0 && password.length > 0;

  }

  function handleSubmit(e) {

    e.preventDefault();
    const account = users.find((user) => user.username === username);
        if (account && account.password === password) {
          setauthenticated(true)
          localStorage.setItem("authenticated", true);
          console.log('login');
          window.location.reload(false);
          <Navigate replace to="/" />
        }
      else{
        alert("User name or Password is not correct!");
      }
  }

  return (
    
    <div className="Login">
    <Container>
      <Row>
        <Col xs={12} md={4}></Col>
        <Col xs={12} md={4}>
        <Form onSubmit={handleSubmit} className="loginForm">

        <Form.Group size="lg" controlId="email">

          <Form.Label>User Name</Form.Label>

          <Form.Control

            autoFocus

            type="username"

            value={username}

            onChange={(e) => setusername(e.target.value)}

          />

        </Form.Group>

        <Form.Group size="lg" controlId="password">

          <Form.Label>Password</Form.Label>

          <Form.Control

            type="password"

            value={password}

            onChange={(e) => setpassword(e.target.value)}

          />

        </Form.Group>
        <br/>
        <Button block size="lg" type="submit" disabled={!validateForm()}>

          Login

        </Button>

      </Form>
        </Col>
        <Col xs={12} md={4}></Col>
      </Row>
    </Container>
      

    </div>

  );

}