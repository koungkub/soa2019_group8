FROM nginx:1.15.7-alpine

WORKDIR /etc/nginx

RUN rm -rf /etc/nginx

COPY . /etc/nginx

CMD [ "nginx", "-g", "daemon off;" ]