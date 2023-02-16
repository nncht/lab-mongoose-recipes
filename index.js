const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    const recipe = {
      title: "Ochazuke",
      level: "Easy Peasy",
      ingredients: [
        "Short-grain rice",
        "Green tea",
        "Salmon",
        "Ochazuke seasoning",
      ],
      cuisine: "Japanese",
      image:
        "https://www.justonecookbook.com/wp-content/uploads/2020/01/Ochazuke-8958-2-II.jpg",
      duration: 10,
      creator: "Nana",
    };

    Recipe.create(recipe).then(console.log(recipe.title));
  })
  .then(() => {
    const recipes = data;
    Recipe.insertMany(recipes);
    console.log(recipes[2].title);
  })
  .then(() => {
    Recipe.findOneAndUpdate();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
