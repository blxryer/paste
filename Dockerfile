FROM node:22-alpine AS builder

WORKDIR /app

COPY . .
RUN npm i
RUN npm run build

RUN apk add --no-cache bash netcat-openbsd curl
RUN curl -sSLo /usr/local/bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/81b1373f17855a4dc21156cfe1694c31d7d1792e/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

RUN printf '%s\n' \
  '#!/bin/sh' \
  '/usr/local/bin/wait-for-it.sh clickhouse:9000 -- \' \
  '  npm run start' \
  > /usr/local/bin/start-paste.sh
RUN chmod +x /usr/local/bin/start-paste.sh

ENTRYPOINT ["/usr/local/bin/start-paste.sh"]
