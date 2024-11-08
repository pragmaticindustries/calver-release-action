FROM node:lts-alpine

LABEL "com.github.actions.name"="Pragmatic CalVer"
LABEL "com.github.actions.description"="Our take on CalVer"
LABEL "com.github.actions.icon"="moon"
LABEL "com.github.actions.color"="green"
LABEL "org.opencontainers.image.description"="GitHub actoion for custom CalVer"

LABEL "repository"="https://github.com/pragmaticindustries/calver-release-action"
LABEL "maintainer"="pragmatic industries"


COPY . ./
RUN npm install
RUN npm run build

CMD ["node", "dist/index.js"]