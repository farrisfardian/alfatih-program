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
public class ProyekTreeDto {
    private Integer id;
    private String kode;
    private Double budget;
    private String keterangan;
    private Integer parentId;
    private Integer idProgram;
    private String namaProgram;
    private Date durasiAwal;
    private Date durasiAkhir;
    private boolean expanded;
    
    public ProyekTreeDto(){        
    }

    public ProyekTreeDto(Integer id, String kode, Double budget, String keterangan, Integer parentId, Integer idProgram, String namaProgram, Date durasiAwal, Date durasiAkhir, boolean expanded) {
        this.id = id;
        this.kode = kode;
        this.budget = budget;
        this.keterangan = keterangan;
        this.parentId = parentId;
        this.idProgram = idProgram;
        this.namaProgram = namaProgram;
        this.durasiAwal = durasiAwal;
        this.durasiAkhir = durasiAkhir;
        this.expanded = expanded;
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

    public String getKeterangan() {
        return keterangan;
    }

    public void setKeterangan(String keterangan) {
        this.keterangan = keterangan;
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

    public boolean isExpanded() {
        return expanded;
    }

    public void setExpanded(boolean expanded) {
        this.expanded = expanded;
    }

    public Integer getIdProgram() {
        return idProgram;
    }

    public void setIdProgram(Integer idProgram) {
        this.idProgram = idProgram;
    }

    public String getNamaProgram() {
        return namaProgram;
    }

    public void setNamaProgram(String namaProgram) {
        this.namaProgram = namaProgram;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

}
