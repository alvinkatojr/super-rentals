module.exports = {
  env: {
    embertest: true
  },
  plugins: [
    'ember'
  ],
  rules: {
    // other rules
    'ember/no-old-shims': 'error'
  }
};
