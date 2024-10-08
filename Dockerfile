# This stage is used to build the application.
FROM node:22-alpine AS build

# Create the working directory.
WORKDIR /app

# Copy the package files to the working directory.
COPY package*.json ./

# Copy the source code to the working directory.
COPY . .

# Install the dependencies.
RUN npm install

# Build the application.
RUN npm run build


# This stage is used to run the application.
FROM node:22-alpine AS runtime

# Create the working directory.
WORKDIR /app

# Copy the built application from the build stage.
COPY --from=build /app/build /app/build
# Copy the node_modules from the build stage.
COPY --from=build /app/node_modules ./node_modules
# Copy the package files from the build stage.
COPY --from=build /app/package*.json .
# Copy the public files from the build stage.
COPY --from=build /app/public ./public

# Expose the port that the application will run on.
EXPOSE 3000

# Set the environment variables.
ENV NODE_ENV=${NODE_ENV:-production}
ENV SUPABASE_URL=${SUPABASE_URL}
ENV SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}

# Set the command to run the application.
CMD ["npm", "run", "start"]

