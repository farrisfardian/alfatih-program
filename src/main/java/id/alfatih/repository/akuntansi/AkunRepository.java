/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.alfatih.repository.akuntansi;

import id.alfatih.domain.akuntansi.Akun;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author ustadho
 */
public interface AkunRepository extends JpaRepository<Akun, Integer> {

    public Page<Akun> findByNamaContainingIgnoreCase(String nama, Pageable pr);

    public Akun findByKode(String kode);

    @Query("from Akun a "
            + "where upper(a.kode) like upper(:s) "
            + "or upper(a.nama) like upper(:s) ")
    public Page<Akun> filterByKey(@Param("s") String s, Pageable pr);

    @Query("from Akun a "
            + "where (upper(a.kode) like upper(:s) "
            + "or upper(a.nama) like upper(:s)) "
            + "and a.cabang.id = :idCabang "
    )
    public Page<Akun> filterByKeyPerCabang(@Param("s") String s, @Param("idCabang") Integer idCabang, Pageable pr);

    @Query("from Akun a "
            + "where (upper(a.nama) like upper(:s) "
            + "or upper(a.kode) like upper(:s)) "
            + "and a.id not in (select pg.parent.id from Akun pg where pg.parent.id is not null) "
    )
    public Page<Akun> filterEndpointByKey(@Param("s") String s, Pageable pr);

    @Query("from Akun a "
            + "where (upper(a.nama) like upper(:s) "
            + "or upper(a.kode) like upper(:s)) "
            + "and a.cabang.id = :idCabang "
            + "and a.id not in (select pg.parent.id from Akun pg where pg.parent.id is not null) "
    )
    public Page<Akun> filterEndpointByKeyPerCabang(@Param("s") String s, @Param("idCabang") Integer idCabang, Pageable pr);

}
