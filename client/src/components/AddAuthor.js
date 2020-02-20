import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import { addAuthorMutation, getAuthorsQuery } from '../queries/queries';

class AddAuthor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: ''		}
	}

	submitForm(e) {
		e.preventDefault();

		this.props.addAuthorMutation({
			variables: {
				name: this.state.name			
			},
			refetchQueries: [{ query: getAuthorsQuery }]
		})
		.then(() => this.setState({ name: ''}))

	}

	  render() {
	     return (
	     	<form id='add-author' onSubmit={this.submitForm.bind(this)}>

	     		<div className='field'>
	     			<label>Author Name:</label>
	     			<input type='text' 
	     				   value= {this.state.name}
	     				   onChange={(e) => this.setState({name: e.target.value})} />
	     		</div>

	     		<button>+</button>

	     	</form>
	      );
	}
}

export default graphql(addAuthorMutation, {name: 'addAuthorMutation'})(AddAuthor);
 