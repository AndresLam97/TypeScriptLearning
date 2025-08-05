import { Book } from './Book';

export class Member {
    // Variables
    private _name!: string;
    private _memberId!: string;
    private _borrowedBooks!: Book[];

    // Constructor
    constructor(name: string, memberId: string, borrowedBooks: Book[] | null) {
        this.name = name;
        this.memberId = memberId;
        if (borrowedBooks !== null) {
            this.borrowBooks = borrowedBooks;
        }
        else {
            this._borrowedBooks = [];
        }
    }

    // Getters
    get name(): string {
        return this._name;
    }

    get memberId(): string {
        return this._memberId;
    }

    get borrowedBooks(): Book[] {
        return this._borrowedBooks;
    }

    // Setters
    set name(name: string) {
        if (name.trim().length == 0) {
            throw new Error("The member's name cannot be empty!!!");
        }
        this._name = name;
    }

    set memberId(memberId: string) {
        if (memberId.trim().length == 0) {
            throw new Error("The member's id cannot be empty!!!");
        }
        this._memberId = memberId;
    }

    set borrowBook(book: Book) {
        this._borrowedBooks.push(book);
    }

    set borrowBooks(books: Book[]) {
        books.forEach((book: Book) => this._borrowedBooks.push(book));
    }

    toString(): string {
        return `
    Member Name: ${this._name}
    Member Id: ${this._memberId}
    Borrowing Books: ${this._borrowedBooks}`;
    }
}