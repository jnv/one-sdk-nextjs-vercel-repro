import { SuperfaceClient } from '@superfaceai/one-sdk';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import superJson from '../../superface/super.json';

readFileSync(resolve(__dirname, '..', '..', 'superface', 'mock.provider.json'));

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
