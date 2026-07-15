# Etapa de construcción (Build Stage)
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
RUN chmod +x ./mvnw
# Descargar dependencias
RUN ./mvnw dependency:go-offline -B
COPY src src
RUN ./mvnw clean package -DskipTests

# Etapa de ejecución (Run Stage)
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
# Puerto por defecto o asignado dinámicamente por la nube ($PORT)
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]
