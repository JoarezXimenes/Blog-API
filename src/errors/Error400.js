class Error400 extends Error {
  constructor(message) {
    super(message);
    this.name = 'Error400';
  }
}

module.exports = Error400;