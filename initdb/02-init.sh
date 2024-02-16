mongoimport --db ${MONGO_INITDB_DATABASE} --collection posts --drop --file /docker-entrypoint-initdb.d/posts.json --jsonArray
