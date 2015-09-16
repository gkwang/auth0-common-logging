module.exports.watch = function (logger, process) {
  logger.info({
    log_type: 'starting'
  }, 'starting');


  ['SIGTERM', 'SIGINT'].forEach(function (signal) {
    process.on(signal, function () {
      logger.info({
        log_type: 'stopping',
        signal: signal
      }, 'stopping');
    });
  });


  process.on('uncaughtException', function (err) {
    logger.error({
      log_type: 'uncaughtException',
      err:      err
    }, 'Uncaught Exception');
  });

};