docker pull ghcr.io/sh4bby/acrommunity/api:0.1.0
docker pull ghcr.io/sh4bby/acrommunity/web:0.1.0
printf "== Pulled latest api & web images == \n\n"

docker stop acro-api
docker rm acro-api
docker run --name acro-api -d -p 6100:6100 \
--volume acro-static:/acrommunity-api/static/:rw \
--network acrommunity \
-e PORT=6100 \
-e APP_URL="https://www.acrommunity.de" \
-e JWT_ACCESS_SECRET='Xw3*!Un&A9YTEPJN=cm#=YJQF6L38A' \
-e JWT_REFRESH_SECRET='Zc3_Z?zWmU4q9G#D_3=n?uUp3#FX7sw^' \
-e SQL_HOST="mysql" \
-e SQL_PORT=3306 \
-e SQL_USERNAME="acrommunity-sql" \
-e SQL_PASSWORD="secret" \
-e SQL_DATABASE="acrommunity" \
ghcr.io/sh4bby/acrommunity/api:0.1.0
printf "== Updated acro-api ==\n\n"

docker stop acro-web
docker rm acro-web
docker run --name acro-web -d -p 80:80 -p 443:443 \
--network acrommunity \
--volume certbot-www:/var/www/certbot/:ro \
--volume certbot-conf:/etc/nginx/ssl/:ro \
ghcr.io/sh4bby/acrommunity/web:0.1.0
printf "== Updated acro-web ==\n\n"

docker exec acro-api yarn db:reset
printf "== Updated run-migrations ==\n"
