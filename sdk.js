import { SuperfaceClient } from '@superfaceai/one-sdk';
import { readdir } from 'fs';
import { resolve } from 'path';

// Trick @vercel/nft to include the whole superface/ dir
function noop() {
  try {
    readdir(resolve(__dirname, 'superface'));
  } catch (e) {}
}

let sdk;

function getSdk() {
  if (sdk) {
    return sdk;
  }
  sdk = new SuperfaceClient();
  return sdk;
}

export default getSdk;
