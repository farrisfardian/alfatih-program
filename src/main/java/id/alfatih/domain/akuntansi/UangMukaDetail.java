/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.alfatih.domain.akuntansi;

import com.fasterxml.jackson.annotation.JsonBackReference;
import java.math.BigDecimal;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

/**
 *
 * @author faheem
 */
@Entity
@Table(name = "acc_uang_muka_detail")
public class UangMukaDetail {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    @Column(length = 36)
    private String id;
    @Column
    private String keterangan;
    @Column
    private BigDecimal jumlah;
    @ManyToOne
    @JoinColumn(name = "id_proyek")
    private Proyek proyek;    
    @ManyToOne
    @JoinColumn(name = "id_uang_muka")
    @JsonBackReference
    private UangMuka uangMuka;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getKeterangan() {
        return keterangan;
    }

    public void setKeterangan(String keterangan) {
        this.keterangan = keterangan;
    }

    public BigDecimal getJumlah() {
        return jumlah;
    }

    public void setJumlah(BigDecimal jumlah) {
        this.jumlah = jumlah;
    }

    public Proyek getProyek() {
        return proyek;
    }

    public void setProyek(Proyek proyek) {
        this.proyek = proyek;
    }

    public UangMuka getUangMuka() {
        return uangMuka;
    }

    public void setUangMuka(UangMuka uangMuka) {
        this.uangMuka = uangMuka;
    }
}
