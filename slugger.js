// replaces all whitespace with '-' and removes
// all non-url friendly characters
(function () {
var whitespace = /\s+/g;

function replaceSpecialChars(str)
{
    str = str.replace(/[ÀÁÂÃÄÅ]/,"A");
    str = str.replace(/[àáâãäå]/,"a");
    str = str.replace(/[uúùüû]/,"u");
    str = str.replace(/[ÚÙÛÜ]/,"u");
    str = str.replace(/[oóòõöô]/,"o");
    str = str.replace(/[ÓÔÕÖ]/,"O");
    str = str.replace(/[ÈÉÊË]/,"E");
    str = str.replace(/[eéèẽêë]/,"e");
    str = str.replace(/[Ç]/,"C");
    str = str.replace(/[ç]/,"c");
    return str

}

function slugger(string, opts) {
    opts || (opts = {});

    string = replaceSpecialChars(string)

    var allowedCharacters = "A-Za-z0-9_ -";
    if (opts.alsoAllow) allowedCharacters = opts.alsoAllow + allowedCharacters;
    var re = new RegExp('[^' + allowedCharacters + ']', 'g');
    var maintainCase = opts.maintainCase || false;
    var replacement = opts.replacement || '-';
    var smartTrim = opts.smartTrim;
    var decode = (opts.decode !== false);
    var result;
    var lucky;

    if (typeof string !== 'string') return '';
    if (!maintainCase) string = string.toLowerCase();
    if (decode) string = decodeURIComponent(string);
    result = string.trim().replace(re, '').replace(whitespace, replacement);
    if (smartTrim && result.length > smartTrim) {
        lucky = result.charAt(smartTrim) === replacement;
        result = result.slice(0, smartTrim);
        if (!lucky) result = result.slice(0, result.lastIndexOf(replacement));
    }
    return result;
}

if (typeof module !== 'undefined') {
    module.exports = slugger;
} else {
    window.slugger = slugger;
}
})();
