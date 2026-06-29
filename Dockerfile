FROM node:20-alpine

WORKDIR /app/Server

COPY Shared/ ./shared/
COPY Server/ ./

RUN npm install
RUN npx prisma generate
RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start"]