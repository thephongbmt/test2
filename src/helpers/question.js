const { getLocale } = require("./index");
const questionService = require("../services/question");
function getQuestionInAppData() {
  return this.$app.$data.questions;
}

async function setQuestionInAppData(questions, locale) {
  questions
    ? (this.$app.$data.questions[locale] = questions)
    : (this.$app.$data.questions = {});
}

async function initQuestionInAppData() {
  let locale = getLocale.call(this);

  const currentQuestions = getQuestionInAppData.call(this);
  if (!currentQuestions) {
    setQuestionInAppData.call(this);
  }
  const newQuestions = await questionService.getPackages(locale);
  setQuestionInAppData.call(this, newQuestions, locale);
  /**
   * Store questions into user data
   */
  this.$user.$data.questions = getQuestionInAppData.call(this)[locale];
}

module.exports = {
  initQuestionInAppData,
};
