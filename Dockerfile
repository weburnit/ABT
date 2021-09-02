# Stage 1: Build angular codebase
FROM node:latest as build
WORKDIR /usr/local/app
ARG BUILD_NETWORK=ropsten
# Add the source code to app
COPY ./ .
# Install all the dependencies
RUN yarn install
RUN yarn global add truffle
RUN truffle migrate --network $BUILD_NETWORK
RUN yarn build
# Generate the build of the application

# Stage 2: Copy to nginx server
FROM nginx:latest
# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/build /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/

EXPOSE 8080
