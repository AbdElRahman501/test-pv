import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import axios from 'axios';
import cheerio from 'cheerio';

const solarChargerRouter = express.Router();

solarChargerRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    try {
      // URL of the website you want to scrape
      const url = 'https://example.com';

      // Fetch the HTML content of the website
      const response = await axios.get(url);
      const html = response.data;

      // Load the HTML content into Cheerio
      const $ = cheerio.load(html);

      // Extract the data using CSS selectors
      const name = $('.product-name').text();
      const pic = $('.product-image').attr('src');
      const price = parseFloat($('.product-price').text().replace('$', ''));
      const maxPower = parseInt($('.product-max-power').text());
      const maxCurrent = parseFloat($('.product-max-current').text());
      const maxVoltage = parseFloat($('.product-max-voltage').text());

      // Extract features as an array
      const features = [];
      $('.product-features li').each((index, element) => {
        features.push($(element).text());
      });

      // Create a JSON object with the extracted data
      const jsonData = {
        Name: name,
        pic: pic,
        price: price,
        max_power: maxPower,
        max_current: maxCurrent,
        max_voltage: maxVoltage,
        features: features,
      };

      // Output the JSON data
      res.json(jsonData);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })
);

export default solarChargerRouter;
