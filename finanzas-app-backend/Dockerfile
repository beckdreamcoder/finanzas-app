# Imagen base con Maven y JDK 17
FROM maven:3.9.2-eclipse-temurin-17 as builder

WORKDIR /app
COPY . .

RUN mvn clean package -DskipTests

# Segunda etapa: solo JRE para ejecutar la app
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
