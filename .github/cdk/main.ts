// import dedent from 'ts-dedent';
import { Construct } from "constructs";
import { App, Stack, Workflow } from "cdkactions";
import { DeployJob, DockerPublishJob } from "@pennlabs/kraken";

export class BasicsStack extends Stack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    const workflow = new Workflow(this, 'build-and-deploy', {
      name: 'Build and Deploy',
      on: 'push',
    });

    const publishJob = new DockerPublishJob(workflow, 'publish', {
      imageName: 'penn-basics'
    })

    new DeployJob(workflow, {}, {
      needs: publishJob.id,
    })
  }
}

const app = new App();
new BasicsStack(app, 'basics');
app.synth();
