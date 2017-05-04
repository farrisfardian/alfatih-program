/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.alfatih.domain.akuntansi;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.math.BigDecimal;
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
@Table(name = "acc_tanggungjawab_uang_muka_detail")
public class PertanggungjawabanUangMukaDetail {

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
    private BigDecimal jumlah;
    @Column
    private String keterangan;
    @ManyToOne
    @JoinColumn(name = "id_tanggungjawab")
    @JsonBackReference
    private PertanggungjawabanUangMuka tanggungJawab;    
    @ManyToOne
    @JoinColumn(name = "id_akun")
    private Akun akun;    
    @ManyToOne
    @JoinColumn(name = "id_uang_muka_detail")
    private UangMukaDetail uangMukaDetail;    

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

    public BigDecimal getJumlah() {
        return jumlah;
    }

    public void setJumlah(BigDecimal jumlah) {
        this.jumlah = jumlah;
    }

    public PertanggungjawabanUangMuka getTanggungJawab() {
        return tanggungJawab;
    }

    public void setTanggungJawab(PertanggungjawabanUangMuka tanggungJawab) {
        this.tanggungJawab = tanggungJawab;
    }

    public Akun getAkun() {
        return akun;
    }

    public void setAkun(Akun akun) {
        this.akun = akun;
    }

    public UangMukaDetail getUangMukaDetail() {
        return uangMukaDetail;
    }

    public void setUangMukaDetail(UangMukaDetail uangMukaDetail) {
        this.uangMukaDetail = uangMukaDetail;
    }
}
