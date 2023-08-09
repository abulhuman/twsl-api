FROM node:16-alpine AS base

# Create app directory
WORKDIR /app

# Copy app dependencies
COPY package.json ./
COPY yarn.lock ./
COPY prisma ./prisma/

# Install app dependencies
RUN yarn

COPY . .

FROM base AS staging
ENV NODE_ENV=staging
CMD [ "yarn", "start:dev" ]

FROM base AS studio
CMD [ "yarn", "studio" ]

FROM base AS production
ENV NODE_ENV=production
RUN yarn build
RUN yarn install --production --frozen-lockfile
CMD [ "yarn", "start:prod" ]
