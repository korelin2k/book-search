import axios from "axios";
import "../types";

export default class API{
    // Gets all books
    public static getBooks = () => {
        return axios.get("/api/books");
    }

    public static saveBook = (bookData: App.Book) => {
        return axios.post("/api/books", bookData);
    }

    public static deleteBook = (id: string) => {
        return axios.delete(`/api/books/${id}`);
    }

    public static searchBooks = (title: string) => {
        return axios.get(`/api/books/search/${title}`);
    }
};
