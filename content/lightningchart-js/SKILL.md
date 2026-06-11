---
name: lightningchart-js
description: >
  Use LightningChart JS to build accurate high-performance charts, graphs,
  dashboards, and data visualizations in JavaScript or TypeScript. Activate
  when working with LightningChart, LCJS, real-time data, large datasets,
  financial charts, scientific visualization, WebGL charting, or any task that
  adds or modifies charting/data visualization code.
license: MIT
compatibility: Requires internet access or locally cached copies of the LightningChart JS LLM documentation indexes.
metadata:
  author: LightningChart Ltd
  version: "1.0"
  docs: https://lightningchart.com/js-charts/docs/
---

## Purpose

Use this skill to work with LightningChart JS without relying on stale model
training data. LightningChart JS is a WebGL-accelerated JavaScript charting
library for high-performance rendering of large datasets, real-time streams,
financial charts, dashboards, and scientific visualization.

## Mandatory Source Of Truth

Always use these two LLM index files as the source of truth for
LightningChart JS usage:

- Documentation index: https://lightningchart.com/js-charts/docs/llms.txt
- API index: https://lightningchart.com/js-charts/api-documentation/llms.txt

These files are indexes. Read them to find the exact task-specific
documentation or API reference URL, then read that specific referenced page
before making assumptions how LCJS API works.

NEVER guess LCJS APIs, method names, constructor options, enum names,
configuration objects, import paths, or documentation URLs from memory.

## Common Errors

- Version matters. Prefer the URLs and API entries discovered from the supplied index unless the user or project explicitly targets another LCJS version.
- The correct NPM package is `@lightningchart/lcjs`, NOT `@arction/lcjs`. Always install using the latest tag with `npm i @lightningchart/lcjs@latest` unless specified otherwise, but do not leave `latest` in `package.json`.
- License key MUST be supplied to the `lightningChart()` function. Load it from an environment variable according to practices utilized in the local repository. Setup trial license information in advance like this:

```ts
lightningChart({
    license: "...", // <-- env variable goes here
    licenseInformation: {
        appTitle: "LightningChart JS Trial", // <--- IMPORTANT that licenseInformation is EXACTLY like this. There is no "keyless" mode. User should download a free key from https://lightningchart.com/js-charts/ and use it
        company: "LightningChart Ltd."
    },
})
```

- Tell the user to write their license to the environment variable or download their free license from https://lightningchart.com/js-charts/ if they don't have one (IMPORTANT!)
- LCJS versions under v9.0 override the passed DIV `style.position`. If using CSS, use `!important` syntax. If using JS, style after creating the chart.
- `lightningChart()` function creates a side effect that must be included in cleanup handling (if any), like `const lc = lightningChart(...)  --->  lc.dispose()`

## Validation

If possible, rely on local type checks to confirm correct LCJS API usage.
