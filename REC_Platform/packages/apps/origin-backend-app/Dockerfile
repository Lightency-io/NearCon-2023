FROM node:14-alpine

ARG VERSION=latest

RUN apk --no-cache add make gcc g++ python3 bash
RUN mkdir -p /var/db

RUN mkdir -p /var/deployment
COPY ./ /var/deployment

WORKDIR /var/deployment/packages/apps/origin-backend-app

CMD ["/bin/bash", "-c", "bin/origin-backend-app"]
