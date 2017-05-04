package id.alfatih.web.rest.akuntansi;

import com.codahale.metrics.annotation.Timed;
import id.alfatih.domain.akuntansi.MataUang;
import id.alfatih.repository.akuntansi.MataUangRepository;
import id.alfatih.service.util.HeaderUtil;
import id.alfatih.service.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;

/**
 * REST controller for managing MataUang.
 */
@RestController
@RequestMapping("/api/akuntansi")
public class MataUangResource {

    private final Logger log = LoggerFactory.getLogger(MataUangResource.class);

    private static final String ENTITY_NAME = "MataUang";

    private final MataUangRepository repository;

    public MataUangResource(MataUangRepository mataUangRepository) {
        this.repository = mataUangRepository;
    }

    /**
     * POST /matauang : Create a new mataUang.
     *
     * @param mataUang the mataUang to create
     * @return the ResponseEntity with status 201 (Created) and with body the
     * new mataUang, or with status 400 (Bad Request) if the mataUang has
     * already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/matauang")
    @Timed
    public ResponseEntity<MataUang> createMataUang(@Valid @RequestBody MataUang mataUang) throws URISyntaxException {
        log.debug("REST request to save MataUang : {}", mataUang);
        if (mataUang.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new mataUang cannot already have an ID")).body(null);
        }
        MataUang result = repository.save(mataUang);
        return ResponseEntity.created(new URI("/api/matauang/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * PUT /matauang : Updates an existing mataUang.
     *
     * @param mataUang the mataUang to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated
     * mataUang, or with status 400 (Bad Request) if the mataUang is not valid,
     * or with status 500 (Internal Server Error) if the mataUang couldnt be
     * updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/matauang/{id}")
    @Timed
    public ResponseEntity<MataUang> updateMataUang(@PathVariable Integer id, @Valid @RequestBody MataUang mataUang) throws URISyntaxException {
        log.debug("REST request to update MataUang : {}", mataUang);
        if (id == null) {
            return createMataUang(mataUang);
        }
        MataUang result = repository.save(mataUang);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mataUang.getId().toString()))
                .body(result);
    }

    /**
     * GET /matauang : get all the mataUangs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of mataUangs
     * in body
     */
    @GetMapping("/matauang/all")
    @Timed
    public List<MataUang> getAllMataUangs() {
        log.debug("REST request to get all MataUangs");
        List<MataUang> mataUangs = repository.findAll();
        return mataUangs;
    }

    /**
     * GET /matauang/:id : get the "id" mataUang.
     *
     * @param id the id of the mataUang to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the
     * mataUang, or with status 404 (Not Found)
     */
    @GetMapping("/matauang/{id}")
    @Timed
    public ResponseEntity<MataUang> getMataUang(@PathVariable Integer id) {
        log.debug("REST request to get MataUang : {}", id);
        MataUang mataUang = repository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(mataUang));
    }

    /**
     * DELETE /matauang/:id : delete the "id" mataUang.
     *
     * @param id the id of the mataUang to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/matauang/{id}")
    @Timed
    public ResponseEntity<Void> deleteMataUang(@PathVariable Integer id) {
        log.debug("REST request to delete MataUang : {}", id);
        repository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @GetMapping(value = "matauang")
    @Timed
    public ResponseEntity<List<MataUang>> filterAll(Pageable p) throws URISyntaxException {
        log.debug("REST request to get all Akun by Page");
        Page<MataUang> x = repository.findAll(p);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(x, "/api/akuntansi/akun");

        return new ResponseEntity<>(x.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("matauang/filter/{s}")
    @Timed
    public ResponseEntity<List<MataUang>> filterByKey(@PathVariable String s, Pageable p) throws URISyntaxException {
        log.debug("REST request to filter Akun by key per page");
        Page<MataUang> x = repository.filterByKey("%" + s + "%", p);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(x, "/api/akuntansi/akun");

        return new ResponseEntity<>(x.getContent(), headers, HttpStatus.OK);
    }
}
