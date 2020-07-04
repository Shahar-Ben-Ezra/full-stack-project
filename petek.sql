-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 04, 2020 at 05:10 PM
-- Server version: 8.0.12
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `petek`
--

-- --------------------------------------------------------

--
-- Table structure for table `lists`
--

CREATE TABLE `lists` (
  `listId` int(6) NOT NULL,
  `listName` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `lists`
--

INSERT INTO `lists` (`listId`, `listName`, `email`) VALUES
(113, 'firstlist', 'iS@gmail.com'),
(114, 'secondlist', 'iS@gmail.com'),
(115, 'thirdlist', 'iS@gmail.com'),
(116, 'number1', 'iS1@gmail.com'),
(117, 'number2', 'iS1@gmail.com'),
(118, 'number3', 'iS1@gmail.com'),
(119, '1', 'iS2@gmail.com'),
(120, '2', 'iS2@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `productlist`
--

CREATE TABLE `productlist` (
  `id` int(6) NOT NULL,
  `Productname` varchar(30) NOT NULL,
  `amount` int(30) NOT NULL,
  `statusProduct` varchar(20) NOT NULL,
  `email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `listId` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `productlist`
--

INSERT INTO `productlist` (`id`, `Productname`, `amount`, `statusProduct`, `email`, `listId`) VALUES
(138, 'banana', 12, 'Need to buy', 'iS@gmail.com', 113),
(139, 'avocado', 2, 'Need to buy', 'iS@gmail.com', 113),
(140, 'watermelon', 3, 'bought', 'iS@gmail.com', 113),
(141, 'banana', 12, 'Need to buy', 'iS@gmail.com', 114),
(142, 'avocado', 2, 'Need to buy', 'iS@gmail.com', 114),
(143, 'watermelon', 3, 'Need to buy', 'iS@gmail.com', 114),
(144, 'spaghetti', 2, 'bought', 'iS@gmail.com', 114),
(145, 'watermelon', 1, 'Need to buy', 'iS@gmail.com', 115),
(146, 'marshmallow', 2, 'bought', 'iS@gmail.com', 115),
(147, 'banana', 12, 'Need to buy', 'iS1@gmail.com', 116),
(148, 'nana', 2, 'bought', 'iS1@gmail.com', 116),
(149, 'coconut', 3, 'bought', 'iS1@gmail.com', 116),
(150, 'grapes', 3, 'bought', 'iS1@gmail.com', 116),
(151, 'carp', 12, 'bought', 'iS1@gmail.com', 117),
(152, 'smoked fish', 1, 'bought', 'iS1@gmail.com', 117),
(157, 'smoked fish', 3, 'Need to buy', 'iS1@gmail.com', 118),
(158, 'yogurt', 2, 'Need to buy', 'iS2@gmail.com', 119);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `email` varchar(30) NOT NULL,
  `nickName` varchar(30) DEFAULT NULL,
  `Phone` varchar(50) DEFAULT NULL,
  `password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`email`, `nickName`, `Phone`, `password`) VALUES
('iS@gmail.com', 'shaharbe', '05266747489', '12345'),
('iS1@gmail.com', 'shahar', '0527787867', '12345'),
('iS2@gmail.com', 'shaharben', '0526654567', '12345');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `lists`
--
ALTER TABLE `lists`
  ADD PRIMARY KEY (`listId`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `productlist`
--
ALTER TABLE `productlist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `listId` (`listId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `lists`
--
ALTER TABLE `lists`
  MODIFY `listId` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;

--
-- AUTO_INCREMENT for table `productlist`
--
ALTER TABLE `productlist`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=159;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `lists`
--
ALTER TABLE `lists`
  ADD CONSTRAINT `lists_ibfk_1` FOREIGN KEY (`email`) REFERENCES `users` (`email`);

--
-- Constraints for table `productlist`
--
ALTER TABLE `productlist`
  ADD CONSTRAINT `productlist_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `lists` (`listid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
