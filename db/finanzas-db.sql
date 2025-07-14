-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: finanzas_db
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `meta_ahorro`
--

DROP TABLE IF EXISTS `meta_ahorro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meta_ahorro` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `categoria` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `descripcion` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecha_limite` date DEFAULT NULL,
  `monto_actual` double DEFAULT NULL,
  `monto_objetivo` decimal(38,2) DEFAULT NULL,
  `usuario_id` bigint DEFAULT NULL,
  `frecuencia` tinyint DEFAULT NULL,
  `monto_periodo` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `meta_ahorro_chk_1` CHECK ((`frecuencia` between 0 and 2))
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meta_ahorro`
--

LOCK TABLES `meta_ahorro` WRITE;
/*!40000 ALTER TABLE `meta_ahorro` DISABLE KEYS */;
INSERT INTO `meta_ahorro` VALUES (2,'Entretenimiento','Salir al cine','2025-12-31',0,3000.00,2,NULL,NULL),(6,'Educación','Pagar curso de inglés','2025-08-31',234.375,500.00,1,2,234.375),(8,'Educacion','Certificación Cisco CCNA','2025-07-07',24.17,70.00,4,0,10),(11,'Regalo','Comprar una cuadro','2025-07-08',10,700.00,5,0,100),(14,'Regalo','Comprar una computadora','2025-12-30',0,6500.00,8,2,1083.3333333333333);
/*!40000 ALTER TABLE `meta_ahorro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `presupuestos`
--

DROP TABLE IF EXISTS `presupuestos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `presupuestos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `anio` int NOT NULL,
  `mes` int NOT NULL,
  `monto` decimal(38,2) NOT NULL,
  `usuario_id` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `presupuestos`
--

LOCK TABLES `presupuestos` WRITE;
/*!40000 ALTER TABLE `presupuestos` DISABLE KEYS */;
INSERT INTO `presupuestos` VALUES (1,2025,7,800.00,1);
/*!40000 ALTER TABLE `presupuestos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transacciones`
--

DROP TABLE IF EXISTS `transacciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transacciones` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `monto` double NOT NULL,
  `fecha` datetime(6) DEFAULT NULL,
  `tipo` enum('INGRESO','GASTO') COLLATE utf8mb4_unicode_ci NOT NULL,
  `usuario_id` bigint NOT NULL,
  `meta_ahorro_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transacciones`
--

LOCK TABLES `transacciones` WRITE;
/*!40000 ALTER TABLE `transacciones` DISABLE KEYS */;
INSERT INTO `transacciones` VALUES (2,'Salario mensual',2000,'2025-06-28 00:00:00.000000','INGRESO',1,NULL),(3,'Almuerzo con amigos',38,'2025-06-28 00:00:00.000000','GASTO',1,NULL),(4,'Aporte a meta: Pagar curso de inglés',234.375,'2025-06-28 00:00:00.000000','GASTO',1,NULL),(5,'Ingreso mensual',1500,'2025-06-28 00:00:00.000000','INGRESO',2,NULL),(6,'Compra de libros',45.5,'2025-06-28 00:00:00.000000','GASTO',2,NULL),(7,'Suledo Mensual de Programador',5000,'2025-06-30 00:00:00.000000','INGRESO',4,NULL),(9,'Pago de Cita Médica',520,'2025-07-01 00:00:00.000000','GASTO',4,NULL),(10,'Aporte a meta: Certificación Cisco CCNA',15,'2025-06-30 00:00:00.000000','GASTO',4,NULL),(11,'Aporte a meta: Certificación Cisco CCNA',9.17,'2025-07-01 00:00:00.000000','GASTO',4,NULL),(17,'SUELDO - EMPRESA',4520,'2025-07-01 20:48:11.470730','INGRESO',5,NULL),(18,'SUELDO - EMPRESA 2',3200,'2025-07-01 20:49:39.348122','INGRESO',5,NULL),(19,'PAGO - LUZ',215,'2025-07-01 21:14:28.932580','GASTO',5,NULL),(20,'Aporte a meta: Comprar una cuadro',10,'2025-07-01 21:20:30.331736','GASTO',5,NULL),(21,'Aporte a meta: PC o Laptop Gamer',30,'2025-07-01 21:56:41.619697','GASTO',5,NULL),(22,'Aporte a meta: Comprar una computadora',1000,'2025-07-01 22:21:12.935546','GASTO',5,13),(23,'DEVOLUCIÓN DE AHORRO: Comprar una computadora',1000,'2025-07-01 22:25:30.347277','INGRESO',5,NULL),(24,'SUELDO - EMPRESA 3',1000,'2025-07-03 15:04:37.046613','INGRESO',5,NULL),(25,'SUELDO MENSUAL - 4',1000,'2025-07-03 22:19:41.429902','INGRESO',5,NULL),(26,'SUELDO MENSUAL 4',850,'2025-07-03 22:35:20.101065','INGRESO',8,NULL),(27,'SUELDO MENSUAL 5',950,'2025-07-03 22:37:07.609325','INGRESO',8,NULL),(28,'pago luz',100,'2025-07-03 22:38:42.629866','GASTO',8,NULL),(29,'Aporte a meta: Comprar un libro',10,'2025-07-03 22:47:20.453703','GASTO',8,15),(30,'DEVOLUCIÓN DE AHORRO: Comprar un libro',10,'2025-07-03 22:50:07.978147','INGRESO',8,NULL);
/*!40000 ALTER TABLE `transacciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKkfsp0s1tflm1cwlj8idhqsad0` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'admin@correo.com','Administrador','$2a$10$7HgzEFZPC0EXmCew7PJGzOkFFXYPw99XLcGi3YcOXLnd4De2iFrWC'),(2,'juan@correo.com','Juan Pérez','$2a$10$hqejKmsc1MpmjLZpZRwoMeqnLVWecODqoE91w.n1sF8jJAIUm2Bhq'),(3,'nicolas001@gmail.com','Nicolas Chumpitaz','$2a$10$fmi1cmZ.mZLH5tHVVmgggOxInbO7UIXKGSBmXZZe9zttbKoxg1jvu'),(4,'beckhamjuande011@gmail.com','Beckham Juande','$2a$10$Fbg5FFSm0dgi38LqF9xKwe1RaXQq0zPZa3I0JBaFHRvxtd0Zo2wGy'),(5,'beckhamjc2004@hotmail.com','Beckham Juande Casimiro','$2a$10$ejKpPShKHQaKiGWZaLrAJeN7DBp49VBDhJkcrYvvZ0u9j60c/fPFu'),(6,'diegorojas02@gmail.com','Diego Rojas','$2a$10$cqgOZzb6Nk1217bmfv77O.EZ/0Ef4eq8u98GNPyMJhKlWs5lFdeJ6'),(7,'jorge05@gmail.com','Jorge','$2a$10$2qBqhzDQ9V3nHccHutRB/eg7rdByOAAT36cpNLcZN9HZXoLsdX6ve'),(8,'jhair02@gmail.com','Jhair','$2a$10$lISeGzUnWlyNhG9/.RhpHO7NK./LYrqADJQByWN1X7onlcOI88Ymi');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-14 14:42:01
