import BA from '../assets/BA.png';
import S7 from '../assets/S7.png';
import SU from '../assets/SU.png';
import TK from '../assets/TK.png';
import DefaultLogo from '../assets/no-image.png';

const airlineLogos: Record<string, string> = {
  BA,
  S7,
  SU,
  TK,
};

export const getAirlineLogo = (airlineCode: string): string =>
  airlineLogos[airlineCode] || DefaultLogo;
