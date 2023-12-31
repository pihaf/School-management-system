-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: testuetsupport
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `lecturer_notifications`
--

DROP TABLE IF EXISTS `lecturer_notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lecturer_notifications` (
  `notification_id` int NOT NULL AUTO_INCREMENT,
  `lecturer_id` int NOT NULL,
  `course_id` int NOT NULL,
  `student_id` varchar(255) NOT NULL,
  `title` varchar(50) NOT NULL,
  `details` text NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`notification_id`),
  KEY `lecturer_id` (`lecturer_id`),
  KEY `course_id` (`course_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `lecturer_notifications_ibfk_1` FOREIGN KEY (`lecturer_id`) REFERENCES `lecturers` (`lecturer_id`) ON DELETE CASCADE,
  CONSTRAINT `lecturer_notifications_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`) ON DELETE CASCADE,
  CONSTRAINT `lecturer_notifications_ibfk_3` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=253 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lecturer_notifications`
--

LOCK TABLES `lecturer_notifications` WRITE;
/*!40000 ALTER TABLE `lecturer_notifications` DISABLE KEYS */;
INSERT INTO `lecturer_notifications` VALUES (1,11,139,'21020223','Day la thong bao test','Day la thong bao test, khong can quan tam','Sent','2023-10-22 09:00:00'),(2,11,139,'21020223','test','test, khong can quan tam','Sent','2023-10-22 09:00:00'),(3,10,200,'0','test','Day la thong bao test, khong can quan tam','Sent','2023-10-22 09:00:00'),(128,11,139,'21020109','hello','cuu voi','Sent','2023-12-29 15:52:51'),(129,11,139,'21020111','hello','cuu voi','Sent','2023-12-29 15:52:51'),(130,11,139,'21020216','hello','cuu voi','Sent','2023-12-29 15:52:51'),(131,11,139,'21020163','hello','cuu voi','Sent','2023-12-29 15:52:51'),(132,11,139,'21020180','hello','cuu voi','Sent','2023-12-29 15:52:51'),(133,11,139,'21020195','hello','cuu voi','Sent','2023-12-29 15:52:51'),(134,11,139,'21020210','hello','cuu voi','Sent','2023-12-29 15:52:51'),(135,11,139,'21020223','hello','cuu voi','Sent','2023-12-29 15:52:51'),(136,11,139,'21020230','hello','cuu voi','Sent','2023-12-29 15:52:51'),(137,11,139,'21020231','hello','cuu voi','Sent','2023-12-29 15:52:51'),(138,11,139,'21020233','hello','cuu voi','Sent','2023-12-29 15:52:51'),(139,11,139,'21020241','hello','cuu voi','Sent','2023-12-29 15:52:51'),(140,11,139,'21020466','hello','cuu voi','Sent','2023-12-29 15:52:51'),(141,11,139,'21020510','hello','cuu voi','Sent','2023-12-29 15:52:51'),(142,11,139,'21020603','hello','cuu voi','Sent','2023-12-29 15:52:51'),(143,11,139,'21020617','hello','cuu voi','Sent','2023-12-29 15:52:51'),(144,11,139,'21020626','hello','cuu voi','Sent','2023-12-29 15:52:51'),(145,11,139,'21020633','hello','cuu voi','Sent','2023-12-29 15:52:51'),(146,11,139,'21020646','hello','cuu voi','Sent','2023-12-29 15:52:51'),(147,11,139,'21020651','hello','cuu voi','Sent','2023-12-29 15:52:51'),(148,11,139,'21020652','hello','cuu voi','Sent','2023-12-29 15:52:51'),(149,11,139,'21020657','hello','cuu voi','Sent','2023-12-29 15:52:51'),(150,11,139,'21021457','hello','cuu voi','Sent','2023-12-29 15:52:51'),(151,11,139,'21021471','hello','cuu voi','Sent','2023-12-29 15:52:51'),(152,11,139,'21021479','hello','cuu voi','Sent','2023-12-29 15:52:51'),(153,11,139,'21021508','hello','cuu voi','Sent','2023-12-29 15:52:51'),(154,11,139,'21021515','hello','cuu voi','Sent','2023-12-29 15:52:51'),(155,11,139,'21021521','hello','cuu voi','Sent','2023-12-29 15:52:51'),(156,11,139,'21021533','hello','cuu voi','Sent','2023-12-29 15:52:51'),(157,11,139,'21021537','hello','cuu voi','Sent','2023-12-29 15:52:51'),(158,11,139,'21021546','hello','cuu voi','Sent','2023-12-29 15:52:51'),(159,11,139,'21020109','aaaaaaaaaa','bbbbbbbb','Sent','2023-12-29 17:00:52'),(160,11,139,'21020111','aaaaaaaaaa','bbbbbbbb','Sent','2023-12-29 17:00:52'),(161,11,139,'21020195','aaaaaaaaaa','bbbbbbbb','Sent','2023-12-29 17:00:52'),(162,11,139,'21020163','aaaaaaaaaa','bbbbbbbb','Sent','2023-12-29 17:00:52'),(163,11,139,'21020180','aaaaaaaaaa','bbbbbbbb','Sent','2023-12-29 17:00:52'),(164,11,139,'21020210','aaaaaaaaaa','bbbbbbbb','Sent','2023-12-29 17:00:52'),(165,11,139,'21020216','aaaaaaaaaa','bbbbbbbb','Sent','2023-12-29 17:00:52'),(166,11,139,'21020223','aaaaaaaaaa','bbbbbbbb','Sent','2023-12-29 17:00:52'),(167,11,139,'21020230','aaaaaaaaaa','bbbbbbbb','Sent','2023-12-29 17:00:52'),(168,11,139,'21020231','aaaaaaaaaa','bbbbbbbb','Sent','2023-12-29 17:00:52'),(169,11,139,'21020233','aaaaaaaaaa','bbbbbbbb','Sent','2023-12-29 17:00:52'),(170,11,139,'21020241','aaaaaaaaaa','bbbbbbbb','Sent','2023-12-29 17:00:52'),(171,11,139,'21020466','aaaaaaaaaa','bbbbbbbb','Sent','2023-12-29 17:00:52'),(172,11,139,'21020510','aaaaaaaaaa','bbbbbbbb','Sent','2023-12-29 17:00:52'),(173,11,139,'21020603','aaaaaaaaaa','bbbbbbbb','Sent','2023-12-29 17:00:52'),(174,11,139,'21020617','aaaaaaaaaa','bbbbbbbb','Sent','2023-12-29 17:00:52'),(175,11,139,'21020626','aaaaaaaaaa','bbbbbbbb','Sent','2023-12-29 17:00:52'),(176,11,139,'21020633','aaaaaaaaaa','bbbbbbbb','Sent','2023-12-29 17:00:52'),(177,11,139,'21020646','aaaaaaaaaa','bbbbbbbb','Sent','2023-12-29 17:00:52'),(178,11,139,'21020651','aaaaaaaaaa','bbbbbbbb','Sent','2023-12-29 17:00:52'),(179,11,139,'21020652','aaaaaaaaaa','bbbbbbbb','Sent','2023-12-29 17:00:52'),(180,11,139,'21020657','aaaaaaaaaa','bbbbbbbb','Sent','2023-12-29 17:00:52'),(181,11,139,'21021457','aaaaaaaaaa','bbbbbbbb','Sent','2023-12-29 17:00:52'),(182,11,139,'21021471','aaaaaaaaaa','bbbbbbbb','Sent','2023-12-29 17:00:52'),(183,11,139,'21021479','aaaaaaaaaa','bbbbbbbb','Sent','2023-12-29 17:00:52'),(184,11,139,'21021508','aaaaaaaaaa','bbbbbbbb','Sent','2023-12-29 17:00:52'),(185,11,139,'21021515','aaaaaaaaaa','bbbbbbbb','Sent','2023-12-29 17:00:52'),(186,11,139,'21021521','aaaaaaaaaa','bbbbbbbb','Sent','2023-12-29 17:00:52'),(187,11,139,'21021533','aaaaaaaaaa','bbbbbbbb','Sent','2023-12-29 17:00:52'),(188,11,139,'21021537','aaaaaaaaaa','bbbbbbbb','Sent','2023-12-29 17:00:52'),(189,11,139,'21021546','aaaaaaaaaa','bbbbbbbb','Sent','2023-12-29 17:00:52'),(190,11,139,'21020109','1111111111111','22222222222','Sent','2023-12-29 17:08:30'),(191,11,139,'21020111','1111111111111','22222222222','Sent','2023-12-29 17:08:30'),(192,11,139,'21020163','1111111111111','22222222222','Sent','2023-12-29 17:08:30'),(193,11,139,'21020210','1111111111111','22222222222','Sent','2023-12-29 17:08:30'),(194,11,139,'21020180','1111111111111','22222222222','Sent','2023-12-29 17:08:30'),(195,11,139,'21020195','1111111111111','22222222222','Sent','2023-12-29 17:08:30'),(196,11,139,'21020216','1111111111111','22222222222','Sent','2023-12-29 17:08:30'),(197,11,139,'21020223','1111111111111','22222222222','Sent','2023-12-29 17:08:30'),(198,11,139,'21020230','1111111111111','22222222222','Sent','2023-12-29 17:08:30'),(199,11,139,'21020231','1111111111111','22222222222','Sent','2023-12-29 17:08:30'),(200,11,139,'21020233','1111111111111','22222222222','Sent','2023-12-29 17:08:30'),(201,11,139,'21020241','1111111111111','22222222222','Sent','2023-12-29 17:08:30'),(202,11,139,'21020466','1111111111111','22222222222','Sent','2023-12-29 17:08:30'),(203,11,139,'21020510','1111111111111','22222222222','Sent','2023-12-29 17:08:30'),(204,11,139,'21020603','1111111111111','22222222222','Sent','2023-12-29 17:08:30'),(205,11,139,'21020617','1111111111111','22222222222','Sent','2023-12-29 17:08:30'),(206,11,139,'21020626','1111111111111','22222222222','Sent','2023-12-29 17:08:30'),(207,11,139,'21020633','1111111111111','22222222222','Sent','2023-12-29 17:08:30'),(208,11,139,'21020646','1111111111111','22222222222','Sent','2023-12-29 17:08:30'),(209,11,139,'21020651','1111111111111','22222222222','Sent','2023-12-29 17:08:30'),(210,11,139,'21020652','1111111111111','22222222222','Sent','2023-12-29 17:08:30'),(211,11,139,'21020657','1111111111111','22222222222','Sent','2023-12-29 17:08:30'),(212,11,139,'21021457','1111111111111','22222222222','Sent','2023-12-29 17:08:30'),(213,11,139,'21021471','1111111111111','22222222222','Sent','2023-12-29 17:08:30'),(214,11,139,'21021479','1111111111111','22222222222','Sent','2023-12-29 17:08:30'),(215,11,139,'21021508','1111111111111','22222222222','Sent','2023-12-29 17:08:30'),(216,11,139,'21021515','1111111111111','22222222222','Sent','2023-12-29 17:08:30'),(217,11,139,'21021521','1111111111111','22222222222','Sent','2023-12-29 17:08:30'),(218,11,139,'21021533','1111111111111','22222222222','Sent','2023-12-29 17:08:30'),(219,11,139,'21021537','1111111111111','22222222222','Sent','2023-12-29 17:08:30'),(220,11,139,'21021546','1111111111111','22222222222','Sent','2023-12-29 17:08:30'),(221,11,139,'1','gui lan nua','3 am','Sent','2023-12-29 20:00:46'),(222,11,139,'21020109','gui lan nua','3 am','Sent','2023-12-29 20:00:46'),(223,11,139,'21020163','gui lan nua','3 am','Sent','2023-12-29 20:00:46'),(224,11,139,'21020180','gui lan nua','3 am','Sent','2023-12-29 20:00:46'),(225,11,139,'21020111','gui lan nua','3 am','Sent','2023-12-29 20:00:46'),(226,11,139,'21020216','gui lan nua','3 am','Sent','2023-12-29 20:00:46'),(227,11,139,'21020195','gui lan nua','3 am','Sent','2023-12-29 20:00:46'),(228,11,139,'21020223','gui lan nua','3 am','Sent','2023-12-29 20:00:46'),(229,11,139,'21020210','gui lan nua','3 am','Sent','2023-12-29 20:00:46'),(230,11,139,'21020230','gui lan nua','3 am','Sent','2023-12-29 20:00:46'),(231,11,139,'21020231','gui lan nua','3 am','Sent','2023-12-29 20:00:46'),(232,11,139,'21020233','gui lan nua','3 am','Sent','2023-12-29 20:00:46'),(233,11,139,'21020241','gui lan nua','3 am','Sent','2023-12-29 20:00:46'),(234,11,139,'21020466','gui lan nua','3 am','Sent','2023-12-29 20:00:46'),(235,11,139,'21020510','gui lan nua','3 am','Sent','2023-12-29 20:00:46'),(236,11,139,'21020603','gui lan nua','3 am','Sent','2023-12-29 20:00:46'),(237,11,139,'21020617','gui lan nua','3 am','Sent','2023-12-29 20:00:46'),(238,11,139,'21020626','gui lan nua','3 am','Sent','2023-12-29 20:00:46'),(239,11,139,'21020633','gui lan nua','3 am','Sent','2023-12-29 20:00:46'),(240,11,139,'21020646','gui lan nua','3 am','Sent','2023-12-29 20:00:46'),(241,11,139,'21020651','gui lan nua','3 am','Sent','2023-12-29 20:00:46'),(242,11,139,'21020652','gui lan nua','3 am','Sent','2023-12-29 20:00:46'),(243,11,139,'21020657','gui lan nua','3 am','Sent','2023-12-29 20:00:46'),(244,11,139,'21021457','gui lan nua','3 am','Sent','2023-12-29 20:00:46'),(245,11,139,'21021471','gui lan nua','3 am','Sent','2023-12-29 20:00:46'),(246,11,139,'21021479','gui lan nua','3 am','Sent','2023-12-29 20:00:46'),(247,11,139,'21021508','gui lan nua','3 am','Sent','2023-12-29 20:00:46'),(248,11,139,'21021515','gui lan nua','3 am','Sent','2023-12-29 20:00:46'),(249,11,139,'21021521','gui lan nua','3 am','Sent','2023-12-29 20:00:46'),(250,11,139,'21021533','gui lan nua','3 am','Sent','2023-12-29 20:00:46'),(251,11,139,'21021537','gui lan nua','3 am','Sent','2023-12-29 20:00:46'),(252,11,139,'21021546','gui lan nua','3 am','Sent','2023-12-29 20:00:46');
/*!40000 ALTER TABLE `lecturer_notifications` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-31 10:10:36
