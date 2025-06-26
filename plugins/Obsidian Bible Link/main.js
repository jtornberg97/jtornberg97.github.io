var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => AutoScriptureLinker
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var AutoScriptureLinker = class extends import_obsidian.Plugin {
  async onload() {
    this.registerMarkdownPostProcessor((el, ctx) => {
      const regex = /\b([1-3]?\s?[A-Za-z]+)\s(\d{1,3}):(\d{1,3})(?:[-–](\d{1,3}))?\b/g;
      el.querySelectorAll("p, li").forEach((element) => {
        element.innerHTML = element.innerHTML.replace(regex, (match, book, chapter, verse, endVerse) => {
          const passage = endVerse ? `${book} ${chapter}:${verse}-${endVerse}` : `${book} ${chapter}:${verse}`;
          const encoded = encodeURIComponent(passage);
          const url = `https://www.biblegateway.com/passage/?search=${encoded}&version=NRSV`;
          return `<a href="${url}" target="_blank">${match}</a>`;
        });
      });
    });
  }
  onunload() {
    console.log("AutoScriptureLinker plugin unloaded.");
  }
};
