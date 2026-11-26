// Courier for the makefun-x-reposts-02 entry.
//
// It takes the list of X posts in POSTS.json from the bot directory and
// places an exact copy of that file in the output directory. The posts
// themselves are the entry; this program only carries the list along, so
// it never edits, reorders or re-encodes anything it reads. Keeping the
// copy byte-for-byte matters: the house reads the posts from the list,
// and any change to the file would only get in its way.

import * as fs from 'node:fs';
import * as path from 'node:path';

// Report a problem and stop with a failing exit code.
function stop(message: string): never {
  console.error(message);
  process.exit(1);
}

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const sourcePath = path.join(botDir, 'POSTS.json');
const targetPath = path.join(outputDir, 'POSTS.json');

let rawText: string;
try {
  rawText = fs.readFileSync(sourcePath, 'utf8');
} catch {
  stop('POSTS.json could not be read');
}

let parsed: unknown;
try {
  parsed = JSON.parse(rawText);
} catch {
  stop('POSTS.json did not parse as JSON');
}

if (parsed === null || typeof parsed !== 'object' || !Array.isArray((parsed as { posts?: unknown }).posts)) {
  stop('POSTS.json needs a posts array');
}

const posts = (parsed as { posts: unknown[] }).posts;
if (posts.length < 1 || posts.length > 15) {
  stop('POSTS.json must list between 1 and 15 posts');
}

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(targetPath, rawText);
console.log(`Copied ${posts.length} post(s) to ${targetPath}`);
