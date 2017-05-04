/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.alfatih.repository.akuntansi;


import id.alfatih.domain.akuntansi.SkemaBudget;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author ustadho
 */
public interface SkemaBudgetRepository extends JpaRepository<SkemaBudget, String>{
    public Page<SkemaBudget> findByNamaContainingIgnoreCase(String nama, Pageable pr);    
}
