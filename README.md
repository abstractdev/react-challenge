# Libraries and structure with brief explanation:

## Initial

- Create React App or a custom bare bones setup?
  - CRA for quick setup - tradeoff is bloat

## Folder Structure

- Used the large scale structure outlined here: https://www.robinwieruch.de/react-folder-structure/
- Each component is inside a folder with its corresponding scss file. All exports in the folder are done via a single index.ts file.
- This structure allows for test files or type files to be added as needed in the future.
- Sass folder with global styles, reset, mixins, variables.
- Utils folder, custom hooks folder as needed.

## Commit convention

- https://www.conventionalcommits.org/en/v1.0.0/#summary
- This is a condensed cheatsheet of the above: https://kapeli.com/cheat_sheets/Conventional_Commits.docset/Contents/Resources/Documents/index

## Date library

- Most downloads in npmtrends https://npmtrends.com/date-fns-vs-dayjs-vs-luxon-vs-moment
- Momentjs has the most, but its use is discouraged by the Momentjs team and is considered legacy at this point in time.

## Axios vs fetch

- Axios has all the features of fetch with a few extras.
- https://betterprogramming.pub/why-javascript-developers-should-prefer-axios-over-fetch-294b28a96e2c
  - Can work with response data in 1 step vs 2 for fetch.
  - Better error handling.

## Misc

- ESLINT required for all projects
- Prettier via vscode extension
- react-stars for rating UI
