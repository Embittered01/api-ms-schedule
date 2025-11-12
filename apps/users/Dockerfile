FROM node:20-alpine AS base

RUN apk add --no-cache python3 make g++ \
  && corepack enable

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml nest-cli.json tsconfig.json tsconfig.build.json ./
COPY apps ./apps
COPY libs ./libs

RUN pnpm install --frozen-lockfile
RUN pnpm build:users
RUN pnpm prune --prod

FROM node:20-alpine AS runtime

WORKDIR /usr/src/app
ENV NODE_ENV=production

COPY --from=base /usr/src/app/dist ./dist
COPY --from=base /usr/src/app/node_modules ./node_modules
COPY package.json package.json

EXPOSE 3001

CMD ["node", "dist/apps/users/main"]

