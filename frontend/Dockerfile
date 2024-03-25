FROM node:21-alpine
WORKDIR /app

COPY package.json ..
RUN npm install

COPY . .
EXPOSE 3030
RUN npm run build
CMD [ "npm", "run", "preview" ]