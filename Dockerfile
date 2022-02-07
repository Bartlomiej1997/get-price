FROM node:16-alpine as builder

WORKDIR /

COPY . /

RUN npm i
RUN npm run build

# ---

FROM node:16-alpine

WORKDIR /

COPY --from=builder /package*.json /
COPY --from=builder /dist/ /dist/

RUN npm i

CMD ["node", "dist/index.js"]