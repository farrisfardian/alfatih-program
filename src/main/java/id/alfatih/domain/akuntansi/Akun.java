package id.alfatih.domain.akuntansi;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import id.alfatih.domain.akademik.Cabang;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
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
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.validator.constraints.NotEmpty;

/**
 *
 * @author ustadho
 */
@Entity
@Table(name = "acc_akun")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Akun implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotEmpty
    @NotNull
    @Column(name = "kode", nullable = false, unique = true, length = 15)
    private String kode;

    @NotEmpty
    @NotNull
    @Column(name = "nama", nullable = false, unique = true)
    private String nama;

    @Column(columnDefinition = "text")
    private String keterangan;

    @Column
    private String createdBy;

    @Temporal(TemporalType.TIMESTAMP)
    @Column
    private Date createdDate;

    @ManyToOne
    @JoinColumn(name = "id_kelompok")
    private KelompokAkun kelompok;

    @ManyToOne
    @JoinColumn(name = "id_mata_uang")
    private MataUang mataUang;

    @ManyToOne
    @JoinColumn(name = "id_parent")
    @JsonBackReference
    private Akun parent;

    @OneToMany(mappedBy = "parent", fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<Akun> children;

    @ManyToOne
    @JoinColumn(name = "id_cabang")
    private Cabang cabang;

    @ColumnDefault(value = "true")
    private Boolean aktif;

    @ColumnDefault(value = "true")
    private boolean expanded;

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

    public Akun getParent() {
        return parent;
    }

    public void setParent(Akun parent) {
        this.parent = parent;
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

    public List<Akun> getChildren() {
        return children;
    }

    public void setChildren(List<Akun> children) {
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
