import React, {Component} from 'react';
import {Link, NavLink, withRouter, Redirect} from "react-router-dom"
import { Dropdown, InputGroup, DropdownButton, FormControl, Form, Button, Row, Col} from 'react-bootstrap'
import {Select} from "react-dropdown-select"
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import store from "../store/index"
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
//import MyTable from "./table";

import Cookies from 'js-cookie'

import {AppProvider, Page} from '@shopify/polaris';
import DataTable from './DataTable.js';

class Query extends Component{
    

    state = {
        queries: [
            {search_type:"", value: "", key: 0},
        ],
        possible_queries:[
          "Source cell line",
          "Target cell line",
          "Species",
      ],
        used_fields:[],
        number_of_queries: 0,
        response:Array(),
        query_status:"WAIT",
        userName: Cookies.get("userName") ? Cookies.get("userName") : null,
        access_token: Cookies.get("access_token") ? Cookies.get("access_token") : null,
        authorized:  Cookies.get("userName") && Cookies.get("access_token") ?  true :  false
    }


    handleNotAuthentificated = ( ) => {
      this.redirectToHome()
      return null;
    }


    handleChangeQueryType = (idx, e, eKey)  => {
      const used_fields = this.state.used_fields.filter((sidx) => {
        return(sidx !== idx)
      })
      e.persist()
      //console.log(idx)
      //console.log(e)
      //console.log(e.target.text)
      //alert(e.target.value)
      const queries =  this.state.queries
      queries[idx].search_type = e.target.text;
      this.setState({
        queries: queries,
        used_fields: used_fields
      })
       
      }

      handleChangeQuery =(idx, value) => {
        //console.log(idx, value)
        const queries =  this.state.queries
        queries[idx].value = value
        this.setState({
          queries: queries
        })
         
        }
    
      handleSubmit =(event) => {
        event.preventDefault();
        if( !Cookies.get("userName") || !Cookies.get("access_token")) {
          alert("You are not authentificated!")
          this.handleNotAuthentificated()
        }
        const params = {
          request: {
            login: Cookies.get("userName"),
            password: Cookies.get("password"),
          queries:this.state.queries
          }
        }
        const config = { 
          headers: {'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':"*"} 
          };

        console.log(params)
        this.setState({
          query_status:"SENT"
        })
        //"https://cfm.mipt.ru:8443"
        axios.put("http://localhost:40001" +"/api/query/"+this.state.username, 
        params,
        config)
        .then((response) => {
          console.log("RESPONSE", response.data.response);
          if (response.data.response.length == 0) {
            alert("Nothing found!")
          }
          //alert(response.data.response)
          this.setState({
            query_status: "WAIT",
            response: response.data.response,
          })
        }).catch(function (error) {
          console.log("ERROR", error);
        })
        
      }
    
    handleAddField = () => {
      if (this.state.number_of_queries < 4){
      const n_f = this.state.number_of_queries
      const queries = [...this.state.queries, {search_type:"", value: "", key: n_f + 1}]

      this.setState({
        number_of_queries:n_f + 1,
        queries:queries
      })
      //console.log(n_f, queries)
      console.log(this.state.used_fields)
    }

    }
    handleRemoveField = (id) => {
      const n_f = this.state.number_of_queries
      const queries = this.state.queries.filter(({field}, idx) => {
        return(idx !== id)
      } )
      this.setState({
        number_of_queries: n_f - 1,
        queries: queries
      })


      console.log(queries)

    }
    handleTitle = (index) => {
      return( this.state.queries[index].search_type == "" ? ("Possible fields"):(this.state.queries[index].search_type))
    }
    redirectToHome = () => {
      this.props.history.push(`/`)
    }

    makeTable = () => {
      const headings = ["Species",
                    "Source Cell Type", 
                    "Target Cell Type", 
                    "Duration, days",
                    "Medium", 
                    "initialCulture", 
                    "title", 
                    "yield",
                    "commentOnYield",
                    "type_of_protocol",
                    "comment_on_protocol",
                    "DOI",
                    "authors", 
                    "chemicals_common", 
                    "chemicals_cid", 
                    "moas", 
                    "transcription_factors"
                  ]

      if (this.state.response.length === 0) {
        return (
        <div> </div>
        
        )
      }
      else {
      //console.log("LOG", this.state.response)
      return(
      <div>

        <DataTable
        headings={headings}
        rows={this.state.response}
        />  
      
      </div>
      
      )
      }

    }

    
    render() {
        
      console.log(this.state)
        
        
    
        return(
            <div className="query container center">
            
            <h1>Query Database</h1>
            <br/>
             <>

              <Form>
              { this.state.queries.map( (fields, index) => { 
              return (
                      <Form.Row className="justify-content-md-center">
                      <Col xs={6} md={4}>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Query..."
                          onChange={(e) => {this.handleChangeQuery(index, e.target.value)}}
                          
              
                          
                        
                        />

                        </Col> 
                          <Col xs={6} md={2}>
                        <DropdownButton
                          title={this.handleTitle(index)}s
                          
                        >
                        {this.state.possible_queries.map(field => {
                          return(<Dropdown.Item eventkey={field} onSelect={(eKey, e) => {this.handleChangeQueryType(index, e, eKey)}}>{field}</Dropdown.Item>)
                        })}
                          
                        </DropdownButton>{"  "}
                        </Col>
                        <Col xs={6} md={1}>
                        <Button  variant="success" onClick={this.handleAddField}>Add</Button> 
                        </Col>
                        <Col xs={1} md={0}>
                        <Button variant="danger" onClick={ () => {this.handleRemoveField(index)}}>Remove</Button>
                        </Col>
                        </Form.Row>
              )})}
              <br/>
              <Form.Row className="justify-content-md-center">
              <Button variant="success" type="submit" onClick={this.handleSubmit}>Query</Button>

              </Form.Row>
                    
              </Form>
            </>
            <br/>
            <div>
            {this.makeTable()}
            </div>
          </div>
        
          
          


             
         
            
        
                
                

        )

    }
}

export default withRouter(Query);