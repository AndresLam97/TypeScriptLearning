import { Book } from './Book';
import { Member } from './Member';
import { GENRE } from '../Enums/GENRE';
import { STATUS } from '../Enums/STATUS';

export class Library {
    private _books!: Book[];
    private _members!: Member[];

    // Constructor
    constructor() {
        this._books = [];
        this._members = [];
    }

    // Getters
    get books(): Book[] {
        return this._books;
    }

    get members(): Member[] {
        return this._members;
    }

    // Setters
    set book(book: Book) {
        this._books.push(book);
    }

    set books(books: Book[]) {
        books.forEach((book: Book) => this._books.push(book));
    }

    set member(member: Member) {
        this._members.push(member);
    }

    set members(members: Member[]) {
        members.forEach((member: Member) => this._members.push(member));
    }

    // Functions
    // Search book(s) by conditions
    searchBookByTitle(title: string) {
        return this._books.filter(book => book.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()));
    }

    searchBookByAuthor(author: string): Book[] {
        return this._books.filter(book => book.author.toLocaleLowerCase() === author.toLocaleLowerCase());
    }

    searchBookByPublisher(publisher: string): Book[] {
        return this._books.filter(book => book.publisher.toLocaleLowerCase() === publisher.toLocaleLowerCase());
    }

    searchBookByPublicationYear(publicationYear: number): Book[] {
        return this._books.filter(book => book.publicationYear === publicationYear);
    }

    searchBookByISBN(isbn: string): Book[] {
        return this._books.filter(book => book.isbn.toLowerCase() === isbn.toLocaleLowerCase());
    }

    searchBookByGenre(genre: GENRE): Book[] {
        return this._books.filter(book => book.genre.toLocaleLowerCase() === genre.toLocaleLowerCase());
    }

    searchBookByStatus(status: STATUS): Book[] {
        return this._books.filter(book => book.status.toLocaleLowerCase() === status.toLocaleLowerCase());
    }

    searchBookByBorrowDate(borrowDate: Date) {
        let date: string = `${borrowDate.getDate()}/${borrowDate.getMonth() + 1}/${borrowDate.getFullYear()}`;
        return this._books.filter(book => book.borrowDate === date);
    }

    searchBookByReturnDate(returnDate: Date) {
        let date: string = `${returnDate.getDate()}/${returnDate.getMonth() + 1}/${returnDate.getFullYear()}`;
        return this._books.filter(book => book.borrowDate === date);
    }

    //Search member(s) by conditions
    searchMemberById(id: string): Member[] {
        return this._members.filter(member => member.memberId === id);
    }

    searchMemberByName(name: string): Member[] {
        return this._members.filter(member => member.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
    }

    // Displays
    displayBooks(books: Book[]) {
        if(books.length === 0)
        {
            console.log("No book found!!!");
        }
        else
        {
            console.log("All the books:");
            books.forEach(book => {
                console.log(book.toString());
                console.log("=============================================");
            });
        }
    }

    displayMembers(members: Member[]) {
        if(members.length === 0)
        {
            console.log("No member found!!!");
        }
        else
        {
            console.log("All the members:");
            members.forEach(member => {
                console.log(member.toString());
                console.log("=============================================");
            });
        }
    }

}