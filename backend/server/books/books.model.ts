import { Document, model, Schema } from "mongoose";
import { SchemaDef } from "../../types";

// Declare model interface
interface BookDoc extends App.Book, Document {}

const bookSchemaDef: SchemaDef<App.Book> = {
  authors: {
    type: [String],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },  
  link: {
    type: String,
    required: true
  }, 
  title: {
    type: String,
    required: true
  },
};

// Define model schema
const bookSchema = new Schema(bookSchemaDef);

export default model<BookDoc>("Book", bookSchema);
