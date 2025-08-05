import { GENRE } from '../Enums/GENRE';
import { STATUS } from '../Enums/STATUS';

export class Book {

    // Variables
    private _title!: string;
    private _author!: string;
    private _publisher!: string;
    private _publicationYear!: number;
    private _isbn!: string;
    private _genre!: GENRE;
    private _status!: STATUS;
    private _borrowDate: Date | null;
    private _returnDate: Date | null;

    // Constructor
    constructor(title: string, author: string, publisher: string, publicationYear: number, isbn: string, genre: GENRE, status: STATUS, borrowDate?: Date, returnDate?: Date) {
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.publicationYear = publicationYear;
        this.isbn = isbn;
        this.genre = genre;
        this.status = status;
        if (borrowDate !== undefined) {
            this._borrowDate = borrowDate;
        }
        else {
            this._borrowDate = null;
        }
        if (returnDate !== undefined) {
            this._returnDate = returnDate;
        }
        else {
            this._returnDate = null;
        }
    }

    // Getters
    get title(): string {
        return this._title;
    }

    get author(): string {
        return this._author;
    }

    get publisher(): string {
        return this._publisher;
    }

    get publicationYear(): number {
        return this._publicationYear;
    }

    get isbn(): string {
        return this._isbn;
    }

    get genre(): GENRE {
        return this._genre;
    }

    get status(): STATUS {
        return this._status;
    }

    get borrowDate(): Date | String {
        if (this._borrowDate == null) {
            return "None";
        }
        return `${this._borrowDate.getDate()}/${this._borrowDate.getMonth() + 1}/${this._borrowDate.getFullYear()}`;
    }

    get returnDate(): Date | String {
        if (this._returnDate == null) {
            return "None";
        }
        return `${this._returnDate.getDate()}/${this._returnDate.getMonth() + 1}/${this._returnDate.getFullYear()}`;
    }

    // Setters
    set title(title: string) {
        if (title.trim().length == 0) {
            throw new Error("The book title cannot be empty!!!");
        }
        this._title = title;
    }

    set author(author: string) {
        if (author.trim().length == 0) {
            throw new Error("The author's name cannot be empty!!!");
        }
        this._author = author;
    }

    set publisher(publisher: string) {
        if (publisher.trim().length == 0) {
            throw new Error("The publisher cannot be empty!!!");
        }
        this._publisher = publisher;
    }

    set publicationYear(publicationYear: number) {
        if (publicationYear <= 0 || publicationYear > new Date().getFullYear()) {
            throw new Error("The publication year cannot be less than 0 or greater than current year!!!");
        }
        this._publicationYear = publicationYear;
    }

    set isbn(isbn: string) {
        if (isbn.trim().length == 0) {
            throw new Error("The International Standard Book Number cannot be empty!!!");
        }
        this._isbn = isbn;
    }

    set genre(genre: GENRE) {
        this._genre = genre;
    }

    set status(status: STATUS) {
        this._status = status;
    }

    set borrowDate(borrowDate: Date) {
        if (borrowDate > new Date()) {
            throw new Error("The borrowed date cannot be greater than current date!!!");
        }
        this._borrowDate = borrowDate;
    }

    set returnDate(returnDate: Date) {
        if (returnDate > new Date()) {
            throw new Error("The return date cannot be greater than current date!!!");
        }
        if (returnDate < new Date() && returnDate < this.borrowDate) {
            throw new Error("The return date cannot be less than borrow date!!!");
        }
        this._returnDate = returnDate;
    }

    toString(): string {
        return `
    Title: ${this._title}
    Author: ${this._author}
    Publisher: ${this._publisher}
    Publication Year: ${this._publicationYear}
    International Standard Book Number: ${this._isbn}
    Genre: ${this._genre}
    Status: ${this._status}
    Borrow Date: ${this.borrowDate}
    Return Date: ${this.returnDate}`;
    }

}