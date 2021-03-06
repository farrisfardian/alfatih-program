package id.alfatih.domain.model;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import id.alfatih.domain.akuntansi.*;
import id.alfatih.domain.akademik.Cabang;
import java.util.Date;
import java.util.Set;
import javax.validation.constraints.NotNull;
import org.hibernate.validator.constraints.NotEmpty;

/**
 *
 * @author ustadho
 */
public class AkunVM {
    private Integer id;

    @NotEmpty
    @NotNull
    private String kode;

    @NotEmpty
    @NotNull
    private String nama;

    private String keterangan;

    private KelompokAkun kelompok;

    private MataUang mataUang;

    private Akun parent;

    private Set<Akun> children;

    private Cabang cabang;

    private Boolean aktif;

    private boolean expanded;

    private String createdBy;

    private Date createdDate;
    
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

    public String getKeterangan() {
        return keterangan;
    }

    public void setKeterangan(String keterangan) {
        this.keterangan = keterangan;
    }

    public KelompokAkun getKelompok() {
        return kelompok;
    }

    public void setKelompok(KelompokAkun kelompok) {
        this.kelompok = kelompok;
    }

    public MataUang getMataUang() {
        return mataUang;
    }

    public void setMataUang(MataUang mataUang) {
        this.mataUang = mataUang;
    }

    public Cabang getCabang() {
        return cabang;
    }

    public void setCabang(Cabang cabang) {
        this.cabang = cabang;
    }

    public Boolean getAktif() {
        return aktif;
    }

    public void setAktif(Boolean aktif) {
        this.aktif = aktif;
    }

    public Akun getParent() {
        return parent;
    }

    public void setParent(Akun parent) {
        this.parent = parent;
    }

    public Set<Akun> getChildren() {
        return children;
    }

    public void setChildren(Set<Akun> children) {
        this.children = children;
    }

    public boolean getExpanded() {
        return this.expanded;
    }

    public void setExpanded(boolean expanded) {
        this.expanded = expanded;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

}
