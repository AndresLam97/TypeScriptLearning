import { Book } from '../Classes/Book';
import { Library } from '../Classes/Library';
import { Member } from '../Classes/Member';
import { GENRE } from '../Enums/GENRE';
import { STATUS } from '../Enums/STATUS';
import * as Screen from '../FunctionClasses/MenuScreen';
import * as Reader from '../FunctionClasses/Reader';

const mainMenuMessage: string = "Please input your choice (1-7): ";
const searchBookMenuMessage: string = "Please input your choice (1-10): ";
const searchMemberMenuMessage: string = "Please input your choice (1-3): ";
const inputGenreMessage: string = Object.values(GENRE).join(", ");
const inputStatusMessage: string = Object.values(STATUS).join(", ");
let libary: Library = new Library();

async function searchBookScreen() {
    let loop = true;
    console.clear();
    Screen.showSearchBookMenu();
    while (loop) {
        const choice = await Reader.getNumberInput(searchBookMenuMessage);
        switch (choice) {
            case 1: {
                const term = await new Promise<string>(r => Reader.rl.question("Title contains: ", r));
                const books = libary.searchBookByTitle(term);
                libary.displayBooks(books);
                break;
            }
            case 2: {
                const term = await new Promise<string>(r => Reader.rl.question("Author name: ", r));
                const books = libary.searchBookByAuthor(term);
                libary.displayBooks(books);
                break;
            }
            case 3: {
                const term = await new Promise<string>(r => Reader.rl.question("Publisher: ", r));
                const books = libary.searchBookByPublisher(term);
                libary.displayBooks(books);
                break;
            }
            case 4: {
                const term = await new Promise<string>(r => Reader.rl.question("Publication year: ", r));
                const books = libary.searchBookByPublicationYear(Number(term));
                libary.displayBooks(books);
                break;
            }
            case 5: {
                const term = await new Promise<string>(r => Reader.rl.question("ISBN: ", r));
                const books = libary.searchBookByISBN(term);
                libary.displayBooks(books);
                break;
            }
            case 6: {
                const term = await new Promise<string>(r => Reader.rl.question(`All genre (${inputGenreMessage}):  `, r));
                const genre = GENRE[term.toUpperCase() as keyof typeof GENRE];
                const books = libary.searchBookByGenre(genre);
                libary.displayBooks(books);
                break;
            }
            case 7: {
                const term = await new Promise<string>(r => Reader.rl.question(`All status (${inputStatusMessage}):  `, r));
                const status = STATUS[term.toUpperCase() as keyof typeof STATUS];
                const books = libary.searchBookByStatus(status);
                libary.displayBooks(books);
                break;
            }
            case 8: {
                try {
                    const term = (await new Promise<string>(r => Reader.rl.question("Borrow date (YYYY/MM/DD): ", r))).split("/");
                    libary.searchBookByBorrowDate(new Date(Number(term[0]), Number(term[1]), Number(term[2]), 0, 0, 0));
                    break;
                }
                catch (error) {
                    console.log("Invalid input, please try again.");
                    continue;
                }
            }
            case 9: {
                try {
                    const term = (await new Promise<string>(r => Reader.rl.question("Return date (YYYY/MM/DD): ", r))).split("/");
                    libary.searchBookByReturnDate(new Date(Number(term[0]), Number(term[1]), Number(term[2]), 0, 0, 0));
                    break;
                }
                catch (error) {
                    console.log("Invalid input, please try again.");
                    continue;
                }
            }
            case 10: {
                loop = false;
                break;
            }
            default:
                console.log("Invalid choice, please try again.");
        }
    }
}

async function addBookScreen() {
    console.clear();
    console.log("========== ADD BOOK SCREEN ==========");
    let loop = true;
    while (loop) {
        try {
            const title = await Reader.getStringInput("Input title: ");
            const author = await Reader.getStringInput("Input author: ");
            const publisher = await Reader.getStringInput("Input publisher: ");
            const publicationYear = await Reader.getNumberInput("Input publication year: ");
            const isbn = await Reader.getStringInput("Input ISBN number: ");

            // Input genre
            Object.values(GENRE).forEach((value, index) => console.log(`${index + 1}. ${value}`));
            const genreIndex: number = await Reader.getNumberInput("Input genre: ");
            const genre: GENRE = Object.values(GENRE)[genreIndex - 1] as GENRE;

            // Input status
            Object.values(STATUS).forEach((value, index) => console.log(`${index + 1}. ${value}`));
            const statusIndex = await Reader.getNumberInput("Input status: ");
            const status = Object.values(STATUS)[statusIndex - 1] as STATUS;

            // Date input
            const borrowDate = await dateInput("Does the book has borrow date (Y/N): ");
            const returnDate = await dateInput("Does the book has return date (Y/N): ");

            libary.book = new Book(title, author, publisher, publicationYear, isbn, genre, status, borrowDate, returnDate);
            loop = false;
        } catch (error) {
            let message: string;
            if (error instanceof Error) message = error.message
            else {
                message = String(error);
            }
            console.log(message);
            console.log("Please retry!");
        }
    }
    await Reader.getStringInput("Add successfully, press Enter to continue...");
}

async function searchMemberScreen() {
    let loop = true;
    Screen.showSearchMemberMenu();
    while (loop) {
        const choice = await Reader.getNumberInput(searchMemberMenuMessage);
        switch (choice) {
            case 1: {
                const term = await new Promise<string>(r => Reader.rl.question("Name contains: ", r));
                const members = libary.searchMemberByName(term);
                libary.displayMembers(members);
                break;
            }
            case 2: {
                const term = await new Promise<string>(r => Reader.rl.question("Member Id: ", r));
                const members = libary.searchMemberById(term);
                libary.displayMembers(members);
                break;
            }
            case 3: {
                loop = false;
                break;
            }
            default:
                console.log("Invalid choice, please try again.");
        }
    }
}

async function addMemberScreen() {
    console.clear();
    console.log("========== ADD MEMBER SCREEN ==========");
    let loop = true;
    while (loop) {
        try {
            const name = await Reader.getStringInput("Input member name: ");
            const id = await Reader.getStringInput("Input member id: ");
            libary.member = new Member(name, id, null);
            loop = false;
        } catch (error) {
            let message: string;
            if (error instanceof Error) message = error.message
            else {
                message = String(error);
            }
            console.log(message);
            console.log("Please retry!");
        }
    }
    await Reader.getStringInput("Add successfully, press Enter to continue...");
}

async function borrowBookScreen() {
    if (libary.members.length === 0) {
        console.log("The library does not have any members, please add it then retry!!!");
        await Reader.getStringInput("Press Enter to continue...");
        return;
    }
    if (libary.books.length === 0) {
        console.log("The library does not have any books, please add it then retry!!!");
        await Reader.getStringInput("Press Enter to continue...");
        return;
    }

    let books = libary.searchBookByStatus(STATUS.AVAILABLE);
    let memberLoop = true;
    let member: Member | null = null;
    while (!member) {
        const memberId = await Reader.getStringInput("Input member id: ");
        member = libary.searchMemberById(memberId)[0];
        if (!member) {
            console.log("This member does not exist, please retry!");
        } 
    }

    libary.displayBooks(books);

    let book: Book | undefined = undefined;
    while (!book) {
        const bookISBN = await Reader.getStringInput("Input book isbn: ");
        book = libary.searchBookByISBN(bookISBN)[0];
        if (!book) {
            console.log("This book does not exist, please retry!");
        }
    }

    book.status = STATUS.BORROWED;
    const date = new Date();
    book.borrowDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
    book.returnDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
    member.borrowBook = book;

    await Reader.getStringInput("Borrow successfully, press Enter to continue...");
}

async function returnBookScreen() {
    if (libary.members.length === 0) {
        console.log("The library does not have any members, please add it then retry!!!");
        await Reader.getStringInput("Press Enter to continue...");
        return;
    }
    if (libary.books.length === 0) {
        console.log("The library does not have any books, please add it then retry!!!");
        await Reader.getStringInput("Press Enter to continue...");
        return;
    }

    let member: Member | null = null;
    while (!member) {
        const memberId = await Reader.getStringInput("Input member id: ");
        member = libary.searchMemberById(memberId)[0];
        if (!member) {
            console.log("This member does not exist, please retry!");
        } else {
            libary.displayBooks(member.borrowedBooks);
        }
    }

    let book: Book | undefined = undefined;
    while (!book) {
        const bookISBN = await Reader.getStringInput("Input book isbn: ");
        book = member.borrowBooks.find(b => b.isbn === bookISBN);
        if (!book) {
            console.log("This book does not exist, please retry!");
        }
    }

    member.borrowBooks = member.borrowBooks.filter(b => b.isbn !== book.isbn);
    book.status = STATUS.AVAILABLE;
    let date = new Date();
    book.returnDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);

    await Reader.getStringInput("Return successfully, press Enter to continue...");
}

async function displayAllBooks() {
    libary.displayBooks(libary.books);
    await Reader.getStringInput("Press Enter to continue...");
}

export async function mainScreen() {
    let loop = true;
    while (loop) {
        Screen.showMenu();
        const choice = await Reader.getNumberInput(mainMenuMessage);
        switch (choice) {
            case 1:
                await searchBookScreen();
                break;
            case 2:
                await addBookScreen();
                break;
            case 3:
                await searchMemberScreen();
                break;
            case 4:
                await addMemberScreen();
                break;
            case 5:
                await borrowBookScreen();
                break;
            case 6:
                await returnBookScreen();
                break;
            case 7:
                await displayAllBooks();
                break;
            case 8:
                loop = false;
                break;
            default:
                console.log("Invalid choice, please try again.");
        }
    }
    Reader.rl.close();
}

async function dateInput(message: string): Promise<Date | undefined> {
    let hasDateCheckPoint = true;
    let date = undefined;
    do {
        const doesTheBookHasBorrowDate = await Reader.getStringInput(message);
        switch (doesTheBookHasBorrowDate.toLocaleLowerCase()) {
            case 'y':
            case 'Y':
                {
                    while (true) {
                        try {
                            const day = await Reader.getNumberInput("Input borrow date: ");
                            const month = await Reader.getNumberInput("Input borrow month: ");
                            const year = await Reader.getNumberInput("Input borrow year: ");
                            date = new Date(year, month, day, 0, 0, 0);
                            return date;
                        } catch (error: unknown) {
                            console.log("Invalid input, please try again.");
                        }
                    }
                    break;
                }
            case 'n':
            case 'N':
                {
                    hasDateCheckPoint = false;
                    break;
                }
            default: console.log("Invalid input, please try again.");
        }
    } while (hasDateCheckPoint);
    return date;
}

mainScreen().catch(console.error);
