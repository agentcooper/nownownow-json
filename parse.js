const fs = require("fs");

const select = require("xpath.js");
const dom = require("xmldom").DOMParser;

function extract(source, html) {
  const doc = new dom({
    locator: {},
    errorHandler: {
      warning: () => {},
      error: (e) => {
        console.error(e);
      },
      fatalError: (e) => {
        console.error(e);
      },
    },
  }).parseFromString(html);

  const name = select(doc, "//*[contains(@class, 'name')]/text()")[0].nodeValue;

  const url = select(doc, "//*[contains(@class, 'link')]/a/@href")[0].nodeValue;

  const location = select(
    doc,
    "//*[preceding-sibling::h4[. = 'Location:'] and following-sibling::h4[. = 'Professional title:']]/text()"
  )[0]
    .toString()
    .trim()
    .replaceAll(",\n\n", ", ")
    .replaceAll(" , ", ", ");

  const title = select(
    doc,
    "//*[preceding-sibling::h4[. = 'Professional title:'] and following-sibling::h4[. = 'What do you do?']]/text()"
  )[0]
    .toString()
    .trim();

  const what = select(
    doc,
    "//*[preceding-sibling::h4[. = 'What do you do?'] and following-sibling::h4[. = 'Why?']]/text()"
  )[0]
    .toString()
    .trim();

  const why = select(
    doc,
    "//*[preceding-sibling::h4[. = 'Why?'] and following-sibling::h4[. = 'What should we read?']]/text()"
  )[0]
    .toString()
    .trim();

  const read = select(
    doc,
    "//*[preceding-sibling::h4[. = 'What should we read?'] and following-sibling::h4[. = 'URLs:']]/text()"
  )[0]
    .toString()
    .trim();

  const urls = select(
    doc,
    "//ul[preceding-sibling::h4[. = 'URLs:']]/li/a/@href"
  ).map((item) => item.nodeValue);

  return {
    source,
    name,
    url,
    location,
    title,
    what,
    why,
    read,
    urls,
  };
}

const result = [];
for (const file of fs.readdirSync("./data/p")) {
  const html = fs.readFileSync(`./data/p/${file}`, "utf-8");
  const source = `https://nownownow.com/p/${file.replace(".html", "")}`;
  result.push(extract(source, html));
}
result.sort((a, b) => a.name.localeCompare(b.name));
console.log(JSON.stringify(result, null, 2));
