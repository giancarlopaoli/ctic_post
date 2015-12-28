-- MySQL dump 10.13
--
-- Host: localhost    Database: postgrado_uni
-- ------------------------------------------------------
-- Server version	6.0.4-alpha-community-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tb_datos_institucion`
--

DROP TABLE IF EXISTS `tb_datos_institucion`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `tb_datos_institucion` (
  `id_datos_institucion` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `telefono` varchar(30) DEFAULT NULL,
  `fax` varchar(30) DEFAULT NULL,
  `web` varchar(45) DEFAULT NULL,
  `logo` varchar(45) DEFAULT NULL,
  `notas` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_datos_institucion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `tb_datos_institucion`
--

LOCK TABLES `tb_datos_institucion` WRITE;
/*!40000 ALTER TABLE `tb_datos_institucion` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_datos_institucion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_grupos`
--

DROP TABLE IF EXISTS `tb_grupos`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `tb_grupos` (
  `id_grupo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_grupo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `tb_grupos`
--

LOCK TABLES `tb_grupos` WRITE;
/*!40000 ALTER TABLE `tb_grupos` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_grupos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_grupos_has_tb_submodulos`
--

DROP TABLE IF EXISTS `tb_grupos_has_tb_submodulos`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `tb_grupos_has_tb_submodulos` (
  `id_grupo` int(11) NOT NULL,
  `id_submodulo` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_grupo`,`id_submodulo`),
  KEY `fk_tb_grupos_has_tb_submodulos_tb_submodulos1_idx` (`id_submodulo`),
  KEY `fk_tb_grupos_has_tb_submodulos_tb_grupos1_idx` (`id_grupo`),
  CONSTRAINT `fk_tb_grupos_has_tb_submodulos_tb_grupos1` FOREIGN KEY (`id_grupo`) REFERENCES `tb_grupos` (`id_grupo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_grupos_has_tb_submodulos_tb_submodulos1` FOREIGN KEY (`id_submodulo`) REFERENCES `tb_submodulos` (`id_submodulo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `tb_grupos_has_tb_submodulos`
--

LOCK TABLES `tb_grupos_has_tb_submodulos` WRITE;
/*!40000 ALTER TABLE `tb_grupos_has_tb_submodulos` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_grupos_has_tb_submodulos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_modulos`
--

DROP TABLE IF EXISTS `tb_modulos`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `tb_modulos` (
  `id_modulo` int(11) NOT NULL AUTO_INCREMENT,
  `modulo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_modulo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `tb_modulos`
--

LOCK TABLES `tb_modulos` WRITE;
/*!40000 ALTER TABLE `tb_modulos` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_modulos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_permisos_usuarios`
--

DROP TABLE IF EXISTS `tb_permisos_usuarios`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `tb_permisos_usuarios` (
  `d_submodulo` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`d_submodulo`,`id_usuario`),
  KEY `fk_tb_submodulos_has_tb_usuarios_tb_usuarios1_idx` (`id_usuario`),
  KEY `fk_tb_submodulos_has_tb_usuarios_tb_submodulos1_idx` (`d_submodulo`),
  CONSTRAINT `fk_tb_submodulos_has_tb_usuarios_tb_submodulos1` FOREIGN KEY (`d_submodulo`) REFERENCES `tb_submodulos` (`id_submodulo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_submodulos_has_tb_usuarios_tb_usuarios1` FOREIGN KEY (`id_usuario`) REFERENCES `tb_usuarios` (`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `tb_permisos_usuarios`
--

LOCK TABLES `tb_permisos_usuarios` WRITE;
/*!40000 ALTER TABLE `tb_permisos_usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_permisos_usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_sexo`
--

DROP TABLE IF EXISTS `tb_sexo`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `tb_sexo` (
  `id_sexo` int(11) NOT NULL AUTO_INCREMENT,
  `sexo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_sexo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `tb_sexo`
--

LOCK TABLES `tb_sexo` WRITE;
/*!40000 ALTER TABLE `tb_sexo` DISABLE KEYS */;
INSERT INTO `tb_sexo` VALUES (1,'Masculino'),(2,'Femenino');
/*!40000 ALTER TABLE `tb_sexo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_submodulos`
--

DROP TABLE IF EXISTS `tb_submodulos`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `tb_submodulos` (
  `id_submodulo` int(11) NOT NULL,
  `id_modulo` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_submodulo`,`id_modulo`),
  KEY `fk_tb_submodulos_tb_modulos1_idx` (`id_modulo`),
  CONSTRAINT `fk_tb_submodulos_tb_modulos1` FOREIGN KEY (`id_modulo`) REFERENCES `tb_modulos` (`id_modulo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `tb_submodulos`
--

LOCK TABLES `tb_submodulos` WRITE;
/*!40000 ALTER TABLE `tb_submodulos` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_submodulos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_tipo_documento`
--

DROP TABLE IF EXISTS `tb_tipo_documento`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `tb_tipo_documento` (
  `id_tipo_documento` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_documento` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_tipo_documento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `tb_tipo_documento`
--

LOCK TABLES `tb_tipo_documento` WRITE;
/*!40000 ALTER TABLE `tb_tipo_documento` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_tipo_documento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_usuario`
--

DROP TABLE IF EXISTS `tb_usuario`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `tb_usuario` (
  `id` varchar(20) NOT NULL DEFAULT '',
  `nombres` varchar(50) DEFAULT NULL,
  `apellido_p` varchar(50) DEFAULT NULL,
  `apellido_m` varchar(50) DEFAULT NULL,
  `sexo` varchar(1) DEFAULT NULL,
  `contrasena` blob,
  `tipo_documento` varchar(10) DEFAULT NULL,
  `n_documento` varchar(20) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `foto` varchar(20) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `tb_usuario`
--

LOCK TABLES `tb_usuario` WRITE;
/*!40000 ALTER TABLE `tb_usuario` DISABLE KEYS */;
INSERT INTO `tb_usuario` VALUES ('123456','dante ','vidal','tueros','H','½ÉPÜNlÔïdƒa–SQ','dni','123456','123456','12456',NULL,'2015-10-26 14:49:10');
/*!40000 ALTER TABLE `tb_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_usuarios_x_grupo`
--

DROP TABLE IF EXISTS `tb_usuarios_x_grupo`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `tb_usuarios_x_grupo` (
  `id_grupo` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  PRIMARY KEY (`id_grupo`,`id_usuario`),
  KEY `fk_tb_usuarios_has_tb_grupos_tb_grupos1_idx` (`id_grupo`),
  KEY `fk_tb_usuarios_has_tb_grupos_tb_usuarios1_idx` (`id_usuario`),
  CONSTRAINT `fk_tb_usuarios_has_tb_grupos_tb_grupos1` FOREIGN KEY (`id_grupo`) REFERENCES `tb_grupos` (`id_grupo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_usuarios_has_tb_grupos_tb_usuarios1` FOREIGN KEY (`id_usuario`) REFERENCES `tb_usuarios` (`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `tb_usuarios_x_grupo`
--

LOCK TABLES `tb_usuarios_x_grupo` WRITE;
/*!40000 ALTER TABLE `tb_usuarios_x_grupo` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_usuarios_x_grupo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-10-27 22:59:57
