package id.alfatih.repository.akuntansi;

import id.alfatih.domain.akuntansi.KelompokAkun;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;


/**
 * Spring Data JPA repository for the KelompokAkun entity.
 */
@SuppressWarnings("unused")
public interface KelompokAkunRepository extends JpaRepository<KelompokAkun, Integer> {
    @Query("from KelompokAkun a "
            + "where "
            + "upper(a.nama) like upper(:s) "
            + "or upper(a.grup) like upper(:s) "
    )
    public Page<KelompokAkun> filterByKey(@Param("s") String s, Pageable pr);

}
