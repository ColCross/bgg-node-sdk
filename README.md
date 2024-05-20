# bgg-sdk

[![NPM Version](https://img.shields.io/npm/v/bgg-sdk?&logo=npm)](https://www.npmjs.com/package/bgg-sdk)
[![NPM Version](https://img.shields.io/badge/coverage-100%25-green)](https://github.com/ColCross/bgg-sdk/tree/main/tests)

A modern SDK for interacting with the BoardGameGeek (BGG) XMLAPI2, written in TypeScript and inspired by [BGG](https://www.npmjs.com/package/bgg).

## Core Features

- Support for all BGG XMLAPI2 endpoints (see [documentation](https://boardgamegeek.com/wiki/page/BGG_XML_API2))
- Automatic conversion of responses from XML to JSON
- Exponential retry for queued requests
- Full type safety for requests and responses
- Support for both CommonJS and ES modules
- Usable in both server and browser environments

## Quickstart

```bash
    npm install bgg-sdk
```

## Code Example

```typescript
import { bgg } from "bgg-sdk";
// import bgg from "bgg-sdk";

const results = await bgg.search({ query: "scythe" });

// results
{
  "attributes": {
    "termsofuse": "https://boardgamegeek.com/xmlapi/termsofuse"
  },
  "items": [
    {
      "id": "398158",
      "type": "boardgame",
      "name": "Grind House: Scythes Out",
      "yearPublished": "2023"
    },
    {
      "id": "226320",
      "type": "boardgame",
      "name": "My Little Scythe",
      "yearPublished": "2017"
    },
    ...
  ]
}
```

## Contributing

Hey there! 👋

I hope you've found my sdk useful for your project, but if you found any bugs please open an issue and I'll address it as soon as I can.

Of course always feel free to take a crack at fixing it yourself and opening a PR!

### Getting Started

1. **Fork the repo** and clone it to your machine.
2. **Install dependencies** with `npm install`.
3. **Make your changes** in a new branch.
4. **Test your changes** to make sure everything works as expected.
   1. Run `npm test` and fix / add any necessary tests to maintain 100% code coverage. _Your PR cannot be merged until all tests pass._
5. **Submit a pull request** with a clear description of your changes.

## Future Plans

- Do proper type casting so not all return types are strings. (consequence of working with original xml data)
