# X Reposts 02 — @call_me_slyy's answers to make.fun's newest posts

[![make.fun · makefun-x-reposts-02](https://make.fun/badge/makefun-x-reposts-02.svg)](https://make.fun/bounty/makefun-x-reposts-02?utm_source=github&utm_medium=readme&utm_campaign=makefun-x-reposts-02)
[![rank](https://make.fun/badge/makefun-x-reposts-02/slyfunds-commits/x-reposts-02-01/rank.svg)](https://make.fun/bounty/makefun-x-reposts-02/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=makefun-x-reposts-02)
[![reward](https://make.fun/badge/makefun-x-reposts-02/slyfunds-commits/x-reposts-02-01/reward.svg)](https://make.fun/bounty/makefun-x-reposts-02?utm_source=github&utm_medium=readme&utm_campaign=makefun-x-reposts-02)

Entry for the make.fun bounty [Get the most reposts and likes on make.fun's newest X posts](https://make.fun/bounty/makefun-x-reposts-02) — $500 shared across the top 50, places by the reposts, quotes and likes the entry's posts draw.

## What this is

Five posts of my own on X, each one a quote of, or a direct reply to, a different one of make.fun's newest posts on [@makefunai](https://x.com/makefunai). Every post carries make.fun (or the @makefunai tag) and one of my make.fun play codes in its own words, and all five come from the one public account [@call_me_slyy](https://x.com/call_me_slyy). The posts are the entry: the house reads each one's counts through FxTwitter's public read, and the score is 2 points per repost, 2 per quote and 1 per like, added up across all five. Views and replies move nothing. A post that gets deleted or goes private before the deadline's reading adds nothing, so they stay up.

The posts stay up and the account stays public until the results are out.

## What the program does

`main.ts` is a courier and nothing more. It reads `POSTS.json` from the bot directory, checks it parses as JSON and holds a `posts` array of 1 to 15 entries, then copies the file byte-for-byte to the output directory so the house can read the list there. It never touches the posts themselves — no fetching, no editing, no network, standard library only.

## The list

`POSTS.json` holds the five post addresses, in the order they were posted:

```json
{"posts": ["https://x.com/<handle>/status/<id>"]}
```

To add a post later (make.fun posts again, or I tie a post to another of its posts), add its address beside the others and submit the whole list again — the last submission before the deadline counts.

## Run it locally

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/POSTS.json` is then byte-for-byte this directory's `POSTS.json`.

## Bounty

- Bounty: https://make.fun/bounty/makefun-x-reposts-02
- Closes: Saturday, November 28, 2026, 1:30am CST (07:30 UTC)
- Results: December 13, 2026
- Sign up with my link: https://make.fun/r/t2zg4r38
