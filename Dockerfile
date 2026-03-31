FROM openjdk:21

WORKDIR /app

COPY target/cronping-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080