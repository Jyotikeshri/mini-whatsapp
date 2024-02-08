const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
app.use(express.urlencoded({ extended: true }));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

main()
  .then((res) => {
    console.log("Server is running...");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/chat");
}

app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});

app.listen("3000", () => {
  console.log("Server is running on port 3000");
});

// const Chat1 = new Chat({
//   from: "jyoti",
//   to: "lava",
//   message: "happy Birthday lava baby",
//   created_at: new Date(),
// });

// Chat1.save().then((res) => {
//   console.log("Saved a chat", res);
// });

app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  res.render("index.ejs", { chats });
});

app.get("/chats/new", (req, res) => {
  res.render("create.ejs");
});

app.post("/chats", (req, res) => {
  console.log(req.body);
  const chat = new Chat({
    from: req.body.from,
    to: req.body.to,
    message: req.body.message,
    created_at: new Date(),
  });
  chat
    .save()
    .then((res) => {
      console.log("saved the chat", res);
    })
    .catch((err) => console.error(err));

  res.redirect("/chats");
});

app.get("/chats/:id/edit", (req, res) => {
  // findById is used here instead of findOne because we are passing in an ObjectId and
  // not a value that can be compared with _id being a string or something else
  Chat.findById(req.params.id)
    .then((chat) => {
      console.log(chat);
      const user = chat;
      res.render("update.ejs", { user });
      console.log(user);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.patch("/chats", (req, res) => {
  let id = req.body._id;
  console.log(id);

  console.log("Updating", req.body, "with id", id);
  Chat.findByIdAndUpdate(id, { message: req.body.message })
    .then((res) => {
      console.log("Updated", res);
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/chats");
});

app.delete("/chats", (req, res) => {
  const id = req.body._id;
  console.log(id);

  Chat.findByIdAndDelete(id)
    .then((deletedChat) => {
      if (!deletedChat) {
        console.log(`Chat with ID ${id} not found.`);
      } else {
        console.log(`Deleted chat: ${deletedChat}`);
      }
      res.redirect("/chats");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error"); // Adjust the status code and message as needed
    });
});
