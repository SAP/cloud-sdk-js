import { Destination } from '@sap-cloud-sdk/core';

export function basicCredentials(credentials: Destination | BasicCredentials): string {
  return `Basic ${Buffer.from(`${credentials.username}:${credentials.password}`, 'ascii').toString('base64')}`;
}

interface BasicCredentials {
  username: string;
  password: string;
}
