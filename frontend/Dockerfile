# Use an official Node.js runtime as the base image
FROM node:14 as build-stage

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire frontend project to the working directory
COPY . .

# Build the frontend application
RUN npm run build

# Expose port 3000 for the frontend
EXPOSE 3000

# Start the frontend server
CMD ["npm", "start"]