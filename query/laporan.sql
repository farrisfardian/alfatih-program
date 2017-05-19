select vw.grup, vw.kelompok, vw.kode, vw.id, vw.nama, total, vw.id_parent, vw.path into tmp_neraca
from vw_akun_tree vw
left join (
	select case when k.grup in('Penerimaan', 'Beban') then 81 else d.id_akun end id_akun, sum(coalesce(d.debet,0)-coalesce(d.kredit,0) * case when k.grup in('Aset', 'Beban') then  1 else -1 end) as total
	from acc_jurnal j 
	inner join acc_jurnal_detail d on d.id_jurnal=j.id
	inner join acc_akun a on a.id=d.id_akun
	inner join acc_kelompok_akun k on k.id=a.id_kelompok
	where j.tanggal::date<='2017-05-31'
	and j.post_time is not null
	group by case when k.grup in('Penerimaan', 'Beban') then 81 else d.id_akun end
)x on x.id_akun=vw.id
where vw.grup in('Aset', 'Liabilitas', 'Aset Netto')

select * from acc_jurnal_detail

select distinct grup from acc_kelompok_akun 

update acc_jurnal set post_time=now()

select * from vw_akun_tree where kode='1.14.00'

create table tes(
	id int, 
	val double precision,
	parent int
);

insert into tes(id, val, parent) VALUES
(1, NULL, NULL),
(2, 3.50, 1),
(3, NULL, NULL),
(4, NULL, 3),
(5, 1.50, 4),
(6, 2.20, 4)

WITH RECURSIVE children AS (
    -- select leaf nodes
    SELECT id, val, parent
        FROM tes
        WHERE val IS NOT NULL
    UNION ALL
    -- propagate values of leaf nodes up, adding rows 
    SELECT t.id, children.val, t.parent
        FROM children JOIN tes t ON children.parent = t.id
)
SELECT id, sum(val) 
    FROM children 
    GROUP BY id   -- sum up appropriate rows
    ORDER BY id;

WITH RECURSIVE ch AS (
	select grup, kelompok, kode, id, nama, total, id_parent, path 
	from tmp_neraca
	where coalesce(total, 0)>0

	UNION ALL

	select tmp.grup, tmp.kelompok, tmp.kode, tmp.id, tmp.nama, coalesce(ch.total,0) total, tmp.id_parent, tmp.path 
	from ch 
	join tmp_neraca tmp on ch.id_parent=tmp.id
)
select grup, kelompok, kode, id, nama, sum(total) total, path 
from ch 
group by grup, kelompok, kode, id, nama, path 
order by path

create or replace function fn_acc_rpt_posisi_keuangan_det(int, varchar, varchar)
returns setof record
as
$$
declare
	v_id_cabang 	alias for $1;
	v_tanggal1	alias for $2;
	v_tanggal2	alias for $3;
	rcd		record;
begin
for rcd in	
	select v.grup, v.kelompok, v.kode, v.id, v.nama, v.id_parent, sum(coalesce(ch.total,0)) total, v.path, coalesce(ch.is_det, true)
	from vw_akun_tree v 
	left join
	(
		WITH RECURSIVE ch AS (
			select case when k.grup in('Penerimaan', 'Beban') then 81 else d.id_akun end id_akun, 
			case when k.grup in('Penerimaan', 'Beban') then 80 else a.id_parent end id_parent,
			sum(coalesce(d.debet,0)-coalesce(d.kredit,0) * case when k.grup in('Aset', 'Beban') then  1 else -1 end) as total, true is_det
			from acc_jurnal j 
			inner join acc_jurnal_detail d on d.id_jurnal=j.id
			inner join acc_akun a on a.id=d.id_akun
			inner join acc_kelompok_akun k on k.id=a.id_kelompok
			where j.tanggal::date<='2017-05-31'
			and j.post_time is not null
			group by case when k.grup in('Penerimaan', 'Beban') then 81 else d.id_akun end, case when k.grup in('Penerimaan', 'Beban') then 80 else a.id_parent end

			UNION ALL

			select a.id id_akun, a.id_parent, coalesce(ch.total,0), false is_det 
			from ch 
			inner join acc_akun a on a.id=ch.id_parent
		)
		select ch.id_akun, sum(coalesce(ch.total,0)) total, is_det
		from ch 
		group by ch.id_akun, is_det
	) ch on v.id=ch.id_akun
	where v.grup in('Aset', 'Liabilitas', 'Aset Netto')
	group by v.grup, v.kelompok, v.kode, v.id, v.nama, v.path, v.id_parent, ch.is_det
	order by v.path
LOOP
	return next rcd;
END LOOP;
end
/*
select * from fn_acc_rpt_posisi_keuangan_det(1, '2017-03-01', '2017-03-31') as (grup varchar, kelompok varchar, kode varchar, id int, nama varchar, id_parent int, 
total numeric, path text, is_det boolean)
*/
$$
language 'plpgsql';


create or replace function fn_acc_rpt_posisi_keuangan_sum(int, varchar, varchar)
returns setof record
as
$$
declare
	v_id_cabang 	alias for $1;
	v_tanggal1	alias for $2;
	v_tanggal2	alias for $3;
	rcd		record;
begin
for rcd in
	select k.grup, k.nama kelompok, 
	case when a.id_parent is null then a.kode else p.kode end kode,
	case when a.id_parent is null then a.nama else p.nama end nama_akun, 
	sum(coalesce(total,0)) as total
	from acc_akun a
	inner join acc_kelompok_akun k on k.id=a.id_kelompok
	left join acc_akun p on p.id=a.id_parent 
	left join
	(
		select case when k.grup in('Penerimaan', 'Beban') then 81 else d.id_akun end id_akun, 
		case when k.grup in('Penerimaan', 'Beban') then 80 else a.id_parent end id_parent,
		sum(coalesce(d.debet,0)-coalesce(d.kredit,0) * case when k.grup in('Aset', 'Beban') then  1 else -1 end) as total
		from acc_jurnal j 
		inner join acc_jurnal_detail d on d.id_jurnal=j.id
		inner join acc_akun a on a.id=d.id_akun
		inner join acc_kelompok_akun k on k.id=a.id_kelompok
		where j.tanggal::date<='2017-05-31'
		and j.post_time is not null
		group by case when k.grup in('Penerimaan', 'Beban') then 81 else d.id_akun end, case when k.grup in('Penerimaan', 'Beban') then 80 else a.id_parent end
	) tx on a.id=tx.id_akun
	where k.grup in('Aset', 'Liabilitas', 'Aset Netto')
	group by k.grup, k.nama , case when a.id_parent is null then a.kode else p.kode end,
	case when a.id_parent is null then a.nama else p.nama end
	order by case when a.id_parent is null then a.kode else p.kode end
LOOP
	return next rcd;
END LOOP;
end
/*
select * from fn_acc_rpt_posisi_keuangan_sum(1, '2017-03-01', '2017-03-31') as (grup varchar, kelompok varchar, kode varchar, nama varchar, total numeric)
*/
$$
language 'plpgsql';
