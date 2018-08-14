import React, { Component } from "react";

class AuthorDetail extends Component {
    // Books(AuthorBooks){
    //   for (let i = 0; i<AuthorBooks.length; i++){
    //   return <td> {AuthorBooks[i]}</td>
    // }         }
    render(){
      const currentAuthor = this.props.currentAuthor;
      //const BookLength = currentAuthor.books.authors.map(book =>  book.name).join();


      const AuthorBooks = currentAuthor.books.map(book =>
         {
           const BookLength = book.authors.map(book =>  book.name).join(", ");

           return(
           <tr>
               <td>{book.title}</td>
               <td>{BookLength}</td>
{/*Another way to do it
{book.authors.map (author => ({author.name}))}

THIS SHOULD PROBABLY BE ITS OWN COMPONENT
  */}

               <td>
                   <button className="btn" style={{backgroundColor: book.color}}/>
               </td>
           </tr>
         )});



      return(
        <div className="author col-xs-10">
            <div>
                <h3>{currentAuthor.first_name + currentAuthor.last_name}</h3>
                <img src= {currentAuthor.imageUrl}className="img-thumbnail"/>
            </div>
            <table className='mt-3 table'>
                <thead>
                    <tr>
                        <th>Name  </th>
                        <th>Authors</th>
                        <th>Color</th>
                    </tr>
                </thead>
                <tbody>
                  {AuthorBooks}
                  //the results of mapping through each author's books
                </tbody>
            </table>
        </div>
      )
    }

}

export default AuthorDetail;
