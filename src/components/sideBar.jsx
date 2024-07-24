import React from "react";
import { FiHome } from "react-icons/fi";
import { PiDotsNineBold } from "react-icons/pi";
import '../App.css';

function SideBar() {
    const hstyle = { 
        color: "white",
        position: 'absolute',
        top: '129px',
        verticalAlign: 'middle',  
        left:'23px'
    };
    const dstyle = { 
        color: "white",
        position: 'absolute',
        top: '190px',
        verticalAlign: 'middle',  
        left:'19px'
    };

    return (
        <div className="SideBar">
            <FiHome size="1.5rem" style={hstyle} />
            <PiDotsNineBold  size="2rem" style={dstyle} />

        </div>
    );
}

export default SideBar;
