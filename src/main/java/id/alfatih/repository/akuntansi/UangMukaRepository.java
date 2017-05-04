package id.alfatih.repository.akuntansi;

import id.alfatih.domain.akuntansi.UangMuka;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

/**
 * Spring Data JPA repository for the UangMuka entity.
 */
@SuppressWarnings("unused")
public interface UangMukaRepository extends JpaRepository<UangMuka, String> {

    @Query("from UangMuka a "
            + "where upper(a.noBukti) like upper(:s) "
            + "or upper(a.keterangan) like upper(:s) ")
    public Page<UangMuka> filterByKey(@Param("s") String s, Pageable pr);
}
