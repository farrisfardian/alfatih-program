/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.alfatih.domain.akuntansi;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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
@Table(name = "acc_uang_muka")
public class UangMuka {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    @Column(length = 36)
    private String id;

    @Column(name = "no_bukti")
    private String noBukti;
    @Temporal(TemporalType.DATE)
    @Column
    private Date tanggal;
    @Column
    private String keterangan;
    @Column(name = "dibayar_kepada")
    private String dibayarKepada;
    @Column(name = "no_cek")
    private String noCek;
    @Column
    private String kegiatan;
    @Column
    private String lokasi;
    @Temporal(TemporalType.DATE)
    @Column(name = "tgl_mulai")
    private Date tglMulai;
    @Temporal(TemporalType.DATE)
    @Column(name = "tgl_selesai")
    private Date tglSelesai;
    @ManyToOne
    @JoinColumn(name = "id_akun_sumber")
    private Akun akunSumber;
    @ManyToOne
    @JoinColumn(name = "id_akun_um")
    private Akun akunUangMuka;
    @ManyToOne
    @JoinColumn(name = "id_sumberDana")
    private SumberDana sumberDana;
    @Column
    private String divisi;
    @OneToMany(mappedBy = "uangMuka", cascade = {javax.persistence.CascadeType.ALL}, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private Set<UangMukaDetail> listUangMukaDetail;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNoBukti() {
        return noBukti;
    }

    public void setNoBukti(String noBukti) {
        this.noBukti = noBukti;
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

    public String getDibayarKepada() {
        return dibayarKepada;
    }

    public void setDibayarKepada(String dibayarKepada) {
        this.dibayarKepada = dibayarKepada;
    }

    public String getNoCek() {
        return noCek;
    }

    public void setNoCek(String noCek) {
        this.noCek = noCek;
    }

    public String getKegiatan() {
        return kegiatan;
    }

    public void setKegiatan(String kegiatan) {
        this.kegiatan = kegiatan;
    }

    public String getLokasi() {
        return lokasi;
    }

    public void setLokasi(String lokasi) {
        this.lokasi = lokasi;
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

    public String getDivisi() {
        return divisi;
    }

    public void setDivisi(String divisi) {
        this.divisi = divisi;
    }

    public Set<UangMukaDetail> getListUangMukaDetail() {
        return listUangMukaDetail;
    }

    public void setListUangMukaDetail(Set<UangMukaDetail> listUangMukaDetail) {
        this.listUangMukaDetail = listUangMukaDetail;
    }

    public Akun getAkunSumber() {
        return akunSumber;
    }

    public void setAkunSumber(Akun akunSumber) {
        this.akunSumber = akunSumber;
    }

    public Akun getAkunUangMuka() {
        return akunUangMuka;
    }

    public void setAkunUangMuka(Akun akunUangMuka) {
        this.akunUangMuka = akunUangMuka;
    }

    public SumberDana getSumberDana() {
        return sumberDana;
    }

    public void setSumberDana(SumberDana sumberDana) {
        this.sumberDana = sumberDana;
    }
}
