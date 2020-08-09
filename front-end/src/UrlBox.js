import React from "react";
import "./UrlBox.css";

class UrlBox extends React.Component {
    render() {
        return(
            <div>
                <input type="text" placeholder="Enter your URL"></input>
            </div>
        );
    }
};

export default UrlBox;