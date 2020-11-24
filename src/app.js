"use strict";

const { App } = require("jovo-framework");
const { Alexa } = require("jovo-platform-alexa");
const { GoogleAssistant } = require("jovo-platform-googleassistant");
const { JovoDebugger } = require("jovo-plugin-debugger");
const { FileDb } = require("jovo-db-filedb");

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const app = new App();

app.use(new Alexa(), new GoogleAssistant(), new JovoDebugger(), new FileDb());

// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler(require("./handlers/welcome"));

module.exports = { app };
