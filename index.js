const mongoose = require("mongoose");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/college");
}

main()
  .then((res) => {
    console.log(`Connected to MongoDB ${res}`);
  })
  .catch((err) => {
    console.error(err);
  });

const user1Schema = mongoose.Schema({
  name: String,
  email: { type: String },
  password: String,
});

const User1 = mongoose.model("User1", user1Schema);

// const user1 = new User1({
//   name: "John Doe",
//   email: "john@example.com",
//   password: "password123456",
// });

// user1
//   .save()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// User1.insertMany([
//   {
//     name: "Jane Smith",
//     email: "jane@google.com",
//     password: "hello123",
//   },
//   {
//     name: "Alice Barkley",
//     email: "alice@yahoo.com",
//     password: "world123",
//   },
// ]).then((res) => {
//   console.log(res);
// });

// User1.updateOne({ name: "Jane Smith" }, { password: "newPassword" })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// User1.findById("65b1333e3b1e322bcfdb841a")
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// User1.findByIdAndDelete("65b13388f2176efdb1966e56")
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });


