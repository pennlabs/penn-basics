# Penn Basics

[![CircleCI](https://circleci.com/gh/pennlabs/penn-basics.svg?style=shield)](https://circleci.com/gh/pennlabs/penn-basics)

General documentation for the Penn Basics codebase is available in Notion [here](https://www.notion.so/pennlabs/PennBasics-2043ee53cc784e739bb654352a516609). Docs are updated as new features are pushed to the code repository.

### Usage

Make sure that you are using Node version `10.x`:

```bash
node -v
```

If your Node version is not `10.x`, consider using Node Version Manager (nvm) to handle changing versions of node.

After a `env.sh` file containing `PORT`, `GOOGLE_KEY`, and `MONGO_URI` values is created:

```
git clone https://github.com/pennlabs/penn-basics.git
cd pennbasics
npm install
npm run dev
```

React application will be available at `localhost:3000` or `PORT`.
