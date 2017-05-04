/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.alfatih.repository.akuntansi;

import id.alfatih.domain.akuntansi.MataUang;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author ustadho
 */
public interface MataUangRepository extends JpaRepository<MataUang, Integer>{
    public Page<MataUang> findByNamaContainingIgnoreCase(String nama, Pageable pr);
    
    @Query("from MataUang a "
            + "where upper(a.simbol) like upper(:s) "
            + "or upper(a.nama) like upper(:s) ")
    public Page<MataUang> filterByKey(@Param("s") String s, Pageable pr);
    
}
