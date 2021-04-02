import React from 'react';
import css from 'styled-jsx/css'

const DemoComponent = ({title, description}) =>{

    const {className:containerClass, styles:containerStyle} = css.resolve`
        * {
            background-color: #333;
            color: #fff;
        }
    `;

    return (
        <div className={containerClass}>
            <h1>{title}</h1>
            <hr/>
            <h2>{description}</h2>
            {containerStyle}
        </div>
    )
 
}

export default DemoComponent;