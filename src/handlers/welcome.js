const { DEFAULT_PACK } = require("../constants");
const helpers = require("../helpers");
const questionHelper = require("../helpers/question");
const questionService = require("../services/question");

module.exports = {
  async NEW_USER() {
    console.log("NEW USER INTENT");
    this.$user.$data.availablePack = [DEFAULT_PACK];
    await questionHelper.initQuestionInAppData.call(this);

    /**
     * Config data for new user
     */
    this.$user.$data.currentQuestion = 0;
    this.$user.$data.round = 0;
  },
  /**
   * In this case restart app the all data in $app.$data will be reset => re init question
   */
  async NEW_SESSION() {
    console.log("NEW_SESSION INTENT");
    await questionHelper.initQuestionInAppData.call(this);
  },
  async ON_REQUEST() {
    console.log("ON_REQUEST INTENT", this.$inputs);
    //TO DO
  },
  async LAUNCH() {
    console.log("LAUNCH INTENT");
    await this.toIntent("Welcome");
  },
  Welcome() {
    console.log("Welcome INTENT");
    /**
     * config display APL on device
     */
    //TODO

    /**
     * In case RESUME game
     */
    if (this.$user.$data.currentQuestion !== 0) {
      console.log(
        "this.$user.$data.currentQuestion",
        this.$user.$data.currentQuestion
      );
      this.followUpState("resume");
      this.ask(
        this.speechBuilder().addT("RESUME"),
        this.speechBuilder().addT("REPEAT").addT("RESUME")
      );
      // if (this.isGoogleAction()) {
      //   this.displayText(game.transformSsml(this.$session.$data.locale, this.$output.ask.speech));
      //   this.$googleAction.showSuggestionChips([
      //     this.speechBuilder().addT('SUGGESTION.yes').toString(),
      //     this.speechBuilder().addT('SUGGESTION.no').toString()]);
      // }
      //TO DO
      return;
    }

    /**Config package use in game */
    if (this.$user.$data.availablePack.length > 1) {
      this.followUpState("configPack");
      //TO DO
      return;
    }
    this.$user.$data.currentPack = "free";
    this.followUpState("config").ask(
      this.speechBuilder().addT("INTRO.GAME").addT("CONFIG.NUMBER"),
      this.speechBuilder().addT("REPEAT").addT("CONFIG.NUMBER")
    );
  },
};
