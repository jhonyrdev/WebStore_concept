# Stage 1: Build
FROM maven:3.9-eclipse-temurin-21 AS builder

WORKDIR /build

COPY pom.xml .
RUN mvn dependency:resolve

COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

COPY --from=builder /build/target/*.jar app.jar

RUN addgroup -g 1001 -S spring && adduser -u 1001 -S spring -G spring
USER spring:spring

ENV SPRING_PROFILES_ACTIVE=prod
ENV PORT=8081

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]
