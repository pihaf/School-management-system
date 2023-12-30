-- MySQL dump 10.13  Distrib 5.7.24, for osx11.1 (x86_64)
--
-- Host: localhost    Database: testuetsupport
-- ------------------------------------------------------
-- Server version	8.2.0

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
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `news` (
  `new_id` int NOT NULL AUTO_INCREMENT,
  `admin_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`new_id`),
  KEY `admin_id` (`admin_id`),
  CONSTRAINT `news_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES 
(1,1,'Ngày Thể thao trường học','Hãy tham gia cùng chúng tôi vào một ngày hoạt động thể thao hấp dẫn!','sports_day.jpg','2023-10-22 17:18:52','2023-10-22 17:18:52'),
(2,1,'Khánh thành Tòa nhà mới của trường','Chúng tôi tự hào thông báo về lễ khánh thành tòa nhà mới của trường.','building_opening.jpg','2023-10-22 17:18:52','2023-10-22 17:18:52'),
(3,1,'Sự kiện Tình nguyện cộng đồng','Hãy tham gia tình nguyện để tạo ảnh hưởng tích cực đến cộng đồng.','community_service.jpg','2023-10-22 17:18:52','2023-10-22 17:18:52'),
(4,3,'Hiến máu tình nguyện','Ngày hội hiến máu tình nguyện trường Đại học Công nghệ, Đại học Quốc gia Hà Nội','https://bcp.cdnchinhphu.vn/Uploaded/buithuhuong/2020_04_07/hien%20mau.jpg','2023-12-30 11:16:25','2023-12-30 11:16:25'),
(5,3,'Kiện toàn Chủ tịch Hội đồng trường, Hiệu trưởng Trường ĐH Công nghệ. Nâng cấp và thành lập các đơn vị mới','Tháng 5/2023, Giám đốc ĐHQGHN đã ký các Quyết định công nhận Chủ tịch Hội đồng trường và Hiệu trưởng Trường ĐH Công nghệ – ĐHQGHN. Ngày 25/5/2023, nhân kỷ niệm 19 năm thành lập, Trường ĐH Công nghệ đã tổ chức Lễ công bố quyết định công nhận Chủ tịch Hội đồng Trường, Hiệu trưởng Trường ĐH Công nghệ và Ra mắt Khoa Công nghệ Xây dựng – Giao thông trên cơ sở Bộ môn Công nghệ Xây dựng – Giao thông.Tổ chức Lễ kỷ niệm 5 năm thành lập Khoa Công nghệ nông nghiệp và thành lập mới Bộ môn Nông nghiệp số. Đây là những sự kiện quan trọng đối với Nhà trường, là nền tảng để UET hướng tới một chặng đường phát triển mới hứa hẹn nhiều bứt phá.','https://uet.vnu.edu.vn/wp-content/uploads/2023/05/thanh-lap-truong5.jpg','2023-12-30 11:18:18','2023-12-30 11:18:18');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-30 18:23:58
