/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.alfatih.model;

import id.alfatih.domain.akuntansi.*;
import java.util.Date;
import java.util.Set;

/**
 *
 * @author ustadho
 */
public class ProyekDto {
    private Integer id;
    private String kode;
    private Double budget;
    private String keterangan;
    private Proyek parent;
    private Set<Proyek> children;
    private Program program;
    private Date durasiAwal;
    private Date durasiAkhir;
    private boolean expanded;
    
    public ProyekDto(){        
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getKode() {
        return kode;
    }

    public void setKode(String kode) {
        this.kode = kode;
    }

    public Double getBudget() {
        return budget;
    }

    public void setBudget(Double budget) {
        this.budget = budget;
    }

    public Proyek getParent() {
        return parent;
    }

    public void setParent(Proyek parent) {
        this.parent = parent;
    }

    public String getKeterangan() {
        return keterangan;
    }

    public void setKeterangan(String keterangan) {
        this.keterangan = keterangan;
    }

    public Program getProgram() {
        return program;
    }

    public void setProgram(Program program) {
        this.program = program;
    }

    public Date getDurasiAwal() {
        return durasiAwal;
    }

    public void setDurasiAwal(Date durasiAwal) {
        this.durasiAwal = durasiAwal;
    }

    public Date getDurasiAkhir() {
        return durasiAkhir;
    }

    public void setDurasiAkhir(Date durasiAkhir) {
        this.durasiAkhir = durasiAkhir;
    }

    public Set<Proyek> getChildren() {
        return children;
    }

    public void setChildren(Set<Proyek> children) {
        this.children = children;
    }

    public boolean isExpanded() {
        return expanded;
    }

    public void setExpanded(boolean expanded) {
        this.expanded = expanded;
    }

}
