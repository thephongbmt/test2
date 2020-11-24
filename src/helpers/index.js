const { DEFAULT_LOCALE } = require("../constants");

function getLocale() {
  let locale = DEFAULT_LOCALE;
  if (this.getLocale()) {
    locale = this.getLocale().split("-")[0];
  }
  return locale;
}

module.exports = {
  getLocale,
};
