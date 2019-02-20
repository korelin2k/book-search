import axios from "axios";
import * as bodyParser from "body-parser";
import * as express from "express";
import Book from "./books.model";

const router = express.Router();

router.route("/").get(async (request, response) => {
    const books = await Book.find();
    return response.status(200).json(books);
});

router.route("/").post(bodyParser.json(), async (request, response) => {
    try {
        const book = new Book(request.body);
        await book.save();
        return response.status(201).json("Book saved!");
    } catch (error) {
        console.log(error);
        return response.status(400).send(error);
    }
});

router.route("/:id").delete(async (request, response) => {
    try {
        const bookId = request.params.id;
        await Book.findOneAndRemove({_id: bookId});
        return response.status(202).json("Book deleted!");
    } catch (error) {
        return response.status(404).send(error);
    }
});

router.route("/search/:title").get(async (request, response) => {
    try {
        const title = request.params.title;
        const apiKey = process.env.GOOGLE_API;
        const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=+intitle:${title}&key=${apiKey}`);

        if (res.data.totalItems === 0) { throw "No items found" }

        return response.status(200).json(res.data);
    } catch (error) {
        return response.status(404).send(error);
    }
});

export default router;
