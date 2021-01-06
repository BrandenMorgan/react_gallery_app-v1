import React, { Component } from 'react';

// Access the history object
import { withRouter } from 'react-router';

/**
 * A class component which renders a search form and stores the state of it
 */
class SearchForm extends Component {

    state = {
        searchText: ''
    }
    // Update the state to whatever the user types in to the search field.
    onSearchChange = (e) => {
        this.setState({ searchText: e.target.value });
    }
    /**
     * Method to process user input when submitted
     * @param {Object} e The event object
     */
    handleSubmit = e => {
        /**
         * Function to process any characters that would break url during a search  e.g. "?" or "%"
         * translates them to their character codes 
         * @param {string} str 
         * @return {string} The character code 
         */
        function fixedEncodeURIComponent(str) {
            return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
                return '%' + c.charCodeAt(0).toString(16);
            });
        }
        // prevent default browser behavior
        e.preventDefault();
        /* 
            Translate any URL encoding. this.query.value is a ref to what the user types in the input. 
            See input element below. 
        */
        let query = fixedEncodeURIComponent(this.query.value);
        let path = `search/${query}`;
        // Call onSearch which was what was passed to this component from the App.js component. Give it the user query 
        this.props.onSearch(query);
        // Push the path to the history object to keep track of browser history
        this.props.history.push(path);
        // Reset the input field
        e.currentTarget.reset();
    };

    render() {
        return (
            // Pass a reference to handleSubmit method to onSubmit attribute
            <form className="search-form" onSubmit={this.handleSubmit}>
                <input type="search"
                    // Pass a reference to onSearchChange to onChange to update state when a user submits the form
                    onChange={this.onSearchChange}
                    name="search"
                    placeholder="Search"
                    // A reference to user input. See handleSubmit method
                    ref={(input) => this.query = input}
                    required />
                <button type="submit" className="search-button">
                    <svg fill="#fff" height="24" viewBox="0 0 23 23" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                        <path d="M0 0h24v24H0z" fill="none" />
                    </svg>
                </button>
            </form>
        );
    }

}
// Wrapping a component in "withRouter" grants access to the history object.
export default withRouter(SearchForm);