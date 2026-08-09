import { readFile, writeFile } from 'node:fs/promises';

export async function readJson(path) {
  return JSON.parse(await readFile(path, 'utf8'));
}

export async function writeJson(path, value) {
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

export function nextApprovedItem(campaign, log) {
  const published = new Set(log.records.filter((record) => record.status === 'published').map((record) => record.itemId));
  return campaign.items.find((item) => item.status === 'approved' && !published.has(item.id));
}

export function recordFor(log, itemId) {
  return log.records.find((record) => record.itemId === itemId);
}

export function isWithinPublicationWindow(date, { timezone, publishStartHour, publishEndHour }) {
  const hour = Number(new Intl.DateTimeFormat('en-GB', {
    timeZone: timezone,
    hour: '2-digit',
    hourCycle: 'h23'
  }).format(date));
  return hour >= publishStartHour && hour < publishEndHour;
}
