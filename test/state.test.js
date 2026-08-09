import test from 'node:test';
import assert from 'node:assert/strict';
import { isWithinPublicationWindow, nextApprovedItem } from '../src/state.js';

test('selects the first approved item not published', () => {
  const campaign = { items: [{ id: '01', status: 'approved' }, { id: '02', status: 'approved' }] };
  const log = { records: [{ itemId: '01', status: 'published' }] };
  assert.equal(nextApprovedItem(campaign, log).id, '02');
});

test('accepts delayed runs inside the publication window', () => {
  const campaign = { timezone: 'Europe/Paris', publishStartHour: 10, publishEndHour: 13 };
  assert.equal(isWithinPublicationWindow(new Date('2026-08-09T09:45:00Z'), campaign), true);
});

test('rejects runs after the publication window', () => {
  const campaign = { timezone: 'Europe/Paris', publishStartHour: 10, publishEndHour: 13 };
  assert.equal(isWithinPublicationWindow(new Date('2026-08-09T11:00:00Z'), campaign), false);
});
