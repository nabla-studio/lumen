# Lumen

LUMEN is a Web3-powered launchpad for tokenized renewable energy assets, enabling ESG-aligned investments in large-scale solar, wind, and other clean energy projects. Each initiative is structured through a dedicated SPV, with ownership or revenue rights represented as NFTs or SFPs under EU-compliant frameworks. Investors can participate from €500, benefiting from on-chain transparency, automated profit distribution, and secondary market liquidity under DLT Pilot principles. By merging tokenization-as-a-service, compliance-by-design, and scalable governance, LUMEN bridges traditional project finance with decentralized capital markets, accelerating global access to renewable infrastructure financing.

## Get started

1. Use this template to [create your own repo](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template).

2. Clone the new repo.

   ```bash
   git clone <REPO_URL> MY_APP
   cd MY_APP
   ```

3. Rename the files in the project to the name of your app.

   ```bash
   npx replace-in-file '/apollo/g' 'MY_APP' '**/*.*' --verbose
   ```

4. Deploy!

   ```bash
   npm install
   npx sst deploy
   ```

5. Optionally, enable [_git push to deploy_](https://sst.dev/docs/console/#autodeploy).

## Usage

This template uses [npm Workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces). It has 3 packages to start with and you can add more it.

1. `core/`

   This is for any shared code. It's defined as modules. For example, there's the `Example` module.

   ```ts
   export module Example {
     export function hello() {
       return "Hello, world!";
     }
   }
   ```

   That you can use across other packages using.

   ```ts
   import { Example } from "@aws-monorepo/core/example";

   Example.hello();
   ```

   We also have [Vitest](https://vitest.dev/) configured for testing this package with the `sst shell` CLI.

   ```bash
   npm test
   ```

2. `functions/`

   This is for your Lambda functions and it uses the `core` package as a local dependency.

3. `scripts/`

    This is for any scripts that you can run on your SST app using the `sst shell` CLI and [`tsx`](https://www.npmjs.com/package/tsx). For example, you can run the example script using:

   ```bash
   npm run shell src/example.ts
   ```

### Infrastructure

The `infra/` directory allows you to logically split the infrastructure of your app into separate files. This can be helpful as your app grows.

In the template, we have an `api.ts`, and `storage.ts`. These export the created resources. And are imported in the `sst.config.ts`.

---

**Join our community** [Discord](https://sst.dev/discord) | [YouTube](https://www.youtube.com/c/sst-dev) | [X.com](https://x.com/SST_dev)
