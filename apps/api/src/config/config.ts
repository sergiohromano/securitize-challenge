export default () => ({
  port: parseInt(process.env.PORT) || 5002,
  etherscanService: {
    apiUrl: process.env.ETHERSCAN_API_URL,
    apiKey: process.env.ETHERSCAN_API_KEY,
  }
});
