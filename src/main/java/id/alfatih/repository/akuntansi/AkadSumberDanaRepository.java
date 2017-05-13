/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.alfatih.repository.akuntansi;

import id.alfatih.domain.akuntansi.AkadSumberDana;
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
public interface AkadSumberDanaRepository extends JpaRepository<AkadSumberDana, String> {

    public Page<AkadSumberDana> findByKeteranganContainingIgnoreCase(String nama, Pageable pr);

    @Query("from AkadSumberDana a "
            + "where upper(a.keterangan) like upper(:s) "
            + "and a.sumberDana.id = :idSd "
    )
    public Page<AkadSumberDana> filterByIdSumberDana(@Param("s") String s, @Param("idSd") Integer idSd, Pageable pr);

    @Query("from AkadSumberDana a "
            + "where upper(a.keterangan) like upper(:s) "
            + "and a.program.id = :idProgram "
    )
    public Page<AkadSumberDana> filterByIdProgram(@Param("s") String s, @Param("idProgram") Integer idProgram, Pageable pr);

    @Query("from AkadSumberDana a "
            + "where a.sumberDana.id=:id "
            + "order by a.tanggal desc")
    public List<AkadSumberDana> listBySumberDana(@Param("id") Integer idSd);

}
