import test from 'node:test';
import assert from 'node:assert/strict';
import { nextApprovedItem } from '../src/state.js';
import { assertComment } from '../src/validate.js';

test('selects the first approved item not published', () => {
  const campaign = { items: [{ id: '01', status: 'approved' }, { id: '02', status: 'approved' }] };
  const log = { records: [{ itemId: '01', status: 'published' }] };
  assert.equal(nextApprovedItem(campaign, log).id, '02');
});

test('rejects comments without the required final link', () => {
  const url = 'https://www.linkedin.com/pulse/example';
  assert.throws(() => assertComment('Una frase suficientemente extensa que no termina con la dirección solicitada y por eso debe fallar.', url));
});

test('accepts a valid specific comment', () => {
  const url = 'https://www.linkedin.com/pulse/example';
  const comment = `El problema no es que una respuesta sea larga: es que nos obliga a separar lo útil del ruido. En el ensayo explico por qué dirigir IA también significa exigir criterio.\n${url}`;
  assert.equal(assertComment(comment, url), comment);
});
