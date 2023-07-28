import { Algorithm, JwtHeader, sign } from 'jsonwebtoken';

export const privateKey =
  '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCvsqiHAMl5hy4s\nCnEL7uO4wTsZQEjM1I4w4jTp4ZnoiaYcPDiBrHqRnRKJ/l95K9UCqJLYR9yhXkAU\nHuVLRs39gQ7hGGR08a1cDARIrvacmA/aNsoBJmb4hNYYteCRJ7iZ7kt0JGCQF84w\nSI44qdFeWTYJ2hH6PBGJHanpv/M664+rpqQ5P2rJJnNOw3Di8XmXWZIXouNc7vEX\nz+6aUlWd//tMgNrnDinWRJTFQe4ZAEsxneSTtTQ73jYusN924B8ZFAs+oN8ZhgiT\nOwyhHxbILYnHBSYBJmTaFzHZ1Db1jplrS1r0Mb0uuoYMW4QJ1muh5BBIurw0Nmz/\nIz/1BtqHAgMBAAECggEADST5lLgLWqsxWhwh3vmtUborGLWFfMV+KcwSl1jIcewy\nYDRlKdZkiRZON8KvE9qiogNIkSO3Lt9lPdwd3WbbrFaGbXKsuU8HYDaJ74IfcxGx\nResJa9Kaq4cMmWap+VIWbnW0cWjzTHRreZNECJszzbIw58XHyIfL7A0rFBDHOqYa\n40gese8N4WF4fscX2qsHSiD5EKSfEOfx953kvyL8vQ65pO4j/LSV05wZuxuOspjE\nnJIi1K6pqe7AiO8fWdpnirddAup3F6ioBTTybFIgr9gwIEhghTBdarpLEgcMWHZE\nHwZY7g9msf0cV/5wZY70gefqucqKw35dQ1IJHdOs+QKBgQDyJt0YTi8aogToopSU\nkpnF2kV+Kyz8J0gZjvp70iMqfHsc/oKZqjYS6dZvfmiFG/7Y36tOKr+kjSh38qKm\nOFwRaLCkqyysKhdASKTknpCaiW2VO6DNZbr+3/ElfJTon4xAXevJDhIgWMZf458K\nsWnrYe3oB39PaES4UE2KWZqslQKBgQC5vuZeitkvmfsr8gNi7mWyh4vleWZOgu0g\njRH/E5f3YrVxJTni5Z5d0Ytd+Bjb5qJbHrAMG4Bt+VpLOdQLJDaZ39rTbOVYDV0m\nsxD6/QujqtZNzdUwROigIzP/67rtPtjO4bLndGLtiV4SXW4vua2baGeH3zbn3FUU\nZ9yhgyeHqwKBgQCuSa6kydE5eBfUYQBUF1g6gam279iG/Lb2PmSnLk5FTCdIbR8O\n/uXAozHGOdN8yvOYoRQpRLd+9mKEQs0ymioaFaHeQ535pKnriN219zLZJ8UJvks0\nyt3WiNSGSK7c58kIoxEMOuZtBbhyV+Cmz58O3gNgF9VYEBI2HwZQZ8HeKQKBgGxx\nTaHowoAOEBxKATwjHvCqPjzNMbOosLSOZ/FaCSD/WhsitrcHg/wWOJ22GR1Ze3Rj\naDjJXaPXLqY4rtmKXO5dSS6ipwtPUhEj/kfqsH7vYIqwH0U9FetYYiWKBOo6BO5T\nytVil9dCmc9zCL+IUhknTTqAUVfwxSNSt/b70XpdAoGAWpoK8PekkNv7z+LMleZ7\nugx0ADPa3FB3p9RhVz6U0m6RMNDgQ488amnGG6IwrIe4p1UnoQBlATw4WwJuk0lB\n+SOVRbCtmSDm5d00GQKZgou4ZaURd7w09lPf5AXwBzvVvd7egNA5OAOSZnjJbN0l\n7TK9vKxt7S5SyqvScbyJcJw=\n-----END PRIVATE KEY-----';

export const publicKey =
  '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr7KohwDJeYcuLApxC+7j\nuME7GUBIzNSOMOI06eGZ6ImmHDw4gax6kZ0Sif5feSvVAqiS2EfcoV5AFB7lS0bN\n/YEO4RhkdPGtXAwESK72nJgP2jbKASZm+ITWGLXgkSe4me5LdCRgkBfOMEiOOKnR\nXlk2CdoR+jwRiR2p6b/zOuuPq6akOT9qySZzTsNw4vF5l1mSF6LjXO7xF8/umlJV\nnf/7TIDa5w4p1kSUxUHuGQBLMZ3kk7U0O942LrDfduAfGRQLPqDfGYYIkzsMoR8W\nyC2JxwUmASZk2hcx2dQ29Y6Za0ta9DG9LrqGDFuECdZroeQQSLq8NDZs/yM/9Qba\nhwIDAQAB\n-----END PUBLIC KEY-----';

const defaultJku = 'https://my-jku-url.authentication.sap.hana.ondemand.com';
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
