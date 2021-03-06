const wx2my = require('../../../../wx2my');

module.exports = function (e) {
  var n = {
    literal: "true false null"
  },
      l = [e.QUOTE_STRING_MODE, e.C_NUMBER_MODE],
      i = {
    end: ",",
    endsWithParent: !0,
    excludeEnd: !0,
    contains: l,
    keywords: n
  },
      t = {
    begin: "{",
    end: "}",
    contains: [{
      className: "attr",
      begin: /"/,
      end: /"/,
      contains: [e.BACKSLASH_ESCAPE],
      illegal: "\\n"
    }, e.inherit(i, {
      begin: /:/
    })],
    illegal: "\\S"
  },
      a = {
    begin: "\\[",
    end: "\\]",
    contains: [e.inherit(i)],
    illegal: "\\S"
  };
  return l.splice(l.length, 0, t, a), {
    contains: l,
    keywords: n,
    illegal: "\\S"
  };
};