FROM node:16-alpine as base

RUN curl -sL https://unpkg.com/@pnpm/self-installer | node

WORKDIR /app

################################

FROM base as builder 

ENV NODE_ENV = "production"

COPY ["package.json", "pnpm-lock.yaml", "./" ]

RUN pnpm i --production

USER node

CMD [ "pnpm", "build" ]


################################

FROM base as runtime

USER node

WORKDIR /app

COPY --from=builder /app /app

CMD [ "pnpm", "" ]