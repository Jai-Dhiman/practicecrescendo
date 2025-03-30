const autoprefixer = require("autoprefixer");

const config = {
  plugins: [require("@tailwindcss/postcss"), autoprefixer],
};

module.exports = config;
