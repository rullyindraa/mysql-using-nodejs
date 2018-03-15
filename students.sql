-- phpMyAdmin SQL Dump
-- version 4.8.0-dev
-- https://www.phpmyadmin.net/
--
-- Host: 192.168.30.23
-- Generation Time: Mar 15, 2018 at 10:05 AM
-- Server version: 8.0.3-rc-log
-- PHP Version: 7.0.27-0+deb9u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `students`
--

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(10) UNSIGNED NOT NULL,
  `student_id` varchar(15) NOT NULL,
  `admission_date` date DEFAULT NULL,
  `name` varchar(150) NOT NULL,
  `address` varchar(150) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` varchar(150) DEFAULT NULL,
  `major` varchar(150) DEFAULT NULL,
  `student_email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `student_id`, `admission_date`, `name`, `address`, `date_of_birth`, `gender`, `major`, `student_email`) VALUES
(1, '33414001', '2014-01-23', 'Ardhi Wijaya', 'Klaten', '1995-09-08', 'M', 'Informatics Engineering', 'ardhiwijaya@ugm.ac.id'),
(2, '33414002', '2014-01-23', 'Rully Indra L', 'Noroyono', '1996-02-02', 'F', 'Informatics Engineering', 'rullyindra@ugm.ac.id'),
(3, '33314001', '2014-02-10', 'Mila Fiolita', 'Demangan Baru', '1995-05-06', 'F', 'Electrical Engineering', 'milafio@ugm.ac.id'),
(4, '33214001', '2014-02-10', 'Mohammad Zaeroni', 'Srikandi Raya', '1994-11-09', 'M', 'Mechanical Engineering', 'mzaeroni@ugm.ac.id'),
(5, '33214002', '2014-03-24', 'Dyah Ayu', 'Perkutut', '1995-08-09', 'F', 'Mechanical Engineering', 'dyahayu@ugm.ac.id'),
(6, '33314002', '2014-04-14', 'Dewi Anjani', 'Demak', '1992-02-03', 'F', 'Electrical Engineering', 'dewi@ugm.ac.id'),
(7, '33114001', '2014-05-19', 'Qisti Rahmatillah', 'Colombo', '1994-09-22', 'F', 'Biology', 'qisti@ugm.ac.id'),
(8, '33014001', '2014-05-19', 'Azma Aji', 'Kudus', '1995-10-24', 'F', 'Administration', 'azma@ugm.ac.id'),
(9, '33514001', '2014-05-19', 'Evania ', 'Madiun', '1993-10-27', 'F', 'Accounting', 'evania@ugm.ac.id'),
(10, '33514002', '2014-05-19', 'Tsurayya', 'Papringan', '1995-05-18', 'F', 'Accounting', 'ayya@ugm.ac.id'),
(11, '33414003', '2014-06-23', 'Hanif Ali', 'Kaliurang', '1992-10-10', 'M', 'Informatics Engineering', 'hanif@ugm.ac.id'),
(12, '33314003', '2014-07-07', 'Bagusti Rahmad', 'Bekasi', '1996-12-12', 'M', 'Electrical Engineering', 'bagusti@ugm.ac.id'),
(13, '33314004', '2014-08-18', 'Wahyu Ari', 'Garuda', '1994-01-01', 'M', 'Electrical Engineering', 'wahyu@ugm.ac.id'),
(14, '33014002', '2014-08-18', 'Yulia Islamiati', 'Jl. Durian', '1996-07-21', 'F', 'Administration', 'yulia@ugm.ac.id'),
(15, '33614001', '2014-08-18', 'Lilis Seprihatini', 'Cinde Raya', '1995-09-20', 'F', 'Mathematics ', 'lilis@ugm.ac.id'),
(16, '33214003', '2014-09-08', 'Muhammad Irsyad', 'Jombang', '1994-02-09', 'M', 'Mechanical Engineering', 'irsyad@ugm.ac.id'),
(17, '33314005', '2014-09-08', 'Fajar Subekti', 'Wonosobo', '1992-10-19', 'M', 'Electrical Engineering', 'fajar@ugm.ac.id'),
(18, '33614002', '2014-10-20', 'Citra Septi Pratiwi', 'Penjaringan', '1996-09-17', 'F', 'Mathematics ', 'citra@ugm.ac.id'),
(19, '33414004', '2014-10-20', 'Reni Puji', 'Delik Raya', '1996-05-06', 'F', 'Informatics Engineering', 'renipuji@ugm.ac.id'),
(20, '33514003', '2014-11-17', 'Narendra Arum', 'Boja', '1996-10-02', 'F', 'Accounting', 'narendra@ugm.ac.id'),
(21, '33314006', '2014-11-17', 'Ndaru Ratyanto', 'Demak', '1995-12-17', 'M', 'Electrical Engineering', 'ndaru@ugm.ac.id'),
(22, '33214004', '2014-11-17', 'Fahmi Mukti Pratama', 'Sentiaki Tengah', '1996-01-01', 'M', 'Mechanical Engineering', 'fahmi@ugm.ac.id'),
(23, '33514004', '2014-11-17', 'Sasi Ayu Noviaranie', 'Mataram', '1996-11-20', 'F', 'Accounting', 'sasi@ugm.ac.id'),
(24, '33514005', '2014-11-17', 'Rahma Dwi Ratnasari', 'Jangli Timur', '1996-03-05', 'F', 'Accounting', 'rahma@ugm.ac.id'),
(25, '33014003', '2014-12-15', 'Aurora Ayu Meijida', 'Punokawan', '1996-05-15', 'F', 'Administration', 'aurora@ugm.ac.id'),
(26, '33514006', '2014-12-15', 'Siti Suwaibah', 'Semarang', '1994-02-01', 'F', 'Accounting', 'siti@ugm.ac.id'),
(27, '33014004', '2014-12-15', 'Rini Surini', 'Semarang', '1995-08-30', 'F', 'Administration', 'rini@ugm.ac.id'),
(28, '33614003', '2014-12-15', 'Ayu Novitasari', 'Klaten', '1996-07-10', 'F', 'Mathematics ', 'ayu@ugm.ac.id'),
(29, '33214005', '2014-12-15', 'Topan Adi Prasetya', 'Srikandi Raya', '1995-05-09', 'M', 'Mechanical Engineering', 'topan@ugm.ac.id'),
(30, '33514007', '2014-12-15', 'Bella Shinsia', 'Sentiaki', '1996-07-16', 'F', 'Accounting', 'bella@ugm.ac.id'),
(31, '33614004', '2014-12-15', 'Fandi Ilham Khabibi', 'Banowati Tengah', '2018-03-14', 'M', 'Mathematics ', 'fandi@ugm.ac.id');

-- --------------------------------------------------------

--
-- Stand-in structure for view `student_chart`
-- (See below for the actual view)
--
CREATE TABLE `student_chart` (
`month` int(2)
,`Total` bigint(21)
);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'rully', '6607a999607711cd339dce1de6d64425a0985cfd');

-- --------------------------------------------------------

--
-- Structure for view `student_chart`
--
DROP TABLE IF EXISTS `student_chart`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `student_chart`  AS  select month(`admission_date`) AS `month`,count(0) AS `Total` from `students` group by `admission_date` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
