FROM mysql:latest

ENV MYSQL_DATABASE chemreprogramming

# copy all initial scripts; only general structure now.
COPY ./sql-scripts/ /docker-entrypoint-initdb.d/
