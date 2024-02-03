FROM node:alpine
WORKDIR /user/src/app

COPY package*.json .

# to install node_modules
RUN npm ci

COPY . .

# CMD ["npm", "start"]
CMD [ "npm", "run", "dev"]
