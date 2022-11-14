import { SuperfaceClient } from '@superfaceai/one-sdk';
import fs from 'fs';
import { resolve } from 'path';
import superJson from '../../superface/super.json';

function noop() {
  try {
    fs.readdir(resolve(__dirname, '..', '..', 'superface'));
  } catch (e) {}
}

export default async function handler(req, res) {
  try {
    const sdk = new SuperfaceClient({
      superJson,
    });
    const profile = await sdk.getProfile('test-profile');

    const result = await profile.getUseCase('TestProfile').perform({
      foo: 'baz',
    });

    result.match(
      (data) => {
        res.status(200).json(data);
      },
      (error) => {
        res.status(500).json({ message: 'Perform error', error });
      }
    );
  } catch (error) {
    res.status(500).json({
      message: 'Caught exception outside of perform',
      error,
      errorMsg: error.message,
    });
  }
}
