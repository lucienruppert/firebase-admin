FROM node:20.11.0

WORKDIR /app

COPY package*.json tsconfig.json ./

RUN npm install

COPY dist ./dist

ENV PROJECT_ID=$PROJECT_ID
ENV PRIVATE_KEY=$PRIVATE_KEY
ENV CLIENT_EMAIL=$CLIENT_EMAIL

ENV PORT=3000

EXPOSE 3000

CMD [ "npm", "start" ]