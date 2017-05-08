/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.alfatih.web.rest.akuntansi;

import com.codahale.metrics.annotation.Timed;
import id.alfatih.domain.akuntansi.Program;
import id.alfatih.repository.akuntansi.ProgramRepository;
import id.alfatih.repository.jdbc.ProgramRepositoryJdbc;
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
@RequestMapping("/api/anggaran/program")
public class ProgramResource {

    private final Logger log = LoggerFactory.getLogger(ProgramResource.class);

    private static final String ENTITY_NAME = "program";

    private final ProgramRepository repository;
    private final ProgramRepositoryJdbc repositoryJdbc;

    public ProgramResource(ProgramRepository repository, ProgramRepositoryJdbc repositoryJdbc) {
        this.repository = repository;
        this.repositoryJdbc = repositoryJdbc;
    }

    @RequestMapping(value = "/list-flat", method = RequestMethod.GET)
    public Object ambilSemuaFlat() {
        return repositoryJdbc.filterProgram(null);
    }

    @RequestMapping("/all")
    @Timed
    public List<Program> getAllJenisPrograms() {
        log.debug("REST request to get all Program");
        List<Program> x = repository.findAll();
        return x;
    }

    @RequestMapping(method = RequestMethod.GET)
    @Timed
    public ResponseEntity<List<Program>> filterAll(Pageable p) throws URISyntaxException {
        log.debug("REST request to get all Program by Page");
        Page<Program> x = repository.findAll(p);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(x, "/api/akuntansi/program");

        return new ResponseEntity<>(x.getContent(), headers, HttpStatus.OK);
    }

    @RequestMapping("/filter/{s}")
    @Timed
    public ResponseEntity<List<Program>> filterByKey(@PathVariable String s, Pageable p) throws URISyntaxException {
        log.debug("REST request to filter Program by key per page");
        Page<Program> x = repository.filterByKey("%" + s + "%", p);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(x, "/api/akuntansi/program");

        return new ResponseEntity<>(x.getContent(), headers, HttpStatus.OK);
    }
    
    @RequestMapping("/filter-endpoint-all")
    @Timed
    public ResponseEntity<List<Program>> filterEndpointAll(Pageable p) throws URISyntaxException {
        log.debug("REST request to filter Program by key per page");
        Page<Program> x = repository.filterEndpointByKey("%%", p);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(x, "/api/akuntansi/program");

        return new ResponseEntity<>(x.getContent(), headers, HttpStatus.OK);
    }
    
    @RequestMapping("/filter-endpoint/{s}")
    @Timed
    public ResponseEntity<List<Program>> filterEndpointByKey(@PathVariable String s, Pageable p) throws URISyntaxException {
        log.debug("REST request to filter Program by key per page");
        Page<Program> x = repository.filterEndpointByKey("%" + s + "%", p);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(x, "/api/akuntansi/program");

        return new ResponseEntity<>(x.getContent(), headers, HttpStatus.OK);
    }
    @RequestMapping("/find-by-unit/{id}")
    @Timed
    public List<Program> findByUnit(@PathVariable Integer id) throws URISyntaxException {
        log.debug("REST request to find by unit id: [{}]", id);
        List<Program> x = repository.findByUnit(id);
        return x;
    }

    /**
     * GET /api/akuntansi/program/:id : get the "id" akun.
     *
     * @param id the id of the akun to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the akun,
     * or with status 404 (Not Found)
     */
    @RequestMapping("{id}")
    @Timed
    public ResponseEntity<Program> getProgram(@PathVariable Integer id) {
        log.debug("REST request get Program : {}", id);
        Program akun = repository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(akun));
    }

    /**
     * POST /api/akuntansi/program : Create a new akun.
     *
     * @param akun the akun to create
     * @return the ResponseEntity with status 201 (Created) and with body the
     * new akun, or with status 400 (Bad Request) if the akun has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(method = RequestMethod.POST)
    @Timed
    public ResponseEntity<Program> createProgram(@RequestBody Program akun) throws URISyntaxException {
        log.debug("REST request to save akun : {}", akun);
        if (akun.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new akun cannot already have an ID")).body(null);
        }
        Optional<Program> existingProgram = repository.findOneByKode(akun.getKode());
        if (existingProgram.isPresent() && (!existingProgram.get().getId().equals(akun.getId()))) {
            return ResponseEntity.badRequest()
                .headers(HeaderUtil.createFailureAlert("program", "kodeExists", "Kode sudah digunakan"))
                .body(null);
        }
        
        Program result = repository.save(akun);
        return ResponseEntity.created(new URI("/api/akuntansi/program/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * PUT /api/akuntansi/program : Updates an existing akun.
     *
     * @param akun the akun to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated
     * akun, or with status 400 (Bad Request) if the akun is not valid, or with
     * status 500 (Internal Server Error) if the akun couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    @Timed
    public ResponseEntity<Program> updateProgram(@PathVariable Integer id, @RequestBody Program akun) throws URISyntaxException {
        log.debug("REST request to update Program : {}", akun);
        Program p = repository.findOne(id);
        akun.setId(p.getId());
        if (akun.getId() == null) {
            return createProgram(akun);
        }
        Optional<Program> existingProgram = repository.findOneByKode(akun.getKode());
        if (existingProgram.isPresent() && (!existingProgram.get().getId().equals(akun.getId()))) {
            return ResponseEntity.badRequest()
                .headers(HeaderUtil.createFailureAlert("program", "kodeExists", "Kode sudah digunakan"))
                .body(null);
        }
        Program result = repository.save(akun);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, akun.getId().toString()))
                .body(result);
    }

    /**
     * DELETE /api/akuntansi/program/:id : delete the "id" akun.
     *
     * @param id the id of the akun to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    @Timed
    public ResponseEntity<Void> deleteProgram(@PathVariable Integer id) {
        log.debug("REST request to delete Program : {}", id);
        repository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
