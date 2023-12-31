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
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
INSERT INTO `news` VALUES (1,1,'Ngày Thể thao trường học','Hãy tham gia cùng chúng tôi vào một ngày hoạt động thể thao hấp dẫn!','https://onlinefirstaid4e88.b-cdn.net/wp-content/uploads/2019/06/school-sports-day-scaled.jpeg.bv_resized_desktop.jpeg.bv.webp?bv_host=onlinefirstaid.com','2023-10-22 17:18:52','2023-12-30 04:09:28'),(2,1,'Khu giảng đường 3 Trường Đại học Công nghệ chính thức đi vào hoạt động',' Ngày 01/10/2018, Khu giảng đường 3 của Trường Đại học Công nghệ tại tầng 2 tòa nhà Detech số 8, Tôn Thất Thuyết, Hà Nội chính thức đi vào vận hành.\n\n     Khu giảng đường có diện tích 1300 m2 gồm 15 phòng học có sức chứa từ 40-60 chỗ ngồi, đáp ứng quy mô 700 sinh viên/ca học. Các phòng học được thiết kế, đầu tư mới đồng bộ, hiện đại đáp ứng tiêu chuẩn chất lượng cao: hệ thống điều hòa trung tâm; hệ thống cửa kính cách âm và cách nhiệt để đảm bảo môi trường học tập yên tĩnh; hệ thống đèn LED chiếu sáng; các lớp học được trang bị máy chiếu, bảng trượt hai lớp và bàn ghế mới.\n\n     Không gian sảnh nối giữa các phòng học được thiết kế rộng, thoáng đáp ứng nhu cầu nghỉ giữa giờ và các hoạt động tập thể, giao lưu của sinh viên. Cùng với hạ tầng tốt đảm bảo cho công tác giảng dạy và nghiên cứu, khu giảng đường mới của Trường còn nằm trên địa bàn có hạ tầng giao thông thuận lợi, cảnh quan đẹp, không khí trong lành, gần các trường đại học lớn. Đây là điều kiện tốt để tạo ra sự giao lưu, liên kết trong học tập và sinh hoạt của cộng đồng sinh viên.\n\n     Với việc đầu tư tăng cường cơ sở vật chất đáp ứng yêu cầu chất lượng cao của công tác dạy và học, hiện tại Trường Đại học Công nghệ có 03 khu giảng đường với tổng diện tích 4500 m2 với gần 40 phòng học. Dưới đây là một số hình ảnh của khu giảng đường mới tại tầng 2, tòa Nhà Detech, số 8 Tôn Thất Thuyết, Hà Nội.','','2023-10-22 17:18:52','2023-12-30 15:28:26'),(3,1,'Sự kiện Tình nguyện cộng đồng','Hãy tham gia tình nguyện để tạo ảnh hưởng tích cực đến cộng đồng.','https://familyhouseinc.org/wp-content/uploads/2019/10/summer-high-school-volunteer-program-250x140.jpg','2023-10-22 17:18:52','2023-12-30 04:13:36'),(5,1,'What is Lorem Ipsum?','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','team-business-people-stacking-hands.jpg','2023-12-30 15:35:26','2023-12-30 15:36:30');
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

-- Dump completed on 2023-12-31 10:10:36
