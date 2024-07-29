import express from "express";
const app = express();
import cors from "cors";

const generateID = () => {
  const maxID =
    notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;

  return Number(maxID + 1);
};

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

app.get("/", (request, response) => {
  response.send("<h1>Hello World from Bright!</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.post("/api/notes", (request, response) => {
  const body = request.body;
  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  const note = {
    id: generateID(),
    content: body.content,
    important: Boolean(body.important) || false,
  };

  notes = notes.concat(note);
  response.json(notes);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
