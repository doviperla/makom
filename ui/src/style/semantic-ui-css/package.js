const
  where = 'client' // Adds files only to the client
;

Package.describe({
  name: 'semantic:ui-css',
  summary: 'Semantic UI - CSS Release of Semantic UI',
  version: '2.4.1',
  git: 'git://github.com/Semantic-Org/semantic-ui-css.git',
});

Package.onUse((api) => {
  api.versionsFrom('1.0');

  api.use('jquery', 'client');

  api.addFiles([
    // icons
    'themes/default/assets/fonts/icons.eot',
    'themes/default/assets/fonts/icons.svg',
    'themes/default/assets/fonts/icons.ttf',
    'themes/default/assets/fonts/icons.woff',
    'themes/default/assets/fonts/icons.woff2',

    // flags
    'themes/default/assets/images/flags.png',

    // release
    'semantic.css',
    'semantic.js',
  ], 'client');
});
