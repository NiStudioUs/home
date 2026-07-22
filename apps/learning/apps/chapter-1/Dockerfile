FROM mcr.microsoft.com/playwright:v1.60.0-noble

WORKDIR /playwright-e2e

COPY package*.json ./
RUN npm ci

COPY . .

CMD ["npx", "playwright", "test"]
