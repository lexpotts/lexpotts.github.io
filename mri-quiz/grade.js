// Fill-in grading, shared by the page (loaded as /grade.js) and the server (require).
// normalize() turns the many ways of typing an answer into one form that the
// question's `pattern` regex is written against.
(function (root) {
  function normalize(s) {
    return String(s).toLowerCase()
      .replace(/\b(at least|greater than or equal to|more than|over|about|approximately|approx\.?)\b/g, '')
      .replace(/\b(less than|under|below)\b/g, '<')
      .replace(/\s+(to|through|thru)\s+/g, '-')
      .replace(/[–—−]/g, '-')
      .replace(/\s+/g, '')
      .replace(/(^|[^0-9])\.(\d)/g, '$10.$2')          // .8 -> 0.8
      .replace(/milligrams?perdeciliter/g, 'mg/dl')
      .replace(/milli-?internationalunits?permilliliter/g, 'miu/ml')
      .replace(/millilit(er|re)s?perminute/g, 'ml/min')
      .replace(/(\d)(seconds?|secs?\.?)$/, '$1s');
  }
  // q.strict (safe dose notation): only case and extra spaces are forgiven, so ".5 mg" and "5.0 mg"
  // stay wrong exactly as they would be on the exam.
  function strictNormalize(s) { return String(s).trim().toLowerCase().replace(/\s+/g, ' '); }
  function gradeFill(q, response) {
    try { return new RegExp(q.pattern).test(q.strict ? strictNormalize(response) : normalize(response)); } catch { return false; }
  }
  const api = { normalize, gradeFill };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Grade = api;
})(this);
