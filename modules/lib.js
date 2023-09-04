export const el = cssSelektor => document.querySelector(cssSelektor);
export const group = cssSelektor => document.querySelectorAll(cssSelektor);
export const create = htmlElem => document.createElement(htmlElem);
export const deepCopy = (array) => structuredClone(array);
export const loadJSON = async (url) => (await fetch(url)).json();
export const loadHTML = async (url) => (await fetch(url)).text();


