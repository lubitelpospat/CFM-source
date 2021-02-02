import React, {Component} from 'react';
import {Link, NavLink, withRouter, useHistory, Redirect} from "react-router-dom"
//import {HOST} from "../constants/host.js"
import axios from 'axios';

import "./Analytics.css"


const HOST = "http://127.0.0.1:8000";

class Analytics extends Component {
    state = {
        pageType: "SMILES_similarity",
        SMILES1: "",
        SMILES2: "",
        similarity: 0
    }

    onSMILES1Change = (value) => {
        this.setState({
            "SMILES1": value
        })
    }
    onSMILES2Change = (value) => {
        this.setState({
            "SMILES2": value
        })
    }

    handleSMILES_similaritySubmit = (e) => {
        e.preventDefault()
        console.log("Requesting SMILES similarity...")
        const config = { 
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                      'Access-Control-Allow-Origin':"*"} 
            };
            const params = {

                SMILES1: this.state["SMILES1"],
                SMILES2: this.state["SMILES2"]
            }
            axios.put(HOST + "/similarity",
            params, 
            config).then((response) => {
                console.log(response.data)
                this.setState({
                    "similarity": response.data.similarity
                })
            }).catch(function(error) {
                console.log("ERROR AT REQUESTING SMILES SIMILARITY:", error)
            })
    }


    pageSMILES_similarity = () => {
        return (
            <div className="smilessimilarityrow">
                
                <form onSubmit={this.handleSMILES_similaritySubmit}>
                <table>
                <td className="smilesinputcolumn">
                <tr className="smilesinputrow">
                <input type="text" placeholder="SMILES 1" value={this.state.SMILES1} onChange={e => this.onSMILES1Change(e.target.value)}/>
                </tr>
                <tr className="smilesinputrow">
                <input type="text" placeholder="SMILES 2" value={this.state.SMILES2} onChange={e => this.onSMILES2Change(e.target.value)}/>
                </tr>
                </td>
                <td>
                <tr className="smilessimilarityresult">
                <div>Result: {this.state.similarity}</div>
                </tr>
                </td>
                </table>
                <button
                type="button"
                onClick={this.handleSMILES_similaritySubmit}
                className="btn btn-primary btn-lg smilessimilaritycalculatebutton"
                > Calculate </button>
                </form>
            </div>
        )

    }

    setPage = (pageType) => {
        this.setState({
            pageType: pageType
        })
    }

    renderPageOfChoice = () => {
        return (
            this.pageSMILES_similarity()
        )
    }

    render() {
        return (
            <div className="analytics container">
                <h2>Analytics</h2>
                <div>
                <table>
                <tr>
                <td>
                <button type="button" onClick={(e) => this.setPage("SMILES_similarity")} className="btn btn-primary btn-sm">
                SMILES similarity
                </button>
                </td>
                </tr>
                </table>
                </div>
                <div>
                {/* Page chosen by buttons below*/}
                {this.renderPageOfChoice()}
                </div>
            </div>
        )
    }
}

export default withRouter(Analytics);