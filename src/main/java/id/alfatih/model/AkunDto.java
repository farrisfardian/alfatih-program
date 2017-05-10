/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.alfatih.model;

import java.util.List;

/**
 *
 * @author ustadho
 */
public class AkunDto {
    private Integer id;
    private String kode;
    private String nama;
    private String kelompok;
    private boolean expanded;
    private List<AkunDto> children;

    public AkunDto(Integer id, String kode, String nama, String kelompok, boolean expanded, List<AkunDto> children) {
        this.id = id;
        this.kode = kode;
        this.nama = nama;
        this.kelompok = kelompok;
        this.expanded = expanded;
        this.children = children;
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

    public String getNama() {
        return nama;
    }

    public void setNama(String nama) {
        this.nama = nama;
    }

    public String getKelompok() {
        return kelompok;
    }

    public void setKelompok(String kelompok) {
        this.kelompok = kelompok;
    }

    public boolean isExpanded() {
        return expanded;
    }

    public void setExpanded(boolean expanded) {
        this.expanded = expanded;
    }

    public List<AkunDto> getChildren() {
        return children;
    }

    public void setChildren(List<AkunDto> children) {
        this.children = children;
    }
    
    
}
