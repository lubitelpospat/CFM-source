import React, {Component} from 'react';
import {Link, NavLink, withRouter, Redirect} from "react-router-dom"
import { Dropdown, InputGroup, DropdownButton, FormControl, Form, Button, Row, Col} from 'react-bootstrap'
import {Select} from "react-dropdown-select";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import store from "../store/index";
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
//import MyTable from "./table";
import Sugggestions from "./Suggestions"

import Cookies from 'js-cookie';
import ObjectList from 'react-object-list';
//import {FontAwesome} from 'react-object-list/icons';
import {AppProvider, Page} from '@shopify/polaris';
import DataTable from './DataTable.js';
import {HOST} from "../constants/host.js"
import "./Query.css"


const _ = require('lodash'); 
const {List, Seq} = require("immutable");





class Query extends Component {




    state = {
        queries: [
            {search_type:"", value: "", key: 0},
        ],
        possible_queries:[
          "Source Cell Type",
          "Target Cell Type",
          "Species",
          "Chemicals",
          "Transcription factors"
          
      ],
        currentPage:1,
        perPage: 7,
        totalCount: 0,
        used_fields:[],
        sortKeys: [],
        response:Array(),
        query_status:"WAIT",
        "host_with_port": HOST, //"https://cfm.mipt.ru:8443", //"http://127.0.0.1:40001", //
        "data": Array(),
        "dataView": Array(),
        
        "queried": false,
        indexes: {}

    }
 
    handlePrepairDataView = () => {
      
      let data = [...this.state.data]
      console.log("ROW", this.state.data[0])
      data = data.map((row, idx) => {
        
        let rowTmp = {

          "ViewProtocol": <div><Link to={{
            pathname:"/viewProtocol/" + row["id"],
          
          }}> Protocol {row["id"]} </Link></div>,
          ...row
        }
        rowTmp["chemicals_common"] = rowTmp["chemicals_common"].map((e, i) => {
          //console.log(deleted)
          return <div> * <a href={ "https://pubchem.ncbi.nlm.nih.gov/compound/" + row["chemicals_cid"][i]}> {e} </a> <br></br> </div>
        }) 
        rowTmp["tfs"] = rowTmp["tfs"].map((e, i) => {
          return <div>* {e} <br></br> </div>
          
        })
        
        return rowTmp
      }
      )
      this.setState({
        "dataView": data,
        "data": data
      }) 
    }



    handleRequestAllData = () => {
        console.log("Requesting data from server...")
        const config = { 
            headers: {'Content-Type': 'application/json',
                      'Access-Control-Allow-Origin':"*"} 
            };

        axios.get(HOST + "/api/requestAllData",
         config).then((response) => {
           //console.log("RESPOONSE", responseCopy)
            this.setState({
                "data": response.data.response,
                "indexes": response.data.indexes,
                "totalCount": response.data.response.length,
                
            })
            this.handlePrepairDataView()
            
            //console.log("AGAIN")
          }).catch(function(error) {
              console.log("ERROR AT GETTING ALL DATA:", error)
          }); 
         
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
                console.log(idx, value)
                const queries =  this.state.queries
                queries[idx].value = value
                this.setState({
                  queries: queries
                })
                 
                }
    
                
        handleAddField = () => {
                    if (this.state.queries.length <= 5){
                    const n_f = this.state.number_of_queries
                    const queries = [...this.state.queries, {search_type:"", value: "", key: n_f + 1}]
              
                    this.setState({
                      number_of_queries:n_f + 1,
                      queries:queries
                    })
                    //console.log(n_f, queries)
                    //console.log(this.state.used_fields)
                  }
              
                  }
        handleRemoveField = (id) => {
                    if (this.state.queries && this.state.queries.length > 1) {
                      console.log("REMOVING FIELD!")
                      console.log(this.state.queries.length)
                    const n_f = this.state.number_of_queries
                    const queries = this.state.queries.filter(({field}, idx) => {
                      return(idx !== id)
                    } )
                    this.setState({
                      number_of_queries: n_f - 1,
                      queries: queries
                    })
              
              
                    //console.log(queries)
                  }
                  }
        handleTitle = (index) => {
                    return( this.state.queries[index].search_type == "" ? ("Possible fields"):(this.state.queries[index].search_type))
                  }
                  redirectToHome = () => {
                    this.props.history.push(`/`)
                  }
        handleFilterData = () => {
          // This function isresponsible for searching in table using queries
          let data = [...this.state.data]
          //console.log("DATAVIEW BEFORE:", data)
          this.state.queries.forEach(query => {
                const queryPrepared = query.value.trim().toLowerCase()
                if ( query.search_type && (query.value.length > 0) && (queryPrepared in this.state.indexes[query.search_type])) {
                let convenient_inds = this.state.indexes[query.search_type][queryPrepared]
                console.log("GOOD INDS",convenient_inds)
                data = data.filter( (row, i) => {
                //console.log(query)
                //console.log(row[fieldMap[query.search_type]])
                
                if (convenient_inds.indexOf(i) !== -1)
                {
                  console.log(i)
                }
                return (convenient_inds.indexOf(i) !== -1)

                
              }
                    
              )
            }
          })
          //console.log("DATAVIEW:", data)
          this.setState({
            "dataView":data
          })
        }
        handleSubmit = (event) => {
          event.preventDefault()
          if( this.state.queries[0].value.length > 1) {
            console.log("LENGTH", this.state.queries[0].value.length)
          this.handleFilterData()
          } else {
            console.log("Too short!!")
            const data = [...this.state.data ]
            this.setState({
              "dataView": data
            })
          }

        }
          makeTable = () => {
          if (!this.state.queried) {
          this.handleRequestAllData()
          //console.log("DATAVIEW",this.state.dataView)
            this.setState({
              "queried": true
            })

          }
            const headings = [
                          "View Protocol",
                          "Species",
                          "Source Cell Type", 
                          "Target Cell Type", 
                          "Duration, days",
                          "Medium", 
                          "Initial Culture", 
                          //"title", 
                          "Yield",
                          //"Comment On Yield",
                          //"Type Of Protocol",
                          //"Comment On Protocol",
                          //"DOI",
                          //"authors", 
                          //"Chemicals CID",
                          "Chemicals",  
                          //"MOAs", 
                          "Transcription factors"
                        ]
      
            if (this.state.data.length === 0) {
              return (
              <div> </div>
              
              )
            }
            else {
            console.log("LOG", this.state.dataView[0])

            return(
            <div>
      
              <ObjectList
              columns={
                [
                  {dataKey: 'ViewProtocol', header: 'View Protocol'},
                  {dataKey: 'species', header: 'Species'},
                  {dataKey: 'sourceCellType', header: "Source Cell Type"},
                  {dataKey: 'targetCellType', header: "Target Cell Type"},
                  {dataKey: 'duration', header: "Duration, days"},
                  {dataKey: 'medium', header: 'Medium'},
                  {dataKey: 'chemicals_common', header: 'Chemicals'},
                  {dataKey: 'tfs', header: "Transcription Factors"},
                ]
              }
              data={this.state.dataView}
              meta={{
      totalCount: this.state.dataView.length,
    }}
    favouritesEnabled={false}
              />            
            </div>
            
            )
            

          }
      
          }


        render() {
        
            //console.log(this.state)
              
              
          
              return(
                  <div className="query container center">
                  
                  <h2>Query Database</h2>
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
                  <div></div>
                  <div></div>
                </div>
              
                
                
      
      
                   
               
                  
              
                      
                      
      
              )
      
          
}
}


export default withRouter(Query);