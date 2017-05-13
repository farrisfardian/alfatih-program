/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.alfatih.repository.akuntansi;

import id.alfatih.domain.akuntansi.SumberDana;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author ustadho
 */
public interface SumberDanaRepository extends JpaRepository<SumberDana, Integer>{
    public Page<SumberDana> findByNamaContainingIgnoreCase(String nama, Pageable pr);
    
    @Query("from SumberDana a "
            + "where upper(a.kode) like upper(:s) "
            + "or upper(a.nama) like upper(:s) "
            + "or upper(a.telepon) like upper(:s) "
            + "or upper(a.email) like upper(:s) "
            + "or upper(a.web) like upper(:s) "
    )
    public Page<SumberDana> filterByKey(@Param("s") String s, Pageable pr);
    
}
