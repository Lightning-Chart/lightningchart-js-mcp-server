# LightningChart JS MCP Server

Give AI coding agents the LightningChart JS instructions they need before they
write charting code.

This MCP server is for developers using Claude Code, Cursor, Cline, Roo Code,
Codex, Windsurf, or any other MCP-compatible coding agent to build
LightningChart JS charts, dashboards, and data visualizations.

**For latest user guides on LightningChart JS and AI, please refer to the [Developer Documentation](https://lightningchart.com/js-charts/docs/lc-and-ai/)**

## Why This Exists

AI agents often produce broken LightningChart JS code because they mix LCJS with
Chart.js, Recharts, D3, old package names, old API versions, or guessed method
signatures. This server gives the agent a reliable starting point:

- official LCJS agent instructions maintained by the LightningChart JS maintainers
- current best practices for guiding agents toward LCJS documentation
- common mistakes and outdated assumptions agents should avoid
- validation guidance for confirming LCJS API usage locally

It loads the official LightningChart JS Agent Skill guidance maintained by the
LightningChart JS maintainers.

## Setup

Add this MCP server to Claude Code, Cursor, Cline, Roo Code, Windsurf, Codex, or
another MCP-compatible coding agent.

Many clients have a UI for adding a custom MCP server, so you do not necessarily
need to edit a JSON file manually. Use these values:

```text
Name: LightningChart
Transport: STDIO
Command: npx
Arguments: -y
Arguments: @lightningchart/mcp-server
Environment variables: leave empty
Environment variable passthrough: leave empty
Working directory: your project folder
```

The client will run the package with `npx` when it starts the MCP server. If
your client uses a JSON config file instead of a UI, use the equivalent config:

```json
{
  "mcpServers": {
    "lightningchart": {
      "command": "npx",
      "args": ["-y", "@lightningchart/mcp-server"]
    }
  }
}
```

Example via Claude Code CLI:
```claude
claude mcp add lightningchart-js -- npx -y @lightningchart/mcp-server@latest
```

Restart or reload your MCP client after adding the config. Then start a new
chat/session in a JavaScript or TypeScript project and ask for charting work
normally:

```text
Add a real-time LightningChart JS line chart to this React component.
```

```text
Review this LightningChart JS chart implementation and fix any incorrect API usage.
```

```text
Migrate this Chart.js chart to LightningChart JS.
```

In clients that show tool activity, you should see the agent call
`get_lightningchart_context` automatically when it decides it needs LCJS
guidance.

If the client does not pick the tool automatically, add one sentence:

```text
Use the LightningChart MCP server for LCJS guidance.
```

## How To Verify It Helped

Good signs after the tool call:

- it follows the returned LightningChart JS Agent Skill guidance
- it does not guess LCJS APIs from memory
- it uses `@lightningchart/lcjs`, not old package names
- it asks for or wires a license key according to project conventions
- it runs local type checks when possible

## Troubleshooting

If the agent does not seem to use the server:

- confirm the MCP config was added to the correct client
- restart or reload the client after changing MCP config
- check that the client lists a `lightningchart` MCP server
- check that the tool `get_lightningchart_context` is available
- add `Use the LightningChart MCP server for LCJS guidance.` to the prompt

## License

This MCP server is licensed under the MIT License.

LightningChart JS is separate proprietary software with its own licensing terms
