const wx2my = require('../../../../wx2my');

module.exports = function (e) {
  var n = "[\\w-]+",
      a = "(" + n + "|@{" + n + "})",
      t = [],
      s = [],
      r = function (e) {
    return {
      className: "string",
      begin: "~?" + e + ".*?" + e
    };
  },
      i = function (e, n, a) {
    return {
      className: e,
      begin: n,
      relevance: a
    };
  },
      c = {
    begin: "\\(",
    end: "\\)",
    contains: s,
    relevance: 0
  };

  s.push(e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, r("'"), r('"'), e.CSS_NUMBER_MODE, {
    begin: "(url|data-uri)\\(",
    starts: {
      className: "string",
      end: "[\\)\\n]",
      excludeEnd: !0
    }
  }, i("number", "#[0-9A-Fa-f]+\\b"), c, i("variable", "@@?" + n, 10), i("variable", "@{" + n + "}"), i("built_in", "~?`[^`]*?`"), {
    className: "attribute",
    begin: n + "\\s*:",
    end: ":",
    returnBegin: !0,
    excludeEnd: !0
  }, {
    className: "meta",
    begin: "!important"
  });
  var l = s.concat({
    begin: "{",
    end: "}",
    contains: t
  }),
      o = {
    beginKeywords: "when",
    endsWithParent: !0,
    contains: [{
      beginKeywords: "and not"
    }].concat(s)
  },
      d = {
    begin: a + "\\s*:",
    returnBegin: !0,
    end: "[;}]",
    relevance: 0,
    contains: [{
      className: "attribute",
      begin: a,
      end: ":",
      excludeEnd: !0,
      starts: {
        endsWithParent: !0,
        illegal: "[<=$]",
        relevance: 0,
        contains: s
      }
    }]
  },
      b = {
    className: "keyword",
    begin: "@(import|media|charset|font-face|(-[a-z]+-)?keyframes|supports|document|namespace|page|viewport|host)\\b",
    starts: {
      end: "[;{}]",
      returnEnd: !0,
      contains: s,
      relevance: 0
    }
  },
      g = {
    className: "variable",
    variants: [{
      begin: "@" + n + "\\s*:",
      relevance: 15
    }, {
      begin: "@" + n
    }],
    starts: {
      end: "[;}]",
      returnEnd: !0,
      contains: l
    }
  },
      u = {
    variants: [{
      begin: "[\\.#:&\\[>]",
      end: "[;{}]"
    }, {
      begin: a,
      end: "{"
    }],
    returnBegin: !0,
    returnEnd: !0,
    illegal: "[<='$\"]",
    relevance: 0,
    contains: [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, o, i("keyword", "all\\b"), i("variable", "@{" + n + "}"), i("selector-tag", a + "%?", 0), i("selector-id", "#" + a), i("selector-class", "\\." + a, 0), i("selector-tag", "&", 0), {
      className: "selector-attr",
      begin: "\\[",
      end: "\\]"
    }, {
      className: "selector-pseudo",
      begin: /:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/
    }, {
      begin: "\\(",
      end: "\\)",
      contains: l
    }, {
      begin: "!important"
    }]
  };
  return t.push(e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, b, g, d, u), {
    case_insensitive: !0,
    illegal: "[=>'/<($\"]",
    contains: t
  };
};