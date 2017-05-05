/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.alfatih.repository.akuntansi;

import id.alfatih.domain.akuntansi.AkadDonatur;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author ustadho
 */
public interface AkadDonaturRepository extends JpaRepository<AkadDonatur, String> {

    public Page<AkadDonatur> findByKeteranganContainingIgnoreCase(String nama, Pageable pr);

    @Query("from AkadDonatur a "
            + "where upper(a.keterangan) like upper(:s) "
            + "and a.donatur.id = :idDonatur "
    )
    public Page<AkadDonatur> filterByIdDonatur(@Param("s") String s, @Param("idDonatur") Integer idDonatur, Pageable pr);

    @Query("from AkadDonatur a "
            + "where upper(a.keterangan) like upper(:s) "
            + "and a.program.id = :idProgram "
    )
    public Page<AkadDonatur> filterByIdProgram(@Param("s") String s, @Param("idProgram") Integer idProgram, Pageable pr);

}
