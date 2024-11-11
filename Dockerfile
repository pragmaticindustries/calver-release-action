FROM node:lts-alpine

LABEL "org.opencontainers.image.description"="GitHub actoion for custom CalVer"

LABEL "repository"="https://github.com/pragmaticindustries/calver-release-action"
LABEL "maintainer"="pragmatic industries"

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

COPY "entrypoint.sh" "/usr/bin/entrypoint"
ENTRYPOINT ["entrypoint"]
CMD [""]