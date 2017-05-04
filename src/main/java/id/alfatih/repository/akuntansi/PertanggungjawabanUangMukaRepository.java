package id.alfatih.repository.akuntansi;

import id.alfatih.domain.akuntansi.PertanggungjawabanUangMuka;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

/**
 * Spring Data JPA repository for the PertanggungjawabanUangMuka entity.
 */
@SuppressWarnings("unused")
public interface PertanggungjawabanUangMukaRepository extends JpaRepository<PertanggungjawabanUangMuka, String> {

    @Query("from PertanggungjawabanUangMuka a "
            + "where upper(a.nomor) like upper(:s) "
            + "or upper(a.keterangan) like upper(:s) ")
    public Page<PertanggungjawabanUangMuka> filterByKey(@Param("s") String s, Pageable pr);

    @Query("from PertanggungjawabanUangMuka a "
            + "where (upper(a.nomor) like upper(:s) "
            + "or upper(a.keterangan) like upper(:s))  "
            + "and a.uangMuka.id = :idUangMuka  "
    )
    public Page<PertanggungjawabanUangMuka> filterByKeyPerUangMuka(@Param("s") String s, @Param("idUangMuka") String idUangMuka, Pageable pr);
}
