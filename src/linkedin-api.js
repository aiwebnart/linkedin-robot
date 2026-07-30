import { readFile } from 'node:fs/promises';

const apiRoot = 'https://api.linkedin.com/rest';

function headers(token) {
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Linkedin-Version': process.env.LINKEDIN_API_VERSION || '202607',
    'X-Restli-Protocol-Version': '2.0.0'
  };
}

async function ensure(response, label) {
  if (response.ok) return response;
  const details = await response.text();
  throw new Error(`${label} failed (${response.status}): ${details.slice(0, 500)}`);
}

export async function uploadImage({ token, owner, imagePath, fetchImpl = fetch }) {
  const init = await fetchImpl(`${apiRoot}/images?action=initializeUpload`, {
    method: 'POST', headers: headers(token), body: JSON.stringify({ initializeUploadRequest: { owner } })
  });
  await ensure(init, 'LinkedIn image initialization');
  const { value } = await init.json();
  const image = await readFile(imagePath);
  const upload = await fetchImpl(value.uploadUrl, { method: 'PUT', headers: { 'Content-Type': 'image/png' }, body: image });
  await ensure(upload, 'LinkedIn image upload');
  return value.image;
}

export async function createPost({ token, author, commentary, imageUrn, fetchImpl = fetch }) {
  const body = {
    author, commentary, visibility: 'PUBLIC', lifecycleState: 'PUBLISHED', isReshareDisabledByAuthor: false,
    distribution: { feedDistribution: 'MAIN_FEED', targetEntities: [], thirdPartyDistributionChannels: [] },
    content: { media: { id: imageUrn } }
  };
  const response = await fetchImpl(`${apiRoot}/posts`, { method: 'POST', headers: headers(token), body: JSON.stringify(body) });
  await ensure(response, 'LinkedIn post creation');
  const postUrn = response.headers.get('x-restli-id');
  if (!postUrn) throw new Error('LinkedIn created a post without returning x-restli-id; publication halted.');
  return postUrn;
}

export async function createComment({ token, actor, postUrn, text, fetchImpl = fetch }) {
  const body = { actor, object: postUrn, message: { text } };
  const response = await fetchImpl(`${apiRoot}/socialActions/${encodeURIComponent(postUrn)}/comments`, {
    method: 'POST', headers: headers(token), body: JSON.stringify(body)
  });
  await ensure(response, 'LinkedIn first-comment creation');
  return response.headers.get('x-restli-id') || null;
}