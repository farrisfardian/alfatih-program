/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.alfatih.web.rest.akuntansi;

import com.codahale.metrics.annotation.Timed;
import id.alfatih.domain.akuntansi.Akun;
import id.alfatih.domain.model.AkunVM;
import id.alfatih.repository.akuntansi.AkunRepository;
import id.alfatih.repository.jdbc.AkunRepositoryJdbc;
import id.alfatih.service.util.HeaderUtil;
import id.alfatih.service.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author ustadho
 */
@RestController
@RequestMapping("/api/akuntansi/akun")
public class AkunResource {

    private final Logger log = LoggerFactory.getLogger(AkunResource.class);

    private static final String ENTITY_NAME = "akun";

    private final AkunRepository repository;
    private final AkunRepositoryJdbc repositoryJdbc;

    public AkunResource(AkunRepository repository, AkunRepositoryJdbc repositoryJdbc) {
        this.repository = repository;
        this.repositoryJdbc = repositoryJdbc;
    }

    @RequestMapping(value = "/list-flat", method = RequestMethod.GET)
    public Object ambilSemuaFlat() {
        return repositoryJdbc.filterAkun(null);
    }

    @RequestMapping("/all")
    @Timed
    public List<Akun> getAllJenisAkuns() {
        log.debug("REST request to get all Akun");
        List<Akun> x = repository.findAll();
        return x;
    }
    
    @RequestMapping("/parent-children")
    @Timed
    public List<Akun> listParentChildren() {
        log.debug("REST request to get parent children");
        List<Akun> x = repository.listParentChildren();
        return x;
    }
    
    @RequestMapping("/kas-bank")
    @Timed
    public List<Akun> listKasBank() {
        log.debug("REST request to get lsit kas-bank");
        List<Akun> x = repository.listKasBank();
        return x;
    }

    @RequestMapping(method = RequestMethod.GET)
    @Timed
    public ResponseEntity<List<Akun>> filterAll(Pageable p) throws URISyntaxException {
        log.debug("REST request to get all Akun by Page");
        Page<Akun> x = repository.findAll(p);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(x, "/api/akuntansi/akun");

        return new ResponseEntity<>(x.getContent(), headers, HttpStatus.OK);
    }

    @RequestMapping("/filter/{s}")
//    @RequestMapping("/{s}")
    @Timed
    public ResponseEntity<List<Akun>> filterByKey(@PathVariable String s, Pageable p) throws URISyntaxException {
        log.debug("REST request to filter Akun by key per page");
        Page<Akun> x = repository.filterByKey("%" + s + "%", p);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(x, "/api/akuntansi/akun");

        return new ResponseEntity<>(x.getContent(), headers, HttpStatus.OK);
    }

    @RequestMapping("/filter-endpoint-all")
    @Timed
    public ResponseEntity<List<Akun>> filterEndpointAll(Pageable p) throws URISyntaxException {
        log.debug("REST request to filter Akun by key per page");
        Page<Akun> x = repository.filterEndpointByKey("%%", p);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(x, "/api/akuntansi/program");

        return new ResponseEntity<>(x.getContent(), headers, HttpStatus.OK);
    }

    @RequestMapping("/filter-endpoint/{s}")
    @Timed
    public ResponseEntity<List<Akun>> filterEndpointByKey(@PathVariable String s, Pageable p) throws URISyntaxException {
        log.debug("REST request to filter Akun by key per page");
        Page<Akun> x = repository.filterEndpointByKey("%" + s + "%", p);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(x, "/api/akuntansi/program");

        return new ResponseEntity<>(x.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET /api/akuntansi/akun/:id : get the "id" akun.
     *
     * @param id the id of the akun to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the akun,
     * or with status 404 (Not Found)
     */
    @RequestMapping("{id}")
    @Timed
    public ResponseEntity<AkunVM> getAkun(@PathVariable Integer id) {
        log.debug("REST request get Akun : {}", id);
        Akun akun = repository.findOne(id);
        AkunVM a = new AkunVM();
        a.setId(akun.getId());
        a.setAktif(akun.getAktif());
        a.setNama(akun.getNama());
        a.setKode(akun.getKode());
        a.setKeterangan(akun.getKeterangan());
        a.setKelompok(akun.getKelompok());
        a.setParent(akun.getParent());
        a.setChildren(akun.getChildren());
        a.setCabang(akun.getCabang());
        a.setExpanded(akun.getExpanded());
        a.setCreatedDate(akun.getCreatedDate());
        a.setCreatedBy(akun.getCreatedBy());
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(a));
    }

    /**
     * GET /api/akuntansi/akun/:col/:value (get the "id" akun.)
     *
     * @param id the id of the akun to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the akun,
     * or with status 404 (Not Found)
     */
    @RequestMapping("/{col}/{value:.+}")
    @Timed
    public ResponseEntity<Akun> getAkunByUnique(@PathVariable String col, @PathVariable String value) {
        log.debug("REST request get Akun col : {}, value : {}", col, value);
        Akun akun = null;
        if (col.equalsIgnoreCase("id")) {
            akun = repository.findOne(Integer.valueOf(value));
        } else if (col.equalsIgnoreCase("kode")) {
            akun = repository.findByKode(value);
        } else {
            return ResponseEntity.badRequest().headers(
                    HeaderUtil.createFailureAlert(ENTITY_NAME, "columnNotExists", "Pencarian dengan kolom " + col + " tidak ada")).body(null);
        }
        if (akun == null) {
            return ResponseEntity.badRequest().headers(
                    HeaderUtil.createFailureAlert(ENTITY_NAME, "akunNotExists", "Akun tidak ditemukan")).body(null);
        } else {
            return ResponseUtil.wrapOrNotFound(Optional.ofNullable(akun));
        }
    }

    /**
     * POST /api/akuntansi/akun : Create a new akun.
     *
     * @param akun the akun to create
     * @return the ResponseEntity with status 201 (Created) and with body the
     * new akun, or with status 400 (Bad Request) if the akun has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(method = RequestMethod.POST)
    @Timed
    public ResponseEntity<Akun> createAkun(@RequestBody Akun akun) throws URISyntaxException {
        log.debug("REST request to save akun : {}", akun);
        if (akun.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new akun cannot already have an ID")).body(null);
        }
        akun.setCreatedBy("user");
        akun.setCreatedDate(new Date());
        Akun result = repository.save(akun);
        return ResponseEntity.created(new URI("/api/akuntansi/akun/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * PUT /api/akuntansi/akun : Updates an existing akun.
     *
     * @param akun the akun to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated
     * akun, or with status 400 (Bad Request) if the akun is not valid, or with
     * status 500 (Internal Server Error) if the akun couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    @Timed
    public ResponseEntity<Akun> updateAkun(@PathVariable Integer id, @RequestBody Akun akun) throws URISyntaxException {
        log.debug("REST request to update Akun : {}", akun);
        if (id == null) {
            return createAkun(akun);
        }
        Akun x = repository.findOne(id);
        akun.setId(x.getId());
        akun.setCreatedBy(akun.getCreatedBy()==null? "system": akun.getCreatedBy());
        akun.setCreatedDate(akun.getCreatedDate()==null? new Date(): akun.getCreatedDate());
        Akun result = repository.save(akun);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, akun.getId().toString()))
                .body(result);
    }

    /**
     * DELETE /api/akuntansi/akun/:id : delete the "id" akun.
     *
     * @param id the id of the akun to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    @Timed
    public ResponseEntity<Void> deleteAkun(@PathVariable Integer id) {
        log.debug("REST request to delete Akun : {}", id);
        repository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
