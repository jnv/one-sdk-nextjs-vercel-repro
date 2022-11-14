import { SuperfaceClient } from '@superfaceai/one-sdk';
import superJson from '../../superface/super.json';

export default async function handler(req, res) {
  try {
    const sdk = new SuperfaceClient({
      superJson,
      superfacePath,
    });
    const profile = await sdk.getProfile('weather/current-city');

    const result = await profile.getUseCase('GetCurrentWeatherInCity').perform({
      city: 'Prague, Czech Republic',
      units: 'C',
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
    res
      .status(500)
      .json({
        message: 'Caught exception outside of perform',
        error,
        errorMsg: error.message,
      });
  }
}
