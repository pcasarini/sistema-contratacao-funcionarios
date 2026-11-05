FROM eclipse-temurin:21-jdk-jammy AS build

RUN apt-get -o Acquire::Retries=0 update \
    && apt-get -o Acquire::Retries=0 install -y --only-upgrade '?source-package(^apt$)' \
    && dpkg --compare-versions "$(dpkg-query -W -f='${Version}' apt)" ge 2.4.15ubuntu0.1 \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /build

COPY Backend/pom.xml Backend/mvnw ./
COPY Backend/.mvn/ .mvn/
COPY Backend/src/ src/
COPY Frontend/ src/main/resources/static/

ARG RENDER_GIT_COMMIT=local
RUN sed -i 's|http://localhost:8080||' src/main/resources/static/js/config.js \
    && printf '%s\n' "$RENDER_GIT_COMMIT" > src/main/resources/static/version.txt \
    && bash ./mvnw -B package -DskipTests

FROM eclipse-temurin:21-jre-jammy

RUN apt-get -o Acquire::Retries=0 update \
    && apt-get -o Acquire::Retries=0 install -y --only-upgrade '?source-package(^apt$)' \
    && dpkg --compare-versions "$(dpkg-query -W -f='${Version}' apt)" ge 2.4.15ubuntu0.1 \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=build /build/target/rh-picpay-0.0.1-SNAPSHOT.jar app.jar

ENV SERVER_ADDRESS=0.0.0.0
EXPOSE 10000
ENTRYPOINT ["sh", "-c", "exec java -jar /app/app.jar --server.port=${PORT:-10000}"]
