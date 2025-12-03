FROM node:25-alpine

WORKDIR /app

# Install dependencies

COPY package.json yarn.lock ./

RUN yarn install

# Copy the rest of the application code

COPY . .

# Build the Strapi admin panel

RUN yarn build

# Expose the Strapi admin panel port

EXPOSE 1337

# Start the Strapi admin panel

CMD ["yarn", "start"]