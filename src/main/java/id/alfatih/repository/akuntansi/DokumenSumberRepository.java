package id.alfatih.repository.akuntansi;

import id.alfatih.domain.akuntansi.DokumenSumber;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

/**
 * Spring Data JPA repository for the DokumenSumber entity.
 */
@SuppressWarnings("unused")
public interface DokumenSumberRepository extends JpaRepository<DokumenSumber, String> {

    @Query("from DokumenSumber a "
            + "where upper(a.nama) like upper(:s) ")
    public Page<DokumenSumber> filterByKey(@Param("s") String s, Pageable pr);
}
