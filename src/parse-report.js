const jsdom = require('jsdom');
const jQuery = require('jquery');

function parseSuite(suite, suiteObj) {
    let $ = this;
    let children = $(suite).children();
    let subSuites = $(Array.from($(children[1]).children()).filter(c => $(c).hasClass('suite')));

    suiteObj.title = $(children[0]).find('a').text();

    if (!subSuites.length) {
        suiteObj.tests = Array.from($('li', suite)).map(li => {
            return {
                status: !!$(li).hasClass('pass'),
                title: $('h2', li).text().replace(/\d+ms.*$/, ""),
                duration: parseInt($('.duration', li).text().replace('ms', "")),
                stack: $('.error', li).text()
            };
        });
    } else {
        suiteObj.subSuites = [];

        for (let i = 0, l = subSuites.length; i < l; i++) {
            parseSuite.call(this, subSuites[i], suiteObj.subSuites[i] || (suiteObj.subSuites[i] = {}));
        }
    }
}

function parseReport(DOM, documentId = 1) {
    return DOM.querySelector({
            nodeId: documentId,
            selector: "#mocha-report"
        })
        .then((res) => {
            return DOM.getOuterHTML({
                nodeId: res.nodeId
            });
        })
        .then((res) => {
            let html = res.outerHTML;

            return new Promise((resolve, reject) => {
                jsdom.env(html, function (err, window) {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(jQuery(window));
                });
            });
        })
        .then(($) => {
            let outerSuites = Array.from($("#mocha-report").children());
            let suites = [];

            for (let i = 0, l = outerSuites.length; i < l; i++) {
                parseSuite.call($, outerSuites[i], suites[i] || (suites[i] = {}));
            }
            
            return suites;
        });
}

module.exports = parseReport;