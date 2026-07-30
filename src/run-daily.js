import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { nextApprovedItem, readJson } from './state.js';
import { preflight } from './validate.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const parisHour = Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Paris', hour: '2-digit', hourCycle: 'h23' }).format(new Date()));
if (!process.argv.includes('--force') && parisHour !== 10) {
  console.log('Outside the configured 10:00 Europe/Paris preparation hour.');
  process.exit(0);
}

const campaign = await readJson(path.join(root, 'config/campaign.json'));
const log = await readJson(path.join(root, 'state/publication-log.json'));
const item = nextApprovedItem(campaign, log);
if (!item) {
  console.log('Campaign complete.');
  process.exit(0);
}

const directory = path.join(root, 'content/antimetricas', `${item.id}-${item.slug}`);
const postPath = path.join(directory, 'post.md');
const imagePath = path.join(directory, 'image.png');
const commentPath = path.join(directory, 'comment.md');
await preflight({ item, postPath, imagePath, log, essayUrl: campaign.masterEssayUrl });
const [post, comment] = await Promise.all([readFile(postPath, 'utf8'), readFile(commentPath, 'utf8')]);
const preview = `# Publicacion manual preparada - Antimetrica ${item.id}/17\n\nFecha de preparacion: ${new Date().toISOString()}\n\n## Imagen\n\n\`${path.relative(root, imagePath).split(path.sep).join('/')}\`\n\n## Copy para LinkedIn\n\n${post.trim()}\n\n## Primer comentario\n\n${comment.trim()}\n\n---\n\nPublica manualmente desde la interfaz nativa de LinkedIn. Despues ejecuta:\n\n\`node src/mark-published.js --id ${item.id} --url "URL_DEL_POST"\`\n`;
await writeFile(path.join(root, 'state/today-preview.md'), preview, 'utf8');
console.log(`Prepared ${item.id} for manual LinkedIn publication. No LinkedIn API call was made.`);