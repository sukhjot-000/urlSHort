const URL = require('./../models/urlModel'); // Update the path accordingly
const crypto = require('crypto');
const jwt=require('jsonwebtoken')

exports.submit = async (req, res) => {
    console.log(req.body)
  try {
    const originalUrl = req.body.originalUrl;
    // Check if the original link is already in the database
    const existingUrl = await URL.findOne({ originalUrl: originalUrl });
    if (existingUrl) {
      return res.status(200).json({
        status: 'success',
        originalLink: existingUrl.originalUrl,
        shortUrl: existingUrl.shortUrl,
      });
    }

    // Generate a short URL (you can customize your logic here)
    const shortUrl = generateShortUrl(originalUrl);
    let newUrl=""
    if(req.body.token){
      let id= await verifyToken(req.body.token)
      if(id){
        newUrl = new URL({
          originalUrl,
          shortUrl,
          createdby:id
        });
      }
    }
    else{

      // Create a new record in the database
      newUrl = new URL({
        originalUrl,
        shortUrl,
      });
    }

    // Save the record to the database
    await newUrl.save();

    res.status(201).json({
      status: 'success',
      originalLink: newUrl.originalUrl,
      shortUrl: newUrl.shortUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

// Function to generate a short URL (you can customize this as needed)
function generateShortUrl(originalUrl) {
    //Create a hash of the original URL
    const hash = crypto.createHash('md5').update(originalUrl).digest('hex');
    
    // Take the first 7 characters of the hash to form the short URL
    const shortId = hash.slice(0, 7); // Alternatively, you can use hash.substring(0, 7);

    return(shortId);
    // return `https://your-shortener-domain/${shortId}`;
}
const verifyToken = async (token) => {
  console.log("asdasdkjahsbdjasvdikh")
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded)
    return decoded.id;
  } catch (error) {
    console.log(error);
    return(0)
  }
};
