import React, { Component } from 'react';
import { withRouter } from 'react-router';

class SearchForm extends Component {

    state = {
        // prevSearchText: '',
        // currentSearchText: ''
        searchText: ''
    }

    onSearchChange = (e) => {
        this.setState({ searchText: e.target.value });
        // this.setState(prevState => {
        //     return {
        //         currentSearchText: e.target.value,
        //         prevSearchText: prevState.currentSearchText
        //     };
        // },
        //     () => console.log(this.state)
        // );
        // this.setState({
        //     currentSearchText: e.target.value,
        //     prevSearchText: ''
        // }, () => console.log(this.state));

    }

    handleSubmit = e => {
        e.preventDefault();
        let query = this.query.value;
        let path = `search/${query}`;
        this.props.onSearch(query);
        // this.props.history.push(`search/${query}`);
        this.props.history.push(path);
        // this.setState(prevState => {
        //     return {
        //         currentSearchText: e.target.value,
        //         prevSearchText: prevState.currentSearchText
        //     };
        // },
        //     () => console.log("Made it to handleSubmit", this.state)
        // );
        // console.log("query: ", query);
        // console.log("query part of path: ", path.slice(7));

        // console.log("currentSearchText: ", this.state.currentSearchText);
        // console.log("prevSearchText: ", this.state.prevSearchText);
        // console.log('searchText: ', this.state.searchText);
        // console.log("history: ", this.props.history.location.pathname);
        // console.log("match: ", this.props.match)
        console.log("title prop: ", this.props.title);


        if (path.slice(7) === this.state.searchText) {
            console.log("Do not perform new search");
        } else {
            console.log("Perform new search");
        }
        e.currentTarget.reset();

    };

    render() {
        // console.log("history: ", this.props.history.location.pathname);
        // console.log("from SearchForm: ", this.props.match.params.query)
        // console.log(this.props.match)
        // console.log(this.props.title);
        return (
            <form className="search-form" onSubmit={this.handleSubmit}>
                <input type="search"
                    onChange={this.onSearchChange}
                    name="search"
                    placeholder="Search"
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

export default withRouter(SearchForm);