class Logger {
  static log(log) {
    console.log(`[${new Date()}] - ${JSON.stringify(log)}`);
  }

  static logError(err) {
    console.error(`[${new Date()}] - ${JSON.stringify(err)}`);
  }
}

module.exports = Logger;
