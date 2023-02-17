const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";
mongoose.set("strictQuery", true);

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

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

const createRecipe = Recipe.create(recipe).then(console.log(recipe.title));

const recipes = data;
const insertRecipes = Recipe.insertMany(recipes).then(() =>
  recipes.forEach((recipe) => {
    console.log(recipe.title);
  })
);

const updateRigatoni = Recipe.findOneAndUpdate(
  { title: "Rigatoni alla Genovese" },
  { duration: 100 }
)
  .then((x) => {
    console.log("Rigatoni alla Genovese was updated!");
  })
  .catch((error) => {
    console.error("Something went wrong.");
  });

const deleteCarrotCake = Recipe.deleteOne({ title: "Carrot Cake" })
  .then((x) => {
    console.log("Carrot Cake was deleted!");
  })
  .catch((error) => {
    console.error("Something went wrong.");
  });

Promise.all([createRecipe, insertRecipes, updateRigatoni, deleteCarrotCake])
  .then((values) => {
    console.log("Completed all requests.");
    mongoose.connection.close();
  })
  .catch((err) => console.error(err));
