import {Component} from 'react';
import {Link, NavLink, withRouter, useHistory} from "react-router-dom"
import store from "../store/index"
import {addUser} from "../actions/index"
import { browserHistory, Redirect } from 'react-router';
import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";
import sha256 from 'js-sha256';
import axios from "axios"
import Cookies from "js-cookie";
import userPic from "./user.png"
import {HOST} from "../constants/host.js"
import { ADMIN_EMAIL } from '../constants/admin_email';
//const HOST = "https://cfm.mipt.ru:8443"  // "http://127.0.0.1:40001" 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [userName, setUserName] = useState("")
  const [mode, setMode] = useState(false)
  const [ratedProtocols, setRatedProtocols] = useState(Array())
  const [loggedIn, logIn] = useState(Cookies.get("userName") ? true: false)
  const [queried, setQueried] = useState(false)   
  const names = ["Reproducibility", "Detalization depth", "Functional maturity of cells"]
  function validateLoginForm() {
    return userName.length > 0 && password.length > 0;
  }
  function validateAddForm() {
    return  email.length > 0 && userName.length > 0 && password.length > 0 && passwordAgain.length > 0 && password == passwordAgain;
  }

  function handleRequestRatedProtocols() {
    const config = { 
      headers: {'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':"*"} 
      };

    const params = {

      userName: Cookies.get("userName"),
      access_token: Cookies.get("access_token")

    
  }

    axios.put(HOST + "/api/getRatedProtocols", 
    params,
    config).then(function(response) {
      if (response.data.response[0] == 'Authentification failed') {
        alert('Authentification failed while trying to request rated protocols, please contact ' + ADMIN_EMAIL)
      } else if (response.data.response[0] == "User not found in database") {
        alert('User not found in database while trying to request rated protocols, please contact ' + ADMIN_EMAIL)
      } else if (response.data.response[0] == "Database error") {
        alert('Database error occupied while trying to request rated protocols, please contact ' + ADMIN_EMAIL)
      } else if (response.status == 200) {
      setRatedProtocols(response.data.response)
      console.log("REQUESTED RATES", response)
      }

    }).catch(function(error) {
      console.log("RATES ERROR", error)
    })
  }

  function handleSubmitLogin(event) {
    event.preventDefault();
    console.log(event);
    const params = {
        request: {
        login: userName,
        password: sha256(sha256(password).concat(password)) ,
        }
      }
    const config = { 
        headers: {'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin':"*"} 
        };
    //"https://cfm.mipt.ru:8443"
    // http://127.0.0.1:40001
    axios.put(HOST + "/api/login/" + userName, 
    params,
    config)
    .then((response) => {
      console.log("RESPONSE", response.data.response);
      if (response.data.response == "User not found!") {
          alert("You are not registered yet!")
          setMode(true)
      } else {
          Cookies.set("access_token", response.data.response[0])
          Cookies.set("userName", userName)
          logIn(true)
          alert("Authentificated successfully!")
      }
    }).catch(function (error) {
      console.log("ERROR", error);
    })
  }
  function handleLogOut() {
    console.log("Logging out...")
    const params = {
        request: {
        login: userName,
        access_token: Cookies.get("access_token")
        }
      }
    const config = { 
        headers: {'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin':"*"} 
        };
    //"https://cfm.mipt.ru:8443"
    // "http://127.0.0.1:40001"
    axios.put(HOST + "/api/logout/", 
    params,
    config)
    .then((response) => {
      console.log("RESPONSE", response);
      if (response.data.response[0] == "User exists!") {
          alert("User exists!")
      } else if (response.data.response[0] == "Unknown error ocupied") {
          alert("Unknown error ocupied")
      } else {
          alert("Logged out successfully!")
          Cookies.remove("userName")
          Cookies.remove("access_token")
          logIn(false)
      } 
    }).catch(function (error) {
      console.log("ERROR", error);
    })
    
    
  }



  function handleSubmitRegister(event) {
    event.preventDefault();
    console.log(event)
    const params = {
        request: {
        login: userName,
        email: email,
        password: sha256(sha256(password).concat(password)) ,
        }
      }
    const config = { 
        headers: {'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin':"*"} 
        };
    //https://cfm.mipt.ru:8443
    // http://127.0.0.1:40001
    axios.put(HOST + "/api/addUser/" + userName, 
    params,
    config)
    .then((response) => {
      console.log("RESPONSE", response.data.response);
      if (response.data.response[0] == "User exists!") {
          alert("User exists!")
      } else if (response.data.response[0] == "Undefined server-side error ocupied!") {
          alert("Undefined server-side error ocupied!")
      } else if (response.data.status == "OK"){
          alert("Registered successfully!")
          Cookies.set("userName", userName)
          Cookies.set("access_token", response.data.response[0])
          logIn(true)
      }
    }).catch(function (error) {
      console.log("ERROR", error);
    })

  }
  if (loggedIn) {
    if (!queried) {
      handleRequestRatedProtocols()
      setQueried(true)
    }
    console.log("Logged in!")
    return (
    <div className="container LoggedIn ">
    <br></br>
    <br></br>
        <div className="row userPic center">
        <figure>
            <img src={userPic} height="200px" wifth="100px" align="center"/>
        </figure>
        </div>
        <br/>
        <div className="row">Logged in as &nbsp; <strong> {Cookies.get("userName")} </strong>. </div>
        <br/>
        
        <div className="row LogButton">
        
        <Button  onClick={() => handleLogOut() }>Log out</Button>
        </div>
        <div className="row">
          <h2>Rated protocols</h2>
          </div>
          <div className="row">
        {/* Here starts the block with rated protocols*/ }
        <table className="table table-hover table-bordered">
          <thead>
          <tr>
                <th>Protocol</th>
                <th>Ratings</th>
            </tr>
          </thead>
          <tbody>


          
        {(ratedProtocols.length > 0) && 
          ratedProtocols.map((response_basic, i) => {
          return (<tr>
                        <td>{<Link to={'/viewProtocol/' + response_basic["protocolId"]}>Protocol {response_basic["protocolId"]}</Link>}</td>
                        <td> <table>{response_basic.rates.map((rate, k) => {
                          return <tr>
                                  <td>{names[k]}</td>  <td>{rate}</td>
                                  <br></br>
                                </tr>})
                        }
                        </table>
                        </td> 
                </tr>)
            
              
            })
            
            
          } 
        </tbody>
        </table>
        
        </div>
    </div>
    )}
  else if( mode == false){
  return (
    <div className="container Login">
     <h2 className="row center">Login</h2>
     <br/>
     <br/>
      <form onSubmit={handleSubmitLogin}>
        <FormGroup controlId="email" bsSize="large">
          <FormLabel> <font size="+1"> User Name </font></FormLabel>
          <FormControl
            autoFocus
            type="login"
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel> <font size="+1"> Password </font></FormLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateLoginForm()} type="submit">
        Login
          
        </Button>
      </form>
      <br/>
      <br/>
      <div className="row center"><Button onClick={() => setMode(true)}>Don`t have an account yet?</Button></div>
    </div>
  );
  }
  else if (mode == true){
    return (
        <div className=" container Login">
         <h2 className="center"> Login </h2>
         <br/>
         <br/>
          <form onSubmit={handleSubmitRegister}>
          <FormGroup controlId="username" bsSize="large">
              <FormLabel> <font size="+1"> User Name </font></FormLabel>
              <FormControl
                value={userName}
                onChange={e => setUserName(e.target.value)}
                type="login"
              />
            </FormGroup>
            <FormGroup controlId="email" bsSize="large">
              <FormLabel> <font size="+1"> Email </font></FormLabel>
              <FormControl
                autoFocus
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </FormGroup>
           
            <FormGroup controlId="password" bsSize="large">
              <FormLabel> <font size="+1"> Password </font></FormLabel>
              <FormControl
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
              />
            </FormGroup>
            <FormGroup controlId="password_again" bsSize="large">
              <FormLabel> <font size="+1"> Type password again</font></FormLabel>
              <FormControl
                value={passwordAgain}
                onChange={e => setPasswordAgain(e.target.value)}
                type="password"
              />
            </FormGroup>
            
            <Button block bsSize="large" disabled={!validateAddForm()} type="submit">
            Register
              
            </Button>
          </form>
          <br/>
            <div className="row center">
              <Button onClick={() => setMode(false)}>Already have an account?</Button>
            </div>
        </div>
      );
  }
}

export default withRouter(Login);