/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.alfatih.web.rest.akuntansi;

import com.codahale.metrics.annotation.Timed;
import id.alfatih.domain.akuntansi.AkadSumberDana;
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
import id.alfatih.repository.akuntansi.AkadSumberDanaRepository;

/**
 *
 * @author ustadho
 */
@RestController
@RequestMapping("/api/akuntansi/akad-sumberdana")
public class AkadSumberDanaResource {

    private final Logger log = LoggerFactory.getLogger(AkadSumberDanaResource.class);

    private static final String ENTITY_NAME = "AkadSumberDana";

    private final AkadSumberDanaRepository repository;

    public AkadSumberDanaResource(AkadSumberDanaRepository repository) {
        this.repository = repository;
    }

    @RequestMapping("/all")
    @Timed
    public List<AkadSumberDana> getAll() {
        log.debug("REST request to get all AkadSumberDana");
        List<AkadSumberDana> x = repository.findAll();
        return x;
    }

    @RequestMapping(method = RequestMethod.GET)
    @Timed
    public ResponseEntity<List<AkadSumberDana>> filterAll(Pageable p) throws URISyntaxException {
        log.debug("REST request to get all AkadSumberDana by Page");
        Page<AkadSumberDana> x = repository.findAll(p);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(x, "/api/akuntansi/AkadSumberDana");

        return new ResponseEntity<>(x.getContent(), headers, HttpStatus.OK);
    }

    @RequestMapping("/filter-by-program/{idProgram}/{s}")
    @Timed
    public ResponseEntity<List<AkadSumberDana>> filterByProgram(@PathVariable Integer idProgram, @PathVariable String s, Pageable p) throws URISyntaxException {
        log.debug("REST request to filter AkadSumberDana by key per page");
        Page<AkadSumberDana> x = repository.filterByIdProgram("%" + s + "%", idProgram, p);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(x, "/api/akuntansi/akad-donatur");

        return new ResponseEntity<>(x.getContent(), headers, HttpStatus.OK);
    }

    @RequestMapping("/filter-by-sumberdana/{idSd}")
    @Timed
    public List<AkadSumberDana> filterBySumberDanaAll(@PathVariable Integer idSd) throws URISyntaxException {
        log.debug("REST request to filter AkadSumberDana by key per page");
        return repository.listBySumberDana(idSd);
    }
    
    @RequestMapping("/filter-by-sumberdana/{idSd}/{s}")
    @Timed
    public ResponseEntity<List<AkadSumberDana>> filterBySumberDana(@PathVariable Integer idSd, @PathVariable String s, Pageable p) throws URISyntaxException {
        log.debug("REST request to filter AkadSumberDana by key per page");
        Page<AkadSumberDana> x = repository.filterByIdSumberDana("%" + s + "%", idSd, p);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(x, "/api/akuntansi/akad-donatur");

        return new ResponseEntity<>(x.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET /api/akuntansi/akad-donatur/:id : get the "id" akun.
     *
     * @param id the id of the akun to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the akun,
     * or with status 404 (Not Found)
     */
    @RequestMapping("{id}")
    @Timed
    public ResponseEntity<AkadSumberDana> getAkadSumberDana(@PathVariable String id) {
        log.debug("REST request get AkadSumberDana : {}", id);
        AkadSumberDana akun = repository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(akun));
    }

    /**
     * POST /api/akuntansi/akad-donatur : Create a new akun.
     *
     * @param akun the akun to create
     * @return the ResponseEntity with status 201 (Created) and with body the
     * new akun, or with status 400 (Bad Request) if the akun has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(method = RequestMethod.POST)
    @Timed
    public ResponseEntity<AkadSumberDana> createAkadSumberDana(@RequestBody AkadSumberDana akun) throws URISyntaxException {
        log.debug("REST request to save akun : {}", akun);
        if (akun.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new akun cannot already have an ID")).body(null);
        }
        AkadSumberDana result = repository.save(akun);
        return ResponseEntity.created(new URI("/api/akuntansi/akad-donatur/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * PUT /api/akuntansi/akad-donatur : Updates an existing akun.
     *
     * @param akun the akun to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated
     * akun, or with status 400 (Bad Request) if the akun is not valid, or with
     * status 500 (Internal Server Error) if the akun couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    @Timed
    public ResponseEntity<AkadSumberDana> updateAkadSumberDana(@PathVariable String id, @RequestBody AkadSumberDana akun) throws URISyntaxException {
        log.debug("REST request to update AkadSumberDana : {}", akun);
        if (akun.getId() == null) {
            return createAkadSumberDana(akun);
        }
        AkadSumberDana result = repository.save(akun);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, akun.getId().toString()))
                .body(result);
    }

    /**
     * DELETE /api/akuntansi/akad-donatur/:id : delete the "id" akun.
     *
     * @param id the id of the akun to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    @Timed
    public ResponseEntity<Void> deleteAkadSumberDana(@PathVariable String id) {
        log.debug("REST request to delete AkadSumberDana : {}", id);
        repository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
