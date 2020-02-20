import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import { compose }from 'redux'
import { getAuthorsQuery, getBooksQuery, addBookMutation } from '../queries/queries';

class AddBook extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			genre: '',
			authorId: ''
		}
	}

	displayAuthors() {
		var data = this.props.getAuthorsQuery
		if(data.loading) {
			return(<option disabled>Loading Authors...</option>)
		} else {
			return data.authors.map(author => {
				return(  
					<option key={author.id} 
							value={author.id}>
							{author.name}
					</option>
				)
			})
		}
	}

	submitForm(e) {
		e.preventDefault();
		console.log(this.props)
		this.props.addBookMutation({
			variables: {
				title: this.state.title,
				genre: this.state.genre,
				authorId: this.state.authorId
			},
			refetchQueries: [{ query: getBooksQuery }]
		})
		.then(() => this.setState({ title: '', genre: '', authorId: ''}))

	}

	  render() {
	  	console.log(this.props)
	     return (
	     	<form id='add-book' onSubmit={this.submitForm.bind(this)}>

	     		<div className='field'>
	     			<label>Book Name:</label>
	     			<input type='text' 
	     				   value={this.state.title}
	     				   onChange={(e) => this.setState({title: e.target.value})} />
	     		</div>

	     		<div className='field'>
	     			<label>Genre:</label>
	     			<input type='text' 
	     				   value={this.state.genre}
	     				   onChange={(e) => this.setState({genre: e.target.value})} />
	     		</div>

	     		<div className='field'>
	     			<label>Author:</label>
	     			<select value={this.state.authorId} onChange={(e) => this.setState({authorId: e.target.value})}>
	     				<option>Select author</option>
	     				{this.displayAuthors()}
	     			</select>
	     		</div>

	     		<button>+</button>

	     	</form>
	      );
	    }
}

export default compose(
	graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
	graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);
 