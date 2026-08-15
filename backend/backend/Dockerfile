# Stage 1: Build the Spring Boot application
FROM eclipse-temurin:22-jdk AS builder

WORKDIR /app

# Copy Maven files
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

# Copy source code
COPY src src

# Make Maven wrapper executable
RUN chmod +x mvnw

# Build Spring Boot application
RUN ./mvnw clean package -DskipTests

# Stage 2: Runtime image
FROM eclipse-temurin:22-jre

WORKDIR /app

# Copy the generated JAR
COPY --from=builder /app/target/*.jar app.jar

# Render provides the PORT environment variable.
EXPOSE 8080

# Start Spring Boot
ENTRYPOINT ["sh", "-c", "java -jar app.jar --server.port=${PORT:-8080}"]
