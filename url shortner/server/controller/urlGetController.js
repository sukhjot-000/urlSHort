const URL = require('./../models/urlModel');

exports.getUrl = async (req, res, next) => {
  try {
    const shortUrl = req.params.shortUrl;
    const data = await URL.findOne({
      shortUrl: shortUrl
    });

    if (!data) {
      // If no matching short URL is found, you can handle it accordingly (e.g., show an error page)
      return res.status(404).json({
        status: 'fail',
        message: 'Short URL not found',
      });
    }
    // Redirect to the original URL
    res.redirect(data.originalUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};
