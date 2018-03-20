-- MySQL dump 10.13  Distrib 5.7.21, for osx10.13 (x86_64)
--
-- Host: localhost    Database: students
-- ------------------------------------------------------
-- Server version	5.7.21

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
-- Temporary table structure for view `student_chart`
--

DROP TABLE IF EXISTS `student_chart`;
/*!50001 DROP VIEW IF EXISTS `student_chart`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `student_chart` AS SELECT 
 1 AS `month`,
 1 AS `Total`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `students` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `student_id` varchar(15) NOT NULL,
  `admission_date` date DEFAULT NULL,
  `name` varchar(150) NOT NULL,
  `address` varchar(150) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` varchar(150) DEFAULT NULL,
  `major` varchar(150) DEFAULT NULL,
  `student_email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `student_id` (`student_id`),
  UNIQUE KEY `student_email` (`student_email`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'33414001','2018-01-23','Ardhi Wijaya','Klaten','1995-09-08','M','Informatics Engineering','ardhiwijaya@ugm.ac.id'),(2,'33414002','2018-01-23','Rully Indra L','Noroyono','1996-02-02','F','Informatics Engineering','rullyindra@ugm.ac.id'),(3,'33314001','2016-01-23','Mila Fiolita','Demangan Baru','1995-05-06','F','Electrical Engineering','milafio@ugm.ac.id'),(4,'33214001','2018-01-23','Mohammad Zaeroni','Srikandi Raya','1994-11-09','M','Mechanical Engineering','mzaeroni@ugm.ac.id'),(5,'33214002','2018-03-24','Dyah Ayu','Perkutut','1995-08-09','F','Mechanical Engineering','dyahayu@ugm.ac.id'),(6,'33314002','2017-04-14','Dewi Anjani','Demak','1992-02-03','F','Electrical Engineering','dewi@ugm.ac.id'),(7,'33114001','2016-05-19','Qisti Rahmatillah','Colombo','1994-09-22','F','Biology','qisti@ugm.ac.id'),(8,'33014001','2017-05-19','Azma Aji','Kudus','1995-10-24','F','Administration','azma@ugm.ac.id'),(9,'33514001','2017-05-19','Evania ','Madiun','1993-10-27','F','Accounting','evania@ugm.ac.id'),(10,'33514002','2017-05-19','Tsurayya','Papringan','1995-05-18','F','Accounting','ayya@ugm.ac.id'),(11,'33414003','2016-06-23','Hanif Ali','Kaliurang','1992-10-10','M','Informatics Engineering','hanif@ugm.ac.id'),(12,'33314003','2017-07-07','Bagusti Rahmad','Bekasi','1996-12-12','M','Electrical Engineering','bagusti@ugm.ac.id'),(13,'33314004','2016-08-18','Wahyu Ari','Garuda','1994-01-01','M','Electrical Engineering','wahyu@ugm.ac.id'),(14,'33014002','2016-08-18','Yulia Islamiati','Jl. Durian','1996-07-21','F','Administration','yulia@ugm.ac.id'),(15,'33614001','2017-08-18','Lilis Seprihatini','Cinde Raya','1995-09-20','F','Mathematics ','lilis@ugm.ac.id'),(16,'33214003','2016-09-08','Muhammad Irsyad','Jombang','1994-02-09','M','Mechanical Engineering','irsyad@ugm.ac.id'),(17,'33314005','2016-09-08','Fajar Subekti','Wonosobo','1992-10-19','M','Electrical Engineering','fajar@ugm.ac.id'),(18,'33614002','2017-10-20','Citra Septi Pratiwi','Penjaringan','1996-09-17','F','Mathematics ','citra@ugm.ac.id'),(19,'33414004','2017-10-20','Reni Puji','Delik Raya','1996-05-06','F','Informatics Engineering','renipuji@ugm.ac.id'),(20,'33514003','2016-11-17','Narendra Arum','Boja','1996-10-02','F','Accounting','narendra@ugm.ac.id'),(21,'33314006','2017-11-17','Ndaru Ratyanto','Demak','1995-12-17','M','Electrical Engineering','ndaru@ugm.ac.id'),(22,'33214004','2016-11-17','Fahmi Mukti Pratama','Sentiaki Tengah','1996-01-01','M','Mechanical Engineering','fahmi@ugm.ac.id'),(23,'33514004','2016-11-17','Sasi Ayu Noviaranie','Mataram','1996-11-20','F','Accounting','sasi@ugm.ac.id'),(24,'33514005','2017-11-17','Rahma Dwi Ratnasari','Jangli Timur','1996-03-05','F','Accounting','rahma@ugm.ac.id'),(25,'33014003','2016-12-15','Aurora Ayu Meijida','Punokawan','1996-05-15','F','Administration','aurora@ugm.ac.id'),(26,'33514006','2017-12-15','Siti Suwaibah','Semarang','1994-02-01','F','Accounting','siti@ugm.ac.id'),(27,'33014004','2016-12-15','Rini Surini','Semarang','1995-08-30','F','Administration','rini@ugm.ac.id'),(28,'33614003','2016-12-15','Ayu Novitasari','Klaten','1996-07-10','F','Mathematics ','ayu@ugm.ac.id'),(29,'33214005','2017-12-15','Topan Adi Prasetya','Srikandi Raya','1995-05-09','M','Mechanical Engineering','topan@ugm.ac.id'),(30,'33514007','2017-12-15','Bella Shinsia','Sentiaki','1996-07-16','F','Accounting','bella@ugm.ac.id'),(31,'33614004','2016-10-20','Fandi Ilham Khabibi','Banowati Tengah','1995-09-20','M','Mathematics ','fandi@ugm.ac.id'),(32,'33414005','2016-01-23','Reza Burhan','Amaris','1996-03-20','M','Informatics Engineering','reza@ugm.ac.id');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `username` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `resetPasswordToken` varchar(200) DEFAULT NULL,
  `resetPasswordExpires` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('rully','6bbeaa3c98638082f14b24109f85368cc410ef54','rullyindraa@gmail.com',1,NULL,NULL),('dyah','39f2920070569cd6dbf0515a5795a96e01b0c986','dyahtika@gmail.com',9,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `student_chart`
--

/*!50001 DROP VIEW IF EXISTS `student_chart`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `student_chart` AS select month(`students`.`admission_date`) AS `month`,count(0) AS `Total` from `students` group by `students`.`admission_date` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-03-20  9:45:46
