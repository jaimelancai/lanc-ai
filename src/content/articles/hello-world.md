---
title: 'Building a Game with Claude Code: First Impressions'
description: 'What it actually feels like to hand a video game prototype to an agentic coding tool — where it shines, where it stumbles, and how I structure the work.'
pubDate: 2026-06-10
tags: ['claude-code', 'agentic-ai', 'game-dev', 'devlog']
draft: false
---

I’ve spent the last few weeks building a small game prototype almost entirely
through [Claude Code](https://claude.com/claude-code), and the experience has
shifted how I think about the boundary between "writing code" and "directing
work." This is the first of a series of devlogs documenting what worked, what
didn’t, and the conventions I’ve landed on.

## The setup

The loop is simple: I describe a feature in plain language, the agent proposes
a plan, edits the relevant files, and runs the build. My job moved from typing
implementations to reviewing diffs and tightening the spec. That sounds small,
but it changes the rhythm of a day considerably.

Here’s the kind of system I might sketch out before handing it over — a tiny
fixed-timestep loop for deterministic simulation:

```ts
const STEP = 1 / 60; // seconds per simulation tick

function createLoop(update: (dt: number) => void) {
  let accumulator = 0;
  let last = performance.now();

  function frame(now: number) {
    accumulator += (now - last) / 1000;
    last = now;

    // Advance the simulation in fixed steps for deterministic behaviour.
    while (accumulator >= STEP) {
      update(STEP);
      accumulator -= STEP;
    }
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}
```

## Where it shines

Boilerplate evaporates. Scaffolding scenes, wiring input handlers, and
refactoring across many files are all dramatically faster. The agent is also
unreasonably good at the tedious parts of game dev — writing serialization
code, generating test fixtures, and keeping naming consistent across a growing
codebase.

## Where it stumbles

Game feel is hard to specify in words. "Make the jump feel snappier" is the kind
of instruction that needs iteration and a human in the loop. The wins come from
splitting work into pieces the agent can verify itself, and reserving the fuzzy,
taste-driven decisions for me.

More to come in the next post, where I’ll dig into how I structure a project so
an agent can navigate it without constant hand-holding.
