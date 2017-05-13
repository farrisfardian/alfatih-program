/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.alfatih.model;

import id.alfatih.domain.akademik.Cabang;
import id.alfatih.domain.akademik.TahunAjaran;
import id.alfatih.domain.akuntansi.Program;
import id.alfatih.domain.akuntansi.SkemaBudget;
import java.util.Date;
import java.util.List;
import java.util.Set;

/**
 *
 * @author ustadho
 */
public class ProgramDto {

    private Integer id;
    private String nama;
    private String kode;
    private Date tglMulai;
    private Date tglSelesai;
    private Date tglPerencanaan;
    private Boolean aktif;
    private Boolean expanded;
    private Double budget;
    private String pelaksana;
    private String status;
    private Program parent;
    private TahunAjaran tahunAjaran;
    private Cabang cabang;
    private SkemaBudget skemaBudget;
    private Set<Program> children;

    public ProgramDto(){}
    public ProgramDto(Integer id,
            String nama,
            String kode,
            Date tglMulai,
            Date tglSelesai,
            Date tglPerencanaan,
            Boolean aktif,
            Boolean expanded,
            Double budget,
            String pelaksana,
            String status,
            Program parent,
            TahunAjaran tahunAjaran,
            Cabang cabang,
            SkemaBudget skemaBudget,
            List<Program> children) {
        this.id = id;
        this.nama = nama;
        this.kode = kode;
        this.tglMulai = tglMulai;
        this.tglSelesai = tglSelesai;
        this.tglPerencanaan = tglPerencanaan;
        this.aktif = aktif;
        this.expanded = expanded;
        this.budget = budget;
        this.pelaksana = pelaksana;
        this.status = status;
        this.parent = parent;
        this.tahunAjaran = tahunAjaran;
        this.cabang = cabang;
        this.skemaBudget = skemaBudget;
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

    public Set<Program> getChildren() {
        return children;
    }

    public void setChildren(Set<Program> children) {
        this.children = children;
    }

    public Date getTglMulai() {
        return tglMulai;
    }

    public void setTglMulai(Date tglMulai) {
        this.tglMulai = tglMulai;
    }

    public Date getTglSelesai() {
        return tglSelesai;
    }

    public void setTglSelesai(Date tglSelesai) {
        this.tglSelesai = tglSelesai;
    }

    public Date getTglPerencanaan() {
        return tglPerencanaan;
    }

    public void setTglPerencanaan(Date tglPerencanaan) {
        this.tglPerencanaan = tglPerencanaan;
    }

    public Boolean getAktif() {
        return aktif;
    }

    public void setAktif(Boolean aktif) {
        this.aktif = aktif;
    }

    public Double getBudget() {
        return budget;
    }

    public void setBudget(Double budget) {
        this.budget = budget;
    }

    public String getPelaksana() {
        return pelaksana;
    }

    public void setPelaksana(String pelaksana) {
        this.pelaksana = pelaksana;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Program getParent() {
        return parent;
    }

    public void setParent(Program parent) {
        this.parent = parent;
    }

    public TahunAjaran getTahunAjaran() {
        return tahunAjaran;
    }

    public void setTahunAjaran(TahunAjaran tahunAjaran) {
        this.tahunAjaran = tahunAjaran;
    }

    public Cabang getCabang() {
        return cabang;
    }

    public void setCabang(Cabang cabang) {
        this.cabang = cabang;
    }

    public SkemaBudget getSkemaBudget() {
        return skemaBudget;
    }

    public void setSkemaBudget(SkemaBudget skemaBudget) {
        this.skemaBudget = skemaBudget;
    }

    public Boolean getExpanded() {
        return expanded;
    }

    public void setExpanded(Boolean expanded) {
        this.expanded = expanded;
    }

}
