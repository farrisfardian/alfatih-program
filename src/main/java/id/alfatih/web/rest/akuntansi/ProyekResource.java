/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.alfatih.web.rest.akuntansi;

import com.codahale.metrics.annotation.Timed;
import id.alfatih.domain.akuntansi.Proyek;
import id.alfatih.model.ProyekDto;
import id.alfatih.repository.akuntansi.ProyekRepository;
import id.alfatih.repository.jdbc.ProyekRepositoryJdbc;
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
@RequestMapping("/api/anggaran/proyek")
public class ProyekResource {

    private final Logger log = LoggerFactory.getLogger(ProyekResource.class);

    private static final String ENTITY_NAME = "program";

    private final ProyekRepository repository;
    private final ProyekRepositoryJdbc repositoryJdbc;

    public ProyekResource(ProyekRepository repository, ProyekRepositoryJdbc repositoryJdbc) {
        this.repository = repository;
        this.repositoryJdbc = repositoryJdbc;
    }

    @RequestMapping("/parent-children")
    @Timed
    public List<Proyek> listParentChildren() {
        log.debug("REST request to get parent children");
        List<Proyek> x = repository.listParentChildren();
        return x;
    }
    
    @RequestMapping("/parent-children/{idProgram}")
    @Timed
    public List<Proyek> listParentChildrenByProgram(@PathVariable Integer idProgram) {
        log.debug("REST request to get parent children by program");
        List<Proyek> x = repository.listParentChildrenByProgram(idProgram);
        return x;
    }

    @RequestMapping(value = "/list-flat", method = RequestMethod.GET)
    public Object ambilSemuaFlat() {
        return repositoryJdbc.filterProyek(null);
    }

    @RequestMapping(value = "/list-flat-by-program/{idProgram}", method = RequestMethod.GET)
    public Object ambilSemuaFlatByProgram(@PathVariable Integer idProgram) {
        return repositoryJdbc.filterProyekByProgram(idProgram);
    }

    @RequestMapping("/all")
    @Timed
    public List<Proyek> getAllJenisProyeks() {
        log.debug("REST request to get all Proyek");
        List<Proyek> x = repository.findAll();
        return x;
    }

    @RequestMapping(method = RequestMethod.GET)
    @Timed
    public ResponseEntity<List<Proyek>> filterAll(Pageable p) throws URISyntaxException {
        log.debug("REST request to get all Proyek by Page");
        Page<Proyek> x = repository.findAll(p);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(x, "/api/akuntansi/program");

        return new ResponseEntity<>(x.getContent(), headers, HttpStatus.OK);
    }

    @RequestMapping("/filter/{s}")
    @Timed
    public ResponseEntity<List<Proyek>> filterByKey(@PathVariable String s, Pageable p) throws URISyntaxException {
        log.debug("REST request to filter Proyek by key per page");
        Page<Proyek> x = repository.filterByKey("%" + s + "%", p);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(x, "/api/akuntansi/program");

        return new ResponseEntity<>(x.getContent(), headers, HttpStatus.OK);
    }

    @RequestMapping("/filter-endpoint-all")
    @Timed
    public ResponseEntity<List<Proyek>> filterEndpointAll(Pageable p) throws URISyntaxException {
        log.debug("REST request to filter Proyek by key per page");
        Page<Proyek> x = repository.filterEndpointByKey("%%", p);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(x, "/api/akuntansi/program");

        return new ResponseEntity<>(x.getContent(), headers, HttpStatus.OK);
    }

    @RequestMapping("/filter-endpoint/{s}")
    @Timed
    public ResponseEntity<List<Proyek>> filterEndpointByKey(@PathVariable String s, Pageable p) throws URISyntaxException {
        log.debug("REST request to filter Proyek by key per page");
        Page<Proyek> x = repository.filterEndpointByKey("%" + s + "%", p);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(x, "/api/akuntansi/program");

        return new ResponseEntity<>(x.getContent(), headers, HttpStatus.OK);
    }

    @RequestMapping("/find-by-program/{id}")
    @Timed
    public List<Proyek> findByProgram(@PathVariable Integer id) throws URISyntaxException {
        log.debug("REST request to find by unit id: [{}]", id);
        List<Proyek> x = repository.findByProgram(id);
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
    public ResponseEntity<ProyekDto> getProyek(@PathVariable Integer id) {
        log.debug("REST request get Proyek : {}", id);
        Proyek akun = repository.findOne(id);
        ProyekDto a = new ProyekDto();
        a.setBudget(akun.getBudget());
        a.setChildren(akun.getChildren());
        a.setDurasiAkhir(akun.getDurasiAkhir());
        a.setDurasiAwal(akun.getDurasiAwal());
        a.setExpanded(akun.isExpanded());
        a.setId(akun.getId());
        a.setKeterangan(akun.getKeterangan());
        a.setKode(akun.getKode());
        a.setParent(akun.getParent());
        a.setProgram(akun.getProgram());
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(a));
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
    public ResponseEntity<Proyek> createProyek(@RequestBody Proyek akun) throws URISyntaxException {
        log.debug("REST request to save akun : {}", akun);
        if (akun.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new akun cannot already have an ID")).body(null);
        }
        Proyek result = repository.save(akun);
        if (result.getParent() != null) {
            repositoryJdbc.hitungBudgetParent(result.getParent().getId());
        }
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
    public ResponseEntity<Proyek> updateProyek(@RequestBody Proyek akun) throws URISyntaxException {
        log.debug("REST request to update Proyek : {}", akun);
        if (akun.getId() == null) {
            return createProyek(akun);
        }
        Proyek result = repository.save(akun);
        if (result.getParent() != null) {
            repositoryJdbc.hitungBudgetParent(result.getParent().getId());
        }
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
    public ResponseEntity<Void> deleteProyek(@PathVariable Integer id) {
        log.debug("REST request to delete Proyek : {}", id);
        Proyek findOne = repository.findOne(id);
        repository.delete(id);
        if (findOne.getParent() != null) {
            repositoryJdbc.hitungBudgetParent(findOne.getParent().getId());
        }
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
