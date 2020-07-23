FROM node:14.5.0-alpine as build

RUN apk add --no-cache tini alpine-sdk python

COPY . /home/shakespokemon
WORKDIR /home/shakespokemon

RUN npm ci

RUN NODE_ENV=production npm run --production build \
    && npm --production link \
    && npm prune --production \
    && npm cache clean --force

FROM node:14.5.0-alpine as dist
LABEL author="Emanuele Menon <emnlmn@gmail.com>"

COPY --from=build /home/shakespokemon/dist ./home/shakespokemon
COPY --from=build /home/shakespokemon/node_modules ./home/shakespokemon/node_modules
COPY --from=build /sbin/tini /sbin/

USER 1000

WORKDIR /home/shakespokemon
ENV NODE_ENV=production

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "app.js"]