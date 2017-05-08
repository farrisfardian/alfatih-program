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
@Table(name = "acc_jurnal_detail")
public class JurnalDetail {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    @Column(length = 36)
    private String id;

    @Column
    private String keterangan;
    @Column
    private BigDecimal debet;
    @Column
    private BigDecimal kredit;
    @Column
    private BigDecimal rate;
    @ManyToOne
    @JoinColumn(name = "id_akun")
    private Akun akun;
    @ManyToOne
    @JoinColumn(name = "id_proyek")
    private Proyek proyek;    
    @ManyToOne
    @JoinColumn(name = "id_akad_donatur")
    private AkadDonatur akadDonatur;
    @ManyToOne
    @JoinColumn(name = "id_jurnal")
    @JsonBackReference
    private Jurnal jurnal;

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

    public BigDecimal getDebet() {
        return debet;
    }

    public void setDebet(BigDecimal debet) {
        this.debet = debet;
    }

    public BigDecimal getKredit() {
        return kredit;
    }

    public void setKredit(BigDecimal kredit) {
        this.kredit = kredit;
    }

    public BigDecimal getRate() {
        return rate;
    }

    public void setRate(BigDecimal rate) {
        this.rate = rate;
    }

    public Akun getAkun() {
        return akun;
    }

    public void setAkun(Akun akun) {
        this.akun = akun;
    }

    public Proyek getProyek() {
        return proyek;
    }

    public void setProyek(Proyek proyek) {
        this.proyek = proyek;
    }

    public AkadDonatur getAkadDonatur() {
        return akadDonatur;
    }

    public void setAkadDonatur(AkadDonatur akadDonatur) {
        this.akadDonatur = akadDonatur;
    }

    public Jurnal getJurnal() {
        return jurnal;
    }

    public void setJurnal(Jurnal jurnal) {
        this.jurnal = jurnal;
    }
}
