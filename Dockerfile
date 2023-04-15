FROM node:latest

# Install dependencies
RUN apt-get update && \
    apt-get install -y tor xvfb &&\
    wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list && \
    apt-get update && \
    apt-get install -y google-chrome-stable && \
    rm -rf /var/lib/apt/lists/* && \
    apt-get clean


# Create a new directory for our app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the app directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app code to the app directory
COPY . .

# Set environment variables for Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable \
    DISPLAY=:99

# Copy extension
COPY extension  /usr/src/app/




# Copy the shell scripts to the app directory
COPY run.sh .

# Make the shell scripts executable
RUN chmod +x run.sh

EXPOSE 3000


# Start Xvfb and launch the app
CMD Xvfb :99 -screen 0 1024x768x16 & /bin/bash -c "source ./run.sh"

