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


-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: May 12, 2025 at 10:35 PM
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
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `id` int(11) NOT NULL,
  `formStageAId` int(11) DEFAULT NULL,
  `fileUrl` varchar(255) NOT NULL,
  `fileType` varchar(100) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `media`
--

INSERT INTO `media` (`id`, `formStageAId`, `fileUrl`, `fileType`, `userId`, `createdAt`) VALUES
(1, 0, 'https://res.cloudinary.com/dswg6nzsi/image/upload/v1746999959/user_16/project_documents/ijy4nlhycievlu4nqcip.jpg', 'image/jpeg', 16, '2025-05-11 21:45:59'),
(2, 0, 'https://res.cloudinary.com/dswg6nzsi/image/upload/v1747000034/user_16/project_documents/bca2fmz3xtvxcvcunywr.jpg', 'image/jpeg', 16, '2025-05-11 21:47:15'),
(3, 0, 'https://res.cloudinary.com/dswg6nzsi/image/upload/v1747000272/user_16/project_documents/qxk28f7ijbufvhirzg0i.jpg', 'image/jpeg', 16, '2025-05-11 21:51:12'),
(4, 0, 'https://res.cloudinary.com/dswg6nzsi/image/upload/v1747000338/user_16/project_documents/mempdnm3qpurp0zyvkrq.jpg', 'image/jpeg', 16, '2025-05-11 21:52:18'),
(5, 0, 'https://res.cloudinary.com/dswg6nzsi/image/upload/v1747000382/user_16/project_documents/clzfvqiiutajymlvcomw.jpg', 'image/jpeg', 16, '2025-05-11 21:53:02'),
(6, 0, 'https://res.cloudinary.com/dswg6nzsi/image/upload/v1747000406/user_16/project_documents/ab4naruexvz3y5qidc54.jpg', 'image/jpeg', 16, '2025-05-11 21:53:26'),
(7, 0, 'https://res.cloudinary.com/dswg6nzsi/image/upload/v1747002263/user_16/project_documents/h2pqwrrwtquniue9f7md.jpg', 'image/jpeg', 16, '2025-05-11 22:24:23'),
(8, 0, 'https://res.cloudinary.com/dswg6nzsi/image/upload/v1747002264/user_16/project_documents/y5l7babfe6yquanr9t9e.jpg', 'image/jpeg', 16, '2025-05-11 22:24:24'),
(9, 0, 'https://res.cloudinary.com/dswg6nzsi/image/upload/v1747002265/user_16/project_documents/bmxuw2ubdhwv2xezznrw.jpg', 'image/jpeg', 16, '2025-05-11 22:24:25'),
(10, 0, 'https://res.cloudinary.com/dswg6nzsi/image/upload/v1747002297/user_16/project_documents/hsug6v9yamqk5fhvb8rg.jpg', 'image/jpeg', 16, '2025-05-11 22:24:57'),
(11, 0, 'https://res.cloudinary.com/dswg6nzsi/image/upload/v1747002298/user_16/project_documents/uupeeu6i892d453iup8d.jpg', 'image/jpeg', 16, '2025-05-11 22:24:58'),
(12, 0, 'https://res.cloudinary.com/dswg6nzsi/image/upload/v1747002298/user_16/project_documents/otxnoyzn43gtp03njcsp.jpg', 'image/jpeg', 16, '2025-05-11 22:24:59'),
(13, 0, 'https://res.cloudinary.com/dswg6nzsi/image/upload/v1747002353/user_16/project_documents/hcayouncadtvjatdscih.jpg', 'image/jpeg', 16, '2025-05-11 22:25:53'),
(14, 0, 'https://res.cloudinary.com/dswg6nzsi/image/upload/v1747002354/user_16/project_documents/wbbl9doxyavagf0weqsm.jpg', 'image/jpeg', 16, '2025-05-11 22:25:54'),
(15, 0, 'https://res.cloudinary.com/dswg6nzsi/image/upload/v1747002355/user_16/project_documents/o4bz7ffdud3si3g68pqx.jpg', 'image/jpeg', 16, '2025-05-11 22:25:55'),
(16, 0, 'https://res.cloudinary.com/dswg6nzsi/image/upload/v1747002477/user_16/project_documents/eojlsipkp0eocphzjkke.jpg', 'image/jpeg', 16, '2025-05-11 22:27:57'),
(17, 0, 'https://res.cloudinary.com/dswg6nzsi/image/upload/v1747002478/user_16/project_documents/yyu1qiyso2b1stii7eek.jpg', 'image/jpeg', 16, '2025-05-11 22:27:58'),
(18, 0, 'https://res.cloudinary.com/dswg6nzsi/image/upload/v1747002479/user_16/project_documents/pbqyw1orawku5syxp4ee.jpg', 'image/jpeg', 16, '2025-05-11 22:27:59'),
(19, 0, 'https://res.cloudinary.com/dswg6nzsi/image/upload/v1747002628/user_16/project_documents/gkl1xsltccsicyne6ef0.jpg', 'image/jpeg', 16, '2025-05-11 22:30:28'),
(20, 0, 'https://res.cloudinary.com/dswg6nzsi/image/upload/v1747002629/user_16/project_documents/eqozq4jw6juwl5lqubvo.jpg', 'image/jpeg', 16, '2025-05-11 22:30:29'),
(21, 0, 'https://res.cloudinary.com/dswg6nzsi/image/upload/v1747002630/user_16/project_documents/hdkvikazedkwdkcqcsqw.jpg', 'image/jpeg', 16, '2025-05-11 22:30:30'),
(22, 0, 'https://res.cloudinary.com/dswg6nzsi/image/upload/v1747002685/user_16/project_documents/eyvo45sro1c4dnutyty6.jpg', 'image/jpeg', 16, '2025-05-11 22:31:25'),
(23, 0, 'https://res.cloudinary.com/dswg6nzsi/image/upload/v1747002686/user_16/project_documents/a4soe1eio9b8pexynuno.jpg', 'image/jpeg', 16, '2025-05-11 22:31:26'),
(24, 0, 'https://res.cloudinary.com/dswg6nzsi/image/upload/v1747002687/user_16/project_documents/qmibjams8lysl6r1p0oo.jpg', 'image/jpeg', 16, '2025-05-11 22:31:27'),
(25, 0, 'https://res.cloudinary.com/dswg6nzsi/image/upload/v1747036106/user_16/project_documents/lhdhkn5huhkhmr5afre0.jpg', 'image/jpeg', 16, '2025-05-12 07:48:26'),
(26, 0, 'https://res.cloudinary.com/dswg6nzsi/image/upload/v1747036107/user_16/project_documents/l8dai8h8wwiu86hvnlqj.jpg', 'image/jpeg', 16, '2025-05-12 07:48:27'),
(27, 0, 'https://res.cloudinary.com/dswg6nzsi/image/upload/v1747036108/user_16/project_documents/vbe61yjwkdde50cy94ag.jpg', 'image/jpeg', 16, '2025-05-12 07:48:28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


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
-- Table structure for table `form_stage_a`
--

CREATE TABLE `form_stage_a` (
  `id` varchar(36) NOT NULL DEFAULT uuid(),
  `projectId` varchar(255) NOT NULL,
  `projectType` varchar(255) NOT NULL,
  `agencyName` varchar(255) DEFAULT NULL,
  `clientName` varchar(255) NOT NULL,
  `clientPhone` varchar(255) NOT NULL,
  `clientEmail` varchar(255) DEFAULT NULL,
  `state` varchar(255) NOT NULL,
  `lga` varchar(255) NOT NULL,
  `town` varchar(255) NOT NULL,
  `streetAddress` varchar(255) NOT NULL,
  `latitude` varchar(255) DEFAULT NULL,
  `longitude` varchar(255) DEFAULT NULL,
  `consultantName` varchar(255) DEFAULT NULL,
  `consultantPhone` varchar(255) DEFAULT NULL,
  `consultantEmail` varchar(255) DEFAULT NULL,
  `consultantLicense` varchar(255) DEFAULT NULL,
  `consultantAddress` varchar(255) DEFAULT NULL,
  `estimatedOverburden` varchar(255) DEFAULT NULL,
  `estimatedDepth` varchar(255) DEFAULT NULL,
  `estimatedFractureDepth` varchar(255) DEFAULT NULL,
  `estimatedWeatheredZone` varchar(255) DEFAULT NULL,
  `curveType` varchar(255) DEFAULT NULL,
  `accessibility` tinyint(1) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `status` enum('draft','completed') DEFAULT 'draft',
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `form_stage_a`
--

INSERT INTO `form_stage_a` (`id`, `projectId`, `projectType`, `agencyName`, `clientName`, `clientPhone`, `clientEmail`, `state`, `lga`, `town`, `streetAddress`, `latitude`, `longitude`, `consultantName`, `consultantPhone`, `consultantEmail`, `consultantLicense`, `consultantAddress`, `estimatedOverburden`, `estimatedDepth`, `estimatedFractureDepth`, `estimatedWeatheredZone`, `curveType`, `accessibility`, `userId`, `status`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('0acf82e3-2dc1-11f0-918d-7c0507d375d1', 'NGW-9E806AB4', 'agency', 'Peterpaul Akintoye', 'Peterpaul Akintoye', '09063454691', 'appeimisic@gmail.com', 'Bauchi', 'Dass', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.372848', '3.937826', 'jsbdvuid', '09063454691', 'a@mail.com', '234423', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '2', '2', '8', '4', '765', 0, 16, 'draft', '2025-05-10 18:05:58', '2025-05-10 18:05:58', NULL),
('0d4ab736-2eb2-11f0-8430-7c0507d375d1', 'NGW-44754BDD', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'appeimisic@gmail.com', 'Oyo', 'Ibadan North-East', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.375573', '3.962717', 'me', '09063454691', 'a@mail.com', '234423', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '86', '2', '3', '4', '454', 0, 16, 'draft', '2025-05-11 22:51:11', '2025-05-11 22:51:11', NULL),
('0e00a866-2dc1-11f0-918d-7c0507d375d1', 'NGW-5FFFD7B8', 'agency', 'Peterpaul Akintoye', 'Peterpaul Akintoye', '09063454691', 'appeimisic@gmail.com', 'Bauchi', 'Dass', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.372848', '3.937826', 'jsbdvuid', '09063454691', 'a@mail.com', '234423', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '2', '2', '8', '4', '765', 0, 16, 'draft', '2025-05-10 18:06:03', '2025-05-10 18:06:03', NULL),
('0f208238-2ead-11f0-8430-7c0507d375d1', 'NGW-91F14984', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'appeimisic@gmail.com', 'Oyo', 'Ibadan North-East', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.375573', '3.962717', 'me', '09063454691', 'a@mail.com', '234423', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '86', '2', '3', '4', '454', 0, 16, 'draft', '2025-05-11 22:15:26', '2025-05-11 22:15:26', NULL),
('0f539a73-2dc1-11f0-918d-7c0507d375d1', 'NGW-8B330091', 'agency', 'Peterpaul Akintoye', 'Peterpaul Akintoye', '09063454691', 'appeimisic@gmail.com', 'Bauchi', 'Dass', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.372848', '3.937826', 'jsbdvuid', '09063454691', 'a@mail.com', '234423', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '2', '2', '8', '4', '765', 0, 16, 'draft', '2025-05-10 18:06:05', '2025-05-10 18:06:05', NULL),
('14f2eb1c-2eb0-11f0-8430-7c0507d375d1', 'NGW-112E72F5', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'appeimisic@gmail.com', 'Oyo', 'Ibadan North-East', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.375573', '3.962717', 'me', '09063454691', 'a@mail.com', '234423', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '86', '2', '3', '4', '454', 0, 16, 'draft', '2025-05-11 22:37:04', '2025-05-11 22:37:04', NULL),
('1576b8b4-2dc1-11f0-918d-7c0507d375d1', 'NGW-01B40EB1', 'agency', 'Peterpaul Akintoye', 'Peterpaul Akintoye', '09063454691', 'appeimisic@gmail.com', 'Bauchi', 'Dass', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.372848', '3.937826', 'jsbdvuid', '09063454691', 'a@mail.com', '234423', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '2', '2', '8', '4', '765', 0, 16, 'draft', '2025-05-10 18:06:16', '2025-05-10 18:06:16', NULL),
('1cfdcab5-2dd5-11f0-918d-7c0507d375d1', 'NGW-1ABEDA31', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'akintoyepeterpemmanuel@gmail.com', 'Oyo', 'Atisbo', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.367567', '3.957996', 'jsbdvuid', '09063454691', 'a@mail.com', '12345', 'hkhjk', '5', '7', '3', '9', '798', 0, 16, 'draft', '2025-05-10 20:29:45', '2025-05-10 20:29:45', NULL),
('1e715e1f-2dd5-11f0-918d-7c0507d375d1', 'NGW-BEBEE813', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'akintoyepeterpemmanuel@gmail.com', 'Oyo', 'Atisbo', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.367567', '3.957996', 'jsbdvuid', '09063454691', 'a@mail.com', '12345', 'hkhjk', '5', '7', '3', '9', '798', 0, 16, 'draft', '2025-05-10 20:29:47', '2025-05-10 20:29:47', NULL),
('256fa664-2dd2-11f0-918d-7c0507d375d1', 'NGW-CAF80892', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'akintoyepeterpemmanuel@gmail.com', 'Oyo', 'Atisbo', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.367567', '3.957996', 'jsbdvuid', '09063454691', 'a@mail.com', '12345', 'hkhjk', '5', '7', '3', '9', '798', 0, 16, 'draft', '2025-05-10 20:08:30', '2025-05-10 20:08:30', NULL),
('261d1229-2d9e-11f0-8685-7c0507d375d1', 'NGW-4A6792F2', 'agency', 'Peterpaul Akintoye', 'Peterpaul Akintoye', '09063454691', 'akintoyepeterpemmanuel@gmail.com', 'Oyo', 'Afijio', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.382730', '3.967609', 'me', '09063454691', 'appeimisic@mail.com', '234423', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '86', '7', '3', '4', '667', 0, 16, 'draft', '2025-05-10 13:56:11', '2025-05-10 13:56:11', NULL),
('27e58892-2d9e-11f0-8685-7c0507d375d1', 'NGW-4F5933E0', 'agency', 'Peterpaul Akintoye', 'Peterpaul Akintoye', '09063454691', 'akintoyepeterpemmanuel@gmail.com', 'Oyo', 'Afijio', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.382730', '3.967609', 'me', '09063454691', 'appeimisic@mail.com', '234423', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '86', '7', '3', '4', '667', 0, 16, 'draft', '2025-05-10 13:56:14', '2025-05-10 13:56:14', NULL),
('282ba222-2dd2-11f0-918d-7c0507d375d1', 'NGW-395193B1', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'akintoyepeterpemmanuel@gmail.com', 'Oyo', 'Atisbo', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.367567', '3.957996', 'jsbdvuid', '09063454691', 'a@mail.com', '12345', 'hkhjk', '5', '7', '3', '9', '798', 0, 16, 'draft', '2025-05-10 20:08:35', '2025-05-10 20:08:35', NULL),
('2f8d71a9-2eb7-11f0-8430-7c0507d375d1', 'NGW-EECA9F8D', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'appeimisic@gmail.com', 'Oyo', 'Akinyele', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.378300', '3.945808', 'jsbdvuid', '09063454691', 'a@mail.com', '234429', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '86', '7', '3', '4', '765', 0, 16, 'draft', '2025-05-11 23:27:56', '2025-05-11 23:27:56', NULL),
('2fc3e1c3-2eb1-11f0-8430-7c0507d375d1', 'NGW-F4E08CB9', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'appeimisic@gmail.com', 'Oyo', 'Ibadan North-East', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.375573', '3.962717', 'me', '09063454691', 'a@mail.com', '234423', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '86', '2', '3', '4', '454', 0, 16, 'draft', '2025-05-11 22:44:59', '2025-05-11 22:44:59', NULL),
('343eeadb-2eb2-11f0-8430-7c0507d375d1', 'NGW-95DDCA89', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'appeimisic@gmail.com', 'Oyo', 'Ibadan North-East', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.375573', '3.962717', 'me', '09063454691', 'a@mail.com', '234423', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '86', '2', '3', '4', '454', 0, 16, 'draft', '2025-05-11 22:52:16', '2025-05-11 22:52:16', NULL),
('36442b3c-2dd0-11f0-918d-7c0507d375d1', 'NGW-46B7CDB3', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'akintoyepeterpemmanuel@gmail.com', 'Oyo', 'Atisbo', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.367567', '3.957996', 'jsbdvuid', '09063454691', 'a@mail.com', '12345', 'hkhjk', '5', '7', '3', '9', '798', 0, 16, 'draft', '2025-05-10 19:54:40', '2025-05-10 19:54:40', NULL),
('38fe3f40-2d9f-11f0-8685-7c0507d375d1', 'NGW-DECE01B8', 'agency', 'Peterpaul Akintoye', 'Peterpaul Akintoye', '09063454691', 'james@gmail.com', 'Oyo', 'Akinyele', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.369100', '3.956623', 'me', '09063454691', 'appeimisic@mail.com', '234429', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '86', '2', '3', '6', '765', 0, 16, 'draft', '2025-05-10 14:03:52', '2025-05-10 14:03:52', NULL),
('3b6fe9ab-2dd4-11f0-918d-7c0507d375d1', 'NGW-AE6BD11F', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'akintoyepeterpemmanuel@gmail.com', 'Oyo', 'Atisbo', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.367567', '3.957996', 'jsbdvuid', '09063454691', 'a@mail.com', '12345', 'hkhjk', '5', '7', '3', '9', '798', 0, 16, 'draft', '2025-05-10 20:23:26', '2025-05-10 20:23:26', NULL),
('3d9afe4f-2eb1-11f0-8430-7c0507d375d1', 'NGW-C294CC57', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'appeimisic@gmail.com', 'Oyo', 'Ibadan North-East', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.375573', '3.962717', 'me', '09063454691', 'a@mail.com', '234423', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '86', '2', '3', '4', '454', 0, 16, 'draft', '2025-05-11 22:45:22', '2025-05-11 22:45:22', NULL),
('3df97d0b-2dda-11f0-918d-7c0507d375d1', 'NGW-3B3DE880', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'akintoyepeterpemmanuel@gmail.com', 'Oyo', 'Atisbo', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.367567', '3.957996', 'jsbdvuid', '09063454691', 'a@mail.com', '12345', 'hkhjk', '5', '7', '3', '9', '798', 0, 16, 'draft', '2025-05-10 21:06:27', '2025-05-10 21:06:27', NULL),
('409bfa6b-2ead-11f0-8430-7c0507d375d1', 'NGW-32B4724A', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'appeimisic@gmail.com', 'Oyo', 'Ibadan North-East', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.375573', '3.962717', 'me', '09063454691', 'a@mail.com', '234423', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '86', '2', '3', '4', '454', 0, 16, 'draft', '2025-05-11 22:16:49', '2025-05-11 22:16:49', NULL),
('411e3911-2da1-11f0-8685-7c0507d375d1', 'NGW-6FDE0204', 'agency', 'Peterpaul Akintoye', 'Peterpaul Akintoye', '09063454691', 'james@gmail.com', 'Oyo', 'Akinyele', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.369100', '3.956623', 'me', '09063454691', 'appeimisic@mail.com', '234429', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '86', '2', '3', '6', '765', 0, 16, 'draft', '2025-05-10 14:18:25', '2025-05-10 14:18:25', NULL),
('42a0950f-2da1-11f0-8685-7c0507d375d1', 'NGW-D7A06B77', 'agency', 'Peterpaul Akintoye', 'Peterpaul Akintoye', '09063454691', 'james@gmail.com', 'Oyo', 'Akinyele', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.369100', '3.956623', 'me', '09063454691', 'appeimisic@mail.com', '234429', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '86', '2', '3', '6', '765', 0, 16, 'draft', '2025-05-10 14:18:27', '2025-05-10 14:18:27', NULL),
('440a9088-2da1-11f0-8685-7c0507d375d1', 'NGW-5BD1D1EB', 'agency', 'Peterpaul Akintoye', 'Peterpaul Akintoye', '09063454691', 'james@gmail.com', 'Oyo', 'Akinyele', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.369100', '3.956623', 'me', '09063454691', 'appeimisic@mail.com', '234429', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '86', '2', '3', '6', '765', 0, 16, 'draft', '2025-05-10 14:18:30', '2025-05-10 14:18:30', NULL),
('48c97fa0-2dd0-11f0-918d-7c0507d375d1', 'NGW-E033D216', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'akintoyepeterpemmanuel@gmail.com', 'Oyo', 'Atisbo', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.367567', '3.957996', 'jsbdvuid', '09063454691', 'a@mail.com', '12345', 'hkhjk', '5', '7', '3', '9', '798', 0, 16, 'draft', '2025-05-10 19:55:11', '2025-05-10 19:55:11', NULL),
('498d883b-2dd2-11f0-918d-7c0507d375d1', 'NGW-24AB4D74', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'akintoyepeterpemmanuel@gmail.com', 'Oyo', 'Atisbo', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.367567', '3.957996', 'jsbdvuid', '09063454691', 'a@mail.com', '12345', 'hkhjk', '5', '7', '3', '9', '798', 0, 16, 'draft', '2025-05-10 20:09:31', '2025-05-10 20:09:31', NULL),
('4e9b54ff-2eb2-11f0-8430-7c0507d375d1', 'NGW-12A3B929', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'appeimisic@gmail.com', 'Oyo', 'Ibadan North-East', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.375573', '3.962717', 'me', '09063454691', 'a@mail.com', '234423', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '86', '2', '3', '4', '454', 0, 16, 'draft', '2025-05-11 22:53:00', '2025-05-11 22:53:00', NULL),
('52763bdf-2eb1-11f0-8430-7c0507d375d1', 'NGW-AAD78E7A', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'appeimisic@gmail.com', 'Oyo', 'Ibadan North-East', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.375573', '3.962717', 'me', '09063454691', 'a@mail.com', '234423', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '86', '2', '3', '4', '454', 0, 16, 'draft', '2025-05-11 22:45:57', '2025-05-11 22:45:57', NULL),
('5c33e9c3-2eae-11f0-8430-7c0507d375d1', 'NGW-4E05AD47', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'appeimisic@gmail.com', 'Oyo', 'Ibadan North-East', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.375573', '3.962717', 'me', '09063454691', 'a@mail.com', '234423', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '86', '2', '3', '4', '454', 0, 16, 'draft', '2025-05-11 22:24:45', '2025-05-11 22:24:45', NULL),
('5c585cd2-2eb2-11f0-8430-7c0507d375d1', 'NGW-F8253067', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'appeimisic@gmail.com', 'Oyo', 'Ibadan North-East', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.375573', '3.962717', 'me', '09063454691', 'a@mail.com', '234423', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '86', '2', '3', '4', '454', 0, 16, 'draft', '2025-05-11 22:53:23', '2025-05-11 22:53:23', NULL),
('5fce3aa6-2dd6-11f0-918d-7c0507d375d1', 'NGW-1325CA22', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'akintoyepeterpemmanuel@gmail.com', 'Oyo', 'Atisbo', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.367567', '3.957996', 'jsbdvuid', '09063454691', 'a@mail.com', '12345', 'hkhjk', '5', '7', '3', '9', '798', 0, 16, 'draft', '2025-05-10 20:38:46', '2025-05-10 20:38:46', NULL),
('6113303d-2dd6-11f0-918d-7c0507d375d1', 'NGW-22902125', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'akintoyepeterpemmanuel@gmail.com', 'Oyo', 'Atisbo', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.367567', '3.957996', 'jsbdvuid', '09063454691', 'a@mail.com', '12345', 'hkhjk', '5', '7', '3', '9', '798', 0, 16, 'draft', '2025-05-10 20:38:48', '2025-05-10 20:38:48', NULL),
('617f7058-2dd6-11f0-918d-7c0507d375d1', 'NGW-73FCF862', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'akintoyepeterpemmanuel@gmail.com', 'Oyo', 'Atisbo', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.367567', '3.957996', 'jsbdvuid', '09063454691', 'a@mail.com', '12345', 'hkhjk', '5', '7', '3', '9', '798', 0, 16, 'draft', '2025-05-10 20:38:49', '2025-05-10 20:38:49', NULL),
('624b8b4e-2dd6-11f0-918d-7c0507d375d1', 'NGW-1AF69AD3', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'akintoyepeterpemmanuel@gmail.com', 'Oyo', 'Atisbo', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.367567', '3.957996', 'jsbdvuid', '09063454691', 'a@mail.com', '12345', 'hkhjk', '5', '7', '3', '9', '798', 0, 16, 'draft', '2025-05-10 20:38:50', '2025-05-10 20:38:50', NULL),
('63b81909-2dd6-11f0-918d-7c0507d375d1', 'NGW-6E84621C', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'akintoyepeterpemmanuel@gmail.com', 'Oyo', 'Atisbo', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.367567', '3.957996', 'jsbdvuid', '09063454691', 'a@mail.com', '12345', 'hkhjk', '5', '7', '3', '9', '798', 0, 16, 'draft', '2025-05-10 20:38:53', '2025-05-10 20:38:53', NULL),
('6d732300-2da1-11f0-8685-7c0507d375d1', 'NGW-38EAA5C6', 'agency', 'Peterpaul Akintoye', 'Peterpaul Akintoye', '09063454691', 'james@gmail.com', 'Oyo', 'Akinyele', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.369100', '3.956623', 'me', '09063454691', 'appeimisic@mail.com', '234429', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '86', '2', '3', '6', '765', 0, 16, 'draft', '2025-05-10 14:19:39', '2025-05-10 14:19:39', NULL),
('6fb733f6-2dd2-11f0-918d-7c0507d375d1', 'NGW-DC73D6F1', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'akintoyepeterpemmanuel@gmail.com', 'Oyo', 'Atisbo', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.367567', '3.957996', 'jsbdvuid', '09063454691', 'a@mail.com', '12345', 'hkhjk', '5', '7', '3', '9', '798', 0, 16, 'draft', '2025-05-10 20:10:35', '2025-05-10 20:10:35', NULL),
('70fbf0ae-2dda-11f0-918d-7c0507d375d1', 'NGW-790E7159', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'akintoyepeterpemmanuel@gmail.com', 'Oyo', 'Atisbo', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.367567', '3.957996', 'jsbdvuid', '09063454691', 'a@mail.com', '12345', 'hkhjk', '5', '7', '3', '9', '798', 0, 16, 'draft', '2025-05-10 21:07:53', '2025-05-10 21:07:53', NULL),
('738a0ac5-2d9d-11f0-8685-7c0507d375d1', 'NGW-6EA01302', 'agency', 'jjj', 'Peterpaul Akintoye', '09063454691', 'a@mail.com', 'Oyo', 'Atiba', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.389885', '3.984604', 'me', '09063454691', 'a@mail.com', '234423', 'njgcvjfdc', '545', '7', '68', '6', '99765', 0, 16, 'draft', '2025-05-10 13:51:11', '2025-05-10 13:51:11', NULL),
('76cd01c7-2ead-11f0-8430-7c0507d375d1', 'NGW-58B855BB', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'appeimisic@gmail.com', 'Oyo', 'Ibadan North-East', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.375573', '3.962717', 'me', '09063454691', 'a@mail.com', '234423', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '86', '2', '3', '4', '454', 0, 16, 'draft', '2025-05-11 22:18:20', '2025-05-11 22:18:20', NULL),
('7b7dc338-2f05-11f0-8430-7c0507d375d1', 'NGW-F70A072D', 'state', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'akintoyepeterpemmanuel@gmail.com', 'Oyo', 'Akinyele', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.393456', '3.950529', 'jsbdvuid', '09063454691', 'a@mail.com', '234429', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '86', '7', '8', '9', '454', 0, 16, 'draft', '2025-05-12 08:48:24', '2025-05-12 08:48:24', NULL),
('7d82b7e0-2eb0-11f0-8430-7c0507d375d1', 'NGW-D5C2FFF4', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'appeimisic@gmail.com', 'Oyo', 'Ibadan North-East', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.375573', '3.962717', 'me', '09063454691', 'a@mail.com', '234423', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '86', '2', '3', '4', '454', 0, 16, 'draft', '2025-05-11 22:40:00', '2025-05-11 22:40:00', NULL),
('7fa90190-2eb1-11f0-8430-7c0507d375d1', 'NGW-6BE2F54D', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'appeimisic@gmail.com', 'Oyo', 'Ibadan North-East', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.375573', '3.962717', 'me', '09063454691', 'a@mail.com', '234423', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '86', '2', '3', '4', '454', 0, 16, 'draft', '2025-05-11 22:47:13', '2025-05-11 22:47:13', NULL),
('8159fb78-2eaf-11f0-8430-7c0507d375d1', 'NGW-17D46FD6', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'appeimisic@gmail.com', 'Oyo', 'Ibadan North-East', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.375573', '3.962717', 'me', '09063454691', 'a@mail.com', '234423', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '86', '2', '3', '4', '454', 0, 16, 'draft', '2025-05-11 22:32:57', '2025-05-11 22:32:57', NULL),
('81b662e6-2dd1-11f0-918d-7c0507d375d1', 'NGW-65D48431', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'akintoyepeterpemmanuel@gmail.com', 'Oyo', 'Atisbo', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.367567', '3.957996', 'jsbdvuid', '09063454691', 'a@mail.com', '12345', 'hkhjk', '5', '7', '3', '9', '798', 0, 16, 'draft', '2025-05-10 20:03:56', '2025-05-10 20:03:56', NULL),
('85689f5c-2dd4-11f0-918d-7c0507d375d1', 'NGW-49A022B8', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'akintoyepeterpemmanuel@gmail.com', 'Oyo', 'Atisbo', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.367567', '3.957996', 'jsbdvuid', '09063454691', 'a@mail.com', '12345', 'hkhjk', '5', '7', '3', '9', '798', 0, 16, 'draft', '2025-05-10 20:25:30', '2025-05-10 20:25:30', NULL),
('8664692d-2dd4-11f0-918d-7c0507d375d1', 'NGW-371EBEDD', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'akintoyepeterpemmanuel@gmail.com', 'Oyo', 'Atisbo', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.367567', '3.957996', 'jsbdvuid', '09063454691', 'a@mail.com', '12345', 'hkhjk', '5', '7', '3', '9', '798', 0, 16, 'draft', '2025-05-10 20:25:32', '2025-05-10 20:25:32', NULL),
('897a8142-2eb7-11f0-8430-7c0507d375d1', 'NGW-CAE81ABF', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'akintoyepeterpemmanuel@gmail.com', 'Oyo', 'Afijio', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.390907', '3.939629', 'jsbdvuid', '09063454691', 'geo@gmail.com', '12345', 'jhk khb k', '2', '7', '68', '6', '765', 0, 16, 'draft', '2025-05-11 23:30:26', '2025-05-11 23:30:26', NULL),
('956ff0a9-2dd1-11f0-918d-7c0507d375d1', 'NGW-3E29B5FF', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'akintoyepeterpemmanuel@gmail.com', 'Oyo', 'Atisbo', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.367567', '3.957996', 'jsbdvuid', '09063454691', 'a@mail.com', '12345', 'hkhjk', '5', '7', '3', '9', '798', 0, 16, 'draft', '2025-05-10 20:04:29', '2025-05-10 20:04:29', NULL),
('95d99c9b-2eb5-11f0-8430-7c0507d375d1', 'NGW-C6564696', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'appeimisic@gmail.com', 'Oyo', 'Akinyele', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.384944', '3.961601', 'me', '09063454691', 'appeimisic@mail.com', '234429', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '86', '2', '3', '9', '222', 0, 16, 'draft', '2025-05-11 23:16:28', '2025-05-11 23:16:28', NULL),
('9e87602e-2dc7-11f0-918d-7c0507d375d1', 'NGW-F24D1F07', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'akintoyepeterpemmanuel@gmail.com', 'Abia', 'Aba South', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.379152', '3.949242', 'me', '09063454691', 'appeimisic@mail.com', '234429', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '545', '7', '68', '6', '77867', 0, 16, 'draft', '2025-05-10 18:53:09', '2025-05-10 18:53:09', NULL),
('a8a5d652-2dd9-11f0-918d-7c0507d375d1', 'NGW-311BFE6E', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'akintoyepeterpemmanuel@gmail.com', 'Oyo', 'Atisbo', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.367567', '3.957996', 'jsbdvuid', '09063454691', 'a@mail.com', '12345', 'hkhjk', '5', '7', '3', '9', '798', 0, 16, 'draft', '2025-05-10 21:02:17', '2025-05-10 21:02:17', NULL),
('abbdcdca-2eb7-11f0-8430-7c0507d375d1', 'NGW-868A1434', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'akintoyepeterpemmanuel@gmail.com', 'Oyo', 'Afijio', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.390907', '3.939629', 'jsbdvuid', '09063454691', 'geo@gmail.com', '12345', 'jhk khb k', '2', '7', '68', '6', '765', 0, 16, 'draft', '2025-05-11 23:31:24', '2025-05-11 23:31:24', NULL),
('aff6ea06-2eb6-11f0-8430-7c0507d375d1', 'NGW-212B833A', 'state', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'a@mail.com', 'Oyo', 'Afijio', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.386307', '3.953018', 'me', '09063454691', 'appeimisic@mail.com', '234423', 'hjhkhkh', '86', '2', '8', '9', '8687', 0, 16, 'draft', '2025-05-11 23:24:21', '2025-05-11 23:24:21', NULL),
('b8a0bf9a-2dd0-11f0-918d-7c0507d375d1', 'NGW-EA9545B1', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'akintoyepeterpemmanuel@gmail.com', 'Oyo', 'Atisbo', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.367567', '3.957996', 'jsbdvuid', '09063454691', 'a@mail.com', '12345', 'hkhjk', '5', '7', '3', '9', '798', 0, 16, 'draft', '2025-05-10 19:58:18', '2025-05-10 19:58:18', NULL),
('ba8caa97-2dd0-11f0-918d-7c0507d375d1', 'NGW-26679B49', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'akintoyepeterpemmanuel@gmail.com', 'Oyo', 'Atisbo', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.367567', '3.957996', 'jsbdvuid', '09063454691', 'a@mail.com', '12345', 'hkhjk', '5', '7', '3', '9', '798', 0, 16, 'draft', '2025-05-10 19:58:22', '2025-05-10 19:58:22', NULL),
('c40ab0f9-2eb6-11f0-8430-7c0507d375d1', 'NGW-D4F0AEAF', 'state', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'a@mail.com', 'Oyo', 'Afijio', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.386307', '3.953018', 'me', '09063454691', 'appeimisic@mail.com', '234423', 'hjhkhkh', '86', '2', '8', '9', '8687', 0, 16, 'draft', '2025-05-11 23:24:55', '2025-05-11 23:24:55', NULL),
('c5c363c4-2dd7-11f0-918d-7c0507d375d1', 'NGW-CEF204B5', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'akintoyepeterpemmanuel@gmail.com', 'Oyo', 'Atisbo', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.367567', '3.957996', 'jsbdvuid', '09063454691', 'a@mail.com', '12345', 'hkhjk', '5', '7', '3', '9', '798', 0, 16, 'draft', '2025-05-10 20:48:47', '2025-05-10 20:48:47', NULL),
('cfa26eef-2dcf-11f0-918d-7c0507d375d1', 'NGW-2E7B3764', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'akintoyepeterpemmanuel@gmail.com', 'Oyo', 'Atisbo', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.367567', '3.957996', 'jsbdvuid', '09063454691', 'a@mail.com', '12345', 'hkhjk', '5', '7', '3', '9', '798', 0, 16, 'draft', '2025-05-10 19:51:47', '2025-05-10 19:51:47', NULL),
('d8680cac-2da0-11f0-8685-7c0507d375d1', 'NGW-9FC955C6', 'agency', 'Peterpaul Akintoye', 'Peterpaul Akintoye', '09063454691', 'james@gmail.com', 'Oyo', 'Akinyele', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.369100', '3.956623', 'me', '09063454691', 'appeimisic@mail.com', '234429', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '86', '2', '3', '6', '765', 0, 16, 'draft', '2025-05-10 14:15:29', '2025-05-10 14:15:29', NULL),
('d89cc2d5-2eb5-11f0-8430-7c0507d375d1', 'NGW-DF74B8C1', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'appeimisic@gmail.com', 'Oyo', 'Akinyele', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.384944', '3.961601', 'me', '09063454691', 'appeimisic@mail.com', '234429', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '86', '2', '3', '9', '222', 0, 16, 'draft', '2025-05-11 23:18:20', '2025-05-11 23:18:20', NULL),
('da774a82-2dd0-11f0-918d-7c0507d375d1', 'NGW-90E84117', 'federal', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'akintoyepeterpemmanuel@gmail.com', 'Oyo', 'Atisbo', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.367567', '3.957996', 'jsbdvuid', '09063454691', 'a@mail.com', '12345', 'hkhjk', '5', '7', '3', '9', '798', 0, 16, 'draft', '2025-05-10 19:59:15', '2025-05-10 19:59:15', NULL),
('e4c23c6a-2da0-11f0-8685-7c0507d375d1', 'NGW-6D7A67B5', 'agency', 'Peterpaul Akintoye', 'Peterpaul Akintoye', '09063454691', 'james@gmail.com', 'Oyo', 'Akinyele', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.369100', '3.956623', 'me', '09063454691', 'appeimisic@mail.com', '234429', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '86', '2', '3', '6', '765', 0, 16, 'draft', '2025-05-10 14:15:50', '2025-05-10 14:15:50', NULL),
('e584ceec-2eb6-11f0-8430-7c0507d375d1', 'NGW-5C604463', 'state', 'Not Agency', 'Peterpaul Akintoye', '09063454691', 'a@mail.com', 'Oyo', 'Afijio', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.386307', '3.953018', 'me', '09063454691', 'appeimisic@mail.com', '234423', 'hjhkhkh', '86', '2', '8', '9', '8687', 0, 16, 'draft', '2025-05-11 23:25:51', '2025-05-11 23:25:51', NULL),
('f05a90f8-2dbe-11f0-918d-7c0507d375d1', 'NGW-96C1033B', 'agency', 'Peterpaul Akintoye', 'Peterpaul Akintoye', '09063454691', 'appeimisic@gmail.com', 'Bauchi', 'Dass', 'Ibadan', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '7.372848', '3.937826', 'jsbdvuid', '09063454691', 'a@mail.com', '234423', 'No 2 Shalom Close Alagogo Ajibode Ibadan', '2', '2', '8', '4', '765', 0, 16, 'draft', '2025-05-10 17:50:54', '2025-05-10 17:50:54', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `form_stage_a`
--
ALTER TABLE `form_stage_a`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `projectId` (`projectId`),
  ADD KEY `userId` (`userId`),
  ADD KEY `status` (`status`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
