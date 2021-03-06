const wx2my = require('../../../../wx2my');

module.exports = function (e) {
  var i = {
    keyword: "__COLUMN__ __FILE__ __FUNCTION__ __LINE__ as as! as? associativity break case catch class continue convenience default defer deinit didSet do dynamic dynamicType else enum extension fallthrough false fileprivate final for func get guard if import in indirect infix init inout internal is lazy left let mutating nil none nonmutating open operator optional override postfix precedence prefix private protocol Protocol public repeat required rethrows return right self Self set static struct subscript super switch throw throws true try try! try? Type typealias unowned var weak where while willSet",
    literal: "true false nil",
    built_in: "abs advance alignof alignofValue anyGenerator assert assertionFailure bridgeFromObjectiveC bridgeFromObjectiveCUnconditional bridgeToObjectiveC bridgeToObjectiveCUnconditional c contains count countElements countLeadingZeros debugPrint debugPrintln distance dropFirst dropLast dump encodeBitsAsWords enumerate equal fatalError filter find getBridgedObjectiveCType getVaList indices insertionSort isBridgedToObjectiveC isBridgedVerbatimToObjectiveC isUniquelyReferenced isUniquelyReferencedNonObjC join lazy lexicographicalCompare map max maxElement min minElement numericCast overlaps partition posix precondition preconditionFailure print println quickSort readLine reduce reflect reinterpretCast reverse roundUpToAlignment sizeof sizeofValue sort split startsWith stride strideof strideofValue swap toString transcode underestimateCount unsafeAddressOf unsafeBitCast unsafeDowncast unsafeUnwrap unsafeReflect withExtendedLifetime withObjectAtPlusZero withUnsafePointer withUnsafePointerToObject withUnsafeMutablePointer withUnsafeMutablePointers withUnsafePointer withUnsafePointers withVaList zip"
  },
      n = {
    className: "type",
    begin: "\\b[A-Z][\\wÀ-ʸ']*",
    relevance: 0
  },
      t = e.COMMENT("/\\*", "\\*/", {
    contains: ["self"]
  }),
      a = {
    className: "subst",
    begin: /\\\(/,
    end: "\\)",
    keywords: i,
    contains: []
  },
      r = {
    className: "number",
    begin: "\\b([\\d_]+(\\.[\\deE_]+)?|0x[a-fA-F0-9_]+(\\.[a-fA-F0-9p_]+)?|0b[01_]+|0o[0-7_]+)\\b",
    relevance: 0
  },
      s = e.inherit(e.QUOTE_STRING_MODE, {
    contains: [a, e.BACKSLASH_ESCAPE]
  });
  return a.contains = [r], {
    keywords: i,
    contains: [s, e.C_LINE_COMMENT_MODE, t, n, r, {
      className: "function",
      beginKeywords: "func",
      end: "{",
      excludeEnd: !0,
      contains: [e.inherit(e.TITLE_MODE, {
        begin: /[A-Za-z$_][0-9A-Za-z$_]*/
      }), {
        begin: /</,
        end: />/
      }, {
        className: "params",
        begin: /\(/,
        end: /\)/,
        endsParent: !0,
        keywords: i,
        contains: ["self", r, s, e.C_BLOCK_COMMENT_MODE, {
          begin: ":"
        }],
        illegal: /["']/
      }],
      illegal: /\[|%/
    }, {
      className: "class",
      beginKeywords: "struct protocol class extension enum",
      keywords: i,
      end: "\\{",
      excludeEnd: !0,
      contains: [e.inherit(e.TITLE_MODE, {
        begin: /[A-Za-z$_][\u00C0-\u02B80-9A-Za-z$_]*/
      })]
    }, {
      className: "meta",
      begin: "(@warn_unused_result|@exported|@lazy|@noescape|@NSCopying|@NSManaged|@objc|@convention|@required|@noreturn|@IBAction|@IBDesignable|@IBInspectable|@IBOutlet|@infix|@prefix|@postfix|@autoclosure|@testable|@available|@nonobjc|@NSApplicationMain|@UIApplicationMain)"
    }, {
      beginKeywords: "import",
      end: /$/,
      contains: [e.C_LINE_COMMENT_MODE, t]
    }]
  };
};