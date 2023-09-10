# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire backend project to the working directory
COPY . .

# Expose port 5000 for the backend
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]