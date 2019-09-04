
FROM node:11

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
RUN npm install

# Copying source files
RUN echo 'Copying'
COPY . .

RUN echo 'Building'
# Building app
RUN npm run build


RUN echo 'Starting'
# Running the app
CMD [ "npm", "start" ]