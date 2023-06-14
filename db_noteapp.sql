-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 14, 2023 at 01:48 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_noteapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `folders`
--

CREATE TABLE `folders` (
  `id` int(11) NOT NULL,
  `folderName` varchar(255) NOT NULL,
  `accountId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `folders`
--

INSERT INTO `folders` (`id`, `folderName`, `accountId`, `createdAt`, `updatedAt`) VALUES
(1, 'folder 1 - google', 1, '2023-06-14 06:42:29', '2023-06-14 06:42:29'),
(2, 'folder 2 - google', 1, '2023-06-14 06:42:36', '2023-06-14 06:42:36'),
(4, 'folder 1 - acc', 2, '2023-06-14 06:47:35', '2023-06-14 06:47:35'),
(5, 'folder 2 - acc', 2, '2023-06-14 06:47:40', '2023-06-14 06:47:40');

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `nameNote` varchar(255) NOT NULL,
  `contentHTML` longtext NOT NULL,
  `contentText` longtext NOT NULL,
  `accountId` int(11) NOT NULL,
  `folderId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`id`, `nameNote`, `contentHTML`, `contentText`, `accountId`, `folderId`, `createdAt`, `updatedAt`) VALUES
(1, 'note 1.1 - google', '<p>text 1.1 - google</p>\n', 'text 1.1 - google', 1, 1, '2023-06-14 06:42:41', '2023-06-14 06:45:24'),
(2, 'note 1.2 - google', '', '', 1, 1, '2023-06-14 06:45:04', '2023-06-14 06:45:04'),
(3, 'note 2.1 - google', '', '', 1, 2, '2023-06-14 06:46:04', '2023-06-14 06:46:04'),
(4, 'note 1.1 - acc', '<p>abc</p>\n', 'abc', 2, 4, '2023-06-14 06:47:50', '2023-06-14 06:48:11'),
(5, 'note 1.2 - acc', '', '', 2, 4, '2023-06-14 06:48:00', '2023-06-14 06:48:00'),
(6, 'note 2.1 - acc', '', '', 2, 5, '2023-06-14 06:48:23', '2023-06-14 06:48:23');

-- --------------------------------------------------------

--
-- Table structure for table `otps`
--

CREATE TABLE `otps` (
  `id` int(11) NOT NULL,
  `emailRecovery` varchar(255) NOT NULL,
  `otp` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `otps`
--

INSERT INTO `otps` (`id`, `emailRecovery`, `otp`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'tann4878@gmail.com', '8877', 'Confirmed', '2023-06-14 06:46:55', '2023-06-14 06:47:12');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('migration-create-folder.js'),
('migration-create-note.js'),
('migration-create-otp.js'),
('migration-create-user.js');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `idSocial` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nameLogin` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `idSocial`, `password`, `nameLogin`, `createdAt`, `updatedAt`) VALUES
(1, '', '105027268063465102838', '', 'Tan Nguyen', '2023-06-14 06:42:19', '2023-06-14 06:42:19'),
(2, 'tann4878@gmail.com', '', '$2a$10$gRq1JY4KW7l3oFQ8X0RsFO2DrPf5pVxFFDN6U.lfQyXCzNblKCWBe', 'Tan', '2023-06-14 06:46:44', '2023-06-14 06:47:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `folders`
--
ALTER TABLE `folders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `otps`
--
ALTER TABLE `otps`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `folders`
--
ALTER TABLE `folders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `otps`
--
ALTER TABLE `otps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
