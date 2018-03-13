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
  `student_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `admission_date` date DEFAULT NULL,
  `name` varchar(150) NOT NULL,
  `address` varchar(150) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` varchar(150) DEFAULT NULL,
  `major` varchar(150) DEFAULT NULL,
  `student_email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'2014-01-23','Ardhi Wijaya','Klaten','1995-09-08','M','Informatics Engineering','ardhiwijaya@ugm.ac.id'),(2,'2014-01-23','Rully Indra L','Noroyono','1996-02-02','F','Informatics Engineering','rullyindra@ugm.ac.id'),(3,'2014-02-10','Mila Fiolita','Demangan Baru','1995-05-06','F','Electrical Engineering','milafio@ugm.ac.id'),(4,'2014-02-10','Mohammad Zaeroni','Srikandi Raya','1994-11-09','M','Mechanical Engineering','mzaeroni@ugm.ac.id'),(5,'2014-03-24','Dyah Ayu','Perkutut','1995-08-09','F','Mechanical Engineering','dyahayu@ugm.ac.id'),(6,'2014-04-14','Dewi Anjani','Demak','1992-02-03','F','Electrical Engineering','dewi@ugm.ac.id'),(7,'2014-05-19','Qisti Rahmatillah','Colombo','1994-09-22','F','Biology','qisti@ugm.ac.id'),(8,'2014-05-19','Azma Aji','Kudus','1995-10-24','F','Administration','azma@ugm.ac.id'),(9,'2014-05-19','Evania ','Madiun','1993-10-27','F','Accounting','evania@ugm.ac.id'),(10,'2014-05-19','Tsurayya','Papringan','1995-05-18','F','Accounting','ayya@ugm.ac.id'),(11,'2014-06-23','Hanif Ali','Kaliurang','1992-10-10','M','Informatics Engineering','hanif@ugm.ac.id'),(12,'2014-07-07','Bagusti Rahmad','Bekasi','1996-12-12','M','Electrical Engineering','bagusti@ugm.ac.id'),(13,'2014-08-18','Wahyu Ari','Garuda','1994-01-01','M','Electrical Engineering','wahyu@ugm.ac.id'),(14,'2014-08-18','Yulia Islamiati','Jl. Durian','1996-07-21','F','Administration','yulia@ugm.ac.id'),(15,'2014-08-18','Lilis Seprihatini','Cinde Raya','1995-09-20','F','Mathematics ','lilis@ugm.ac.id'),(16,'2014-09-08','Muhammad Irsyad','Jombang','1994-02-09','M','Mechanical Engineering','irsyad@ugm.ac.id'),(17,'2014-09-08','Fajar Subekti','Wonosobo','1992-10-19','M','Electrical Engineering','fajar@ugm.ac.id'),(18,'2014-10-20','Citra Septi Pratiwi','Penjaringan','1996-09-17','F','Mathematics ','citra@ugm.ac.id'),(19,'2014-10-20','Reni Puji','Delik Raya','1996-05-06','F','Informatics Engineering','renipuji@ugm.ac.id'),(20,'2014-11-17','Narendra Arum','Boja','1996-10-02','F','Accounting','narendra@ugm.ac.id'),(21,'2014-11-17','Ndaru Ratyanto','Demak','1995-12-17','M','Electrical Engineering','ndaru@ugm.ac.id'),(22,'2014-11-17','Fahmi Mukti Pratama','Sentiaki Tengah','1996-01-01','M','Mechanical Engineering','fahmi@ugm.ac.id'),(23,'2014-11-17','Sasi Ayu Noviaranie','Mataram','1996-11-20','F','Accounting','sasi@ugm.ac.id'),(24,'2014-11-17','Rahma Dwi Ratnasari','Jangli Timur','1996-03-05','F','Accounting','rahma@ugm.ac.id'),(25,'2014-12-15','Aurora Ayu Meijida','Punokawan','1996-05-15','F','Administration','aurora@ugm.ac.id'),(26,'2014-12-15','Siti Suwaibah','Semarang','1994-02-01','F','Accounting','siti@ugm.ac.id');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `student_chart`
--

/*!50001 DROP VIEW IF EXISTS `student_chart`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
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

-- Dump completed on 2018-03-13 13:00:57
