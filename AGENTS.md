<!-- antislop:start -->
## antislop
For UI, copy, people, mobile layout, or code comments work, read these installed skill files directly (use these paths even if a same-named global skill exists):
- Core filter, always on: `antislop`: `.agents/skills/antislop/SKILL.md`
- UI / visual: `antislop-ui`: `.agents/skills/antislop-ui/SKILL.md`
- Copy & text: `antislop-copywriting`: `.agents/skills/antislop-copywriting/SKILL.md`
Before starting, follow the core's "Two Usage Modes" section in strict order: explicit session instruction first, then global preference, then ask. A session instruction always wins. For a resolved mode, say `antislop active: <mode> (session override).` or `antislop active: <mode> (global preference).` once before presenting findings or making edits, using the actual mode and source. Acknowledging the user's request without naming the source does not replace this notice.
Only an explicit choice of antislop during or after selects a session mode. A request to review, audit, or avoid file edits does not select a mode; read the global preference in that case. Another skill's mode does not select antislop's mode.
If the mode is unresolved, ask during/after and end the response; wait for the answer before any UI review, planning, or concept. For read-only tasks, put the active-mode notice only at the start of the final answer, never in progress messages. For editing tasks, announce before the first edit and omit it from the final answer.
To update antislop later: `npx antislop-ai --update`, or run `npx antislop-ai` and pick Overwrite them.
<!-- antislop:end -->

# Codebase Memory Rules

For all coding tasks in this repository:

1. Before exploring the codebase, use the `codebase-memory` MCP tools through the configured CLI runner when native MCP tools are unavailable.
2. Start with `list_projects` and `index_status` to identify the current project and verify that its graph index is ready. Pass the correct project identifier to commands that require it.
3. Use `search_graph`, `query_graph`, `trace_path`, `get_file_outline`, `get_code_snippet`, or `get_architecture` to locate relevant code and understand dependencies before opening files.
4. Read only the source files necessary for the requested task. Do not scan the entire repository or repeat full indexing without a clear reason.
5. If source files have changed since indexing, use the appropriate change-detection or incremental-indexing workflow before relying on potentially stale graph results.
6. Treat graph results as navigation and dependency hints, not as a substitute for verifying the actual source code.
7. Before modifying code, inspect the relevant implementation and its callers. After modifying code, run appropriate tests or checks when available.
8. Never trigger full repository indexing automatically for every request.
9. Keep responses focused on relevant files, dependencies, changes, and verification results.