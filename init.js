const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
  .then((res) => {
    console.log("Server is running...");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/chat");
}

Chat.insertMany([
  {
    from: "John",
    to: "kirti",
    message: "Hi! How are you?",
    created_at: new Date(),
  },
  {
    from: "aayu",
    to: "paayu",
    message: "pubggggggggg",
    created_at: new Date(),
  },
  {
    from: "Johnny",
    to: "kirtika",
    message: "Hi! How are you?msg me soon",
    created_at: new Date(),
  },
  {
    from: "Jatin",
    to: "kanika",
    message: "what's ur doubt??",
    created_at: new Date(),
  },
  {
    from: "ghadi",
    to: "kamla",
    message: "kamla aa gyi",
    created_at: new Date(),
  },
]);
