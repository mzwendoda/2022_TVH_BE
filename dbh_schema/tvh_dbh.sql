-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 09, 2022 at 12:47 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tvh_dbh`
--

-- --------------------------------------------------------

--
-- Table structure for table `administrator`
--

CREATE TABLE `administrator` (
  `admin_id` int(11) NOT NULL,
  `admin_name` text NOT NULL,
  `admin_surname` text NOT NULL,
  `admin_email` text NOT NULL,
  `admin_password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `announcement_id` int(11) NOT NULL,
  `announcement_name` text NOT NULL,
  `announcement_body` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`announcement_id`, `announcement_name`, `announcement_body`) VALUES
(6, '(Daily Scrum)', '(Scope of the meeting)');

-- --------------------------------------------------------

--
-- Table structure for table `applications`
--

CREATE TABLE `applications` (
  `application_id` int(11) NOT NULL,
  `student_number` int(11) NOT NULL,
  `student_name` text NOT NULL,
  `student_surname` text NOT NULL,
  `student_gender` text NOT NULL,
  `student_dob` text NOT NULL,
  `student_email` text NOT NULL,
  `student_cellno` int(11) NOT NULL,
  `student_faculty` text NOT NULL,
  `specialization` text NOT NULL,
  `student_level` text NOT NULL,
  `student_campus` text NOT NULL,
  `student_hobby` text NOT NULL,
  `application_status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `applications`
--

INSERT INTO `applications` (`application_id`, `student_number`, `student_name`, `student_surname`, `student_gender`, `student_dob`, `student_email`, `student_cellno`, `student_faculty`, `specialization`, `student_level`, `student_campus`, `student_hobby`, `application_status`) VALUES
(21, 216332520, 'Lindelani', 'Mthethwa', 'M', '1995-09-25', 'lindelani4435@gmail.com', 649204435, 'ICT', 'Software Development', 'Final year', 'Sosh South', 'Playing chess', 'Accepted!!!!');

-- --------------------------------------------------------

--
-- Table structure for table `deletedapplications`
--

CREATE TABLE `deletedapplications` (
  `application_id` int(11) NOT NULL,
  `student_number` text NOT NULL,
  `student_name` text NOT NULL,
  `student_surname` text NOT NULL,
  `student_gender` text NOT NULL,
  `student_dob` date NOT NULL,
  `student_email` text NOT NULL,
  `student_cellno` int(11) NOT NULL,
  `student_faculty` text NOT NULL,
  `specialization` text NOT NULL,
  `student_level` text NOT NULL,
  `student_campus` text NOT NULL,
  `student_hobby` text NOT NULL,
  `application_status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `deletedapplications`
--

INSERT INTO `deletedapplications` (`application_id`, `student_number`, `student_name`, `student_surname`, `student_gender`, `student_dob`, `student_email`, `student_cellno`, `student_faculty`, `specialization`, `student_level`, `student_campus`, `student_hobby`, `application_status`) VALUES
(20, '216332520', 'Lindelani', 'Mthethwa', 'M', '1995-09-25', 'lindelani4435@gmail.com', 649204435, 'ICT', 'Software Development', 'Final year', 'Sosh South', 'Playing chess', 'Panding!!!!');

-- --------------------------------------------------------

--
-- Table structure for table `deletedusers`
--

CREATE TABLE `deletedusers` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `surname` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `passcorn` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `deletedusers`
--

INSERT INTO `deletedusers` (`id`, `name`, `surname`, `email`, `password`, `passcorn`) VALUES
(1, 'Doz', 'Nyambose', 'doz@gmail.com', '$2b$08$saA.z30.1bhaM9NotMhzM.5fZ7SyBQEuWIfGmqRPoaSHUOj2UNwgW', '$2b$08$fmkd16hFvVBjcSkhMFUx0.AUoAWMbNAYNodkZOSCYhm4xUExgxKou'),
(2, 'Lindelani', 'Nyambose', 'lindelani4435@gmail.com', '$2b$08$bkQdOYewsCVfZpYXnfLcj.oqK/kTmWBjUYiJGs58xbfIb85aib0Lu', '$2b$08$hlqKcMOkEZvD8kcxF.ZmXO/3vmpsC63Hl6.goxg3zZ15oqrLIrHva'),
(3, 'Lindelani', 'Nyambose', 'lindelani4435@gmail.com', '$2b$08$qbynIARa1wWs7zJJWKsFcu2ShQg4z0smaVZEbuGp8tUNxW9yCm7AW', '$2b$08$DH/u7Ty7gRONchvGP0HOT.N90oi5.5WOfGOdoP82pMN47QAK5pLB.'),
(4, 'Lindelani', 'Nyambose', 'lindelani4435@gmail.com', '$2b$08$GEFH0YQl3Lk0nqzhY6WRzOvEh7x3u7S3QoLjbkWcqJ0gLkrk6Kk/K', '$2b$08$SMgg7rYwnupB2PWrexZo0Ol7Og9/ANESqzlte2Pj/AiHbjQeIaI46'),
(5, 'Lindelani', 'Nyambose', 'lindelani4435@gmail.com', '$2b$08$fkvMXWMZIvshkpcdKmcpteORyChW8MnpCRJBaYru8SZmQBYkW/LCG', '$2b$08$6kxLCs2yWzrDLsjgrqg1PeUufUNYlDl9skR7iurenZZKWvoHgVaPi'),
(109, 'Lindelani', 'Nyambose', 'lindelani4435@gmail.com', 'Ntando@KaBayanda', 'Ntando@KaBayanda'),
(110, 'Nicholas', 'Chauke', 'chaukevn4@gmail.com', 'Chauke@4', 'Chauke@4'),
(111, 'Mzwendoda', 'Madlopha', 'mzwendodamadlopha@gmail.com', 'Mzwendoda@Madlopha', 'Mzwendoda@Madlopha'),
(112, 'Lindelani', 'Mthethwa', 'lindelani4435@gmail.com', 'L@4435', 'L@4435'),
(113, 'Lindelani', 'Mthethwa', 'lindelani4435@gmail.com', 'L@4435', 'L@4435'),
(114, 'Lindelani', 'Mthethwa', 'lindelani4435@gmail.com', 'L@4435', 'L@4435');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `passcorn` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `email`, `password`, `passcorn`) VALUES
(115, 'Lindelani', 'Mthethwa', 'lindelani4435@gmail.com', 'L@4435', 'L@4435'),
(116, 'Mzwendoda', 'Madlopha', 'mzwendodamadlopha@gmail.com', 'Mzwendoda@Madlopha', 'Mzwendoda@Madlopha'),
(117, 'Nicholas', 'Chauke', 'chaukevn4@gmail.com', 'Chauke@4', 'Chauke@4');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `administrator`
--
ALTER TABLE `administrator`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`announcement_id`);

--
-- Indexes for table `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`application_id`);

--
-- Indexes for table `deletedapplications`
--
ALTER TABLE `deletedapplications`
  ADD PRIMARY KEY (`application_id`);

--
-- Indexes for table `deletedusers`
--
ALTER TABLE `deletedusers`
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
-- AUTO_INCREMENT for table `administrator`
--
ALTER TABLE `administrator`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `announcement_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `applications`
--
ALTER TABLE `applications`
  MODIFY `application_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `deletedapplications`
--
ALTER TABLE `deletedapplications`
  MODIFY `application_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `deletedusers`
--
ALTER TABLE `deletedusers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
