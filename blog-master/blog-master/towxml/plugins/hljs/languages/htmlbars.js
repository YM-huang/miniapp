const wx2my = require('../../../../wx2my');

module.exports = function (e) {
  var n = "action collection component concat debugger each each-in else get hash if input link-to loc log mut outlet partial query-params render textarea unbound unless with yield view",
      a = {
    illegal: /\}\}/,
    begin: /[a-zA-Z0-9_]+=/,
    returnBegin: !0,
    relevance: 0,
    contains: [{
      className: "attr",
      begin: /[a-zA-Z0-9_]+/
    }]
  },
      t = ({
    illegal: /\}\}/,
    begin: /\)/,
    end: /\)/,
    contains: [{
      begin: /[a-zA-Z\.\-]+/,
      keywords: {
        built_in: n
      },
      starts: {
        endsWithParent: !0,
        relevance: 0,
        contains: [e.QUOTE_STRING_MODE]
      }
    }]
  }, {
    endsWithParent: !0,
    relevance: 0,
    keywords: {
      keyword: "as",
      built_in: n
    },
    contains: [e.QUOTE_STRING_MODE, a, e.NUMBER_MODE]
  });
  return {
    case_insensitive: !0,
    subLanguage: "xml",
    contains: [e.COMMENT("{{!(--)?", "(--)?}}"), {
      className: "template-tag",
      begin: /\{\{[#\/]/,
      end: /\}\}/,
      contains: [{
        className: "name",
        begin: /[a-zA-Z\.\-]+/,
        keywords: {
          "builtin-name": n
        },
        starts: t
      }]
    }, {
      className: "template-variable",
      begin: /\{\{[a-zA-Z][a-zA-Z\-]+/,
      end: /\}\}/,
      keywords: {
        keyword: "as",
        built_in: n
      },
      contains: [e.QUOTE_STRING_MODE]
    }]
  };
};