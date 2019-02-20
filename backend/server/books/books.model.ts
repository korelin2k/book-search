import { Document, model, Schema } from "mongoose";
import { SchemaDef } from "../../types";

// Declare model interface
interface BookDoc extends App.Book, Document {}

const bookSchemaDef: SchemaDef<App.Book> = {
  authors: {
    type: [String]
  },
  description: {
    type: String
  },
  image: {
    type: String
  },  
  link: {
    type: String,
    required: true,
    unique: true
  }, 
  title: {
    type: String,
    required: true,
    unique: true
  },
};

// Define model schema
const bookSchema = new Schema(bookSchemaDef);

export default model<BookDoc>("Book", bookSchema);
