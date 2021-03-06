/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.alfatih.domain.akuntansi;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import id.alfatih.domain.akademik.TahunAjaran;
import id.alfatih.domain.akademik.Cabang;
import java.util.Date;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.validator.constraints.NotEmpty;

/**
 *
 * @author ustadho
 */
@Entity
@Table(name = "acc_program")
public class Program {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @NotEmpty
    @Column(unique = true, nullable = false)
    private String nama;

    @Column(unique = true, length = 20)
    private String kode;

    @Temporal(TemporalType.DATE)
    @Column(name = "tgl_mulai")
    private Date tglMulai;

    @Temporal(TemporalType.DATE)
    @Column(name = "tgl_selesai")
    private Date tglSelesai;

    @Temporal(TemporalType.DATE)
    @Column(name = "tgl_perencanaan")
    private Date tglPerencanaan;
    @Column
    private Boolean aktif;
    @Column
    private Double budget;
    private String pelaksana;
    private String status;

    @ManyToOne
    @JoinColumn(name = "id_parent")
    @JsonBackReference
    private Program parent;

    @OneToMany(mappedBy = "parent", fetch = FetchType.EAGER)
    @JsonManagedReference
    private Set<Program> children;

    @ManyToOne
    @JoinColumn(name = "id_tahun_ajaran")
    private TahunAjaran tahunAjaran;

    @ManyToOne
    @JoinColumn(name = "id_cabang")
    private Cabang cabang;

    @ManyToOne
    @JoinColumn(name = "id_skema_budget")
    private SkemaBudget skemaBudget;
    
    @ColumnDefault(value = "true")
    private boolean expanded;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNama() {
        return nama;
    }

    public void setNama(String nama) {
        this.nama = nama;
    }

    public String getKode() {
        return kode;
    }

    public void setKode(String kode) {
        this.kode = kode;
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

    public void setStatus(String satus) {
        this.status = satus;
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

    public void setCabang(Cabang unit) {
        this.cabang = unit;
    }

    public SkemaBudget getSkemaBudget() {
        return skemaBudget;
    }

    public void setSkemaBudget(SkemaBudget skemaBudget) {
        this.skemaBudget = skemaBudget;
    }


    public Set<Program> getChildren() {
        return children;
    }

    public void setChildren(Set<Program> children) {
        this.children = children;
    }

    public boolean isExpanded() {
        return expanded;
    }

    public void setExpanded(boolean expanded) {
        this.expanded = expanded;
    }

}
