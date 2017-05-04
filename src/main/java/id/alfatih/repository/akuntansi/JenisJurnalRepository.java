package id.alfatih.repository.akuntansi;

import id.alfatih.domain.akuntansi.JenisJurnal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

/**
 * Spring Data JPA repository for the JenisAkun entity.
 */
@SuppressWarnings("unused")
public interface JenisJurnalRepository extends JpaRepository<JenisJurnal, Integer> {

    @Query("from JenisJurnal a "
            + "where upper(a.nama) like upper(:s) "
            + "or upper(a.keterangan) like upper(:s) ")
    public Page<JenisJurnal> filterByKey(@Param("s") String s, Pageable pr);
}
