CREATE TABLE m_dokumen_sumber(
  id character varying(36) NOT NULL,
  nama character varying(255),
  CONSTRAINT m_dokumen_sumber_pkey PRIMARY KEY (id)
);

insert into m_dokumen_sumber(id, nama) VALUES
('BKM', 'Bukti Kas Masuk'),
('BKK', 'Bukti Kas Keluar'),
('JUM', 'Jurnal Umum'),
('TST', 'Transaksi Santri');

CREATE TABLE m_tahun_ajaran(
  id serial primary key,
  kode character varying(5) unique not null,
  tahun_akhir character varying(4),
  tahun_awal character varying(4)
);

insert into m_tahun_ajaran(kode, tahun_awal, tahun_akhir) VALUES
('1718', '2017', '2018');

CREATE TABLE m_cabang(
  id serial primary key,
  alamat character varying(255),
  hp character varying(255),
  kontak character varying(255),
  nama character varying(255) NOT NULL,
  telepon character varying(255),
  CONSTRAINT uk_m500pi0m9v6jdyvqljjpjpvca UNIQUE (nama)
);

insert into m_cabang(nama) VALUES ('Kuttab Al-Fatih Depok');

CREATE TABLE m_unit
(
  id serial primary key,
  alamat character varying(255),
  hp character varying(255),
  kontak character varying(255),
  nama character varying(255) NOT NULL,
  telepon character varying(255),
  id_parent integer,
  id_cabang integer references m_cabang(id),
  CONSTRAINT fknjjpk5o3sv3c335e7y2kosfw6 FOREIGN KEY (id_parent)
      REFERENCES m_unit (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT uk_bw1y3c716f90o50go30x2tox0 UNIQUE (nama)
);

insert into m_unit(nama, id_cabang) VALUES
('Kuttab Al Fatih Depok', 1),
('Kuttab Al Fatih Bandung', 1),
('Akademi Guru', 1);

CREATE TABLE acc_sumber_dana(
  id serial primary key,
  alamat character varying(255),
  email character varying(255),
  fax character varying(255),
  kode character varying(255) NOT NULL unique,
  nama character varying(255),
  selisih_kurs boolean,
  telepon character varying(255),
  web character varying(255)
);

insert into acc_sumber_dana(kode, nama) VALUES
('TWF', 'TAWAF'),
('PJKP', 'PENDAPATAN JASA KERJASAMA PENDIDIKAN'),
('PJLP', 'PENDAPATAN JASA LAYANAN PENDIDIKAN'),
('KPKAF', 'KONTRIBUSI PENDAPATAN PROGRAM');

CREATE TABLE acc_program(
  id serial primary key,
  aktif boolean default true,
  budget double precision,
  kode character varying(20),
  nama character varying(255) NOT NULL,
  pelaksana character varying(255),
  status character varying(255),
  tgl_mulai date,
  tgl_perencanaan date,
  tgl_selesai date,
  id_parent integer,
  id_tahun_ajaran integer,
  id_unit integer,
  CONSTRAINT fk7y22o9mmsq19ew7ljuokyyoum FOREIGN KEY (id_parent)
      REFERENCES acc_program (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fkd95i8yxt414aha1o46yqbkivi FOREIGN KEY (id_unit)
      REFERENCES m_unit (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fkhogbv404cdrmduh7nus0pdktr FOREIGN KEY (id_tahun_ajaran)
      REFERENCES m_tahun_ajaran (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT uk_c3i4w7540b5buhn7wkhkmpa1x UNIQUE (kode),
  CONSTRAINT uk_tc27muxb1mwpcnvgcd6khwn86 UNIQUE (nama)
);

insert into acc_program(kode, nama, id_tahun_ajaran, id_unit, id_parent) VALUES
('KAFDPK', 'Kuttab Al-Fatih Depok', 1, 1, null),
('KAFDPK1718', 'Kuttab Al-Fatih Depok Tahun Ajaran 2017-2018', 1, 1, 1);

CREATE TABLE acc_mata_uang
(
  id serial primary key,
  nama character varying(255) NOT NULL,
  rate numeric(19,2) DEFAULT 1,
  simbol character varying(10) NOT NULL,
  CONSTRAINT uk_c87t5ht391sip50ao5tebl5cl UNIQUE (simbol),
  CONSTRAINT uk_kvwsofh95s3c0juf1mc7vvp37 UNIQUE (nama)
);

insert into acc_mata_uang(simbol, nama, rate) VALUES
('Rp.', 'Rupiah', 1),
('DNR', 'Dinar', 2200000),
('DRM', 'Dirham', 50000),
('US $', 'Dolar US', 13000);

CREATE TABLE acc_kelompok_akun
(
  id integer NOT NULL ,
  nama character varying(255) NOT NULL,
  grup character varying(255),
  CONSTRAINT acc_kelompok_akun_pkey PRIMARY KEY (id)
);

INSERT INTO acc_kelompok_akun(id, nama, grup) VALUES 
(1, 'Aset Lancar', 'Aset'),
(2, 'Aset Tidak Lancar', 'Aset'),
(3, 'Kewajiban Jangka Pendek', 'Liabilitas'),
(4, 'Kewajiban Jangka Panjang', 'Liabilitas'),
(5, 'Aset Bersih', 'Aset Netto'),
(6, 'Pendapatan', 'Penerimaan'),
(7, 'Pendapatan Dari Kegiatan Operasional', 'Penerimaan'),
(8, 'Pendapatan Dari Kegiatan Non Operasional', 'Penerimaan'),
(9, 'Aset Neto yang Berakhir Batasannya', 'Aset Netto'),
(10, 'Beban Belanja Pegawai', 'Beban'),
(11, 'Beban Belanja Barang Dan Jasa', 'Beban'),
(12, 'Beban Belanja Hibah', 'Beban'),
(13, 'Beban Belanja Bantuan Sosial', 'Beban');


CREATE TABLE acc_akun(
  id serial primary key,
  keterangan text,
  kode character varying(15) NOT NULL,
  nama character varying(255) NOT NULL,
  id_kelompok integer,
  id_mata_uang integer,
  id_parent integer,
  created_by varchar(50) not null,
  created_date timestamp not null default  now(),
  CONSTRAINT fk12h25ebnmpekf8ayo96ugbdn FOREIGN KEY (id_kelompok)
      REFERENCES acc_kelompok_akun (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fk6ytrhoe25ftj0tapn855n67as FOREIGN KEY (id_parent)
      REFERENCES acc_akun (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fkftb47oqwkt9ocj97r68taoiuj FOREIGN KEY (id_mata_uang)
      REFERENCES acc_mata_uang (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT uk_3p7ki0qt8cfjbyo8cxn4enulc UNIQUE (nama),
  CONSTRAINT uk_n5ex4q846oja1lipmcewduem2 UNIQUE (kode)
);
INSERT INTO acc_akun(id, kode, nama, id_kelompok, id_parent, created_by, created_date) VALUES 
(1,'1.01.00','KAS UTAMA',1, null, 'system', now()),
(2,'1.01.01',' Kas',1, 1, 'system', now()),
(3,'1.01.02','BSM no. A/C 7047508295 a.n. PINUJI P D (KUTTAB AL FATIH)',1, 1, 'system', now()),
(4,'1.01.03','BSM no. A/C 7083014158 a.n. PINUJI P D ( KAF DEPOK)',1, 1, 'system', now()),
(5,'1.01.04','BSM no. A/C 7083011399 a.n. PINUJI P D (KAF BOOKSHOP)',1, 1, 'system', now()),
(6,'1.01.05','BSM no. A/C 7083014077 a.n PINUJI P D (KAF BANDUNG)',1, 1, 'system', now()),
(7,'1.01.06','CIMB Niaga Syariah no.A/C 5280130226113 an. PINUJI PRAWITA D',1, 1, 'system', now()),
(8,'1.02.00','KAS BENDAHARA PENERIMAAN',1, null, 'system', now()),
(9,'1.02.01','Kas Bendahara Penerimaan Utama',1, 8, 'system', now()),
(10,'1.02.02','Kas Bendahara Penerimaan Pembantu KAF Depok',1, 8, 'system', now()),
(11,'1.02.03','Kas Bendahara Penerimaan Pembantu KAF Depok Unit Beji',1, 8, 'system', now()),
(12,'1.02.04','Kas Bendahara Penerimaan Pembantu KAF Bandung',1, 8, 'system', now()),
(13,'1.02.05','Kas Bendahara Penerimaan Pembantu KAF Bandung Unit Gedebage',1, 8, 'system', now()),
(14,'1.02.06','Kas Bendahara Penerimaan Pembantu Akademi Guru',1, 8, 'system', now()),
(15,'1.03.00','KAS BENDAHARA PENGELUARAN',1, null, 'system', now()),
(16,'1.03.01','Kas Bendahara Pengeluaran Utama',1, 15, 'system', now()),
(17,'1.04.00','KAS KECIL',1, null, 'system', now()),
(18,'1.04.01','Kas Kecil Direktur Pendidikan',1, 17, 'system', now()),
(19,'1.04.02','Kas Kecil General Manager',1, 17, 'system', now()),
(20,'1.04.03','Kas Kecil Unit Organisasi',1, 17, 'system', now()),
(21,'1.05.00','UANG MUKA KERJA',1, null, 'system', now()),
(22,'1.05.01','UMK Belanja Pegawai',1, 21, 'system', now()),
(23,'1.05.02','UMK Belanja Barang',1, 21, 'system', now()),
(24,'1.05.03','UMK Belanja Modal',1, 21, 'system', now()),
(25,'1.05.04','UMK Belanja Bantuan Sosial',1, 21, 'system', now()),
(26,'1.06.00','DEPOSITO BERJANGKA PENDEK',1, null, 'system', now()),
(27,'1.07.00','INVESTASI JANGKA PENDEK',1, null, 'system', now()),
(28,'1.08.00','PIUTANG PENDAPATAN DARI PENYEDIAAN BARANG DAN JASA',1, null, 'system', now()),
(29,'1.08.01','Piutang Pendapatan dari Jasa Layanan Pendidikan',1, 28, 'system', now()),
(30,'1.08.02','Piutang Pendapatan dari Hasil Penjualan Barang',1, 28, 'system', now()),
(31,'1.08.03','Piutang Sewa',1, 28, 'system', now()),
(32,'1.08.04','1.08.04',1, 28, 'system', now()),
(33,'1.09.00','PIUTANG PENDAPATAN HASIL KERJASAMA',1, null, 'system', now()),
(34,'1.09.01','Piutang Pendapatan dari Hasil Kerjasama Pendidikan',1, 33, 'system', now()),
(35,'1.09.02','',1, 33, 'system', now()),
(36,'1.10.00','PIUTANG DARI KEGIATAN NON OPERASIONAL',1, null, 'system', now()),
(37,'1.10.01','Piutang Komitmen Hibah',1, 36, 'system', now()),
(38,'1.10.02','Piutang Pengelolaan Aset',1, 36, 'system', now()),
(39,'1.10.03','Piutang Hasil Investasi',1, 36, 'system', now()),
(40,'1.10.04','Piutang Pegawai',1, 36, 'system', now()),
(41,'1.10.05','Piutang Dana Talangan',1, 36, 'system', now()),
(42,'1.10.06','Piutang Penjualan Aset Tetap',1, 36, 'system', now()),
(43,'1.10.09','Piutang Penjualan Investasi',1, 36, 'system', now()),
(44,'1.11.00','BIAYA DIBAYAR DI MUKA',1, null, 'system', now()),
(45,'1.11.01','Sewa Dibayar di Muka',1, 44, 'system', now()),
(46,'1.12.00','PERSEDIAAN PENYEDIAAN BARANG DAN JASA',1, null, 'system', now()),
(47,'1.12.01','Persediaan Layanan Jasa Pendidikan',1, 46, 'system', now()),
(48,'1.12.02','Persediaan Dinar',1, 46, 'system', now()),
(49,'1.12.03','Persediaan Dirham',1, 46, 'system', now()),
(50,'1.13.00','PEMBAYARAN DI MUKA',1, null, 'system', now()),
(51,'1.14.00','ASET LANCAR LAINNYA',1, null, 'system', now()),
(52,'2.01.00','INVESTASI JANGKA PANJANG',2, null, 'system', now()),
(53,'2.01.01','Investasi Non-Permanen',2, 52, 'system', now()),
(54,'2.01.02','Investasi Permanen',2, 52, 'system', now()),
(55,'2.02.00','ASET TETAP',2, null, 'system', now()),
(56,'2.02.01','Tanah',2, 55, 'system', now()),
(57,'2.02.02','Tanah 2',2, 55, 'system', now()),
(58,'2.02.03','Peralatan dan Mesin',2, 55, 'system', now()),
(59,'2.02.04','Alat Angkutan',2, 55, 'system', now()),
(60,'2.02.05','Jalan, Irigasi dan Jaringan',2, 55, 'system', now()),
(61,'2.02.06','Konstruksi dalam Pengerjaan',2, 55, 'system', now()),
(62,'2.03.00','AKUMULASI PENYUSUTAN ASET TETAP',2, null, 'system', now()),
(63,'2.03.01','Akumulasi penyusutan Gedung dan Bangunan',2, 62, 'system', now()),
(64,'2.03.02','Akumulasi Penyusutan Peralatan dan Mesin',2, 62, 'system', now()),
(65,'2.03.03','Akumulasi Penyusutan Alat Angkutan',2, 62, 'system', now()),
(66,'2.03.04','Akumulasi Jalan, Irigasi dan Jaringan',2, 62, 'system', now()),
(67,'3.01.00','UTANG USAHA',3, null, 'system', now()),
(68,'3.02.00','UTANG PAJAK',3, null, 'system', now()),
(69,'3.03.00','BEBAN YANG MASIH HARUS DIBAYAR',3, null, 'system', now()),
(70,'3.04.00','UANG MUKA KERJA YANG BELUM DIBAYAR',3, null, 'system', now()),
(71,'3.04.01','UMK Belanja Pegawai Belum Dibayar',3, 70, 'system', now()),
(72,'3.04.02','UMK Belanja Barang Belum Dibayar',3, 70, 'system', now()),
(73,'3.04.03','UMK Belanja Modal Belum Dibayar',3, 70, 'system', now()),
(74,'3.04.04','UMK Belanja Bantuan Sosial Belum Dibayar',3, null, 'system', now()),
(75,'3.05.00','PENDAPAT DITERIMA DI MUKA',3, null, 'system', now()),
(76,'3.06.00','DANA PIHAK KETIGA',3, null, 'system', now()),
(77,'3.07.00','PINJAMAN JANGKA PENDEK',3, null, 'system', now()),
(78,'4.01.00','KEWAJIBAN JANGKA PANJANG',4, null, 'system', now()),
(79,'4.01.01','4.01.01',4, 78, 'system', now()),
(80,'5.01.00','ASET BERSIH',5, null, 'system', now()),
(81,'5.01.01','Aset Bersih Tidak Terikat',5, 80, 'system', now()),
(82,'5.01.02','Aset Bersih Terikat Temporer',5, 80, 'system', now()),
(83,'5.01.03','Aset Bersih Terikat Permanen',5, 80, 'system', now()),
(84,'6.01.00','PENDAPATAN DARI PENYEDIAAN BARANG DAN JASA',6, null, 'system', now()),
(85,'6.01.01','Pendapatan dari Jasa Layanan Pendidikan',7, 84, 'system', now()),
(86,'6.01.02','Pendapatan dari Hasil Penjualan Barang',7, 84, 'system', now()),
(87,'6.01.03','Pendapatan Sewa',7, 84, 'system', now()),
(88,'6.01.99','Pendapatan Dari Penyediaan Barang dan Jasa Lainnya',7, 84, 'system', now()),
(89,'6.02.00','PENDAPATAN HASIL KERJASAMA',7, null, 'system', now()),
(90,'6.02.01','Pendapatan dari Hasil Kerjasama Pendidikan',7, 89, 'system', now()),
(91,'6.02.02','Pendapatan dari Hasil Kerjasama Lainnya',7, 89, 'system', now()),
(92,'6.03.00','DARI KEGIATAN NON OPERASIONAL',8, null, 'system', now()),
(93,'6.03.01','Pendapatan dari Hibah',8, 92, 'system', now()),
(94,'6.03.02','Pendapatan dari Hibah 2',8, 92, 'system', now()),
(95,'6.03.99','Pendapatan dari Kegiatan Non Operasional Lainnya',8, 92, 'system', now()),
(96,'7.01.00','7.01.00',9, null, 'system', now()),
(97,'7.01.01','7.01.01',9, 96, 'system', now()),
(98,'7.01.02','7.01.02',9, 96, 'system', now()),
(99,'7.01.99','7.01.99',9, 96, 'system', now()),
(100,'8.01.00','BEBAN BELANJA GAJI',10, null, 'system', now()),
(101,'8.01.01','Beban Belanja Gaji Pokok',10, 100, 'system', now()),
(102,'8.01.02','Beban Belanja Gaji Lain-lain',10, 100, 'system', now()),
(103,'8.02.00','BEBAN BELANJA TUNJANGAN-TUNJANGAN',10, null, 'system', now()),
(104,'8.02.01','Beban Belanja Tunjangan Jabatan',10, 103, 'system', now()),
(105,'8.02.02','Beban Belanja Tunjangan Hari Raya',10, 103, 'system', now()),
(106,'8.02.03','Beban Belanja Tunjangan Suami/Istri',10, 103, 'system', now()),
(107,'8.02.04','Beban Belanja Tunjangan Anak',10, 103, 'system', now()),
(108,'8.02.05','Beban Belanja Tunjangan Beras',10, 103, 'system', now()),
(109,'8.02.06','Beban Belanja Tunjangan Lauk Pauk',10, 103, 'system', now()),
(110,'8.02.99','Beban Belanja Tunjangan Lain-lain',10, 103, 'system', now()),
(111,'8.03.00','BEBAN BELANJA HONORARIUM',10, null, 'system', now()),
(112,'8.03.01','Beban Belanja Honor Tetap',10, 111, 'system', now()),
(113,'8.03.02','Beban Belanja Honor Tidak Tetap',10, 111, 'system', now()),
(114,'8.04.00','BEBAN BELANJA PEGAWAI LAINNYA',10, null, 'system', now()),
(115,'8.04.01','Beban Uang Transport',10, 114, 'system', now()),
(116,'8.04.02','Beban Belanja Lembur',10, 114, 'system', now()),
(117,'8.04.03','Beban Belanja Suka Duka',10, 114, 'system', now()),
(118,'8.04.04','Beban Belanja Insentif',10, 114, 'system', now()),
(119,'8.04.05','Beban Belanja Pegawai Lain-lain',10, 114, 'system', now()),
(120,'8.05.00','BEBAN BELANJA BARANG',11, null, 'system', now()),
(121,'8.05.01','Beban Belanja Alat Tullis Kantor',11, 120, 'system', now()),
(122,'8.05.02','Beban Belanja Konsumsi',11, 120, 'system', now()),
(123,'8.05.03','Beban Belanja Fotokopi',11, 120, 'system', now()),
(124,'8.05.04','Beban Belanja Ongkos Kirim',11, 120, 'system', now()),
(125,'8.05.05','Beban Belanja Barang Cetakan',11, 120, 'system', now()),
(126,'8.05.06','Beban Belanja Barang Pakai Habis',11, 120, 'system', now()),
(127,'8.05.99','Beban Belanja Barang Lain-lain',11, 120, 'system', now()),
(128,'8.06.00','BEBAN BELANJA JASA',11, null, 'system', now()),
(129,'8.06.01','Beban Belanja Jasa Jaringan',11, 128, 'system', now()),
(130,'8.06.02','Beban Belanja Lisensi/Royalti',11, 128, 'system', now()),
(131,'8.06.03','Beban Belanja Sewa',11, 128, 'system', now()),
(132,'8.06.04','Beban Belanja Jasa Catering dan Tata Boga',11, 128, 'system', now()),
(133,'8.06.05','Beban Belanja Layanan Kesehatan',11, 128, 'system', now()),
(134,'8.06.06','Beban Belanja Administrasi Bank',11, 128, 'system', now()),
(135,'8.06.07','Beban Belanja Daya Listrik',11, 128, 'system', now()),
(136,'8.06.08','Beban Belanja Komunikasi (Telepon, Fax, Internet, Pos)',11, 128, 'system', now()),
(137,'8.06.09','Beban Belanja PDAM/Air',11, 128, 'system', now()),
(138,'8.06.10','Beban Belanja Publikasi',11, 128, 'system', now()),
(139,'8.06.11','Beban Belanja Transportasi',11, 128, 'system', now()),
(140,'8.06.12','Beban Belanja Jasa Profesi',11, 128, 'system', now()),
(141,'8.06.13','Beban Belanja Jasa Konsultan',11, 128, 'system', now()),
(142,'8.06.99','Beban Belanja Jasa Lain-lain',11, 128, 'system', now()),
(143,'8.07.00','BEBAN BELANJA PEMELIHARAAN',11, null, 'system', now()),
(144,'8.07.01','Beban Belanja Pemeliharaan Tanah',11, 143, 'system', now()),
(145,'8.07.02','Beban Belanja Pemeliharaan Gedung dan Bangunan',11, 143, 'system', now()),
(146,'8.07.03','Beban Belanja Pemeliharaan Peralatan dan Mesin',11, 143, 'system', now()),
(147,'8.07.04','Beban Belanja Pemeliharaan Alat Angkutan',11, 143, 'system', now()),
(148,'8.07.05','Beban Belanja Pemeliharaan Jalan, Irigasi dan Jaringan',11, 143, 'system', now()),
(149,'8.07.99','Beban Belanja Pemeliharaan Lain-lain',11, 143, 'system', now()),
(150,'8.08.00','BEBAN BELANJA PERJALANAN',11, null, 'system', now()),
(151,'8.08.01','Beban Belanja Perjalanan Dalam Negeri',11, 150, 'system', now()),
(152,'8.08.02','Beban Belanja Perjalanan Luar Negeri',11, 150, 'system', now()),
(153,'8.08.99','Beban Belanja Perjalanan Lain-lain',11, 150, 'system', now()),
(154,'8.09.00','BEBAN BELANJA HIBAH',12, null, 'system', now()),
(155,'8.09.01','8.09.01',12, 154, 'system', now()),
(156,'8.09.02','8.09.02',12, 154, 'system', now()),
(157,'8.09.99','8.09.99',12, 154, 'system', now()),
(158,'8.10.00','BEBAN BELANJA BANTUAN SOSIAL',13, null, 'system', now()),
(159,'8.10.01','8.10.01',13, 158, 'system', now()),
(160,'8.10.02','8.10.02',13, 158, 'system', now()),
(161,'8.10.99','8.10.99',13, 158, 'system', now());

alter SEQUENCE acc_akun_id_seq restart with 162;

CREATE TABLE acc_skema_budget(
  id serial primary key,
  nama character varying(255) unique not null
);

insert into acc_skema_budget(nama) VALUES
('Konsolidasi (Standar)'),
('Per Donor'),
('Per Periode');

create or replace function fn_hitung_budget_parent_proyek(v_id_parent int, v_ket varchar)returns varchar as $$
declare
	r record;
	s record;
	v_out varchar;
begin

	select sum(coalesce(budget,0)) as budget, id_parent as id into r from acc_proyek  where id_parent = v_id_parent group by id_parent;

	update acc_proyek set budget = r.budget where id = r.id;
	raise notice 'r.id = %',r.id;

	select * into s from acc_proyek  where id = r.id;
	raise notice 's.id = %, s.id_parent = %',s.id,s.id_parent;
	
	if(s.id_parent is not null) then

		select fn_hitung_budget_parent_proyek(s.id_parent,coalesce(v_ket,'')) into v_out;

	else

		v_out:=coalesce(v_ket,'')||'Proyek id '||v_id_parent||' berhasil dihitung. ';
		
	end if;	
	return v_out;
	
end
/*
select fn_hitung_budget_parent_proyek(4,'');
select * from acc_proyek;
*/
$$language plpgsql;

create view vw_akun_tree 
as
WITH RECURSIVE nodes_akun AS (
	SELECT k.grup, k.nama kelompok, a.id, a.kode, a.id_parent, a.nama, a.kode::TEXT AS path
	FROM acc_akun AS a
	inner join acc_kelompok_akun k on k.id=a.id_kelompok
	WHERE a.id_parent is null
    UNION ALL
    SELECT k.grup, k.nama kelompok, c.id, c.kode, c.id_parent, c.nama, (p.path || '->' || c.kode::TEXT) AS path
	FROM nodes_akun AS p
	inner join acc_akun AS c on c.id_parent = p.id
	inner join acc_kelompok_akun k on k.id=c.id_kelompok
)
(
    ---SELECT kode, parent_id, nama, '' as path FROM m_unit_organisasi_kerja WHERE parent_id is null
    --UNION ALL
    SELECT * FROM nodes_akun ORDER BY path ASC
)

