# Use Node.js LTS image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy package files first (for layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY . .

# Expose port
EXPOSE 5000

# Start app
CMD ["npm", "start"]
