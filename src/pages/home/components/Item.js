import React from 'react';


export default function Item (props) {
       return (
        <div className={props.className + ' box-container'} style={props.style}>
            <h6>{props.title}</h6>
            {props.children}
        </div>  
        )
  };
