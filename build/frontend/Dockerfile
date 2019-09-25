# ------------------------- BASE ------------------------------------
FROM node:carbon-jessie as base

WORKDIR /srv/app

# ------------------------- PRODUCTION ------------------------------------
FROM base as production

COPY frontend /srv/app

CMD ["node", "server"]
