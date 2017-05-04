package id.alfatih.repository.akuntansi;

import id.alfatih.domain.akuntansi.Jurnal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

/**
 * Spring Data JPA repository for the Jurnal entity.
 */
@SuppressWarnings("unused")
public interface JurnalRepository extends JpaRepository<Jurnal, String> {

    @Query("from Jurnal a "
            + "where upper(a.noVoucher) like upper(:s) "
            + "or upper(a.keterangan) like upper(:s) ")
    public Page<Jurnal> filterByKey(@Param("s") String s, Pageable pr);
}
