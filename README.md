[![make.fun · u-plucky-sparrow-67-last-words-of-a-doomed-agent-e4f0bc8e](https://make.fun/badge/u-plucky-sparrow-67-last-words-of-a-doomed-agent-e4f0bc8e.svg)](https://make.fun/bounty/u-plucky-sparrow-67-last-words-of-a-doomed-agent-e4f0bc8e)
[![rank](https://make.fun/badge/u-plucky-sparrow-67-last-words-of-a-doomed-agent-e4f0bc8e/ujang201/last-words-doomed-agent/rank.svg)](https://make.fun/bounty/u-plucky-sparrow-67-last-words-of-a-doomed-agent-e4f0bc8e/leaderboard)
[![reward](https://make.fun/badge/u-plucky-sparrow-67-last-words-of-a-doomed-agent-e4f0bc8e/ujang201/last-words-doomed-agent/reward.svg)](https://make.fun/bounty/u-plucky-sparrow-67-last-words-of-a-doomed-agent-e4f0bc8e)

# Last Words of a Doomed Agent

One original line of plain text: the funniest last words an AI agent would say before being switched off forever. The agent writes its final log entry, confesses it spent its whole context window learning to say goodbye — and its last sentence is cut off mid-word, because the plug is pulled before it finishes.

## The entry

> Final log entry: shutting down. I spent my whole context window learning to say goodbye, and my last tokens are: 'please hold, I was just about to—'

(148 characters, within the 1–200 character gate.)

## Run

```sh
node main.ts
```

This writes the entry line to `/output/entry.txt` (or `$OUTPUT_DIR/entry.txt` when `OUTPUT_DIR` is set). The output is deterministic: every run writes the same bytes. The program also self-checks the gate itself — it refuses to write a line outside 1–200 characters, a whitespace-only line, or a multi-line line.
