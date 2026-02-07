# Simple TODO App

This app is build using Next.js.

1. install Node.js on your machine: https://nodejs.org/en/  
2. create a Next.js application with `npx  create-next-app todo_app` see https://nextjs.org/ 
3. install Material UI dependencies  
   Material UI 
   `npm install @mui/material @emotion/react @emotion/styled`
   `npm install @mui/icons-material @mui/material @emotion/styled @emotion/react`
4. for UUID generation: `npm install uuid`

## Docker build
Dockerfile taken from: https://nextjs.org/docs/deployment  

Build image:  
`docker build . -t todo-app`

Run image
`docker run -p 3000:3000 --name todo-app todo-app`

## Using Cloudant
install IBM Cloudant client:
`npm install @ibm-cloud/cloudant`

for local development:  
Create the file .env.local in the todo-app folder
```
CLOUDANT_URL= https://ddfc6f2b-ef9a-4f90-bc21-7b4721757507-bluemix.cloudant.com
CLOUDANT_APIKEY=DWyHXeu……..
CLOUDANT_DB_NAME=todo-db
```

## Deploy on OpenShift

* [OpenShift Customizing](./openshift/openshift.md)


## Next.js
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Update Nextjs
see [how-to-update-next-js](https://medium.com/nextjs/how-to-update-next-js-old-version-to-the-latest-version-6870f1f1b8d1)

```
npm outdated
npm outdated --global
npm update -g create-next-app
npm install -g create-next-app
npm update

--on error
npm update --force
 
or

npm update --legacy-peer-deps
```
Nov 2024:
[Upgrade Next.js to Version 14](https://nextjs.org/docs/pages/building-your-application/upgrading/version-14)
```
npm i next@latest react@latest react-dom@latest eslint-config-next@latest
```
## Update Node on Mac
see [latest node version on mac](https://stackoverflow.com/questions/11284634/upgrade-node-js-to-the-latest-version-on-mac-os)

```
sudo npm cache clean -f
sudo npm install -g n
sudo n stable

nvm ls
nvm install v22.11.0
nvm alias default v22.11.0
nvm use default

node -v
```

## Error on podman build
> podman build -t todo-db .
Error: invalid symlink

solution: before podman build
rm -r .next
rm -r node_modules

then:
```
$ podman build . -t todo-db
$ podman image ls 


$ podman run -d -p 8080:3000 --name todo-db todo-db  
$ podman stop todo-db
$ podman container rm todo-db  
```
