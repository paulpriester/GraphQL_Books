import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import { compose }from 'redux'
import { getBookQuery, getBooksQuery, deleteBook } from '../queries/queries';


class BookDetails extends Component {

	onDeleteBook(id) {
		this.props.mutate({
			variables: {id},
		    refetchQueries: [{ query: getBooksQuery }]
		})
		.then(() => this.props.data.refetch())
	}

	displayBookDetails(){
		const {book} = this.props.data;
		if(book) {
			return (
				<div>
					<h2>{book.title}</h2>
					<p>{book.genre}</p>
					<p>{book.author.name}</p>
					<p>All books by this author:</p>
					<ul className='other-books'>
						{book.author.books.map(item => {
							return<li key={item.id}> {item.title}</li>	
						})}
					</ul>

					<button className="deletebook"onClick={() => this.onDeleteBook(book.id)}> Delete </button>
					
				</div>
			)
		} else {
			return (
				<div>No book selected...</div>
			)
		}
	}
  render() {
     return (
        <div id='book-details'>
        	<p>{this.displayBookDetails()}</p>
        </div>
      );
    }
}

export default compose(graphql(getBookQuery, {
	options: (props) => {
		return {
			variables: {
				id: props.bookId
			}
		}
	}
}), graphql(deleteBook))(BookDetails)