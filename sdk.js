import { SuperfaceClient } from '@superfaceai/one-sdk';
import { readdir } from 'fs';
import { resolve } from 'path';
import superJson from './superface/super.json';

const SUPERFACE_PATH = resolve(__dirname, 'superface');

// Trick @vercel/nft to include the whole superface/ dir
function noop() {
  try {
    readdir(SUPERFACE_PATH);
  } catch (e) {}
}

let sdk;

function getSdk() {
  if (sdk) {
    return sdk;
  }
  sdk = new SuperfaceClient({
    superJson,
    superfacePath: resolve(SUPERFACE_PATH, 'super.json'),
  });
  return sdk;
}

export default getSdk;
