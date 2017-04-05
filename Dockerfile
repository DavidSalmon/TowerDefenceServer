FROM node:boron

# Create app directory
RUN mkdir -p C:/TowerDefenceServer/
WORKDIR C:/TowerDefenceServer/

# Install app dependencies
COPY package.json C:/TowerDefenceServer/
RUN npm install

# Bundle app source
COPY . C:/TowerDefenceServer/

EXPOSE 8080
CMD [ "node", "server.js" ]