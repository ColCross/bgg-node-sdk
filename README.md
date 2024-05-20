# bgg-sdk

[![NPM Version](https://img.shields.io/npm/v/bgg-sdk?&logo=npm)](https://www.npmjs.com/package/bgg-sdk)

<!-- [![NPM Version](https://img.shields.io/badge/coverage-100%25-green)](https://github.com/ColCross/bgg-sdk/tree/main/tests) -->

**WORK IN PROGRESS: NOT YET READY FOR USE**

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
```

## TODO

- Make typing more consistent across routes (ex: page param)
- Write instructions for contributing to project
