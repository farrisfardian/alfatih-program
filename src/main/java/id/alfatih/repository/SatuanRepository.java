package id.alfatih.repository;

import id.alfatih.domain.akademik.Satuan;
import id.alfatih.domain.akademik.Satuan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

/**
 * Spring Data JPA repository for the Satuan entity.
 */
@SuppressWarnings("unused")
public interface SatuanRepository extends JpaRepository<Satuan, Integer> {

    @Query("from Satuan a "
            + "where upper(a.nama) like upper(:s) ")
    public Page<Satuan> filterByKey(@Param("s") String s, Pageable pr);
}
