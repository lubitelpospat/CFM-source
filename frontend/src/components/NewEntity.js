import React, {Component} from 'react';
import {Link, NavLink, withRouter, useHistory, Redirect} from "react-router-dom"
import axios from 'axios'
import store from "../store/index"
import Cookies from 'js-cookie'

import {HOST} from "../constants/host.js"
//const HOST = "https://cfm.mipt.ru:8443"  // "http://127.0.0.1:40001" //



class NewEntity extends Component{
    state = {
       
        single_valued_fields:[
            {name:"Source Cell Type", value: ""},
            {name:"Target Cell Type", value: ""},
            {name:"Species", value: ""},
            {name:"DOI", value: ""},
            {name:"Duration, days", value: ""},
            {name:"Medium", value: ""},
            {name:"Initial Culture", value: ""},

            {name:"Article title", value: ""}, 
            {name:"Yield of product", value: ""},
            {name:"How was the Yield calculated", value: ""},
            {name:"Comments on protocol", value: ""}
        ],
        chemical_compounds:[
            { chemical_common: "", chemical_cid: "", chemical_moa:"" }
        
            
            //canonical_smiles [],
            //associated_articles: []

        ],

        tfs: [
            {value: ""}
        ],

        sfs: [
            {value: ""}
        ],

        authors: [
            {value: ""}
        ],

        gfs:[
            {value: ""}
        ],
        redirect: "FALSE"
    
    };


    
    handleSubmit = (e) => {
        const access_token = Cookies.get("access_token") ? Cookies.get("access_token"): "password"
        const user_name = Cookies.get("userName") ?  Cookies.get("userName") : "JohnDoe"
        //console.log(access_token)
        const request = {
            user_name: user_name,
            access_token: access_token,
            request: this.state
        }
        const config = { 
            headers: {'Content-Type': 'application/json',
                      'Access-Control-Allow-Origin':"*"} 
            };
        e.preventDefault()
        //console.log("handleSubmit call:")
        //"https://cfm.mipt.ru:8443"
        // "http://127.0.0.1:40001"
        console.log("REQUEST:", request)
        axios.post(
            HOST + "/api/submitQuery",
            request,
            config
        ).then((response) => {
            
            if (response.status == 200) {
                alert("Submited successfully!")
            } 
            else {

                alert ("An error occupied!")
            }
            console.log(response);
        }
        ).catch( (error)  => {
            console.log("STATUS:", error.response.status)
            if (error.response.status == 401){
                alert("You are not authorized for this action! \nContact sizykh.ad@mipt.ru")
                this.props.history.push("/")
            }else if (error.response.status == 500) {
                alert("Please check the correcthess of your input data.")

            }
            console.log("ERROR", error);
          })
    }

    getUser = () =>{
        //return store.getState();
        return {
            username: Cookies.get("user_name") ?  Cookies.get("user_name") : "JohnDoe",
            password: Cookies.get("access_token") ? Cookies.get("access_token"): "password"
        }
    }




      handleRemoveStep = idx => () => {
        this.setState({
            compound: this.state.protocol_steps.filter((c,c_s, sidx) => idx !== sidx)
        });
      };
      onSingleValuedFieldChange = (value, field_idx) => {
          ///console.log(value)
          const single_valued_fields = this.state.single_valued_fields
          single_valued_fields[field_idx].value = value
          this.setState({
              single_valued_fields: single_valued_fields
          })
          
      }
      onStepDurationChange = (value, step_idx) => {
          const protocol_steps = this.state.protocol_steps
          protocol_steps[step_idx].step_duration = value
          this.setState({
              protocol_steps: protocol_steps
          })
      }
      onStepDescriptionChange = (value, step_idx) => {
        const protocol_steps = this.state.protocol_steps
        protocol_steps[step_idx].step_description = value
        this.setState({
            protocol_steps: protocol_steps
        })
    }

    onChemicalNameChange = (value, step_idx, chemical_idx) => {
        const protocol_steps = this.state.protocol_steps
        protocol_steps[step_idx].chemicals_used[chemical_idx].chemical_name = value
        this.setState({
            protocol_steps: protocol_steps
        })
    }

    onChemicalSmilesChange = (value, step_idx, chemical_idx) => {
        const protocol_steps = this.state.protocol_steps
        protocol_steps[step_idx].chemicals_used[chemical_idx].chemical_smiles = value
        this.setState({
            protocol_steps: protocol_steps
        })
    }

    onChemicalAmountChange = (value) => {   // TODO: Add functionality here
        console.log(value)
    }


    handleAddChemicalCompound = (e) => {
        e.preventDefault();
        console.log("ADD CHEMICAL EVENT")
        console.log(e)
        const chemicalCompounds = [...this.state.chemical_compounds, { chemical_common: "", chemical_cid: "", chemical_moa: ""}]
        this.setState({
                chemical_compounds:chemicalCompounds

        })

    }


    handleAddTranscriptionFactor = (e) => {
        e.preventDefault();
        console.log("ADD CHEMICAL EVENT")
        console.log(e)
        const tfs = [...this.state.tfs, { value:"" }]
        this.setState({
                tfs:tfs

        })
        console.log("TFS:",  tfs)

    }

    handleAddGrowthFactor = (e) => {
        e.preventDefault();
        const gfs = [...this.state.gfs, { value:"" }]
        this.setState({
                gfs:gfs

        })
        console.log("GFS:", gfs)

    }

    handleAddStressFactor = (e) => {
        e.preventDefault();
        console.log("ADD SF EVENT")
        console.log(e)
        const sfs = [...this.state.sfs, { value: "" }]
        this.setState({
                sfs:sfs

        })
        console.log("SFS:", sfs)

    }
    handleOnChemicalCommonChange = (value, chemical_idx) => {
        let chemicals = [...this.state.chemical_compounds]
        chemicals[chemical_idx].chemical_common = value
    

    this.setState({
        chemical_compounds:chemicals
    })
    }

    handleOnChemicalCidChange = (value, chemical_idx) => {
        let chemicals = [...this.state.chemical_compounds]
        chemicals[chemical_idx].chemical_cid =value
    
    this.setState({
        chemical_compounds:chemicals
    })
    }

    handleOnChemicalMoaChange = (value, chemical_idx) => {
        let chemicals = [...this.state.chemical_compounds]
        chemicals[chemical_idx].chemical_moa =value
    
    this.setState({
        chemical_compounds:chemicals
    })
    }

    handleOnTranscriptionFactorChange = (value, idx) => {
        let tfs = [...this.state.tfs]
        tfs[idx].value = value
    

    this.setState({
       tfs:tfs
    })
    }

    handleOnGrowthFactorChange = (value, idx) => {
        let gfs = [...this.state.gfs]
        gfs[idx].value = value
    

    this.setState({
       gfs:gfs
    })
    }

    handleOnStressFactorChange = (value, idx) => {
        let sfs = [...this.state.sfs]
        sfs[idx].value = value
    

    this.setState({
       sfs:sfs
    })
    }

    handleAddAuthor = (e) => {
        e.preventDefault()
        let authors = [...this.state.authors, {value:""}]
        this.setState({
            authors: authors
        })
    }

    handleOnAuthorChange = (value, idx) => {
        let authors = [...this.state.authors]
        authors[idx].value = value
        this.setState({
            authors: authors
        })
    }

    handleRemoveCompound = (idx) => {
        console.log("REMOVING COMPOUND WITH INDEX:",idx)
        let compounds = [...this.state.chemical_compounds]
        compounds = compounds.filter (function({row}, index) {
           
            return index !== idx
        })

        this.setState({
            chemical_compounds: compounds
        })
    }


    handleRemoveAuthor = (idx) => {
        let authors = [...this.state.authors]
        authors = authors.filter (function({row}, index) {
           
            return index !== idx
        })

        this.setState({
            authors: authors
        })
    }
    handleRemoveTFactor = (idx) => {
        let tfs = [...this.state.tfs]
        tfs = tfs.filter (function({row}, index) {
           
            return index !== idx
        })

        this.setState({
            tfs: tfs
        })
    }


    handleRemoveGFactor = (idx) => {
        let gfs = [...this.state.gfs]
        gfs = gfs.filter (function({row}, index) {
           
            return index !== idx
        })

        this.setState({
            gfs: gfs
        })
    }


    handleRemoveSFactor = (idx) => {
        let sfs = [...this.state.sfs]
        sfs = sfs.filter (function({row}, index) {
           
            return index !== idx
        })

        this.setState({
            sfs: sfs
        })
    }



    render() {
        return(

            <div className="newform container">
            <h2>Submit Form</h2>
            <div>
            Please note that in order to submit new articles, you should be verified as a researcher. <br/>
            Please mail to sizykh.ad@mipt.ru if you want so.
            </div>
            <h3>Article data</h3>
            <form onSubmit={this.handleSubmit}>
            { this.state.single_valued_fields.map((dt, field_idx) => {
                //const dt_tmp = dt
                //console.log(dt_tmp.value)
                return(
                
                <input type="text" placeholder={dt.name} value={dt.value} onChange={(e) => {this.onSingleValuedFieldChange(e.target.value, field_idx) }} />
                )
            }) }  
            
            </form>


            <form onSubmit={this.handleSubmit}>

            <h3> Authors: </h3>

                        {this.state.authors.map( (author, author_idx) => {
                        return(
                        <div>
                        <div>
                       
                        <div className="form-row">
                        <div className="col-md-9">
                        <input type="text" placeholder="Article Author" value={author.value} onChange={e => this.handleOnAuthorChange(e.target.value, author_idx)} />
                        </div>
                        </div>
                       
                        <br/>
                        </div>

                        <button type="button" onClick={ (e) => this.handleRemoveAuthor(author_idx)} className="btn btn-danger btn-sm">
                               Remove Author
                                </button>
                        
                        
                        
                        </div>
                        )
                })
            }
            <br/>
            <button type="button" onClick={ (e) => {this.handleAddAuthor(e)}} className="btn btn-secondary btn-sm">
                                Add Author
                                </button>

            <br/>
            <br/>
            <h3> Chemical compounds used in protocol:</h3>
            {
                this.state.chemical_compounds.map( (chemical, chemical_idx) => {
                        return(
                        <div>
                        <div>
                       

                        <br/>
                        <div className="form-row">
                        <div className="col-md-9">
                        <input type="text" placeholder="Common Chemical Name" value={chemical.chemical_common} onChange={e => this.handleOnChemicalCommonChange(e.target.value, chemical_idx)} />
                        </div>
                        </div>
                        <div className="form-row">
                        <div className="col-md-9">
                        <input type="text" placeholder="Chemical CID" value={chemical.chemical_cid} onChange={e => this.handleOnChemicalCidChange(e.target.value, chemical_idx)} />
                        </div>
                        </div>
                        <br/>
                        <div className="form-row">
                        <div className="col-md-9">
                        <input type="text" placeholder="Chemical Method of Affect" value={chemical.chemical_moa} onChange={e => this.handleOnChemicalMoaChange(e.target.value, chemical_idx)} />
                        </div>
                        </div>
                        <br/>
                        </div>
                        <button type="button" onClick={ (e) => this.handleRemoveCompound(chemical_idx)} className="btn btn-danger btn-sm">
                               Remove compound
                                </button>
                        
                        
                        
                        </div>

                        
                        )
                })
            }
            <br/>
            <button type="button" onClick={ (e) => {this.handleAddChemicalCompound(e)}} className="btn btn-secondary btn-sm">
                                Add Compound
                                </button>
            <br/>
            <br/>
            <h3>Transcription Factors: </h3>
            {
                this.state.tfs.map( (tf, tf_idx) => {
                        return(
                        <div>  
                        <div>
                       

                        <br/>
                        <div className="form-row">
                        <div className="col-md-9">
                        <input type="text" placeholder="Transcription Factor" value={tf.value} onChange={e => this.handleOnTranscriptionFactorChange(e.target.value, tf_idx)} />
                        </div>
                        </div>
                       
                        <br/>
                        </div>
                        <button type="button" onClick={ (e) => this.handleRemoveTFactor(tf_idx)} className="btn btn-danger btn-sm">
                               Remove Transcription Factor
                                </button>
                        
                        
                        
                        </div>
                        )
                })
            }
            <br/>
            <button type="button" onClick={ (e) => {this.handleAddTranscriptionFactor(e)}} className="btn btn-secondary btn-sm">
                                Add Transcription Factor
            </button>
            <br/>
             <br/>

            <h3> Growth Factors: </h3>
            {
                this.state.gfs.map( (gf, gf_idx) => {
                        return(
                        <div>  
                        <div>
                       

                        <br/>
                        <div className="form-row">
                        <div className="col-md-9">
                        <input type="text" placeholder="Transcription Factor" value={gf.value} onChange={e => this.handleOnGrowthFactorChange(e.target.value, gf_idx)} />
                        </div>
                        </div>
                       
                        <br/>
                        </div>
                        <button type="button" onClick={ (e) => this.handleRemoveGFactor(gf_idx)} className="btn btn-danger btn-sm">
                               Remove Growth Factor
                                </button>
                        
                        
                        
                        
                        </div>
                        )
                })
            }
            <br/>
            <button type="button" onClick={ (e) => {this.handleAddGrowthFactor(e)}} className="btn btn-secondary btn-sm">
                                Add Growth Factor
            </button>
            <br/>
            <br/>
            <h3>Stress Factors: </h3>
            {
                this.state.sfs.map( (sf, sf_idx) => {
                        return(
                        <div>
                        <div>
                       

                        <br/>
                        <div className="form-row">
                        <div className="col-md-9">
                        <input type="text" placeholder="Transcription Factor" value={sf.value} onChange={e => this.handleOnStressFactorChange(e.target.value, sf_idx)} />
                        </div>
                        </div>
                       
                        <br/>
                        </div>
                        
                        <button type="button" onClick={ (e) => this.handleRemoveSFactor(sf_idx)} className="btn btn-danger btn-sm">
                               Remove Stress Factor
                                </button>
                        
                        
                        </div>
                        )
                })
            }
            <br/>
            <button type="button" onClick={ (e) => {this.handleAddStressFactor(e)}} className="btn btn-secondary btn-sm">
                                Add Stress Factor
            </button>

                        


            
            <br/>
       
        
        </form>
        <br></br>  
            <button
          type="button"
          onClick={this.handleSubmit}
          className="btn btn-primary btn-lg"
        >
          Submit
        </button>
        <br/>
        <br/>
        <br/>
        </div>
        
        )
    }
}

export default withRouter(NewEntity);


