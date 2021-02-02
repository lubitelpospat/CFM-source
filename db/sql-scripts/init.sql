


CREATE DATABASE IF NOT EXISTS `chemreprogramming` CHARACTER SET utf8mb4;


-- UPDATE mysql.user SET Host='%' WHERE Host='localhost' AND User='root';
-- FLUSH PRIVILEGES;

USE `chemreprogramming`;
-- MySQL dump 10.13  Distrib 8.0.19, for macos10.15 (x86_64)
--
-- Host: localhost    Database: chemreprogramming
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `MAIN`
--

DROP TABLE IF EXISTS `MAIN`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MAIN` (
  `SourceCellLine` varchar(100) NOT NULL,
  `TargetCellLine` varchar(100) NOT NULL,
  `Species` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`SourceCellLine`,`TargetCellLine`)
) ENGINE=InnoDB;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MAIN`
--

LOCK TABLES `MAIN` WRITE;
/*!40000 ALTER TABLE `MAIN` DISABLE KEYS */;
/*!40000 ALTER TABLE `MAIN` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `method_of_differentiation`
--

DROP TABLE IF EXISTS `method_of_differentiation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
SET character_set_client = utf8mb4 ;
CREATE TABLE `method_of_differentiation` (
  `SourceCellLine` varchar(100) NOT NULL,
  `TargetCellLine` varchar(100) NOT NULL,
  `MethodID` int NOT NULL,
  PRIMARY KEY (`SourceCellLine`,`TargetCellLine`,`MethodID`),
  KEY `MethodID` (`MethodID`),
  CONSTRAINT `method_of_differentiation_ibfk_1` FOREIGN KEY (`SourceCellLine`, `TargetCellLine`) REFERENCES `MAIN` (`SourceCellLine`, `TargetCellLine`) ON UPDATE CASCADE,
  CONSTRAINT `method_of_differentiation_ibfk_2` FOREIGN KEY (`MethodID`) REFERENCES `METHODS` (`MethodID`) ON UPDATE CASCADE
) ENGINE=InnoDB;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `method_of_differentiation`
--

LOCK TABLES `method_of_differentiation` WRITE;
/*!40000 ALTER TABLE `method_of_differentiation` DISABLE KEYS */;
/*!40000 ALTER TABLE `method_of_differentiation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `METHODS`
--

DROP TABLE IF EXISTS `METHODS`;
SET @saved_cs_client     = @@character_set_client ;
SET character_set_client = utf8mb4;
CREATE TABLE `METHODS` (
  `MethodID` int NOT NULL AUTO_INCREMENT,
  `DOI` varchar(120) DEFAULT NULL,
  `NamesOfChemicalCompounds` json DEFAULT NULL,
  `CanonicalSMILES` json DEFAULT NULL,
  `NumberOfCitations` int DEFAULT '0',
  `MoA` text,
  `Title` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `AssociatedArticles` json DEFAULT NULL,
  `Comment` json DEFAULT NULL,
  `Yield` float(6,3) DEFAULT NULL,
  `ProtocolID` int DEFAULT NULL,
  `AssociatedData` varchar(100) DEFAULT NULL,
  `KEGG` varchar(100) DEFAULT NULL,
  `UniProtID` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`MethodID`),
  KEY `ProtocolID` (`ProtocolID`),
  CONSTRAINT `METHODS_ibfk_1` FOREIGN KEY (`ProtocolID`) REFERENCES `PROTOCOLS` (`ProtocolID`)
) ENGINE=InnoDB AUTO_INCREMENT=1;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `METHODS`
--

LOCK TABLES `METHODS` WRITE;
/*!40000 ALTER TABLE `METHODS` DISABLE KEYS */;
/*!40000 ALTER TABLE `METHODS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PROTOCOLS`
--

DROP TABLE IF EXISTS `PROTOCOLS`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
CREATE TABLE `PROTOCOLS` (
  `ProtocolID` int NOT NULL AUTO_INCREMENT,
  `Steps` json NOT NULL,
  `Description` text NOT NULL,
  PRIMARY KEY (`ProtocolID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `PROTOCOLS`
--

LOCK TABLES `PROTOCOLS` WRITE;
/*!40000 ALTER TABLE `PROTOCOLS` DISABLE KEYS */;
/*!40000 ALTER TABLE `PROTOCOLS` ENABLE KEYS */;
UNLOCK TABLES;


INSERT INTO MAIN(SourceCellLine, TargetCellLine, Species) VALUES("fibroblasts", "induced cardiomyocytes", "Mus musculus");  
 
INSERT INTO METHODS (DOI, NamesOfChemicalCompounds, CanonicalSMILES, NumberOfCitations, MoA, Title, AssociatedArticles, Comment, Yield) VALUES( "10.1371/journal.pone.0089678", '["SB431542"]', NULL, 127, "TGFb Signaling inhibitor", "Inhibition of TGF signaling increases direct conversion of fibroblasts to induced cardiomyocytes", '["GSE54022"]', '{"admin":"Not fully chemical reproramming, they just supplemented ectopic expression of Hand2, Nkx2.5, Gata4, Mef2C, and Tbx5 by SB431542"}', 16.95);

INSERT INTO method_of_differentiation(SourceCellLine, TargetCellLine, MethodID) VALUES("fibroblasts", "induced cardiomyocytes", 5);



INSERT INTO MAIN(SourceCellLine, TargetCellLine, Species) VALUES("fibroblasts", "insulin secreting cells", "Pig");  
 
INSERT INTO METHODS (DOI, NamesOfChemicalCompounds, CanonicalSMILES, NumberOfCitations, MoA, Title, AssociatedArticles, Comment, Yield) VALUES( "10.1007/s12015-013-9477-9", '["5-aza-CR"]', NULL, 35, " 5-aza-CR exhibits demethylating effect, possibly mediated via TET2 protein increased transcription", "Reprogramming of pig dermal fibroblast into insulin secreting cells by a brief exposure to 5-aza-cytidine", NULL, '{"admin":"N2B27 medium"}', 38.1);

INSERT INTO method_of_differentiation(SourceCellLine, TargetCellLine, MethodID) VALUES("fibroblasts", "insulin secreting cells", 6);


INSERT INTO MAIN(SourceCellLine, TargetCellLine, Species) VALUES("fetal lung fibroblasts", "cholinergic neurons", "Homo sapiens");  
 
INSERT INTO METHODS (DOI, NamesOfChemicalCompounds, CanonicalSMILES, NumberOfCitations, MoA, Title, AssociatedArticles, Comment, Yield) VALUES( " 10.1038/ncomms3183", '["forskolin", "dorsomorphin"]', NULL, 263, "dorsomorphin", "Small Molecules Enable Neurogenin 2 to Efficiently Convert Human Fibroblasts Into Cholinergic Neurons", NULL, '{"admin":"TF Neurogenin 2 (NGN2) complimented by forskolin and dorsomorphin [SOX11]"}', 57.2);

INSERT INTO method_of_differentiation(SourceCellLine, TargetCellLine, MethodID) VALUES("fetal lung fibroblasts", "cholinergic neurons", 7);



/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-30 20:18:00
