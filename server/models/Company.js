import mongoose from "mongoose";

const Schema = mongoose.Schema;

//https://financialmodelingprep.com/api/v4/score?symbol=AAPL&apikey=YOUR_API_KEY
const companySchema = new Schema(
  {
    "symbol": String,
    "Company Name": String,
    "Industry": String,
    "Sector": String
  },
  { toJSON: { getters: true } }
);

const Company = mongoose.model("Company", companySchema);

export default Company;
