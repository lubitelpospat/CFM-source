-- MySQL dump 10.13  Distrib 8.0.19, for macos10.15 (x86_64)
--
-- Host: localhost    Database: chemreprogramming
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `authors`
--

DROP TABLE IF EXISTS `authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authors` (
  `authorId` int NOT NULL AUTO_INCREMENT,
  `author` varchar(100) DEFAULT NULL,
  `number_of_articles` int DEFAULT NULL,
  PRIMARY KEY (`authorId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authors`
--

LOCK TABLES `authors` WRITE;
/*!40000 ALTER TABLE `authors` DISABLE KEYS */;
INSERT INTO `authors` VALUES (1,'John Doe',1),(2,'Mary',1);
/*!40000 ALTER TABLE `authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chemicals`
--

DROP TABLE IF EXISTS `chemicals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chemicals` (
  `chemicalInd` int NOT NULL AUTO_INCREMENT,
  `chemicalId` varchar(80) DEFAULT NULL,
  `chemicalCommon` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`chemicalInd`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chemicals`
--

LOCK TABLES `chemicals` WRITE;
/*!40000 ALTER TABLE `chemicals` DISABLE KEYS */;
INSERT INTO `chemicals` VALUES (1,'SB431542','4521392'),(2,'5-aza-CR','9444');
/*!40000 ALTER TABLE `chemicals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MAIN`
--

DROP TABLE IF EXISTS `MAIN`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MAIN` (
  `protocolId` int NOT NULL AUTO_INCREMENT,
  `DOI` varchar(100) DEFAULT NULL,
  `species` varchar(50) DEFAULT NULL,
  `sourceCellType` varchar(100) DEFAULT NULL,
  `targetCellType` varchar(100) DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `medium` varchar(250) DEFAULT NULL,
  `initialCulture` text,
  `title` varchar(150) DEFAULT NULL,
  `yield` float DEFAULT NULL,
  `commentOnYield` text,
  `type_of_protocol` int DEFAULT NULL,
  `comment_on_protocol` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`protocolId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MAIN`
--

LOCK TABLES `MAIN` WRITE;
/*!40000 ALTER TABLE `MAIN` DISABLE KEYS */;
INSERT INTO `MAIN` VALUES (1,'10.1371/journal.pone.0089678','Mus musculus','fibroblasts','induced cardiomyocytes',14,'doxycycline (2 µg mL−1) and the PGK-H2B-mCherry lentivirus','MEFs, isolated at E14.5','Inhibition of TGFβ signaling increases direct conversion of fibroblasts to induced cardiomyocytes',16.95,NULL,2,'Not fully chemical reproramming, they just supplemented ectopic expression of Hand2, Nkx2.5, Gata4, Mef2C, and Tbx5 by SB431542'),(3,'10.1007/s12015-013-9477-9','Pig','fibroblasts','insulin secreting cells (β cells)',36,'N2B27 with 0.1 mM β- mercaptoetanol (Sigma), 2 mM glutamine (Sigma), 1 mM MEM Non-Essential Amino Acids (Gibco) and 0.5 % (w/v) bovine serum albumin (Sigma)','Primary porcine skin fibroblast cultures were established from fresh biopsies','5-aza-CR exhibits demethylating effect, possibly mediated via TET2 protein increased transcription',38.1,'counting insulin labeled cells with a flow cytometer',1,NULL);
/*!40000 ALTER TABLE `MAIN` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moa`
--

DROP TABLE IF EXISTS `moa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `moa` (
  `protocolId` int NOT NULL,
  `chemicalInd` int NOT NULL,
  `moa` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`protocolId`,`chemicalInd`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moa`
--

LOCK TABLES `moa` WRITE;
/*!40000 ALTER TABLE `moa` DISABLE KEYS */;
INSERT INTO `moa` VALUES (1,1,'TGFb Signaling inhibitor');
/*!40000 ALTER TABLE `moa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `protocol_to_authors`
--

DROP TABLE IF EXISTS `protocol_to_authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `protocol_to_authors` (
  `protocolId` int NOT NULL,
  `authorId` int NOT NULL,
  PRIMARY KEY (`protocolId`,`authorId`),
  KEY `authorId` (`authorId`),
  CONSTRAINT `protocol_to_authors_ibfk_1` FOREIGN KEY (`protocolId`) REFERENCES `MAIN` (`protocolId`),
  CONSTRAINT `protocol_to_authors_ibfk_2` FOREIGN KEY (`authorId`) REFERENCES `authors` (`authorId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `protocol_to_authors`
--

LOCK TABLES `protocol_to_authors` WRITE;
/*!40000 ALTER TABLE `protocol_to_authors` DISABLE KEYS */;
INSERT INTO `protocol_to_authors` VALUES (1,1),(1,2);
/*!40000 ALTER TABLE `protocol_to_authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `protocol_to_chemicalInd`
--

DROP TABLE IF EXISTS `protocol_to_chemicalInd`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `protocol_to_chemicalInd` (
  `protocolId` int NOT NULL,
  `chemicalInd` int NOT NULL,
  PRIMARY KEY (`protocolId`,`chemicalInd`),
  KEY `chemicalInd` (`chemicalInd`),
  CONSTRAINT `protocol_to_chemicalind_ibfk_1` FOREIGN KEY (`protocolId`) REFERENCES `MAIN` (`protocolId`),
  CONSTRAINT `protocol_to_chemicalind_ibfk_2` FOREIGN KEY (`chemicalInd`) REFERENCES `chemicals` (`chemicalInd`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `protocol_to_chemicalInd`
--

LOCK TABLES `protocol_to_chemicalInd` WRITE;
/*!40000 ALTER TABLE `protocol_to_chemicalInd` DISABLE KEYS */;
INSERT INTO `protocol_to_chemicalInd` VALUES (1,1),(3,2);
/*!40000 ALTER TABLE `protocol_to_chemicalInd` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `protocol_to_growthFactor`
--

DROP TABLE IF EXISTS `protocol_to_growthFactor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `protocol_to_growthFactor` (
  `protocolId` int DEFAULT NULL,
  `growthFactor` varchar(100) DEFAULT NULL,
  KEY `protocolId` (`protocolId`),
  CONSTRAINT `protocol_to_growthfactor_ibfk_1` FOREIGN KEY (`protocolId`) REFERENCES `MAIN` (`protocolId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `protocol_to_growthFactor`
--

LOCK TABLES `protocol_to_growthFactor` WRITE;
/*!40000 ALTER TABLE `protocol_to_growthFactor` DISABLE KEYS */;
/*!40000 ALTER TABLE `protocol_to_growthFactor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `protocol_to_stressFactor`
--

DROP TABLE IF EXISTS `protocol_to_stressFactor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `protocol_to_stressFactor` (
  `protocolId` int DEFAULT NULL,
  `stressFactor` varchar(100) DEFAULT NULL,
  KEY `protocolId` (`protocolId`),
  CONSTRAINT `protocol_to_stressfactor_ibfk_1` FOREIGN KEY (`protocolId`) REFERENCES `MAIN` (`protocolId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `protocol_to_stressFactor`
--

LOCK TABLES `protocol_to_stressFactor` WRITE;
/*!40000 ALTER TABLE `protocol_to_stressFactor` DISABLE KEYS */;
/*!40000 ALTER TABLE `protocol_to_stressFactor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `protocol_to_transcriptionFactor`
--

DROP TABLE IF EXISTS `protocol_to_transcriptionFactor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `protocol_to_transcriptionFactor` (
  `protocolId` int DEFAULT NULL,
  `transcriptionFactor` varchar(100) DEFAULT NULL,
  KEY `protocolId` (`protocolId`),
  CONSTRAINT `protocol_to_transcriptionfactor_ibfk_1` FOREIGN KEY (`protocolId`) REFERENCES `MAIN` (`protocolId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `protocol_to_transcriptionFactor`
--

LOCK TABLES `protocol_to_transcriptionFactor` WRITE;
/*!40000 ALTER TABLE `protocol_to_transcriptionFactor` DISABLE KEYS */;
/*!40000 ALTER TABLE `protocol_to_transcriptionFactor` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-29 18:58:58
