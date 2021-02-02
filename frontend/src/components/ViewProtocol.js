import {Component, renderToString } from 'react';
import {Link, NavLink, withRouter, useHistory} from "react-router-dom"
import store from "../store/index"
import {addUser} from "../actions/index"
import { browserHistory, Redirect } from 'react-router';
import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import axios from 'axios';
import Cookies, { get } from "js-cookie";


import "./ViewProtocol.css"


import BeautyStars from 'beauty-stars';

import {HOST} from "../constants/host.js"
import {ADMIN_EMAIL} from "../constants/admin_email.js"






//var Rating = require('react-rating');










class ViewProtocol extends Component {
    state = {
        data: Array(),
        queried: false,
        avgs: Array(),
        allFields:["Protocol ID", 
                    "DOI",
                    "Species",
                    "Source Cell Type",
                    "Target Cell Type",
                    "Duration, days",
                    "Medium",
                    "Initial Culture",
                    "Title",
                    "Yield, %",
                    "Comment On Yield",
                    "Comment On Protocol",
                    "Authors",
                    "Chemicals",
                    "Chemicals CID",
                    "MOAs", 
                    "Transcription Factors",
                    "Stress Factors",
                    "Growth Factors"],
        ratings: [
            {"id": "first_rate","name":"Reproducibility",  "value": 0, "description":"5 if you get markers output 100% of declared efficiency or higher"},
            {"id": "second_rate","name": "Detalization depth",  "value": 0, "description":"Was the protocol description from article deep enough?"},
            {"id": "third_rate", "name":"Functional maturity of cells", "value": 0, "description":"If induced cells fully reassemble target cells"}

        
    ],
    ready_to_rate: false
    }
    handleRequestData = () => {
        const config = { 
            headers: {'Content-Type': 'application/json',
                      'Access-Control-Allow-Origin':"*"} 
            };
            
       axios.get(HOST + "/api/query/" + this.props.match.params.protocolId,
         config).then((response) => {
             let response_data = response.data.response[0];

             let chemicals_tmp = response_data[13].map((e, i) => {
                 let cid = response_data[14][i];

                 //console.log("CID: ", cid)
                 //console.log("INNER", "https://pubchem.ncbi.nlm.nih.gov/compound/" + cid)
             return <div> * <a href= {"https://pubchem.ncbi.nlm.nih.gov/compound/" + cid }> {e}</a>  </div>
             })
            //console.log("13: ", typeof( response_data[14][0]))
             response_data[13] = chemicals_tmp;
             this.setState({
                 data: response_data,
                 queried: true,
                 avgs: response.data.avgs
             })
             
             console.log(response.data.response)
         })
         .catch((error) => {
             console.log(error)
         }) 
         
         
         
        
         
    }



    handleCangeRating = (i, value) => {
        const ratings = [...this.state.ratings]
        ratings[i]["value"] = value
        this.setState({
            ratings: ratings
        })




    }


    handleSubmit = ( ) => {
        const params = {
            request: {
            userName: Cookies.get("userName"),
            access_token: Cookies.get("access_token"),
            protocolId: this.state.data[0],
            ratings: this.state.ratings ,
            }
          }
        const config = { 
            headers: {'Content-Type': 'application/json',
                      'Access-Control-Allow-Origin':"*"} 
            };
        //https://cfm.mipt.ru:8443
        // http://127.0.0.1:40001
        axios.put(HOST + "/api/rateProtocol", 
        params,
        config)
        .then((response) => {
          console.log("RESPONSE", response.data.response);
          if (response.status !== 200) {
              alert("Http(s) error occupied! Please contact " + ADMIN_EMAIL)
          } else if (response.data.response[0] == "Undefined server-side error ocupied!") {
              alert("Undefined server-side error ocupied! Please contact " + ADMIN_EMAIL)  
          } else if(response.data.response[0] == "Authentification error"){
              alert ("Authentifiction error occupied")
         } else if (response.data.response[0] == "Database error") {
             alert("Database error ocupied! Please contact " + ADMIN_EMAIL)
         } else if (response.data.response[0] == "An error occupied while trying to set ratings") {
             alert("Server-side error occupied! Please contact " + ADMIN_EMAIL)
         }
          else if (response.status == 200){
              alert("Protocol rated successfully!")
          }
        }).catch(function (error) {
          console.log("ERROR", error);
        })
    }

    componentDidMount = () => {
        if (Cookies.get("access_token")  && Cookies.get("userName")) {
            this.setState({
                ready_to_rate: true
            })
        }

    }

    render () {
        if (!this.state.queried) {
        this.handleRequestData();
        console.log(typeof(this.state.data))
        }
    return (
        <div className="container viewprotocol ">
            <div className="row center">
            <h4 className="center">Protocol </h4>
            </div>
            <div className="row center">
            <table className="table table-hover table-bordered">
            <thead>
            <tr>
                <th>Property</th>
                <th>Value</th>
            </tr>
            </thead>
            <tbody>
            {this.state.data.map (
                (field, idx) => {
                    if (idx !== 14) {
                    return  <tr>
                        <td>{this.state.allFields[idx]}</td>
                        <td>{Array.isArray(field) ? field: field} </td> 
                        </tr>
                    }
                }
            ) }
            </tbody>

            </table>
            </div>
            <div className="row center">
                <h3>Average protocol ratings </h3> 
            </div>
            <div className="row center">
                <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>Measure</th>
                        <th>Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.avgs.map((row, i) => {
                        return <tr>
                            <td>{this.state.ratings[i].name}</td>
                            <td>{row}</td>
                        </tr>
                    })}


                </tbody>
                </table>             


            </div>
            <div >
            {this.state.ready_to_rate ? (<div>
                <h4>Please rate this protocol if you have reproduced it!</h4>
                {this.state.ratings.map((row, i) => {
             return <div className="card row ">
                 
                 <h5>{row.name}</h5>
                 <br></br>
                <div> {row.description}</div>
                <br></br>
                <br></br>
                 <BeautyStars
                value={row.value}
                onChange={value => this.handleCangeRating(i, value)}
      /> <br></br> </div>}
                )}  
                <div className="row center">
                <button
                type="button"
                onClick={this.handleSubmit}
                className="btn btn-primary btn-lg"
                >
                Submit Ratings
                </button>
                </div>
                <br></br>
                <br></br>
                <br></br>
                
                </div>) : (<div>
                <h4> <Link to="/login" >Login or register</Link> on website to rate protocols</h4>
                <br></br>
                <br></br>
                <br></br>
                </div>)}

            </div>
            
            

        </div>
    )
            }
}

export default withRouter(ViewProtocol);