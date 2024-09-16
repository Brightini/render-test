import mongoose from "mongoose";

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstackopen:${password}@fsocluster.v5bmgu3.mongodb.net/noteApp?retryWrites=true&w=majority&appName=FSOCluster`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);
await Note.insertMany([
  {
    content: "HTML is easy",
    important: true,
  },
  {
    content: "CSS is hard",
    important: false,
  },
  {
    content: "Mongoose makes things easy",
    important: true,
  },
]);

Note.find({ important: true }).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
