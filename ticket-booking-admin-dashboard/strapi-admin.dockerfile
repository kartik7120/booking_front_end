FROM node:24

WORKDIR /app

# Copy dependency files
COPY package.json ./

# Install system dependencies for better-sqlite3
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Install node modules
RUN yarn install

# Copy project
COPY . .

# Build admin panel
RUN yarn build

EXPOSE 1337

CMD ["yarn", "start"]
