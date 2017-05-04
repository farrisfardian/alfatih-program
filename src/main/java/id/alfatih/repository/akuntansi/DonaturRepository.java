/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.alfatih.repository.akuntansi;

import id.alfatih.domain.akuntansi.Donatur;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author ustadho
 */
public interface DonaturRepository extends JpaRepository<Donatur, Integer>{
    public Page<Donatur> findByNamaContainingIgnoreCase(String nama, Pageable pr);
    
    @Query("from Donatur a "
            + "where upper(a.kode) like upper(:s) "
            + "or upper(a.nama) like upper(:s) "
            + "or upper(a.telepon) like upper(:s) "
            + "or upper(a.email) like upper(:s) "
            + "or upper(a.web) like upper(:s) "
    )
    public Page<Donatur> filterByKey(@Param("s") String s, Pageable pr);
    
}
