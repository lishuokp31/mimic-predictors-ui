FROM nginx:1.19-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY security-headers.conf /etc/nginx/security-headers.conf
COPY dist/mimic-predictors-ui /usr/share/nginx/html