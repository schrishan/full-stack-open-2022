const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://admin:${password}@phonebook.wfglrst.mongodb.net/?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);
mongoose.connect(url);

const personsSchema = new mongoose.Schema({
  id: String,
  name: String,
  number: String,
});

const Person = mongoose.model("person", personsSchema);

var totalitms = 0;

const person = new Person({
  id: Person.length,
  name: process.argv[3],
  number: process.argv[4],
});

if (process.argv[3] !== undefined && process.argv[4] !== undefined) {
  person.save().then((result) => {
    console.log(
      "added " +
        process.argv[3] +
        " number " +
        process.argv[4] +
        " to phonebook"
    );
    mongoose.connection.close();
  });
}

if (process.argv[3] === undefined && process.argv[4] === undefined) {
  Person.find()
    .then({})
    .then((result) => {
      console.log("phonebook:");
      result.forEach((person) => {
        console.log(person.name + " " + person.number);
        mongoose.connection.close();
      });
    });
}
