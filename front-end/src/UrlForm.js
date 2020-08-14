import React from "react";
import "./UrlForm.css";

class UrlForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
             originalUrl: "",
             urlToPost: ""
            }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const response = await fetch("/shorten", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ originalUrl: this.state.originalUrl })
        });
        const body = await response.text();
        this.setState({ urlToPost: body })
    };

    render() {
        return(
            <div class="container">
                <form onSubmit={this.handleSubmit} action="/shorten" method="post" name="urlForm">
                    <input type="text" value={this.state.originalUrl} onChange={event => this.setState({ originalUrl: event.target.value })} name="long_url" placeholder="Enter your URL"></input>
                    <button type="submit">Shorten</button>
                    <input id="shortenedLink" type="text" value={this.state.urlToPost} onChange={event => this.setState({ originalUrl: event.target.value })} name="long_url" placeholder="Your shortened URL"></input>
                </form>        
            </div>
        );
    }
};

export default UrlForm;