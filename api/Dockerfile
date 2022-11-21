FROM node:lts

# set variables
ARG app_dir="/acrommunity-api"
ARG log_dir="/var/log"
ARG user="acrommunity-api"
ARG group="acrommunity-api"

# Add user and group
RUN groupadd -g 10000 ${group}
RUN useradd -u 10000 -ms /bin/bash -g ${group} --home-dir ${app_dir} --create-home ${user}

# make project directory the default workdir
WORKDIR ${app_dir}

# Set timezone
RUN rm /etc/localtime && ln -s /usr/share/zoneinfo/Europe/Paris /etc/localtime

# Place logs for cloudwatch
RUN touch ${log_dir}/api.log
RUN chmod g+rw ${log_dir}/api.log

# install vim
RUN apt-get update && apt-get install -y vim

# become user acrommunity-api
USER ${user}

# copy files to app_dir
COPY --chown=${user} .sequelizerc package.json yarn.lock ${app_dir}/
COPY --chown=${user} email ${app_dir}/email

# link @acrommunity/common
COPY --chown=${user} ./@acrommunity/common ${app_dir}/@acrommunity/common
RUN yarn --cwd ${app_dir}/@acrommunity/common link && yarn link @acrommunity/common

# install dependencies
RUN yarn install --pure-lockfile --production

# copy production build to the project directory
COPY --chown=${user} ./dist ${app_dir}/dist
COPY --chown=${user} db/data ${app_dir}/dist/db/data

# run the application
CMD ["node", "./dist/src/main.js"]
