/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.alfatih.web.rest.akademik;

import com.codahale.metrics.annotation.Timed;
import id.alfatih.domain.akademik.TahunAjaran;
import id.alfatih.repository.TahunAjaranRepository;
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
@RequestMapping("/api/akademik/tahun-ajaran")
public class TahunAjaranResource {

    private final Logger log = LoggerFactory.getLogger(TahunAjaranResource.class);

    private static final String ENTITY_NAME = "tahunajaran";

    private final TahunAjaranRepository repository;

    public TahunAjaranResource(TahunAjaranRepository repository) {
        this.repository = repository;
    }

    @RequestMapping("/all")
    @Timed
    public ResponseEntity<List<TahunAjaran>> getAllJenisTahunAjarans() {
        log.debug("REST request to get all TahunAjaran");
        List<TahunAjaran> x = repository.findAll();
//        return x;
        HttpHeaders headers = new HttpHeaders();
        return new ResponseEntity<>(x, headers, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET)
    @Timed
    public ResponseEntity<List<TahunAjaran>> filterAll(Pageable p) throws URISyntaxException {
        log.debug("REST request to get all TahunAjaran by Page");
        Page<TahunAjaran> x = repository.findAll(p);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(x, "/api/master/tahunajaran");

        return new ResponseEntity<>(x.getContent(), headers, HttpStatus.OK);
    }

    @RequestMapping("/filter/{s}")
    @Timed
    public ResponseEntity<List<TahunAjaran>> filterByKey(@PathVariable String s, Pageable p) throws URISyntaxException {
        log.debug("REST request to filter TahunAjaran by key per page");
        Page<TahunAjaran> x = repository.filterByKey("%" + s + "%", p);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(x, "/api/master/tahunajaran");

        return new ResponseEntity<>(x.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET /api/master/tahunajaran/:id : get the "id" akun.
     *
     * @param id the id of the akun to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the akun,
     * or with status 404 (Not Found)
     */
    @RequestMapping("{id}")
    @Timed
    public ResponseEntity<TahunAjaran> getTahunAjaran(@PathVariable Integer id) {
        log.debug("REST request get TahunAjaran : {}", id);
        TahunAjaran akun = repository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(akun));
    }

    /**
     * POST /api/master/tahunajaran : Create a new akun.
     *
     * @param akun the akun to create
     * @return the ResponseEntity with status 201 (Created) and with body the
     * new akun, or with status 400 (Bad Request) if the akun has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(method = RequestMethod.POST)
    @Timed
    public ResponseEntity<TahunAjaran> createTahunAjaran(@RequestBody TahunAjaran akun) throws URISyntaxException {
        log.debug("REST request to save akun : {}", akun);
        if (akun.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new akun cannot already have an ID")).body(null);
        }
        TahunAjaran result = repository.save(akun);
        return ResponseEntity.created(new URI("/api/master/tahunajaran/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * PUT /api/master/tahunajaran : Updates an existing akun.
     *
     * @param akun the akun to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated
     * akun, or with status 400 (Bad Request) if the akun is not valid, or with
     * status 500 (Internal Server Error) if the akun couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "{id}",method = RequestMethod.PUT)
    @Timed
    public ResponseEntity<TahunAjaran> updateTahunAjaran(@RequestBody TahunAjaran akun) throws URISyntaxException {
        log.debug("REST request to update TahunAjaran : {}", akun);
        if (akun.getId() == null) {
            return createTahunAjaran(akun);
        }
        TahunAjaran result = repository.save(akun);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, akun.getId().toString()))
                .body(result);
    }

    /**
     * DELETE /api/master/tahunajaran/:id : delete the "id" akun.
     *
     * @param id the id of the akun to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    @Timed
    public ResponseEntity<Void> deleteTahunAjaran(@PathVariable Integer id) {
        log.debug("REST request to delete TahunAjaran : {}", id);
        repository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
