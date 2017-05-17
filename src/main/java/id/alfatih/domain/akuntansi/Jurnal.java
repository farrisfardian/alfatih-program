/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.alfatih.domain.akuntansi;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import id.alfatih.domain.akademik.Cabang;
import id.alfatih.domain.akademik.Unit;
import java.util.Date;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.hibernate.annotations.GenericGenerator;

/**
 *
 * @author faheem
 */
@Entity
@Table(name = "acc_jurnal")
public class Jurnal {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    @Column(length = 36)
    private String id;

    @Column(name = "no_voucher")
    private String noVoucher;
    @Temporal(TemporalType.DATE)
    @Column
    private Date tanggal;
    @Column(columnDefinition = "text")
    private String keterangan;
    @Column(name = "terima_dari")
    private String terimaDari;
    @Column(name = "multi_currency")
    private Boolean multiCurrency;
    @ManyToOne
    @JoinColumn(name = "id_dokumen")
    private DokumenSumber dokumen;
    @ManyToOne
    @JoinColumn(name = "id_cabang")
    private Cabang cabang;
    @ManyToOne
    @JoinColumn(name = "id_jenis_jurnal")
    private JenisJurnal jenis;
    @OneToMany(mappedBy = "jurnal", cascade = {javax.persistence.CascadeType.ALL}, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private Set<JurnalDetail> listJurnalDetail;
    
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "post_time")
    private Date postTime;
    
    @Column(name = "post_by", length = 50)
    private String postBy;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNoVoucher() {
        return noVoucher;
    }

    public void setNoVoucher(String noVoucher) {
        this.noVoucher = noVoucher;
    }

    public Date getTanggal() {
        return tanggal;
    }

    public void setTanggal(Date tanggal) {
        this.tanggal = tanggal;
    }

    public String getKeterangan() {
        return keterangan;
    }

    public void setKeterangan(String keterangan) {
        this.keterangan = keterangan;
    }

    public DokumenSumber getDokumen() {
        return dokumen;
    }

    public void setDokumen(DokumenSumber dokumen) {
        this.dokumen = dokumen;
    }

    public Set<JurnalDetail> getListJurnalDetail() {
        return listJurnalDetail;
    }

    public void setListJurnalDetail(Set<JurnalDetail> listJurnalDetail) {
        this.listJurnalDetail = listJurnalDetail;
    }

    public Boolean getMultiCurrency() {
        return multiCurrency;
    }

    public void setMultiCurrency(Boolean multiCurrency) {
        this.multiCurrency = multiCurrency;
    }

    public JenisJurnal getJenis() {
        return jenis;
    }

    public void setJenis(JenisJurnal jenis) {
        this.jenis = jenis;
    }

    public String getTerimaDari() {
        return terimaDari;
    }

    public void setTerimaDari(String terimaDari) {
        this.terimaDari = terimaDari;
    }

    public Cabang getCabang() {
        return cabang;
    }

    public void setCabang(Cabang cabang) {
        this.cabang = cabang;
    }

    public Date getPostTime() {
        return postTime;
    }

    public void setPostTime(Date postTime) {
        this.postTime = postTime;
    }

    public String getPostBy() {
        return postBy;
    }

    public void setPostBy(String postBy) {
        this.postBy = postBy;
    }
    
}

