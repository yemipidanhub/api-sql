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
