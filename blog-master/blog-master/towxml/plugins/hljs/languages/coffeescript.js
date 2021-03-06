const wx2my = require('../../../../wx2my');

module.exports = function (e) {
  var n = {
    keyword: "in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super yield import export from as default await then unless until loop of by when and or is isnt not",
    literal: "true false null undefined yes no on off",
    built_in: "npm require console print module global window document"
  },
      i = "[A-Za-z$_][0-9A-Za-z$_]*",
      s = {
    className: "subst",
    begin: /#\{/,
    end: /}/,
    keywords: n
  },
      a = [e.BINARY_NUMBER_MODE, e.inherit(e.C_NUMBER_MODE, {
    starts: {
      end: "(\\s*/)?",
      relevance: 0
    }
  }), {
    className: "string",
    variants: [{
      begin: /'''/,
      end: /'''/,
      contains: [e.BACKSLASH_ESCAPE]
    }, {
      begin: /'/,
      end: /'/,
      contains: [e.BACKSLASH_ESCAPE]
    }, {
      begin: /"""/,
      end: /"""/,
      contains: [e.BACKSLASH_ESCAPE, s]
    }, {
      begin: /"/,
      end: /"/,
      contains: [e.BACKSLASH_ESCAPE, s]
    }]
  }, {
    className: "regexp",
    variants: [{
      begin: "///",
      end: "///",
      contains: [s, e.HASH_COMMENT_MODE]
    }, {
      begin: "//[gim]*",
      relevance: 0
    }, {
      begin: /\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/
    }]
  }, {
    begin: "@" + i
  }, {
    subLanguage: "javascript",
    excludeBegin: !0,
    excludeEnd: !0,
    variants: [{
      begin: "```",
      end: "```"
    }, {
      begin: "`",
      end: "`"
    }]
  }];
  s.contains = a;
  var t = e.inherit(e.TITLE_MODE, {
    begin: i
  }),
      r = "(\\(.*\\))?\\s*\\B[-=]>",
      o = {
    className: "params",
    begin: "\\([^\\(]",
    returnBegin: !0,
    contains: [{
      begin: /\(/,
      end: /\)/,
      keywords: n,
      contains: ["self"].concat(a)
    }]
  };
  return {
    aliases: ["coffee", "cson", "iced"],
    keywords: n,
    illegal: /\/\*/,
    contains: a.concat([e.COMMENT("###", "###"), e.HASH_COMMENT_MODE, {
      className: "function",
      begin: "^\\s*" + i + "\\s*=\\s*" + r,
      end: "[-=]>",
      returnBegin: !0,
      contains: [t, o]
    }, {
      begin: /[:\(,=]\s*/,
      relevance: 0,
      contains: [{
        className: "function",
        begin: r,
        end: "[-=]>",
        returnBegin: !0,
        contains: [o]
      }]
    }, {
      className: "class",
      beginKeywords: "class",
      end: "$",
      illegal: /[:="\[\]]/,
      contains: [{
        beginKeywords: "extends",
        endsWithParent: !0,
        illegal: /[:="\[\]]/,
        contains: [t]
      }, t]
    }, {
      begin: i + ":",
      end: ":",
      returnBegin: !0,
      returnEnd: !0,
      relevance: 0
    }])
  };
};