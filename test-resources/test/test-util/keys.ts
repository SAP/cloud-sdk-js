import { Algorithm, JwtHeader, sign } from 'jsonwebtoken';

export const privateKey =
  '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC3g9LZSE4yJv2P\nBCTBrFkgXyj3iEDE6AY0lwZAjzG3C118XMnoWamxqOKSkLKLjAmy4NwnJgp5pq5N\nUx2eksS4aCuIm6JfLnxghafjBvTYUuCdOi/fCNV9CYmu7M8pTiSxSaD5SOjaY5HD\ntJRFz99br/9R7wXJKs3JtoVbyypqw4jzEi5Pc7xUPx16voyB7TFmKzhp0rmXAIXR\nEBvUwVOE9WyuyfFM8zr4loaPVk41REzIH/yOfF29GD1VID4tT24mtSdFOkbctrei\nnF0cr8gPLpDx54iEqIe5nbxmJWyk4LsPnY9ry8nNhq4XOuyO+pqr5HofU8uceBb0\nTXkQBNm3AgMBAAECggEAI151ycjkwUfAgMrkpqsn9lRA2gxZp1mssIAXBWRTyZqY\nJvrfMzfsu7/4AxV+Q+T2jZJG/AiZ5j5Yw7BsOf7BiWUSVt7gGYYlFJlN9TSHBhZb\nEhJ/3XWfZ9zpu1wKxUQ5UC4Hp2QE9OpR0q1AEoBw5QPzqn/t1oq4ZNMXusxaXX8E\nHbwhrKUCgWOKnYUBw7kwNdok09DVJwmedYIYFsCH9NGXp6VXPw1hsc/yOOWKqA6I\nIDt+9qr23G1ObifQgQ4Vy8qSBTmbeEGwcizr7NUOABh27UHX+UxG2Gkx+1E8LAuP\n9t7QrmdDyuatbvtmnEFyNRPWlcts3zAyh1m29odqmQKBgQDx3KdAbIioun+yLoNy\n1UwW6IJ17mT9EmnG+KK6eeH+s92v04gLrffrkVKbaVMicYpA0DPPh3o01I3xjkYg\nkFyF0HOtZDoIS86BoJY4sY+A3laAS6HT0x7hhwtDjtor9fZKmHT/aapIJVUaY5cp\nrV/GZcepohr95AATZThFkdN9CwKBgQDCPgkrmxN3gwGsf1VHv3/Yf63FtJxFfSzw\nRoenv1i4SHUul+iE4DXZHiWoiDazQvaAVFm34JpRdLUf08ccj9LjRcVSE9bx+kE7\ndm8BN/iY964R88e88IY4mMKzccoY/l7BPkrDV3qUHg965q1GZ5e9OBDxxqazhbzU\nAAJI/e6JhQKBgQCCdiqFlsXUdd0hqPNgwutrQ/nzUSeKVx9Vo5Jrkgk0kaMYD7tH\nyYx8tgPgLt0YLDSOJ4B7BjIGQ01ZqgvrztMJn1p2giTHitSWmZ/ObwDgW44/YAyn\nrS7wKh8KTwkiQ2eZ70jU6RNgHTsdo/DLG2kZJJehyf5TS2Q7EhNbe4Cf5wKBgGSf\nemSqexUoOo+/jtASNgpTahPHEkU1KTh3cQLHLxCYCIxQiVV8SKjm4x9BIQUQJV4p\nVCjbI1YbHVEVhkoXf2nY1PVF7c2AlJZXLf31nsSvWe9W2Bvahc1/5SzMP6Ne8nss\n59H12Twtrls+cHjOZV7SUoTNIcJR/5XbQ1PIp+95AoGAJwg++BeB4zbgiP1aba0p\nrUTAuO0/3LxifHQQnjXxwqwMTYCunXjlqn1HeK7wg51eAfMGpIUBslFSAkeqcb2R\nqShyHdLarK/6H6FcxIdeBgiUI7dwq1gw/2D6AN4mcMuxOSonMQoV6ZI+8OEFvqS6\nxpWbhF1OqpazHInEZh6XATw=\n-----END PRIVATE KEY-----\n';
export const publicKey =
  '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAt4PS2UhOMib9jwQkwaxZ\nIF8o94hAxOgGNJcGQI8xtwtdfFzJ6FmpsajikpCyi4wJsuDcJyYKeaauTVMdnpLE\nuGgriJuiXy58YIWn4wb02FLgnTov3wjVfQmJruzPKU4ksUmg+Ujo2mORw7SURc/f\nW6//Ue8FySrNybaFW8sqasOI8xIuT3O8VD8der6Mge0xZis4adK5lwCF0RAb1MFT\nhPVsrsnxTPM6+JaGj1ZONURMyB/8jnxdvRg9VSA+LU9uJrUnRTpG3La3opxdHK/I\nDy6Q8eeIhKiHuZ28ZiVspOC7D52Pa8vJzYauFzrsjvqaq+R6H1PLnHgW9E15EATZ\ntwIDAQAB\n-----END PUBLIC KEY-----\n';

const defaultJku = 'https://authentication.sap.hana.ondemand.com/token_keys';
export { defaultJku as jku };

export function signedJwt(payload, algorithm: Algorithm = 'RS512') {
  return sign(payload, privateKey, {
    algorithm
  });
}

export function signedJwtForVerification(
  payload: string | object | Buffer,
  jku: string | null = defaultJku,
  algorithm: Algorithm = 'RS256'
) {
  return sign(payload, privateKey, {
    header: { jku, kid: 'key-id-1' } as JwtHeader,
    algorithm
  });
}
