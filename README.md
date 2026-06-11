# LightningChart JS MCP Server

Give AI coding agents the LightningChart JS instructions they need before they
write charting code.

This MCP server is for developers using Claude Code, Cursor, Cline, Roo Code,
Codex, Windsurf, or any other MCP-compatible coding agent to build
LightningChart JS charts, dashboards, and data visualizations.

## Why This Exists

AI agents often produce broken LightningChart JS code because they mix LCJS with
Chart.js, Recharts, D3, old package names, old API versions, or guessed method
signatures. This server gives the agent a reliable starting point:

- official LCJS agent instructions maintained by the LightningChart JS maintainers
- current best practices for guiding agents toward LCJS documentation
- common mistakes and outdated assumptions agents should avoid
- validation guidance for confirming LCJS API usage locally

It does not replace the documentation and it does not maintain its own separate
knowledge base. It loads the official LightningChart JS Agent Skill guidance and
returns it through MCP.

## How It Works

The server exposes one MCP tool:

```text
get_lightningchart_context
```

When the coding agent calls this tool, it receives the same guidance as the
LightningChart JS Agent Skill.

The tool is intentionally small:

- no external HTTP calls
- no scraping
- no doc proxying
- no hidden state
- no separate knowledge base

The maintained source is the official LightningChart JS Agent Skill content
bundled with this package.

## Install

```bash
npx -y @lightningchart/mcp-server
```

## Client Configuration

Most MCP clients configure local stdio servers by launching a command. For this
package, the command is `npx` and the package is run on demand.

Use this in Claude Code, Cursor, Cline, Roo Code, Windsurf, Codex MCP config, or
other MCP-compatible clients:

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

Restart or reload your MCP client after adding the config.

## How To Make Your Agent Use It

MCP is a setup step, not something you should have to mention in every prompt.
After you add the config and restart your MCP client, the client exposes
LightningChart guidance as a tool the agent can choose when the task involves
LCJS, charts, dashboards, real-time data, large datasets, financial charts, or
scientific visualization.

Use this workflow:

1. Add the MCP config above.
2. Restart or reload the MCP client.
3. Start a new chat/session in a JavaScript or TypeScript project.
4. Ask for the charting work normally.

Normal prompts:

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

If a client does not pick the tool automatically, add one short sentence to the
prompt:

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

## Example Agent Prompts

```text
Add a real-time LightningChart JS line chart to this React component.
```

```text
Review this LCJS implementation for hallucinated or outdated API usage.
```

```text
Migrate this Chart.js chart to LightningChart JS.
```

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
