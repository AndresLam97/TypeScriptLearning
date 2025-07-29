class Book{
    private _title!: string;
    private _author!: string;
    private _publisher!: string;
    private _publicationYear!: number;
    private _isbn!: string;
    private _genre!: string;
    private _status!: STATUS;
    private _borrowDate: Date | null;
    private _returnDate: Date | null;

    constructor(title: string, author: string, publisher: string, publicationYear: number, isbn: string, genre: string, status: STATUS)
    {
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.publicationYear = publicationYear;
        this.isbn = isbn;
        this.genre = genre;
        this.status = status;
        this._borrowDate = null;
        this._returnDate = null;
    }

    get title(){
        return this._title;
    }

    set title(title: string){
        if(title.trim().length == 0){
            throw new Error("The book title cannot be empty!!!");
        }
        this._title = title;
    }

    get author(){
        return this._author;
    }

    set author(author: string){
        if(author.trim().length == 0){
            throw new Error("The author's name cannot be empty!!!");
        }
        this._author = author;
    }

    get publisher(){
        return this._publisher;
    }

    set publisher(publisher: string){
        if(publisher.trim().length == 0){
            throw new Error("The publisher cannot be empty!!!");
        }
        this._publisher = publisher;
    }

    get publicationYear(){
        return this._publicationYear;
    }

    set publicationYear(publicationYear: number){
        if(publicationYear <= 0 || publicationYear > new Date().getFullYear()){
            throw new Error("The publication year cannot be less than 0!!!");
        }
        this._publicationYear = publicationYear;
    }

    get isbn(){
        return this._isbn;
    }

    set isbn(isbn: string){
        if(isbn.trim().length == 0){
            throw new Error("The International Standard Book Number cannot be empty!!!");
        }
        this._isbn = isbn;
    }

    get genre(){
        return this._genre;
    }

    set genre(genre: string){
        if(genre.trim().length == 0){
            throw new Error("The genre cannot be empty!!!");
        }
        this._genre = genre;
    }

    get status(){
        return this._status;
    }

    set status(status: STATUS){
        this._status = status;
    }

}