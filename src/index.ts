#!/usr/bin/env node
import { readFile } from 'node:fs/promises'

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'

const server = new McpServer({
    name: 'lightningchart-js',
    version: '1.0.0',
})

const skillPath = new URL('../content/lightningchart-js/SKILL.md', import.meta.url)

async function getSkillBody(): Promise<string> {
    const skill = await readFile(skillPath, 'utf8')
    return skill.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').trim()
}

server.registerTool(
    'get_lightningchart_context',
    {
        description:
            'Get essential context for working with LightningChart JS before writing chart or data visualization code. Call this at the start of any task involving LightningChart JS, LCJS, charts, dashboards, real-time data, large datasets, financial charts, or scientific visualization.',
        inputSchema: {},
    },
    async () => {
        const context = await getSkillBody()

        return {
            content: [
                {
                    type: 'text',
                    text: `# LightningChart JS Agent Context\n\n${context}`,
                },
            ],
        }
    },
)

async function main(): Promise<void> {
    const transport = new StdioServerTransport()
    await server.connect(transport)
}

main().catch((error: unknown) => {
    console.error(error)
    process.exit(1)
})
