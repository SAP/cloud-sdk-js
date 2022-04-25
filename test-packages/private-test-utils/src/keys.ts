import { Algorithm, JwtHeader, sign } from 'jsonwebtoken';

export const privateKey =
  '-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAmiePzeSLIl9Lf9SAmAhYoPWm8A2MYCSnaXW9vOodG96nTJvz\n5fnPxgSJZLw+kJT3MOVz7K0xrbZNah5aL07hdapS3DzF5G1ejqycnaFgFS6ER0se\n1UbpvtdxkEVAM3MTYTbttCDkRJYK3zPsoevXvrw1vNgqC13q729sjlFYiOa4GDmM\nR/34Zh3UvfifhsW1O0xRYTs9Qj3MK7xnhwTVSTF5qox3tO64Ue8ZzntMhNq69xdf\nVenRQjtbejZb4Y5ghzC2d0hmn1LRTs2r1wrudUIDCCTfDBBK7tk9onb1SxekUJdV\nfZEfM8hkvRKJHr2okFMrp8w3XuHVzOM63iPaWQIDAQABAoIBAGc013Vsbq5riJuj\nxRiEdfoFnWeYWoQ/5gmYN5jUUPrIvc9vlgJBlxanEOltkqGv6jNFW7B4YAtCQ2Ap\nxA1qTU4+40zqLz947datwAlU8oQb6ZnltFXsLTCFA1Yo1wvbHn12jfyMDOfSYKMB\nG4to37+mOIAfZT7I+TKmsdIyqgi1C0i/CQyD0krsk9bXFW7PqtVUZTrWyz+xshja\nssgb6XZXnFL2eclFdGelH2bc21kDM16L8D8ffhI6R9yneGtkKhwpW/yDVNKahX1R\nKaO/DnWbpPC376rhA6YYULsTa2IIqEexd4SlD3bA4VqY6nJV+HhvSi7DNGKTukam\nxj2vo1ECgYEA4JEjf+RIhgl2Cofahq1GyE6X3bkFFNwQTvf2EUsaigLsfKukJ6WY\nXJtSk+qCFWzPB8NlNyJBQhN/QwTMdpAlj/RuDSP3IDeHto2yHmHcgpvMxbQuOcOE\nk4rTIf+ValLdf2QLq41v7eQtyf9w/k9qzBT/U3Lbd/yvJMtGCF4SvyUCgYEAr7tZ\nggtthqxcdk8YcR1JQwwuPliQlItfdnRRLTICkWpPCAf/r+qPpiYxaETWEqWI5m+j\nQElFWrPznzNmeHJ7VJseVQSOSkknijGuKvLepqJH05Zd1QutJphybSLQJEep2vy+\nW8XNiXueCNW21/yvNfILFzaSYq+7XwAUTCDlMiUCgYEApLDshvulUF+Z6Sku0zw6\nv+YbrCjnmB+3+iIRnScmRHbWdqvuTIE+VxQ2IHKIiivtPTVIgoGluE7SMxVO2djn\nI0bQeuSYdVEkP3Z1XaDJdiPKrmdwyz4feZEDPFjTfFFfTfDSOjMVFjMUfaLPfEJE\nAX2Yrtt6JunyjJpjNvm+590CgYAW7RRCWQdS+I2fibYgm7eBHceyro8+MeikZYxp\nnwqiugHRhGmhI7LV9Emh1sku6ZWwqoPb0TNRIAT6khQeRqE8anhMkymVG3IjH1Qf\nmkvd5XIFcqqPLtTKIj1ba51H/ml0fmC/TFECTLRTZr5R809QdGFqB96VLWP+gt4j\nCG+eWQKBgD3KFYlanUNS1omKcZtinvX4jKgqx068wggnh2UoaEka67SpD32U/qCe\nH7u/Aogv40+FuBU3J7geqV9jfgQGzhufxi/Nd570App0Zm8MhVH/f+GK/1ZpVdOw\nbVx1VU9cBKs0f588/bCL7JJBywc4rb9MZkgDfJT09ZeOS49zYREH\n-----END RSA PRIVATE KEY-----\n';

export const publicKey =
  '-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmiePzeSLIl9Lf9SAmAhYoPWm8A2MYCSnaXW9vOodG96nTJvz5fnPxgSJZLw+kJT3MOVz7K0xrbZNah5aL07hdapS3DzF5G1ejqycnaFgFS6ER0se1UbpvtdxkEVAM3MTYTbttCDkRJYK3zPsoevXvrw1vNgqC13q729sjlFYiOa4GDmMR/34Zh3UvfifhsW1O0xRYTs9Qj3MK7xnhwTVSTF5qox3tO64Ue8ZzntMhNq69xdfVenRQjtbejZb4Y5ghzC2d0hmn1LRTs2r1wrudUIDCCTfDBBK7tk9onb1SxekUJdVfZEfM8hkvRKJHr2okFMrp8w3XuHVzOM63iPaWQIDAQAB-----END PUBLIC KEY-----';

export function signedJwt(payload, algorithm: Algorithm = 'RS512') {
  return sign(payload, privateKey, {
    algorithm
  });
}

export function signedJwtForVerification(
  payload,
  jku,
  algorithm: Algorithm = 'RS256'
) {
  return sign(payload, privateKey, {
    header: { jku, kid: 'key-id-1' } as JwtHeader,
    algorithm
  });
}
