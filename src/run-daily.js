import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createPost, uploadImage } from './linkedin-api.js';
import { isWithinPublicationWindow, nextApprovedItem, readJson, writeJson } from './state.js';
import { preflight } from './validate.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dryRun = process.argv.includes('--dry-run');
const force = process.argv.includes('--force');
const campaign = await readJson(path.join(root, 'config/campaign.json'));
const logPath = path.join(root, 'state/publication-log.json');
const log = await readJson(logPath);
if (!dryRun && !campaign.enabled) { console.log('Campaign disabled until LinkedIn access is approved.'); process.exit(0); }

if (!dryRun && !force && !isWithinPublicationWindow(new Date(), campaign)) {
  console.log(`Outside the configured publication window (${campaign.publishStartHour}:00-${campaign.publishEndHour}:00 ${campaign.timezone}).`);
  process.exit(0);
}
const unresolved = log.records.find((record) => record.status !== 'published');
if (unresolved) throw new Error(`Manual review required for ${unresolved.itemId}; refusing to risk a duplicate post.`);
const item = nextApprovedItem(campaign, log);
if (!item) { console.log('Campaign complete.'); process.exit(0); }

const directory = path.join(root, 'content/antimetricas', `${item.id}-${item.slug}`);
const postPath = path.join(directory, 'post.md');
const imagePath = path.join(directory, 'image.png');
const commentPath = path.join(directory, 'comment.md');
await preflight({ item, postPath, imagePath, log, essayUrl: campaign.masterEssayUrl });
const [rawPost, rawComment] = await Promise.all([
  readFile(postPath, 'utf8'),
  readFile(commentPath, 'utf8').catch((error) => error.code === 'ENOENT' ? null : Promise.reject(error))
]);
const post = rawPost.replace(/^\uFEFF/, '').trim();
const manualComment = rawComment?.replace(/^\uFEFF/, '').trim() || null;
if (dryRun) {
  console.log(JSON.stringify({ item: item.id, post, manualComment, imagePath }, null, 2));
  process.exit(0);
}
if (process.env.LINKEDIN_AUTOMATION_APPROVED !== 'true') throw new Error('Set LINKEDIN_AUTOMATION_APPROVED=true only after LinkedIn approval.');
if (!process.env.LINKEDIN_ACCESS_TOKEN || !process.env.LINKEDIN_PERSON_URN) throw new Error('LINKEDIN_ACCESS_TOKEN and LINKEDIN_PERSON_URN are required.');
if (process.env.LINKEDIN_TOKEN_EXPIRES_AT && Date.parse(process.env.LINKEDIN_TOKEN_EXPIRES_AT) < Date.now() + 48 * 60 * 60 * 1000) throw new Error('LinkedIn token expires within 48 hours; renew it before publishing.');

const token = process.env.LINKEDIN_ACCESS_TOKEN;
const author = process.env.LINKEDIN_PERSON_URN;
const imageUrn = await uploadImage({
  token,
  owner: author,
  imagePath,
  processingDelayMs: campaign.imageProcessingDelaySeconds * 1000
});
const postUrn = await createPost({ token, author, commentary: post, imageUrn });
const record = { itemId: item.id, status: 'published', publishedAt: new Date().toISOString(), postUrn, imageUrn, publicationMethod: 'linkedin_official_api' };
log.records.push(record);
await writeJson(logPath, log);
console.log(`Published ${item.id}. comment.md remains available for optional manual use.`);
