FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /Backend
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 5000
USER node
CMD ["npm", "start"]
