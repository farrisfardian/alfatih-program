/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.alfatih.repository.akuntansi;

import id.alfatih.domain.akuntansi.Proyek;
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
public interface ProyekRepository extends JpaRepository<Proyek, Integer> {

    public Page<Proyek> findByKeteranganContainingIgnoreCase(String keterangan, Pageable pr);

    @Query("from Proyek a "
            + "where upper(a.kode) like upper(:s) "
            + "or upper(a.keterangan) like upper(:s) ")
    public Page<Proyek> filterByKey(@Param("s") String s, Pageable pr);

    @Query("from Proyek a "
            + "where (upper(a.keterangan) like upper(:s) "
            + "or upper(a.kode) like upper(:s) ) "
            + "and a.id not in (select pg.parent.id from Proyek pg where pg.parent.id is not null) "
    )
    public Page<Proyek> filterEndpointByKey(@Param("s") String s, Pageable pr);

    @Query("from Proyek a "
            + "where a.program.id=:id "
            + "and a.id not in (select pg.parent.id from Proyek pg where pg.parent.id is not null) "
    )
    public List<Proyek> findByProgram(@Param("id") Integer id);
}
