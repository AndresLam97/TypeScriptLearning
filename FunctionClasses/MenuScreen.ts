export function showMenu() {
   console.clear();
   console.log(`========== WELCOME TO THE LIBRARY ==========
1) Search book
2) Add book
3) Search member
4) Add member
5) Borrow book
6) Return book
7) Display all books
8) Exit`);
}

export function showSearchBookMenu() {
   console.clear();
   console.log(`========== SEARCH BOOK SCREEN ==========
1) Search by title
2) Search by author
3) Search by publisher
4) Search by publication year
5) Search by isbn
6) Search by genre
7) Search by status
8) Search by borrow date
9) Search by return date
10) Back`);
}

export function showSearchMemberMenu() {
   console.clear();
   console.log(`========== SEARCH MEMBER SCREEN ==========
1) Search by member name
2) Search by member id
3) Back`);
}