const request = require("request-promise");
const CONTENT_SERVER = "https://zanzoon.shirkalab.io";

const getQuestion = (limit = 200, offset = 0) => {
  const options = {
    method: "GET",
    uri:
      CONTENT_SERVER +
      "/json/question/?page[size]=" +
      limit +
      "&page[number]=" +
      offset,
    json: true,
  };
  return request(options)
    .then(function (items) {
      return items;
    })
    .catch(function (err) {
      console.error(err.statusCode, err.error);
      return undefined;
    });
};

const getQuestionById = (id, locale) => {
  const options = {
    method: "GET",
    uri:
      CONTENT_SERVER + "/json/question?filter[id]=" + id + "&_locale=" + locale,
    json: true,
  };
  return request(options)
    .then(function (items) {
      return items;
    })
    .catch(function (err) {
      console.log(err.statusCode, err.error);
      return undefined;
    });
};
const getPackages = (locale = "en") => {
  const options = {
    method: "GET",
    uri:
      "https://s3.shirkalab.io/zanzoom/packs/packs-full3-" + locale + ".json",
    json: true,
  };
  return request(options);
};

module.exports = { getQuestion, getPackages, getQuestionById };
