 const graphql = require('graphql');
 const axios = require('axios');
 const _ = require('lodash');
 const Book = require('../models/book');
 const Author = require('../models/author');

 const { GraphQLObjectType,
 		 GraphQLString, 
 		 GraphQLInt,
 		 GraphQLList,
 		 GraphQLID,
 		 GraphQLSchema,
 		 GraphQLNonNull
 } = graphql;

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		title: { type: GraphQLString },
		genre: { type: GraphQLString},
		bookPages: { type: GraphQLInt },
		author: {
			type: AuthorType,
			resolve(parentValue, args) {
				return Author.findById(parentValue.authorId)
			}
		}
	})
})

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt},
		books: {
			type: new GraphQLList(BookType),
			resolve(parentValue, args) {
				return Book.find({authorId: parentValue.id})
			}
		}

	})
})

const RootQuery = new GraphQLObjectType({
 	name: 'RootQueryType',
 	fields: {
 		book: {
 			type: BookType,
 			args: { id: { type: GraphQLID } },
 			resolve(parentValue, args) {
 				return Book.findById(args.id)
 			}
 		},
 		books: {
 			type: new GraphQLList(BookType),
 			resolve(parentValue, args) {
 				return Book.find({})
 			}
 		},
 		author: {
 			type: AuthorType,
 			args: { id: { type: GraphQLID}},
 			resolve(parentValue, args) {
 				return Author.findById(args.id)
 			}
 		},
 		authors: {
 			type: new GraphQLList(AuthorType),
 			resolve(parentValue, args) {
 				return Author.find({})
 			}
 		}
 	}
 })

const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addBook: {
			type: BookType,
			args: {
				//GraphQLNonNull is a validator helper
				// means value must be defined cannot be empty
				title: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: new GraphQLNonNull(GraphQLString) },
				bookPages: { type: GraphQLInt },
				authorId: {type: GraphQLID}
			},
			resolve(parentValue, {title, genre, authorId}){
				let book = new Book({ title, genre, authorId })
				return book.save()
			}
		},
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: GraphQLInt },
			},
			resolve(parentValue, {name}){
				let author = new Author({ name })
				return author.save()
			}
		},
		deleteBook: {
			type: BookType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) }},
			resolve(parentValue, {id}) {
				return Book.remove({_id: id})
			}
		}
	}
})

 module.exports = new GraphQLSchema({
 	query: RootQuery,
 	mutation
 })