/** @type {import('next').NextConfig} */

module.exports = {
  webpack: (config) => {
    const env = Object.keys(process.env).reduce((acc, curr) => {
      acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
      return acc;
    }, {});

    config.plugins.push(new webpack.DefinePlugin(env));

    return config;
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
};
