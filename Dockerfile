# OpenShift ready adoption for NEXT.JS Application

# Install dependencies only when needed
# hadolint ignore=DL3006
FROM registry.access.redhat.com/ubi8/nodejs-20 AS deps
USER 0
WORKDIR /app

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat=1.2.3-r2

# Install dependencies based on the prefered package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi

USER 1001:1001

# Rebuild the source code only when needed
# hadolint ignore=DL3006
FROM registry.access.redhat.com/ubi8/nodejs-20 AS builder
USER 0
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

USER 1001:1001

# Production image, copy all the files and run next
# hadolint ignore=DL3006
FROM registry.access.redhat.com/ubi8/nodejs-20-minimal AS runner
USER 0
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
COPY --from=builder --chown=1001:1001 /app/node_modules ./node_modules
COPY --from=builder --chown=1001:1001 /app/package.json ./package.json
COPY --from=builder --chown=1001:1001 /app/.next ./.next
# COPY --from=builder --chown=1001:1001 /app/.next/standalone ./
COPY --from=builder --chown=1001:1001 /app/.next/static ./.next/static

USER 1001:1001

EXPOSE 3000

CMD ["npm", "start"]