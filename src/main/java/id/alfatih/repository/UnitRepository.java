package id.alfatih.repository;

import id.alfatih.domain.akademik.Unit;
import id.alfatih.domain.akademik.Unit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

/**
 * Spring Data JPA repository for the Unit entity.
 */
@SuppressWarnings("unused")
public interface UnitRepository extends JpaRepository<Unit, Integer> {

    @Query("from Unit a "
            + "where upper(a.nama) like upper(:s) "
            + "or upper(a.kontak) like upper(:s) "
            + "or upper(a.alamat) like upper(:s) "
            + "or upper(a.telepon) like upper(:s) "
    )
    public Page<Unit> filterByKey(@Param("s") String s, Pageable pr);
}
