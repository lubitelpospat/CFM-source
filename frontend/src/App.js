import React, {Component} from 'react';
import Navbar from './components/Navbar'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Query from './components/Query'
import Analytics from './components/Analytics'
import NewEntity from './components/NewEntity'
import Login from './components/Login'
import ViewProtocol from "./components/ViewProtocol"
//import Response from "./components/table"
import logo from "./components/logo_new.png"
import "./assets/scss/base.scss"
class App extends Component {
  state = {
    currentMenu: 'slide',
    side: 'left'
  };
  
  navLinks = [
    {text: "Home\n", 
    path: "/",
    icon: "glyphicon glyphicon-home",
    icon_style: ""
    },
    {text: "Query", 
    path: "/query",
    icon: "glyphicon glyphicon-filter",
    icon_style: ""

    },
    
    {text: "Analytics", 
    path: "/analytics",
    icon: "glyphicon glyphicon-signal",
    icon_style: ""
    }, 
    {text: "Add Protocol", 
    path: "/add",
    icon: "glyphicon glyphicon-plus-sign",
    icon_style : ""
    },
    {text: "Login", 
    path: "/login",
    icon: "glyphicon glyphicon-user",
    icon_style : ""
    },

    /*{text: "", 
    path: "",
    icon: ""
    }*/
  ]
  render() {
  return (
   <BrowserRouter>
   <Navbar 
         navLinks = {this.navLinks}
         logo = {logo}
         background="black"

       />
   
     <div id = 'outer-container' className="ccfe-app container" align="left">
       
       <Switch id="switch">
         <Route exact path='/' component={Home} />
         <Route path='/query' component={Query} />
         <Route path='/analytics' component={Analytics} /> 
         <Route path='/add' component={NewEntity} />
         <Route path='/login' component={Login} />
         <Route path='/viewProtocol/:protocolId' component={ViewProtocol} />
       </Switch>
     </div>
    
   </BrowserRouter>
  );
  }
}

export default App;
