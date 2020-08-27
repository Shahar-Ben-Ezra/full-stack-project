-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 27, 2020 at 09:16 PM
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
-- Table structure for table `boughtproducts`
--

CREATE TABLE `boughtproducts` (
  `id` int(6) NOT NULL,
  `email` varchar(30) NOT NULL,
  `Productname` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `boughtproducts`
--

INSERT INTO `boughtproducts` (`id`, `email`, `Productname`) VALUES
(40, 'netaliamsallem@gmail.com', 'banana'),
(41, 'netaliamsallem@gmail.com', 'bamba'),
(43, 'netaliamsallem@gmail.com', 'computer'),
(46, 'netaliamsallem@gmail.com', 'cucumber'),
(47, 'netaliamsallem@gmail.com', 'spaghetti'),
(48, 'netaliamsallem@gmail.com', 'salmon'),
(51, 'netaliamsallem@gmail.com', 'chicken'),
(53, 'netaliamsallem@gmail.com', 'strawberries'),
(54, 'netaliamsallem@gmail.com', 'broccoli'),
(55, 'netaliamsallem@gmail.com', 'caviar'),
(56, 'netaliamsallem@gmail.com', 'cheese'),
(57, 'netaliamsallem@gmail.com', 'chips'),
(58, 'netaliamsallem@gmail.com', 'crepes'),
(59, 'netaliamsallem@gmail.com', 'celery'),
(60, 'netaliamsallem@gmail.com', 'cake'),
(61, 'shaharbenezra92@gmail.com', 'bissli'),
(62, 'shaharbenezra92@gmail.com', 'crepes'),
(63, 'shaharbenezra92@gmail.com', 'grapes'),
(64, 'petekshahar2020@gmail.com', 'ginger'),
(65, 'petekshahar2020@gmail.com', 'granola'),
(66, 'petekshahar2020@gmail.com', 'garlic'),
(67, 'petekshahar2020@gmail.com', 'greek salad');

-- --------------------------------------------------------

--
-- Table structure for table `familylists`
--

CREATE TABLE `familylists` (
  `id` int(6) NOT NULL,
  `idCreator` varchar(30) NOT NULL,
  `idUsers` varchar(30) DEFAULT NULL,
  `listId` int(6) NOT NULL,
  `listName` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `familylists`
--

INSERT INTO `familylists` (`id`, `idCreator`, `idUsers`, `listId`, `listName`) VALUES
(82, 'netaliamsallem@gmail.com', 'netaliamsallem@gmail.com', 188, 'netaList'),
(4000, 'netaliamsallem@gmail.com', 'netaliamsallem@gmail.com', 189, 'workList'),
(4001, 'netaliamsallem@gmail.com', 'netaliamsallem@gmail.com', 190, 'copyWorkList'),
(4005, 'shaharbenezra92@gmail.com', 'shaharbenezra92@gmail.com', 193, 'homelist'),
(4010, 'netaliamsallem@gmail.com', 'shaharbenezra92@gmail.com', 189, 'workList'),
(4015, 'shaharbenezra92@gmail.com', 'netaliamsallem@gmail.com', 193, 'homelist'),
(4017, 'shaharbenezra92@gmail.com', 'petekshahar2020@gmail.com', 193, 'homelist'),
(4018, 'netaliamsallem@gmail.com', 'petekshahar2020@gmail.com', 189, 'workList'),
(4019, 'petekshahar2020@gmail.com', 'petekshahar2020@gmail.com', 195, 'peteklist'),
(4020, 'petekshahar2020@gmail.com', 'shaharbenezra92@gmail.com', 195, 'peteklist'),
(4021, 'petekshahar2020@gmail.com', 'netaliamsallem@gmail.com', 195, 'peteklist'),
(4022, 'netaliamsallem@gmail.com', 'Alon8877@gmail.com', 189, 'workList');

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
(188, 'netaList', 'netaliamsallem@gmail.com'),
(189, 'workList', 'netaliamsallem@gmail.com'),
(190, 'copyWorkList', 'netaliamsallem@gmail.com'),
(193, 'homelist', 'shaharbenezra92@gmail.com'),
(195, 'peteklist', 'petekshahar2020@gmail.com');

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
(242, 'banana', 5, 'bought', 'netaliamsallem@gmail.com', 188),
(243, 'bamba', 21, 'bought', 'netaliamsallem@gmail.com', 188),
(244, 'broccoli', 1, 'bought', 'netaliamsallem@gmail.com', 188),
(245, 'computer', 1, 'Need to buy', 'netaliamsallem@gmail.com', 188),
(246, 'carrot', 1, 'bought', 'netaliamsallem@gmail.com', 188),
(247, 'chicken', 2, 'Need to buy', 'netaliamsallem@gmail.com', 188),
(248, 'cucumber', 5, 'Need to buy', 'netaliamsallem@gmail.com', 188),
(249, 'spaghetti', 2, 'Need to buy', 'netaliamsallem@gmail.com', 188),
(250, 'salmon', 3, 'bought', 'netaliamsallem@gmail.com', 188),
(251, 'strawberries', 4, 'Need to buy', 'netaliamsallem@gmail.com', 188),
(252, 'cheese', 2, 'bought', 'netaliamsallem@gmail.com', 188),
(253, 'caviar', 2, 'bought', 'netaliamsallem@gmail.com', 188),
(254, 'coca-cola', 2, 'Need to buy', 'netaliamsallem@gmail.com', 188),
(255, 'chips', 2, 'Need to buy', 'netaliamsallem@gmail.com', 188),
(256, 'chips', 3, 'Need to buy', 'netaliamsallem@gmail.com', 189),
(257, 'celery', 2, 'bought', 'netaliamsallem@gmail.com', 189),
(258, 'crepes', 1, 'bought', 'netaliamsallem@gmail.com', 189),
(259, 'cake', 1, 'bought', 'netaliamsallem@gmail.com', 189),
(260, 'crepes', 1, 'Need to buy', 'netaliamsallem@gmail.com', 190),
(262, 'chips', 3, 'Need to buy', 'netaliamsallem@gmail.com', 190),
(263, 'cake', 1, 'bought', 'netaliamsallem@gmail.com', 190),
(264, 'candy corn', 21, 'Need to buy', 'netaliamsallem@gmail.com', 190),
(265, 'cherries', 13, 'Need to buy', 'netaliamsallem@gmail.com', 190),
(266, 'bissli', 4, 'bought', 'shaharbenezra92@gmail.com', 189),
(267, 'grapes', 3, 'bought', 'shaharbenezra92@gmail.com', 193),
(268, 'green beans', 2, 'Need to buy', 'shaharbenezra92@gmail.com', 193),
(269, 'graham cracker', 12, 'Need to buy', 'shaharbenezra92@gmail.com', 193),
(270, 'banana', 13, 'Need to buy', 'petekshahar2020@gmail.com', 189),
(271, 'granola', 2, 'Need to buy', 'petekshahar2020@gmail.com', 195),
(272, 'ginger', 3, 'bought', 'petekshahar2020@gmail.com', 195),
(273, 'garlic', 2, 'bought', 'petekshahar2020@gmail.com', 195),
(274, 'grapefruit', 3, 'Need to buy', 'petekshahar2020@gmail.com', 195),
(275, 'guacamole', 4, 'Need to buy', 'petekshahar2020@gmail.com', 195),
(276, 'greek salad', 1, 'Need to buy', 'petekshahar2020@gmail.com', 195);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `email` varchar(30) NOT NULL,
  `nickName` varchar(30) DEFAULT NULL,
  `Phone` varchar(50) DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`email`, `nickName`, `Phone`, `password`) VALUES
('Alon8877@gmail.com', '', '', '$2y$10$Ti5uxP81vm9jI6sFQlXyJexRq/hPhHVLODt4CNwLlGWRawYT5alTK'),
('netaliamsallem@gmail.com', '', '', '$2y$10$xtp5XFP9oVsJHZ0CLUhi4OBWCVZ0OjM6yLpVRnjuxv5v45QGF9edu'),
('petekshahar2020@gmail.com', 'petekAdmin', '', '$2y$10$WcnzHJO.beFuWahW1qg79.vzE2OarZH7bQYJhvoT4ft0gKr6Tjg5q'),
('shaharbenezra92@gmail.com', '', '', '$2y$10$pO1MnsBGD7X6tkPZ2nrEJOm9hzswKwsuVB/VQG6MNvLLIwXgrfBX2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `boughtproducts`
--
ALTER TABLE `boughtproducts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Productname` (`Productname`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `familylists`
--
ALTER TABLE `familylists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUsers` (`idUsers`),
  ADD KEY `idCreator` (`idCreator`);

--
-- Indexes for table `lists`
--
ALTER TABLE `lists`
  ADD PRIMARY KEY (`listId`),
  ADD KEY `email` (`email`),
  ADD KEY `listName` (`listName`);

--
-- Indexes for table `productlist`
--
ALTER TABLE `productlist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `listId` (`listId`),
  ADD KEY `Productname` (`Productname`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`),
  ADD KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `boughtproducts`
--
ALTER TABLE `boughtproducts`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `familylists`
--
ALTER TABLE `familylists`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4023;

--
-- AUTO_INCREMENT for table `lists`
--
ALTER TABLE `lists`
  MODIFY `listId` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=196;

--
-- AUTO_INCREMENT for table `productlist`
--
ALTER TABLE `productlist`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=277;

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
