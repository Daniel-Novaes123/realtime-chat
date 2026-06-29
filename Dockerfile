FROM node:20-alpine

WORKDIR /app

COPY Shared/ ./Shared/
COPY Server/ ./Server/

WORKDIR /app/Server
RUN npm install
RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start"]