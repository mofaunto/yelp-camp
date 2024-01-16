const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "659e9b04674d3376fbd1a246",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit Alias maiores tempora rem ullam obcaecati odit voluptatibus molestiae earum Mollitia, soluta dolore totam sed at autem sint assumenda possimus ipsam veniam",
      price,
      images: [
        {
          url: "https://res.cloudinary.com/davmazmnl/image/upload/v1705323413/YelpCamp/smxe8cyxf437ad8vdxtj.jpg",
          filename: "YelpCamp/smxe8cyxf437ad8vdxtj",
        },
        {
          url: "https://res.cloudinary.com/davmazmnl/image/upload/v1705323414/YelpCamp/dxfqazuwacsnvm0j3zjo.jpg",
          filename: "YelpCamp/dxfqazuwacsnvm0j3zjo",
        },
      ],
    });

    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
