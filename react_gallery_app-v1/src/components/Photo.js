import React from 'react';


const Photo = (props) => {
    // console.log(props.url)
    return (
        <li>
            <img src={props.url} alt="" />
        </li>
    );
}

export default Photo;