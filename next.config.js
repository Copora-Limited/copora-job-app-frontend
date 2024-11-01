// next.config.js
const withAntdLess = require("next-plugin-antd-less");

module.exports = withAntdLess({
  images: {
    domains: [
      "res.cloudinary.com",
      "copora-candidates.lon1.digitaloceanspaces.com", // Add your new domain here
    ],
  },
  //   lessVarsFilePath: "./styles/variables.less", // if you use custom styles
  webpack(config) {
    return config;
  },
});
