import { BaseContext } from 'koa';
import { getManager, Repository, Not, Equal } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { Book } from '../entity/book';
import { User } from '../entity/user';

export default class BookController {

    public static async getUserBooks (ctx: BaseContext) {

        // TODO Refactor: transfer manager call
        const manager = getManager();
        const user = await manager.findOne(User, ctx.params.id);
        const books: Book[] = await user.books;

        // TODO Refactor below to some function
        ctx.status = 200;
        ctx.body = books;
    }

    public static async getAllBooks (ctx: BaseContext) {

        const manager = getManager();
        const books = await manager.find(Book, { relations: ['user'] });

        ctx.status = 200;
        ctx.body = books;
    }

    public static async getBook (ctx: BaseContext) {

        const manager = getManager();
        const book = await manager.findOne(Book, { where: { id: ctx.params.id }, relations: ['user'] });

        if ( !book ) {
            ctx.status = 400;
            ctx.body = 'The book you are trying to find doesn\'t exist in the db';
            return;
        }

        ctx.status = 200;
        ctx.body = book;
    }

    public static async createBook (ctx: BaseContext) {

        const manager = getManager();
        const user = await manager.findOne(User, ctx.request.body.user_id);

        const newBook: Book = new Book();
        newBook.title = ctx.request.body.title;
        newBook.description = ctx.request.body.description;
        newBook.user = user;

        const errors: ValidationError[] = await validate(newBook);

        if (errors.length > 0) {
            ctx.status = 400;
            ctx.body = errors;
            return;
        }

        if ( await manager.findOne(Book, { where: { title: newBook.title, user: newBook.user }}) ) {
            ctx.status = 400;
            ctx.body = 'Book with this title and author already exists';
            return;
        }

        const book = await manager.save(newBook);
        ctx.status = 201;
        ctx.body = book;
    }

    public static async updateBook (ctx: BaseContext) {

        const manager = getManager();
        const user = await manager.findOne(User, ctx.request.body.user_id || 0);
        const updatedBook: Book = new Book();
        updatedBook.id = +ctx.params.id || 0; // will always have a number, this will avoid errors
        updatedBook.title = ctx.request.body.title;
        updatedBook.description = ctx.request.body.description;
        updatedBook.user = user;

        const errors: ValidationError[] = await validate(updatedBook); // errors is an array of validation errors

        if (errors.length > 0) {
            ctx.status = 400;
            ctx.body = errors;
            return;
        }

        if ( !user ) {
            ctx.status = 400;
            ctx.body = 'The user you are trying to update doesn\'t exist in the db';
            return;
        }

        if ( await manager.findOne(Book, { where: {id: Not(Equal(updatedBook.id)), title: updatedBook.title, user: updatedBook.user }}) ) {
            ctx.status = 400;
            ctx.body = 'Book with this title and author already exists';
            return;
        }

        const book = await manager.save(updatedBook);
        ctx.status = 201;
        ctx.body = book;
    }

    public static async deleteBook (ctx: BaseContext) {

        const manager = getManager();
        const bookToRemove: Book = await manager.findOne(Book, +ctx.params.id || 0);

        if (!bookToRemove) {
            ctx.status = 400;
            ctx.body = 'The book you are trying to delete doesn\'t exist in the db';
            return;
        }

        await manager.remove(bookToRemove);
        ctx.status = 204;

    }
  }
