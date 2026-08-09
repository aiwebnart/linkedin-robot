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

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export async function uploadImage({ token, owner, imagePath, processingDelayMs = 0, fetchImpl = fetch, waitImpl = wait }) {
  const init = await fetchImpl(`${apiRoot}/images?action=initializeUpload`, {
    method: 'POST', headers: headers(token), body: JSON.stringify({ initializeUploadRequest: { owner } })
  });
  await ensure(init, 'LinkedIn image initialization');
  const { value } = await init.json();
  const image = await readFile(imagePath);
  const upload = await fetchImpl(value.uploadUrl, { method: 'PUT', headers: { 'Content-Type': 'image/png' }, body: image });
  await ensure(upload, 'LinkedIn image upload');
  if (processingDelayMs > 0) await waitImpl(processingDelayMs);
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
