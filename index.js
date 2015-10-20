require('babel/register');

require('./server')(function(app) {
  console.log('Express %s server listening on %s:%s',
    app.get('env'),
    app.get('host'),
    app.get('port')
  );
});
