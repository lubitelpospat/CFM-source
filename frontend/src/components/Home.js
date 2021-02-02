import React from 'react';
import main_logo from "./x_product_image_3.jpeg";
import "./Home.css"
import {ADMIN_EMAIL} from "../constants/admin_email.js"
const Home = () => {
    return (
        <div className="container home center" >
            <div className="row center Heading">
            <h2 className="center">Home</h2>
            
            </div>
            <div className="row center SiteFigure">
                <figure>
                    <img src = {main_logo} height="600px" width="600px"/>
                </figure>
            </div>
                <br/>
            <div className="row center mainText">
            <p>
           <h2> <b>Welcome to CFM! </b></h2> <br/>

Explore, compare and evaluate published protocols for chemically induced cellular conversion. <br></br>
</p>
<p>
Discoveries in cellular engineering pushed forward regenerative medicine, drug discovery, and toxicology. In the future, engineered tissues can recuperate altered ones and extend lifespan. They already serve as a platform for drug discovery and toxicology experiments. 
</p>
<br></br>
<p>
The breakthrough in cellular engineering was made by the utilization of small molecules instead of a combination of transcription factors: they set up the direction of differentiation and increase the yield. Furthermore, small molecules have several unique advantages such as being relatively safe, cost-effective and easy to control in a time-dependent/concentration-dependent manner. 



Contact us: <br></br>
        {ADMIN_EMAIL}

            </p>
            </div>
            <br></br>
            <br></br>
            <br></br>
        </div>
    )
}

export default Home;