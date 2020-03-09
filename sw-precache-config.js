module.exports = {
  staticFileGlobs: [
    'manifest.json',
    'src/**/*',
  ],
  runtimeCaching: [
    {
      handler: 'fastest',
      urlPattern: /\/@webcomponents\/webcomponentsjs\//      
    },
    {
      handler: 'fastest',
      urlPattern: /^https:\/\/fonts.gstatic.com\//      
    }
  ]
};
