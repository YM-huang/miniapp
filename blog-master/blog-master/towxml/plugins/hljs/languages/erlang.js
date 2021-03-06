const wx2my = require('../../../../wx2my');

module.exports = function (e) {
  var n = "[a-z'][a-zA-Z0-9_']*",
      i = "(" + n + ":" + n + "|" + n + ")",
      r = {
    keyword: "after and andalso|10 band begin bnot bor bsl bzr bxor case catch cond div end fun if let not of orelse|10 query receive rem try when xor",
    literal: "false true"
  },
      a = e.COMMENT("%", "$"),
      c = {
    className: "number",
    begin: "\\b(\\d+#[a-fA-F0-9]+|\\d+(\\.\\d+)?([eE][-+]?\\d+)?)",
    relevance: 0
  },
      s = {
    begin: "fun\\s+" + n + "/\\d+"
  },
      d = {
    begin: i + "\\(",
    end: "\\)",
    returnBegin: !0,
    relevance: 0,
    contains: [{
      begin: i,
      relevance: 0
    }, {
      begin: "\\(",
      end: "\\)",
      endsWithParent: !0,
      returnEnd: !0,
      relevance: 0
    }]
  },
      o = {
    begin: "{",
    end: "}",
    relevance: 0
  },
      t = {
    begin: "\\b_([A-Z][A-Za-z0-9_]*)?",
    relevance: 0
  },
      l = {
    begin: "[A-Z][a-zA-Z0-9_]*",
    relevance: 0
  },
      b = {
    begin: "#" + e.UNDERSCORE_IDENT_RE,
    relevance: 0,
    returnBegin: !0,
    contains: [{
      begin: "#" + e.UNDERSCORE_IDENT_RE,
      relevance: 0
    }, {
      begin: "{",
      end: "}",
      relevance: 0
    }]
  },
      g = {
    beginKeywords: "fun receive if try case",
    end: "end",
    keywords: r
  };
  g.contains = [a, s, e.inherit(e.APOS_STRING_MODE, {
    className: ""
  }), g, d, e.QUOTE_STRING_MODE, c, o, t, l, b];
  var E = [a, s, g, d, e.QUOTE_STRING_MODE, c, o, t, l, b];
  d.contains[1].contains = E, o.contains = E, b.contains[1].contains = E;
  var u = {
    className: "params",
    begin: "\\(",
    end: "\\)",
    contains: E
  };
  return {
    aliases: ["erl"],
    keywords: r,
    illegal: "(</|\\*=|\\+=|-=|/\\*|\\*/|\\(\\*|\\*\\))",
    contains: [{
      className: "function",
      begin: "^" + n + "\\s*\\(",
      end: "->",
      returnBegin: !0,
      illegal: "\\(|#|//|/\\*|\\\\|:|;",
      contains: [u, e.inherit(e.TITLE_MODE, {
        begin: n
      })],
      starts: {
        end: ";|\\.",
        keywords: r,
        contains: E
      }
    }, a, {
      begin: "^-",
      end: "\\.",
      relevance: 0,
      excludeEnd: !0,
      returnBegin: !0,
      lexemes: "-" + e.IDENT_RE,
      keywords: "-module -record -undef -export -ifdef -ifndef -author -copyright -doc -vsn -import -include -include_lib -compile -define -else -endif -file -behaviour -behavior -spec",
      contains: [u]
    }, c, e.QUOTE_STRING_MODE, b, t, l, o, {
      begin: /\.$/
    }]
  };
};