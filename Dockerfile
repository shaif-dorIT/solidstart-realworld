FROM node:16-alpine as base

RUN apk update \
    && apk add curl \
    && apk upgrade --no-cache \
    && rm -rf /var/cache/apk/*

RUN curl -sL https://unpkg.com/@pnpm/self-installer | node

WORKDIR /app

COPY pnpm-lock.yaml .npmrc* ./

################################
FROM base as prod

RUN pnpm fetch --prod

################################

FROM prod as dev 

RUN pnpm fetch

################################

FROM dev as builder 

ENV NODE_ENV = "development"

COPY .npmrc* package.json pnpm-lock.yaml .pnpmfile.cjs* ./

RUN pnpm i -r --offline --frozen-lockfile

RUN pnpm prisma:generate

COPY . .

RUN pnpm build

################################
FROM prod as runtime

ENV NODE_ENV = "production"

COPY .npmrc* package.json pnpm-lock.yaml .pnpmfile.cjs* vite.config.ts tsconfig.json ./ 

COPY --from=builder /app/dist /app/dist

RUN pnpm i --frozen-lockfile --prod

CMD [ "pnpm", "start" ]