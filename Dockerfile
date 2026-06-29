FROM node:18-alpine

WORKDIR /app

COPY shared/ ./shared/

COPY server/ ./server/

WORKDIR /app/server
RUN npm install
RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start"]