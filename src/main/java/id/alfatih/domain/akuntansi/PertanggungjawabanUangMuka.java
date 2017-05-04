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
@Table(name = "acc_tanggungjawab_uang_muka")
public class PertanggungjawabanUangMuka {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    @Column(length = 36)
    private String id;

    @Column(name = "nomor")
    private String nomor;
    @Temporal(TemporalType.DATE)
    @Column
    private Date tanggal;
    @Column
    private String keterangan;
    @ManyToOne
    @JoinColumn(name = "id_uang_muka")
    private UangMuka uangMuka;    
    @OneToMany(mappedBy = "tanggungJawab", cascade = {javax.persistence.CascadeType.ALL}, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private Set<PertanggungjawabanUangMukaDetail> listPertanggungjawabanUangMukaDetail;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNomor() {
        return nomor;
    }

    public void setNomor(String nomor) {
        this.nomor = nomor;
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

    public Set<PertanggungjawabanUangMukaDetail> getListPertanggungjawabanUangMukaDetail() {
        return listPertanggungjawabanUangMukaDetail;
    }

    public void setListPertanggungjawabanUangMukaDetail(Set<PertanggungjawabanUangMukaDetail> listPertanggungjawabanUangMukaDetail) {
        this.listPertanggungjawabanUangMukaDetail = listPertanggungjawabanUangMukaDetail;
    }

    public UangMuka getUangMuka() {
        return uangMuka;
    }

    public void setUangMuka(UangMuka uangMuka) {
        this.uangMuka = uangMuka;
    }
}
