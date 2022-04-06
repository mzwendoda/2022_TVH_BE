-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 06, 2022 at 08:57 AM
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
-- Table structure for table `acceptedparticipants`
--

CREATE TABLE `acceptedparticipants` (
  `accepted_id` int(11) NOT NULL,
  `accepted_name` text NOT NULL,
  `accepted_surname` text NOT NULL,
  `accepted_gender` text NOT NULL,
  `accepted_dob` date NOT NULL,
  `accepted_email` text NOT NULL,
  `accepted_record` text NOT NULL,
  `accepted_cellno` text NOT NULL,
  `accepted_skill` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `acceptedparticipants`
--

INSERT INTO `acceptedparticipants` (`accepted_id`, `accepted_name`, `accepted_surname`, `accepted_gender`, `accepted_dob`, `accepted_email`, `accepted_record`, `accepted_cellno`, `accepted_skill`) VALUES
(2, 'Mzwendoda', 'Madlopha', 'M', '1995-09-25', 'mzwendodamadlopha@gmail.com', 'locationtothefile', '731028101', ' Full Stack Developer'),
(3, 'Mzwendoda', 'Madlopha', 'M', '1995-09-25', 'mzwendodamadlopha@gmail.com', 'locationtothefile', '731028101', ' Full Stack Developer'),
(4, 'Mzwendoda', 'Madlopha', 'M', '1995-09-25', 'mzwendodamadlopha@gmail.com', 'locationtothefile', '731028101', ' Full Stack Developer'),
(5, 'Mzwendoda', 'Madlopha', 'M', '1995-09-25', 'mzwendodamadlopha@gmail.com', 'locationtothefile', '731028101', ' Full Stack Developer'),
(6, 'Mzwendoda', 'Madlopha', 'M', '1995-09-25', 'mzwendodamadlopha@gmail.com', 'locationtothefile', '731028101', ' Full Stack Developer'),
(7, 'Mzwendoda', 'Madlopha', 'M', '1995-09-25', 'mzwendodamadlopha@gmail.com', 'locationtothefile', '731028101', ' Full Stack Developer'),
(8, 'Nicholas', 'Chauke', 'M', '1997-12-27', 'lindelani4435@gmail.com', 'locationtothefile', '835851680', ' Front end developer '),
(9, 'Mzwendoda', 'Madlopha', 'M', '1995-09-25', 'mzwendodamadlopha@gmail.com', 'locationtothefile', '731028101', ' Full Stack Developer'),
(10, 'Nicholas', 'Chauke', 'M', '1997-12-27', 'nhlakanipho19sphele@gmail.com', 'locationtothefile', '835851680', ' Front end developer '),
(11, 'Nicholas', 'Chauke', 'M', '1997-12-27', 'lindelani4435@gmail.com', 'locationtothefile', '835851680', ' Front end developer '),
(12, 'Thato', 'Msiza', 'F', '1996-12-27', 'prissysiza@gmail.com', 'locationtothefile', '608777055', 'TVH LeaderShip'),
(13, 'Thato', 'Msiza', 'F', '1996-12-27', 'lindelani4435@gmail.com', 'locationtothefile', '608777055', 'TVH LeaderShip'),
(14, 'Lindelani', 'Mthethwa', 'F', '1995-12-27', 'lindelani4435@gmail.com', 'locationtothefile', '649204435', 'TVH backend developer');

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `announcement_id` int(11) NOT NULL,
  `announcement_name` text NOT NULL,
  `announcement_body` text NOT NULL,
  `announcement_link` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`announcement_id`, `announcement_name`, `announcement_body`, `announcement_link`) VALUES
(6, '(Daily Scrum)', '(Scope of the meeting)', '(Teams link)');

-- --------------------------------------------------------

--
-- Table structure for table `deletedannouncements`
--

CREATE TABLE `deletedannouncements` (
  `announcement_id` int(11) NOT NULL,
  `announcement_name` text NOT NULL,
  `announcement_body` text NOT NULL,
  `annoucement_link` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `deletedannouncements`
--

INSERT INTO `deletedannouncements` (`announcement_id`, `announcement_name`, `announcement_body`, `annoucement_link`) VALUES
(13, 'Test Meeting', '(define scope of the meeting)', '(teams link)'),
(14, 'Developers Meeting', '(define scope of the meeting)', '(teams link)'),
(15, '(name of announcement)', '(Scope of the meeting)', '(Teams link)'),
(16, '(Daily Scrum)', '(Scope of the meeting)', '(Teams link)');

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
(1, 'Doz', 'Nyambose', 'doz@gmail.com', '$2b$08$saA.z30.1bhaM9NotMhzM.5fZ7SyBQEuWIfGmqRPoaSHUOj2UNwgW', '$2b$08$fmkd16hFvVBjcSkhMFUx0.AUoAWMbNAYNodkZOSCYhm4xUExgxKou');

-- --------------------------------------------------------

--
-- Table structure for table `deleteparticipants`
--

CREATE TABLE `deleteparticipants` (
  `participant_id` int(11) NOT NULL,
  `pName` text NOT NULL,
  `pSurname` text NOT NULL,
  `pGender` text NOT NULL,
  `pDob` date NOT NULL,
  `pemail` text NOT NULL,
  `pRecord` text NOT NULL,
  `pCellNo` int(11) NOT NULL,
  `pSkill` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `participants`
--

CREATE TABLE `participants` (
  `participant_id` int(11) NOT NULL,
  `pName` text NOT NULL,
  `pSurname` text NOT NULL,
  `pGender` text NOT NULL,
  `pDob` date NOT NULL,
  `pemail` text NOT NULL,
  `pRecord` text NOT NULL,
  `pCellNo` int(11) NOT NULL,
  `pSkill` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `participants`
--

INSERT INTO `participants` (`participant_id`, `pName`, `pSurname`, `pGender`, `pDob`, `pemail`, `pRecord`, `pCellNo`, `pSkill`) VALUES
(22, 'Mzwendoda', 'Madlopha', 'M', '1995-09-25', 'mzwendodamadlopha@gmail.com', 'locationtothefile', 731028101, ' Full Stack Developer'),
(24, 'Nicholas', 'Chauke', 'M', '1997-12-27', 'nhlakanipho19sphele@gmail.com', 'locationtothefile', 835851680, ' Front end developer '),
(34, 'Lindelani', 'Mthethwa', 'F', '1995-12-27', 'lindelani4435@gmail.com', 'locationtothefile', 649204435, 'TVH backend developer');

-- --------------------------------------------------------

--
-- Table structure for table `rejectedparticipants`
--

CREATE TABLE `rejectedparticipants` (
  `rejected_id` int(11) NOT NULL,
  `rejected_name` text NOT NULL,
  `rejected_surname` text NOT NULL,
  `rejected_gender` text NOT NULL,
  `rejected_dob` date NOT NULL,
  `rejected_email` text NOT NULL,
  `rejected_record` text NOT NULL,
  `rejected_cellno` text NOT NULL,
  `rejected_skill` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rejectedparticipants`
--

INSERT INTO `rejectedparticipants` (`rejected_id`, `rejected_name`, `rejected_surname`, `rejected_gender`, `rejected_dob`, `rejected_email`, `rejected_record`, `rejected_cellno`, `rejected_skill`) VALUES
(1, 'Lindelani', 'Mthethwa', 'F', '1995-12-27', 'lindelani4435@gmail.com', 'locationtothefile', '649204435', 'TVH backend developer'),
(2, 'Mzwendoda', 'Madlopha', 'M', '1995-09-25', 'mzwendodamadlopha@gmail.com', 'locationtothefile', '731028101', ' Full Stack Developer'),
(3, 'Lindelani', 'Mthethwa', 'F', '1995-12-27', 'lindelani4435@gmail.com', 'locationtothefile', '649204435', 'TVH backend developer');

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
-- Indexes for dumped tables
--

--
-- Indexes for table `acceptedparticipants`
--
ALTER TABLE `acceptedparticipants`
  ADD PRIMARY KEY (`accepted_id`);

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`announcement_id`);

--
-- Indexes for table `deletedannouncements`
--
ALTER TABLE `deletedannouncements`
  ADD PRIMARY KEY (`announcement_id`);

--
-- Indexes for table `deletedusers`
--
ALTER TABLE `deletedusers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `deleteparticipants`
--
ALTER TABLE `deleteparticipants`
  ADD PRIMARY KEY (`participant_id`);

--
-- Indexes for table `participants`
--
ALTER TABLE `participants`
  ADD PRIMARY KEY (`participant_id`);

--
-- Indexes for table `rejectedparticipants`
--
ALTER TABLE `rejectedparticipants`
  ADD PRIMARY KEY (`rejected_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `acceptedparticipants`
--
ALTER TABLE `acceptedparticipants`
  MODIFY `accepted_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `announcement_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `deletedannouncements`
--
ALTER TABLE `deletedannouncements`
  MODIFY `announcement_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `deletedusers`
--
ALTER TABLE `deletedusers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `deleteparticipants`
--
ALTER TABLE `deleteparticipants`
  MODIFY `participant_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `participants`
--
ALTER TABLE `participants`
  MODIFY `participant_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `rejectedparticipants`
--
ALTER TABLE `rejectedparticipants`
  MODIFY `rejected_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
