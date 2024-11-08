FROM node:lts-alpine

LABEL "org.opencontainers.image.description"="GitHub actoion for custom CalVer"

LABEL "repository"="https://github.com/pragmaticindustries/calver-release-action"
LABEL "maintainer"="pragmatic industries"

COPY . ./
RUN npm install
RUN npm run build

COPY ./dist /dist
WORKDIR /dist
CMD ["node", "index.js"]