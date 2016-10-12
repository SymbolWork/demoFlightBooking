-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 12, 2016 at 04:02 PM
-- Server version: 5.5.50-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `flight_mgmnt`
--

-- --------------------------------------------------------

--
-- Table structure for table `airports`
--

CREATE TABLE IF NOT EXISTS `airports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=132 ;

--
-- Dumping data for table `airports`
--

INSERT INTO `airports` (`id`, `city`, `name`, `code`) VALUES
(1, 'Agartala', 'Singerbhil Airport', 'IXA'),
(2, 'Agatti', 'Island Airport', 'AGX'),
(3, 'Agra', 'Kheria Airport', 'AGR'),
(4, 'Ahmedabad', 'Ahmedabad Airport', 'AMD'),
(5, 'Aizawl', 'Aizawl Airport', 'AJL'),
(6, 'Akola', 'Akola Airport', 'AKD'),
(7, 'Allahabad', 'Bamrauli Airport', 'IXD'),
(8, 'Along', 'Along Airport', 'IXV'),
(9, 'Amritsar', 'Raja Sansi Airport', 'ATQ'),
(10, 'Aurangabad', 'Chikkalthana Airport', 'IXU'),
(11, 'Balurghat', 'Balurghat Airport', 'RGH'),
(12, 'Bagdogra', 'Bagdogra Airport', 'IXB'),
(13, 'Bangalore', 'Hindustan Airport', 'BLR'),
(14, 'Bareli', 'Bareli Airport', 'BEK'),
(15, 'Belgaum', 'Sambre Airport', 'IXG'),
(16, 'Bellary', 'Bellary Airport', 'BEP'),
(17, 'Bhatinda', 'Bhatinda Airport', 'BUP'),
(18, 'Bhavnagar', 'Bhavnagar Airport', 'BHU'),
(19, 'Bhopal', 'Bhopal Airport', 'BHO'),
(20, 'Bhubaneswar', 'Bhubaneswar Airport', 'BBI'),
(21, 'Bhuj', 'Rudra Mata Airport', 'BHJ'),
(22, 'Bikaner', 'Bikaner Airport', 'BKB'),
(23, 'Bilaspur', 'Bilaspur Airport', 'PAB'),
(24, 'Mumbai', 'Chhatrapati Shivaji Airport', 'BOM'),
(25, 'Kolkata', 'Netaji Subhas Chandra Airport', 'CCU'),
(26, 'Nicobar', 'Car Nicobar Airport', 'CBD'),
(27, 'Chandigarh', 'Chandigarh Airport', 'IXC'),
(28, 'Coimbatore', 'Peelamedu Airport', 'CJB'),
(29, 'Cooch', 'Behar Airport', 'COH'),
(30, 'Cuddapah', 'Cuddapah Airport', 'CDP'),
(31, 'Daman', 'Daman Airport', 'NMB'),
(32, 'Daparizo', 'aparizo Airport', 'DAE'),
(33, 'Darjeeling', 'Darjeeling Airport', 'DAI'),
(34, 'Dehra Dun', 'Dehra Dun Airport', 'DED'),
(35, 'Delhi', 'Indira Gandhi International Airport', 'DEL'),
(36, 'Deparizo', 'Deparizo Airport', 'DEP'),
(37, 'Dhanbad', 'Dhanbad Airport', 'DBD'),
(38, 'Dharamsala', 'Gaggal Airport', 'DHM'),
(39, 'Dibrugarh', 'Chabua Airport', 'DIB'),
(40, 'Dimapur', 'Dimapur Airport', 'DMU'),
(41, 'Diu', 'Diu Airport', 'DIU'),
(42, 'Gaya', 'Gaya Airport', 'GAY'),
(43, 'Goa', 'Dabolim Airport', 'GOI'),
(44, 'Gorakhpur', 'Gorakhpur Airport', 'GOP'),
(45, 'Guna', 'Guna Airport', 'GUX'),
(46, 'Guwahati', 'Borjhar Airport', 'GAU'),
(47, 'Gwalior', 'Gwalior Airport', 'GWL'),
(48, 'Hissar', 'Hissar Airport', 'HSS'),
(49, 'Hubli', 'Hubli Airport', 'HBX'),
(50, 'Hyderabad', 'Begumpet Airport', 'HYD'),
(51, 'Imphal', 'Municipal Airport', 'IMF'),
(52, 'Indore', 'Indore Airport', 'IDR'),
(53, 'Jabalpur', 'Jabalpur Airport', 'JLR'),
(54, 'Jagdalpur', 'Jagdalpur Airport', 'JGB'),
(55, 'Jaipur', 'Sanganeer Airport', 'JAI'),
(56, 'Jaisalmer', 'Jaisalmer Airport', 'JSA'),
(57, 'Jammu', 'Satwari Airport', 'IXJ'),
(58, 'Jamnagar', 'Govardhanpur Airport', 'JGA'),
(59, 'Jamshedpur', 'Sonari Airport', 'IXW'),
(60, 'Jeypore', 'Jeypore Airport', 'PYB'),
(61, 'Jodhpur', 'Jodhpur Airport', 'JDH'),
(62, 'Jorhat', 'Rowriah Airport', 'JRH'),
(63, 'Kailashahar', 'Kailashahar Airport', 'IXH'),
(64, 'Kamalpur', 'Kamalpur Airport', 'IXQ)'),
(65, 'Kandla', 'Kandla Airport', 'IXY'),
(66, 'Kanpur', 'Kanpur Airport', 'KNU'),
(67, 'Keshod', 'Keshod Airport', 'IXK'),
(68, 'Khajuraho', 'Khajuraho Airport', 'HJR'),
(69, 'Khowai', 'Khowai Airport', 'IXN'),
(70, 'Kochi', 'Kochi Airport', 'COK'),
(71, 'Kolhapur', 'Kolhapur Airport', 'KLH'),
(72, 'Kota', 'Kota Airport', 'KTU'),
(73, 'Kozhikode', 'Kozhikode Calicut International Airport', 'CCJ'),
(74, 'Kulu Bhuntar', 'Kulu Bhuntar Airport', 'KUU'),
(75, 'Leh', 'Leh Airport', 'IXL'),
(76, 'Lilabari', 'Lilabari Airport', 'IXI'),
(77, 'Lucknow', 'Amausi Airport', 'LKO'),
(78, 'Ludhiana', 'Ludhiana Airport', 'LUH'),
(79, 'Chennai', 'Chennai Airport', 'MAA'),
(80, 'Madurai', 'Madurai Airport', 'IXM'),
(81, 'Malda', 'Malda Airport', 'LDA'),
(82, 'Mangalore', 'Bajpe Airport', 'IXE'),
(83, 'Mohanbari', 'Mohanbari Airport', 'MOH'),
(84, 'Muzaffarnagar', 'Muzaffarnagar Airport', 'MZA'),
(85, 'Muzaffarpur', 'Muzaffarpur Airport', 'MZU'),
(86, 'Mysore', 'Mysore Airport', 'MYQ'),
(87, 'Nagpur', 'Sonegaon Airport', 'NAG'),
(88, 'Nanded', 'Nanded Airport', 'NDC'),
(89, 'Nasik', 'Gandhinagar Airport', 'ISK'),
(90, 'Neyveli', 'Neyveli Airport', 'NVY'),
(91, 'Osmanabad', 'Osmanabad Airport', 'OMN'),
(92, 'Pantnagar', 'Pantnagar Airport', 'PGH'),
(93, 'Pasighat', 'Pasighat Airport', 'IXT'),
(94, 'Pathankot', 'Pathankot Airport', 'IXP'),
(95, 'Patna', 'Patna Airport', 'PAT'),
(96, 'Pondicherry', 'Pondicherry Airport', 'PNY'),
(97, 'Porbandar', 'Porbandar Airport', 'PBD'),
(98, 'Port Blair', 'Port Blair Airport', 'IXZ'),
(99, 'Pune', 'Lohegaon Airport', 'PNQ'),
(100, 'Puttaprathe', 'Puttaprathe Airport', 'PUT'),
(101, 'Raipur', 'Raipur Airport', 'RPR'),
(102, 'Rajahmundry', 'Rajahmundry Airport', 'RJA'),
(103, 'Rajkot', 'Rajkot Civil Airport', 'RAJ'),
(104, 'Rajouri', 'Rajouri Airport', 'RJI'),
(105, 'Ramagundam', 'Ramagundam Airport', 'RMD'),
(106, 'Ranchi', 'Ranchi Airport', 'IXR'),
(107, 'Ratnagiri', 'Ratnagiri Airport', 'RTC'),
(108, 'Rewa', 'Rewa Airport', 'REW'),
(109, 'Rourkela', 'Rourkela Airport', 'RRK'),
(110, 'Rupsi', 'Rupsi Airport', 'RUP'),
(111, 'Salem', 'Salem Airport', 'SXV'),
(112, 'Satna', 'Satna Airport', 'TNI'),
(113, 'Shillong', 'Shillong Airport', 'SHL'),
(114, 'Sholapur', 'Sholapur Airport', 'SSE'),
(115, 'Silchar Kumbhirgram', 'Silchar Kumbhirgram Airport', 'IXS'),
(116, 'Simla', 'Simla Airport', 'SLV'),
(117, 'Srinagar', 'Srinagar Airport', 'SXR'),
(118, 'Surat', 'Surat Airport', 'STV'),
(119, 'Tezpur', 'Salonibari Airport', 'TEZ'),
(120, 'Tezu', 'Tezu Airport', 'TEI'),
(121, 'Thanjavur', 'Thanjavur Airport', 'TJV'),
(122, 'Thiruvananthapuram', 'Thiruvananthapuram International Airport', 'TRV'),
(123, 'Tiruchirapally', 'Tiruchirapally Civil Airport', 'TRZ'),
(124, 'Tirupati', 'Tirupati Airport', 'TIR'),
(125, 'Tuticorin', 'Tuticorin Airport', 'TCR'),
(126, 'Udaipur', 'Dabok Airport', 'UDR'),
(127, 'Vadodara', 'Vadodara Airport', 'BDQ'),
(128, 'Varanasi', 'Varanasi Airport', 'VNS'),
(129, 'Vijayawada', 'Vijayawada Airport', 'VGA'),
(130, 'Visakhapatnam', 'Visakhapatnam Airport', 'VTZ'),
(131, 'Warangal', 'Warangal Airport', 'WGC');

-- --------------------------------------------------------

--
-- Table structure for table `booking_info`
--

CREATE TABLE IF NOT EXISTS `booking_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(255) NOT NULL,
  `flight_id` int(11) NOT NULL,
  `booking_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `booking_info`
--

INSERT INTO `booking_info` (`id`, `user_email`, `flight_id`, `booking_time`) VALUES
(1, 'prateek.sarve@gmail.com', 1, '0000-00-00 00:00:00'),
(2, 'test@gmail.com', 5, '2016-10-12 15:14:41'),
(3, 'new@gmail.com', 4, '2016-10-12 15:21:29'),
(4, 'des@wer.kkk', 1, '2016-10-12 15:29:56');

-- --------------------------------------------------------

--
-- Table structure for table `flights`
--

CREATE TABLE IF NOT EXISTS `flights` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `travel_from` int(11) NOT NULL,
  `travel_to` int(11) NOT NULL,
  `depart` time NOT NULL,
  `arrive` time NOT NULL,
  `routine` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `airlines` varchar(255) NOT NULL,
  `total_seats` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=92 ;

--
-- Dumping data for table `flights`
--

INSERT INTO `flights` (`id`, `travel_from`, `travel_to`, `depart`, `arrive`, `routine`, `price`, `airlines`, `total_seats`) VALUES
(1, 4, 5, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(2, 4, 25, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(3, 4, 46, '06:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(4, 4, 5, '07:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(5, 4, 99, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(6, 5, 4, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(7, 13, 35, '02:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(8, 13, 35, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(9, 13, 43, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(10, 13, 77, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(11, 13, 24, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(12, 13, 87, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(13, 13, 95, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(14, 13, 98, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(15, 13, 99, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(16, 13, 106, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(17, 20, 24, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(18, 27, 24, '06:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(19, 79, 24, '07:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(20, 79, 98, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(21, 79, 99, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(22, 29, 35, '02:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(23, 29, 24, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(24, 35, 12, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(25, 35, 13, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(26, 35, 29, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(27, 35, 43, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(28, 35, 46, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(29, 35, 57, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(30, 35, 25, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(31, 35, 75, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(32, 35, 77, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(33, 35, 24, '06:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(34, 35, 95, '07:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(35, 35, 98, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(36, 35, 99, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(37, 35, 106, '02:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(38, 35, 117, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(39, 43, 13, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(40, 43, 35, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(41, 43, 24, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(42, 43, 46, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(43, 46, 4, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(44, 46, 35, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(45, 46, 25, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(46, 55, 24, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(47, 57, 35, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(48, 57, 24, '06:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(49, 57, 117, '07:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(50, 57, 25, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(51, 25, 4, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(52, 25, 35, '02:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(53, 25, 46, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(54, 25, 35, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(55, 75, 24, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(56, 75, 117, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(57, 75, 35, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(58, 77, 15, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(59, 77, 35, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(60, 77, 24, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(61, 24, 4, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(62, 24, 13, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(63, 24, 20, '06:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(64, 24, 27, '07:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(65, 24, 79, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(66, 24, 29, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(67, 24, 35, '02:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(68, 24, 46, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(69, 24, 106, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(70, 24, 24, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(71, 24, 117, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(72, 24, 75, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(73, 24, 15, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(74, 24, 99, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(75, 24, 24, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(76, 24, 4, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(77, 87, 13, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(78, 87, 24, '06:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(79, 87, 99, '07:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(80, 95, 13, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(81, 95, 29, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(82, 95, 35, '02:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(83, 95, 35, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(84, 95, 24, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(85, 95, 106, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(86, 98, 13, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(87, 98, 79, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(88, 98, 35, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(89, 98, 25, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(90, 98, 24, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50),
(91, 98, 4, '05:30:00', '10:30:00', '0,1,2,3,4,5,6', 2000, 'Jet Airways', 50);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
