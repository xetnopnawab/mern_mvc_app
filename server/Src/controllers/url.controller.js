import  shortid  from "shortid";
import { Url } from "../models/url.model.js";


const handleGenerateNewShortnerURL = (req, res) => {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "Url is required" });
  const shortID = shortid();
  
    Url.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortID });
  console.log(shortID )
}
export default  {
  handleGenerateNewShortnerURL,
};
