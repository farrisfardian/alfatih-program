/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.alfatih.repository.akuntansi;

import id.alfatih.domain.akuntansi.Program;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author ustadho
 */
public interface ProgramRepository extends JpaRepository<Program, Integer>{
    public Page<Program> findByNamaContainingIgnoreCase(String nama, Pageable pr);
    
    @Query("from Program a "
            + "where upper(a.nama) like upper(:s) "
            + "or upper(a.kode) like upper(:s) ")
    public Page<Program> filterByKey(@Param("s") String s, Pageable pr);
    
    @Query("from Program a "
            + "where (upper(a.nama) like upper(:s) "
            + "or upper(a.kode) like upper(:s) ) "
            + "and a.id not in (select pg.parent.id from Program pg where pg.parent.id is not null) "
    )
    public Page<Program> filterEndpointByKey(@Param("s") String s, Pageable pr);
 
    @Query("from Program a "
            + "where a.unit.id=:id "
            + "and a.id not in (select pg.parent.id from Program pg where pg.parent.id is not null) "
    )
    public List<Program> findByUnit(@Param("id") Integer id);
}
