FROM debian:latest as base

SHELL ["/bin/bash", "--login", "-c"]

# make sure apt is up to date
RUN apt-get update --fix-missing
RUN apt-get install -y curl
RUN apt-get install -y build-essential libssl-dev

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
RUN nvm install 18.19.0 && nvm alias default 18.19.0
RUN node -v

ENV NVM_DIR /root/.nvm
ENV NODE_DEFAULT_DIR ${NVM_DIR}/versions/node/v18.19.0/bin
ENV PATH ${NVM_DIR}:${NODE_DEFAULT_DIR}:$PATH
RUN echo $PATH

# set for base and all layer that inherit from it
ENV NODE_ENV production
ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL

ARG SESSION_SECRET
ENV SESSION_SECRET $SESSION_SECRET

ARG NODEMAILER_HOST
ENV NODEMAILER_HOST $NODEMAILER_HOST

ARG NODEMAILER_PORT
ENV NODEMAILER_PORT $NODEMAILER_PORT

ARG NODEMAILER_USER
ENV NODEMAILER_USER $NODEMAILER_USER

ARG NODEMAILER_PASSWORD
ENV NODEMAILER_PASSWORD $NODEMAILER_PASSWORD

ARG NODEMAILER_IS_SECURE
ENV NODEMAILER_IS_SECURE $NODEMAILER_IS_SECURE

ARG NODEMAILER_SENDER_NAME
ENV NODEMAILER_SENDER_NAME $NODEMAILER_SENDER_NAME

ARG APP_DOMAIN
ENV APP_DOMAIN $APP_DOMAIN

ARG JWT_SECRET
ENV JWT_SECRET ${JWT_SECRET}

ARG ORANGE_BASE_API
ENV ORANGE_BASE_API $ORANGE_BASE_API

ARG ORANGE_CLIENT_ID
ENV ORANGE_CLIENT_ID $ORANGE_CLIENT_ID

ARG ORANGE_CLIENT_SECRET
ENV ORANGE_CLIENT_SECRET $ORANGE_CLIENT_SECRET

ARG ORANGE_SENDER_NUMBER
ENV ORANGE_SENDER_NUMBER $ORANGE_SENDER_NUMBER

# Install openssl for Prisma
RUN apt-get update && apt-get install -y openssl

# Install all node_modules, including dev dependencies
FROM base as deps

WORKDIR /myapp

ADD package.json .npmrc ./
RUN npm install --include=dev

# Setup production node_modules
FROM base as production-deps

WORKDIR /myapp

COPY --from=deps /myapp/node_modules /myapp/node_modules
ADD package.json .npmrc ./
RUN npm prune --omit=dev

# Build the app
FROM base as build

WORKDIR /myapp

COPY --from=deps /myapp/node_modules /myapp/node_modules

ADD prisma .
RUN npx prisma generate
RUN npx prisma migrate deploy

ADD . .
RUN npm run build

# Finally, build the production image with minimal footprint
FROM base

WORKDIR /myapp

COPY --from=production-deps /myapp/node_modules /myapp/node_modules
COPY --from=build /myapp/node_modules/.prisma /myapp/node_modules/.prisma

COPY --from=build /myapp/build /myapp/build
COPY --from=build /myapp/public /myapp/public

RUN npm i -g cross-env tsx

ADD . .

CMD ["npm", "start"]
