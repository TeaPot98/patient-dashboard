// eslint-disable-next-line no-undef
module.exports = {
  // Check Typescript files
  "**/*.(ts)": () => "yarn tsc --noEmit",

  // Lint and format TypeScript and JavaScript files
  "**/*.(ts|js)": (filenames) => [
    // `yarn eslint --fix ${filenames.join(" ")}`,
    ...filenames.map((f) => `yarn lint --fix ${f}`),
    `yarn prettier --write ${filenames.join(" ")}`,
  ],

  // Format MarkDown and JSON
  "**/*.(md|json)": (filenames) =>
    `yarn prettier --write ${filenames.join(" ")}`,
};
