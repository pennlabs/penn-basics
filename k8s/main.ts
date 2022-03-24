import { Construct } from 'constructs';
import { PennLabsChart, ReactApplication } from '@pennlabs/kittyhawk';
import { App } from 'cdk8s';

export class MyChart extends PennLabsChart {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const image = 'pennlabs/penn-basics';
    const secret = 'penn-basics';
    const domain = 'pennbasics.com';

    new ReactApplication(this, 'react', {
      deployment: {
        image,
        secret,
      },
      domain: { host: domain, paths: ['/'] },
    });
  }
}

const app = new App();

process.env.RELEASE_NAME = "penn-basics"; // todo remove
process.env.GIT_SHA = "c257c5b875c179dbf108f85779c379830a2fc2a8"; // todo remove

new MyChart(app, 'penn-basics');
app.synth();