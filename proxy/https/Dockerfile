FROM nginx:1.17-alpine
RUN apk add inotify-tools certbot openssl curl
WORKDIR /opt
COPY entrypoint.sh nginx-letsencrypt
COPY certbot.sh certbot.sh
COPY https.conf /etc/nginx/conf.d/default.conf
RUN chmod +x nginx-letsencrypt && \
  chmod +x certbot.sh 
ENTRYPOINT ["./nginx-letsencrypt"]