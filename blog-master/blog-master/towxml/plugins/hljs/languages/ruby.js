const wx2my = require('../../../../wx2my');

module.exports = function (e) {
  var n = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",
      a = {
    keyword: "and then defined module in return redo if BEGIN retry end for self when next until do begin unless END rescue else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor",
    literal: "true false nil"
  },
      s = {
    className: "doctag",
    begin: "@[A-Za-z]+"
  },
      i = {
    begin: "#<",
    end: ">"
  },
      r = [e.COMMENT("#", "$", {
    contains: [s]
  }), e.COMMENT("^\\=begin", "^\\=end", {
    contains: [s],
    relevance: 10
  }), e.COMMENT("^__END__", "\\n$")],
      d = {
    className: "subst",
    begin: "#\\{",
    end: "}",
    keywords: a
  },
      c = {
    className: "string",
    contains: [e.BACKSLASH_ESCAPE, d],
    variants: [{
      begin: /'/,
      end: /'/
    }, {
      begin: /"/,
      end: /"/
    }, {
      begin: /`/,
      end: /`/
    }, {
      begin: "%[qQwWx]?\\(",
      end: "\\)"
    }, {
      begin: "%[qQwWx]?\\[",
      end: "\\]"
    }, {
      begin: "%[qQwWx]?{",
      end: "}"
    }, {
      begin: "%[qQwWx]?<",
      end: ">"
    }, {
      begin: "%[qQwWx]?/",
      end: "/"
    }, {
      begin: "%[qQwWx]?%",
      end: "%"
    }, {
      begin: "%[qQwWx]?-",
      end: "-"
    }, {
      begin: "%[qQwWx]?\\|",
      end: "\\|"
    }, {
      begin: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/
    }, {
      begin: /<<(-?)\w+$/,
      end: /^\s*\w+$/
    }]
  },
      t = {
    className: "params",
    begin: "\\(",
    end: "\\)",
    endsParent: !0,
    keywords: a
  },
      b = [c, i, {
    className: "class",
    beginKeywords: "class module",
    end: "$|;",
    illegal: /=/,
    contains: [e.inherit(e.TITLE_MODE, {
      begin: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"
    }), {
      begin: "<\\s*",
      contains: [{
        begin: "(" + e.IDENT_RE + "::)?" + e.IDENT_RE
      }]
    }].concat(r)
  }, {
    className: "function",
    beginKeywords: "def",
    end: "$|;",
    contains: [e.inherit(e.TITLE_MODE, {
      begin: n
    }), t].concat(r)
  }, {
    begin: e.IDENT_RE + "::"
  }, {
    className: "symbol",
    begin: e.UNDERSCORE_IDENT_RE + "(\\!|\\?)?:",
    relevance: 0
  }, {
    className: "symbol",
    begin: ":(?!\\s)",
    contains: [c, {
      begin: n
    }],
    relevance: 0
  }, {
    className: "number",
    begin: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
    relevance: 0
  }, {
    begin: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))"
  }, {
    className: "params",
    begin: /\|/,
    end: /\|/,
    keywords: a
  }, {
    begin: "(" + e.RE_STARTERS_RE + "|unless)\\s*",
    keywords: "unless",
    contains: [i, {
      className: "regexp",
      contains: [e.BACKSLASH_ESCAPE, d],
      illegal: /\n/,
      variants: [{
        begin: "/",
        end: "/[a-z]*"
      }, {
        begin: "%r{",
        end: "}[a-z]*"
      }, {
        begin: "%r\\(",
        end: "\\)[a-z]*"
      }, {
        begin: "%r!",
        end: "![a-z]*"
      }, {
        begin: "%r\\[",
        end: "\\][a-z]*"
      }]
    }].concat(r),
    relevance: 0
  }].concat(r);
  d.contains = b, t.contains = b;
  var l = "[>?]>",
      g = "[\\w#]+\\(\\w+\\):\\d+:\\d+>",
      o = "(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>",
      w = [{
    begin: /^\s*=>/,
    starts: {
      end: "$",
      contains: b
    }
  }, {
    className: "meta",
    begin: "^(" + l + "|" + g + "|" + o + ")",
    starts: {
      end: "$",
      contains: b
    }
  }];
  return {
    aliases: ["rb", "gemspec", "podspec", "thor", "irb"],
    keywords: a,
    illegal: /\/\*/,
    contains: r.concat(w).concat(b)
  };
};