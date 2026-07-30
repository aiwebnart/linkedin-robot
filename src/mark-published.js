import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readJson, writeJson, recordFor } from './state.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const value = (flag) => args[args.indexOf(flag) + 1];
const itemId = value('--id');
const postUrl = value('--url');
if (!/^\d{2}$/.test(itemId || '') || !/^https:\/\/www\.linkedin\.com\//.test(postUrl || '')) {
  throw new Error('Usage: node src/mark-published.js --id 01 --url "https://www.linkedin.com/..."');
}
const logPath = path.join(root, 'state/publication-log.json');
const log = await readJson(logPath);
if (recordFor(log, itemId)) throw new Error(`${itemId} already has a publication record.`);
log.records.push({ itemId, status: 'published', publishedAt: new Date().toISOString(), postUrl, publicationMethod: 'manual_native_linkedin' });
await writeJson(logPath, log);
console.log(`Recorded manual publication for ${itemId}.`);