import { Construct } from "constructs";
import { App, Stack, Workflow } from "cdkactions";
import { DeployJob, DockerPublishJob, NukeJob } from "@pennlabs/kraken";

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

    // Add Feature Branch Deploy to Original Workflow
      new DeployJob(
        workflow,
        {
          isFeatureDeploy: true,
        },
        {
          needs: publishJob.id,
        }
      );

      // New Feature Branch Nuke Worflow
      const featureBranchNukeWorkflow = new Workflow(
        this,
        "feature-branch-nuke",
        {
          name: "Feature Branch Nuke",
          on: { pullRequest: { types: ["closed"] } },
        }
      );

      new NukeJob(featureBranchNukeWorkflow, {}, {});
  }
}

const app = new App();
new BasicsStack(app, 'basics');
app.synth();
