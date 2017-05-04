/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.alfatih.web.rest.akuntansi;

import com.codahale.metrics.annotation.Timed;
import id.alfatih.domain.akuntansi.Donatur;
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
import id.alfatih.repository.akuntansi.DonaturRepository;

/**
 *
 * @author ustadho
 */
@RestController
@RequestMapping("/api/akuntansi/donatur")
public class DonaturResource {

    private final Logger log = LoggerFactory.getLogger(DonaturResource.class);

    private static final String ENTITY_NAME = "donatur";

    private final DonaturRepository repository;

    public DonaturResource(DonaturRepository repository) {
        this.repository = repository;
    }

    @RequestMapping("/all")
    @Timed
    public List<Donatur> getAllDonaturs() {
        log.debug("REST request to get all Donatur");
        List<Donatur> x = repository.findAll();
        return x;
    }

    @RequestMapping(method = RequestMethod.GET)
    @Timed
    public ResponseEntity<List<Donatur>> filterAll(Pageable p) throws URISyntaxException {
        log.debug("REST request to get all Donatur by Page");
        Page<Donatur> x = repository.findAll(p);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(x, "/api/akuntansi/donatur");

        return new ResponseEntity<>(x.getContent(), headers, HttpStatus.OK);
    }

    @RequestMapping("/filter/{s}")
//    @RequestMapping("/{s}")
    @Timed
    public ResponseEntity<List<Donatur>> filterByKey(@PathVariable String s, Pageable p) throws URISyntaxException {
        log.debug("REST request to filter Donatur by key per page");
        Page<Donatur> x = repository.filterByKey("%" + s + "%", p);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(x, "/api/akuntansi/donatur");

        return new ResponseEntity<>(x.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET /api/akuntansi/donatur/:id : get the "id" akun.
     *
     * @param id the id of the akun to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the akun,
     * or with status 404 (Not Found)
     */
    @RequestMapping("{id}")
    @Timed
    public ResponseEntity<Donatur> getDonatur(@PathVariable Integer id) {
        log.debug("REST request get Donatur : {}", id);
        Donatur akun = repository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(akun));
    }

    /**
     * POST /api/akuntansi/donatur : Create a new akun.
     *
     * @param akun the akun to create
     * @return the ResponseEntity with status 201 (Created) and with body the
     * new akun, or with status 400 (Bad Request) if the akun has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(method = RequestMethod.POST)
    @Timed
    public ResponseEntity<Donatur> createDonatur(@RequestBody Donatur akun) throws URISyntaxException {
        log.debug("REST request to save akun : {}", akun);
        if (akun.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new akun cannot already have an ID")).body(null);
        }
        Donatur result = repository.save(akun);
        return ResponseEntity.created(new URI("/api/akuntansi/donatur/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * PUT /api/akuntansi/donatur : Updates an existing akun.
     *
     * @param akun the akun to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated
     * akun, or with status 400 (Bad Request) if the akun is not valid, or with
     * status 500 (Internal Server Error) if the akun couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    @Timed
    public ResponseEntity<Donatur> updateDonatur(@PathVariable Integer id, @RequestBody Donatur akun) throws URISyntaxException {
        log.debug("REST request to update Donatur : {}", akun);
        if (akun.getId() == null) {
            return createDonatur(akun);
        }
        Donatur result = repository.save(akun);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, akun.getId().toString()))
                .body(result);
    }

    /**
     * DELETE /api/akuntansi/donatur/:id : delete the "id" akun.
     *
     * @param id the id of the akun to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    @Timed
    public ResponseEntity<Void> deleteDonatur(@PathVariable Integer id) {
        log.debug("REST request to delete Donatur : {}", id);
        repository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
