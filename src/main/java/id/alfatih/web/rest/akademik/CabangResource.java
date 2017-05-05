/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.alfatih.web.rest.akademik;

import com.codahale.metrics.annotation.Timed;
import id.alfatih.domain.akademik.Cabang;
import id.alfatih.repository.CabangRepository;
import id.alfatih.repository.UnitRepository;
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
@RequestMapping("/api/master/cabang")
public class CabangResource {
    private final Logger log=LoggerFactory.getLogger(CabangResource.class);
    
    private static final String ENTITY_NAME = "cabang";
    
    private final CabangRepository repository;

    public CabangResource(CabangRepository repository) {
        this.repository = repository;
    }
    
    @RequestMapping("/all")
    @Timed
    public List<Cabang> getAllUnits() {
        log.debug("REST request to get all Unit");
        List<Cabang> x = repository.findAll();
        return x;
    }
    
    @RequestMapping(method = RequestMethod.GET)
    @Timed
    public ResponseEntity<List<Cabang>> filterAll(Pageable p) throws URISyntaxException {
        log.debug("REST request to get all Unit by Page");
        Page<Cabang> x = repository.findAll(p);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(x, "/api/master/cabang");
        
        return new ResponseEntity<>(x.getContent(), headers, HttpStatus.OK);
    }
    
    @RequestMapping("/filter/{s}")
    @Timed
    public ResponseEntity<List<Cabang>> filterByKey(@PathVariable String s, Pageable p) throws URISyntaxException {
        log.debug("REST request to filter Unit by key per page");
        Page<Cabang> x = repository.filterByKey("%"+s+"%", p);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(x, "/api/master/cabang");
        
        return new ResponseEntity<>(x.getContent(), headers, HttpStatus.OK);
    }
    
    /**
     * GET  /api/master/cabang/:id : get the "id" cabang.
     *
     * @param id the id of the cabang to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cabang, or with status 404 (Not Found)
     */
    @RequestMapping("{id}")
    @Timed
    public ResponseEntity<Cabang> getCabang(@PathVariable Integer id){
        log.debug("REST request get Cabang : {}", id);
        Cabang cabang = repository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cabang));
    }
    
    /**
     * POST  /api/master/cabang : Create a new cabang.
     *
     * @param cabang the cabang to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cabang, or with status 400 (Bad Request) if the cabang has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(method = RequestMethod.POST)
    @Timed
    public ResponseEntity<Cabang> createUnit(@RequestBody Cabang x) throws URISyntaxException {
        log.debug("REST request to save Cabang : {}", x);
        if (x.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new cabang cannot already have an ID")).body(null);
        }
        Cabang result = repository.save(x);
        return ResponseEntity.created(new URI("/api/master/cabang/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }
    
    /**
     * PUT  /api/master/cabang : Updates an existing cabang.
     *
     * @param cabang the cabang to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cabang,
     * or with status 400 (Bad Request) if the cabang is not valid,
     * or with status 500 (Internal Server Error) if the cabang couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(method = RequestMethod.PUT)
    @Timed
    public ResponseEntity<Cabang> updateUnit(@RequestBody Cabang cabang) throws URISyntaxException {
        log.debug("REST request to update Unit : {}", cabang);
        if (cabang.getId() == null) {
            return createUnit(cabang);
        }
        Cabang result = repository.save(cabang);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cabang.getId().toString()))
            .body(result);
    }
    
    /**
     * DELETE  /api/akademik/cabang/:id : delete the "id" cabang.
     *
     * @param id the id of the cabang to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    @Timed
    public ResponseEntity<Void> deleteUnit(@PathVariable Integer id) {
        log.debug("REST request to delete Unit : {}", id);
        repository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
