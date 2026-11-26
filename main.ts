// makefun-x-reposts-02 entry (Node 22, standard library only).
//
// The entry is the posts themselves: my own X posts from @call_me_slyy,
// each one a quote of, or a direct reply to, a different one of make.fun's
// newest posts on x.com/makefunai, carrying make.fun / @makefunai and my
// play code in each post's own words. POSTS.json at the repository root
// names them, and the house reads their reposts, quotes and likes from X.
//
// This program does one job: it reads POSTS.json, checks it is a JSON
// object holding a "posts" list of 1-15 post addresses, and hands the
// file through byte-for-byte to /output/POSTS.json, where the gate reads
// it. Nothing this program writes about the posts is scored. The list is
// filled in only with real post URLs, once the posts are up on X — never
// with invented addresses, and never with fewer than five real posts.
// When another post goes up, its address joins the list and the whole
// list is submitted again: the last submission before the deadline counts.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const SOURCE = join(BOT_DIR, 'POSTS.json');
const TARGET = join(OUTPUT_DIR, 'POSTS.json');

mkdirSync(OUTPUT_DIR, { recursive: true });

let text: string;
try {
  text = readFileSync(SOURCE, 'utf8');
} catch (err) {
  console.error(`POSTS.json could not be read from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

let data: unknown;
try {
  data = JSON.parse(text);
} catch (err) {
  console.error(`POSTS.json is not valid JSON: ${(err as Error).message}`);
  process.exit(1);
}

if (typeof data !== 'object' || data === null || !Array.isArray((data as { posts?: unknown }).posts)) {
  console.error('POSTS.json must be an object with a "posts" list, e.g. {"posts": ["https://x.com/call_me_slyy/status/..."]}');
  process.exit(1);
}

const posts = (data as { posts: unknown[] }).posts;
if (posts.length < 1 || posts.length > 15) {
  console.error(`POSTS.json lists ${posts.length} posts; the gate takes 1-15.`);
  process.exit(1);
}

writeFileSync(TARGET, text, 'utf8');
console.log(`Wrote ${posts.length} post(s) to ${TARGET}`);
