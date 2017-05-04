package id.alfatih.repository;

import id.alfatih.domain.akademik.TahunAjaran;
import id.alfatih.domain.akademik.TahunAjaran;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

/**
 * Spring Data JPA repository for the TahunAjaran entity.
 */
@SuppressWarnings("unused")
public interface TahunAjaranRepository extends JpaRepository<TahunAjaran, String> {

    @Query("from TahunAjaran a "
            + "where upper(a.kode) like upper(:s) "
            + "or upper(a.tahunAwal) like upper(:s) "
            + "or upper(a.tahunAkhir) like upper(:s) "
    )
    public Page<TahunAjaran> filterByKey(@Param("s") String s, Pageable pr);
}
