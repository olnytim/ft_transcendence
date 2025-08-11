const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://nginx:443',
    supportFile: false,
    chromeWebSecurity: false
  },
})
