import dotenv from 'dotenv'
dotenv.config();
import { connectDB } from "./DB/connection.js";
import APP from "./src/app.js";
// modules

const PORT = process.env.PORT;
// environment

// connection to DB and APP listens //
connectDB()
  .then(function () {
    APP.on('error', function (error) {
      return console.log(`Error ${error} , app failed to listen on port: ${PORT}`);
    });
    APP.listen(PORT, function () {
      return console.log(`App starts listening on port: ${PORT}`);
    });
    return null;
  })
  .catch(function (err) {
    return console.log(err);
  });
// connection to DB and APP listens //


