import React from "react";
import "./UrlForm.css";

class UrlForm extends React.Component {
    render() {
        return(
            <div>
                <form action="/shorten" method="post" name="urlForm">
                    <input type="text" name="long_url" placeholder="Enter your URL"></input>
                    <button type="submit">Shorten</button>
                </form>
            </div>
        );
    }
};

export default UrlForm;