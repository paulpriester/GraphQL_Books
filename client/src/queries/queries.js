import {gql} from 'apollo-boost';

const getBooksQuery = gql`
	{
		books {
			title
			id
		}
	}
`

const getBookQuery = gql`
		query($id: ID) {
			book(id: $id) {
				id
				title
				genre
				author {
					id
					name
					age
					books {
						title
						id
					}
				}
			}
		}
`

const getAuthorsQuery = gql`
	{
		authors {
			name
			id
		}
	}
`

const addBookMutation = gql`
	mutation($title: String!, $genre: String!, $authorId: ID) {
		addBook(title: $title, genre: $genre, authorId: $authorId) {
			title
			id
		}
	}
`

const addAuthorMutation = gql`
	mutation($name: String!) {
		addAuthor(name: $name) {
			name
			id
		}
	}
`
const deleteBook = gql `
mutation deleteBook($id: ID!) {
  deleteBook(id: $id) {
    id
  }
}
`

export { getAuthorsQuery, getBooksQuery, getBookQuery, addBookMutation, addAuthorMutation, deleteBook}