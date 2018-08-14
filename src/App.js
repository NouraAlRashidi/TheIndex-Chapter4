import React, { Component } from "react";
import axios from "axios";

// Components
import Sidebar from "./Sidebar";
import Loading from "./Loading";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authors: [],
      loading: true,
      currentAuthor:{},
      authorArray: [],
      filterdAuthors: [],

    };
    this.selectAuthor = this.selectAuthor.bind(this);
    this.resetAuthor = this.resetAuthor.bind(this);
    this.filterAuthors= this.filterAuthors.bind(this);


  }

  componentDidMount() {
    axios
      .get("https://the-index-api.herokuapp.com/api/authors/")
      .then(res => res.data)
      .then(authors => this.setState({
        authors: authors,
        filterdAuthors: authors,
        loading: false }))
      .catch(err => console.error(err));
  }

  selectAuthor(author){
    axios
      .get("https://the-index-api.herokuapp.com/api/authors/" + author.id + "/")
      .then(res => res.data)
      .then(author => this.setState({currentAuthor: author}))
      .catch(err => console.error(err));


  }

  getContentView() {
    if (this.state.loading) {
      return <Loading />;
    } else if (this.state.currentAuthor.id){
      return<AuthorDetail currentAuthor= {this.state.currentAuthor}/>
    }else {
      return <AuthorsList
        selectAuthor={this.selectAuthor}
        authors={this.state.filterdAuthors}
        filterAuthors = {this.filterAuthors} />;
      //passing the function to the author list
      //passing the method versus passing a variable
    }
  }




  getAuthorDetail(){
    if (this.state.currentAuthor.first_name){
      //return<AuthorDetail currentAuthor= {this.state.currentAuthor}/>
    }else {
      return
    }
  }

  resetAuthor(){
    this.setState({currentAuthor:{}})
   }


   filterAuthors(query){
     const filterdAuthors = this.state.authors.filter (ourauthor =>
       ourauthor.first_name.toLowerCase().includes(query.toLowerCase()));
     this.setState({filterdAuthors:filterdAuthors});

   }



  render() {

    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar Reseting = {this.resetAuthor}  />
          </div>
          <div className="content col-10">{this.getContentView()}
          <div>{this.getAuthorDetail()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
