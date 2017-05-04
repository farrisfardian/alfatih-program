/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.alfatih.web.rest.akuntansi;

import com.codahale.metrics.annotation.Timed;
import id.alfatih.domain.akuntansi.Jurnal;
import id.alfatih.domain.akuntansi.JurnalDetail;
import id.alfatih.repository.akuntansi.JurnalRepository;
import id.alfatih.service.util.HeaderUtil;
import id.alfatih.service.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import java.net.URI;
import java.net.URISyntaxException;
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
@RequestMapping("/api/akuntansi/jurnal")
public class JurnalResource {

    private final Logger log = LoggerFactory.getLogger(JurnalResource.class);

    private static final String ENTITY_NAME = "jurnal";

    private final JurnalRepository repository;

    public JurnalResource(JurnalRepository repository) {
        this.repository = repository;
    }

    @RequestMapping("/all")
    @Timed
    public List<Jurnal> getAllJurnals() {
        log.debug("REST request to get all Jurnal");
        List<Jurnal> x = repository.findAll();
        return x;
    }

    @RequestMapping(method = RequestMethod.GET)
    @Timed
    public ResponseEntity<List<Jurnal>> filterAll(Pageable p) throws URISyntaxException {
        log.debug("REST request to get all Jurnal by Page");
        Page<Jurnal> x = repository.findAll(p);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(x, "/api/akuntansi/jurnal");

        return new ResponseEntity<>(x.getContent(), headers, HttpStatus.OK);
    }

    @RequestMapping("/filter/{s}")
    @Timed
    public ResponseEntity<List<Jurnal>> filterByKey(@PathVariable String s, Pageable p) throws URISyntaxException {
        log.debug("REST request to filter Jurnal by key per page");
        Page<Jurnal> x = repository.filterByKey("%" + s + "%", p);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(x, "/api/akuntansi/jurnal");

        return new ResponseEntity<>(x.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET /api/akuntansi/jurnal/:id : get the "id" akun.
     *
     * @param id the id of the akun to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the akun,
     * or with status 404 (Not Found)
     */
    @RequestMapping("{id}")
    @Timed
    public ResponseEntity<Jurnal> getJurnal(@PathVariable String id) {
        log.debug("REST request get Jurnal : {}", id);
        Jurnal akun = repository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(akun));
    }

    /**
     * POST /api/akuntansi/jurnal : Create a new akun.
     *
     * @param akun the akun to create
     * @return the ResponseEntity with status 201 (Created) and with body the
     * new akun, or with status 400 (Bad Request) if the akun has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(method = RequestMethod.POST)
    @Timed
    public ResponseEntity<Jurnal> createJurnal(@RequestBody Jurnal akun) throws URISyntaxException {
        log.debug("REST request to save akun : {}", akun);
        if (akun.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new akun cannot already have an ID")).body(null);
        }
        for (JurnalDetail detail : akun.getListJurnalDetail()) {
            detail.setJurnal(akun);
        }
        Jurnal result = repository.save(akun);
        return ResponseEntity.created(new URI("/api/akuntansi/jurnal" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * PUT /api/akuntansi/jurnal : Updates an existing akun.
     *
     * @param akun the akun to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated
     * akun, or with status 400 (Bad Request) if the akun is not valid, or with
     * status 500 (Internal Server Error) if the akun couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(method = RequestMethod.PUT)
    @Timed
    public ResponseEntity<Jurnal> updateJurnal(@RequestBody Jurnal akun) throws URISyntaxException {
        log.debug("REST request to update Jurnal : {}", akun);
        for (JurnalDetail detail : akun.getListJurnalDetail()) {
            detail.setJurnal(akun);
        }
        if (akun.getId() == null) {
            return createJurnal(akun);
        }
        Jurnal result = repository.save(akun);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, akun.getId().toString()))
                .body(result);
    }

    /**
     * DELETE /api/akuntansi/jurnal/:id : delete the "id" akun.
     *
     * @param id the id of the akun to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    @Timed
    public ResponseEntity<Void> deleteJurnal(@PathVariable String id) {
        log.debug("REST request to delete Jurnal : {}", id);
        repository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
