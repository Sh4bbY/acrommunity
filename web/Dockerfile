FROM nginx:stable

# Set timezone
RUN rm /etc/localtime && ln -s /usr/share/zoneinfo/Europe/Paris /etc/localtime

# set variables
ARG html_dir="/usr/share/nginx/html"
ARG conf_dir="/etc/nginx/conf.d"
ARG log_dir="/var/log"

# copy public files
RUN chown -R www-data:www-data ${html_dir}
COPY ./dist ${html_dir}/

# copy config
COPY ./nginx/*.conf ${conf_dir}/
COPY ./nginx/.htpasswd /etc/nginx/.htpasswd

# set workdir
WORKDIR ${conf_dir}
