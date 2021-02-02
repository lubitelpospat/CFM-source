import React, {useState} from 'react';
import {Link, withRouter} from "react-router-dom"
import '../assets/scss/toolbar.scss'

const Navbar = ({navLinks, background, hoverBackground, linkColor, logo}) => {
    const [hoverIndex, setHoverIndex] = useState(-1)
    const [navOpen, setNavOpen] = useState(false)
    //console.log(navLinks)
    return (
        <nav className="responsive-toolbar"
        style={{background: background }}>
        <div className="container center WebsiteHeader">
        <font size="6">CFM</font>
        </div>

            <ul 
            style={{background}}
            className={navOpen ? ('active') : ('') }>
            <figure onClick={() => setNavOpen(!navOpen)}>
              <img src={logo} height="50px" width="50px" alt="logo-nav-toggler"/>
              
            </figure>
            <br></br>
            <br></br>
            { navLinks.map((link, index) => 
              
            <li 
              key={ index }
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex()}
              style={{ background: hoverIndex === index ? (hoverBackground || '#999') : '' }}
            >
              
            
                <Link 
                to={link.path} 
                style={{color: linkColor || "white"}}
                >
                <font size="3">
                {link.text}
                </font>
                <i className={link.icon} > </i>
                </Link>
            </li> 
            
        )}
        </ul>
        

        </nav>
    )
}

export default withRouter(Navbar);