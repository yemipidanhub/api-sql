-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: May 12, 2025 at 10:34 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ngwatera_ngw-water`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNumber` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','hydrogeologist','engineer','driller','contractor','drilling_company','user') NOT NULL,
  `specialization` varchar(255) DEFAULT NULL,
  `licenseType` varchar(255) DEFAULT NULL,
  `licenseBody` varchar(255) NOT NULL,
  `licenseNumber` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `userLGA` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `isVerified` tinyint(1) DEFAULT 0,
  `passwordResetToken` varchar(255) DEFAULT NULL,
  `passwordResetExpires` datetime DEFAULT NULL,
  `passwordChangedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phoneNumber`, `password`, `role`, `specialization`, `licenseType`, `licenseBody`, `licenseNumber`, `state`, `userLGA`, `address`, `isVerified`, `passwordResetToken`, `passwordResetExpires`, `passwordChangedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'Yemi Test', 'yemipidan@gmail.com', '070000000', '$2b$12$wn3eq.be5iK3q/jJieBkcePAZrhSSuu3/1uUDWZzjVErC0fb1M4Gq', 'hydrogeologist', 'Hydrogeologist', 'null', 'NMGS/COMEG', '12345', 'Oyo', 'Akinyele', 'Adom', 0, NULL, NULL, '2025-05-03 10:48:54', '2025-05-03 10:48:55', '2025-05-03 10:48:55'),
(15, 'Atanda Eunice', 'atanda@gmail.com', '1234567890', '$2b$12$tIkfBEaCzZV.97dLMp5YPuq7qsnpYSWJgXNXDM1UC1VjWzWKVo9/G', 'hydrogeologist', 'Hydrogeologist', 'null', 'NMGS/COMEG', '34567', 'Oyo', 'Ibadan North', 'here right', 0, NULL, NULL, '2025-05-03 11:29:23', '2025-05-03 11:29:24', '2025-05-03 11:29:24'),
(16, 'Peterpaul', 'appeimisic@gmail.com', '123456789', '$2b$12$DgKbhoZPdk0ujr9h0PHJeucCBGcg6NH7pf8u3j8Vz9lvr2nHfCeE6', 'driller', 'Licensed Driller', 'Federal', 'NIWRMC', '123456', 'Oyo', 'Akinyele', 'ajibode', 0, NULL, NULL, '2025-05-03 11:45:15', '2025-05-03 11:45:15', '2025-05-03 11:45:16'),
(17, 'Inioluwa Eunice Atanda', 'atandainioluwa371@gmail.com', '09161704517', '$2b$12$GXe.pbmlOVVRaYCmsjimJeYtBNmuTQbJ6tyEMR7.Jzt6.Wr/o245K', 'hydrogeologist', 'Hydrogeologist', 'null', 'NMGS/COMEG', '', 'Oyo', 'Ibadan North ', 'D18, Abadina Quarters, Awoliyi street, University of Ibadan', 0, NULL, NULL, '2025-05-03 11:50:15', '2025-05-03 11:50:15', '2025-05-03 11:50:16'),
(18, 'Peace', 'peace@mail.com', '8976687556', '$2b$12$vm7HnOAd3GpgiVf9HVmIKOFB22a/RBifaWGlRr4IhaOwAj33jX5jy', 'driller', 'Licensed Driller', 'Federal', 'null', '54647', 'Oyo', 'Ibadan North', 'here', 0, NULL, NULL, '2025-05-03 13:08:08', '2025-05-03 13:08:08', '2025-05-03 13:08:09'),
(22, 'James Jones', 'james@gmail.com', '0908767654543', '$2b$12$nBgRk75mAmR4Isa0sLxtguEj3z7ynGmHjC6k8988dpZ0dxAT2HHla', 'hydrogeologist', 'Hydrogeologist', 'null', 'NMGS/COMEG', '345432', 'Delta', 'Oshimili North', 'right here sir', 0, NULL, NULL, '2025-05-06 12:19:30', '2025-05-06 12:19:31', '2025-05-06 12:19:32'),
(23, 'Ayanfe ', 'ayanfe@gmail.com', '09067567674', '$2b$12$CkTH7jn7J9bU4pDDC63RqulHbYhnVl9/9gloqKax2hAnGTwjlfdPW', 'hydrogeologist', 'Hydrogeologist', 'null', 'NMGS/COMEG', '345465', 'Kaduna', 'Kaduna North', 'kaduna north', 0, NULL, NULL, '2025-05-06 12:22:33', '2025-05-06 12:22:33', '2025-05-06 12:22:34'),
(24, 'James Jones', 'jamesjohn@mail.com', '08076657665', '$2b$12$Ss2H271n//VmRA.6H0YOyu3O9la0CG5gzgQvOFGbHEVDMHQnww64K', 'hydrogeologist', 'Hydrogeologist', 'null', 'NMGS/COMEG', '89987', 'Delta', 'Bomadi', 'asaba', 0, NULL, NULL, '2025-05-10 20:28:48', '2025-05-10 20:28:48', '2025-05-10 20:28:49'),
(25, 'Dara', 'dara@mail.com', '09063454692', '$2b$12$s1zPMfhk6qnPAAD1vDqpEOu.Nj9zNdXG2WWwBit5UHHftlN/NZXCO', 'hydrogeologist', 'Hydrogeologist', 'null', 'NMGS/COMEG', '43231', 'Oyo', 'Akinyele', 'No 2 Shalom Close Alagogo Ajibode Ibadan', 0, NULL, NULL, '2025-05-12 18:01:28', '2025-05-12 18:01:28', '2025-05-12 18:01:29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phoneNumber` (`phoneNumber`),
  ADD UNIQUE KEY `licenseNumber` (`licenseNumber`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
