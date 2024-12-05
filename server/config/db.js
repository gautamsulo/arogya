import mongoose from "mongoose";

const connectDb =  () => {
  try {
    const conn = mongoose.connect(
      "mongodb+srv://howdymanish21:Oag1EJf334arhVC9@cluster0.42kgw.mongodb.net/"
    );
    if (conn) return console.log(`Connected to host`);
  } catch (error) {
    console.log(error);
  }
};
export default connectDb;
