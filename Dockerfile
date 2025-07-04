FROM node:22-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN npm install
ADD . .
RUN npm run build
RUN npm prune --omit=dev
CMD ["node", "./dist/main.js"]