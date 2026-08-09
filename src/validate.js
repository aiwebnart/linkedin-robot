import { access } from 'node:fs/promises';

export function assert(condition, message) {
  if (!condition) throw new Error(message);
}

export async function preflight({ item, postPath, imagePath, log, essayUrl }) {
  assert(item.status === 'approved', `${item.id} is not approved.`);
  assert(!log.records.some((record) => record.itemId === item.id && record.status === 'published'), `${item.id} is already published.`);
  assert(essayUrl.startsWith('https://www.linkedin.com/pulse/'), 'The master essay URL must be a LinkedIn Pulse URL.');
  await access(postPath);
  await access(imagePath);
}
