/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Command } from '@oclif/command';
import execa from 'execa';

export default class HelpPage extends Command {
  static description =
    'Display the product page, which contains tutorials and links to all relevant resources';

  async run(): Promise<void> {
    this.log('Visit us at:');
    this.log('  https://community.sap.com/topics/cloud-sdk');
    this.log('  https://developers.sap.com/topics/cloud-sdk.html');

    const os = process.platform;
    if (os === 'win32') {
      await execa('start', ['https://community.sap.com/topics/cloud-sdk']);
    } else {
      await execa('open', ['https://community.sap.com/topics/cloud-sdk']);
    }
  }
}
