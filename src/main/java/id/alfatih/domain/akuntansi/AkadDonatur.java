/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.alfatih.domain.akuntansi;

import com.fasterxml.jackson.annotation.JsonBackReference;
import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.hibernate.annotations.GenericGenerator;

/**
 *
 * @author faheem
 */
@Entity
@Table(name = "acc_akad_donatur")
public class AkadDonatur {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    @Column(length = 36)
    private String id;
    @Temporal(TemporalType.DATE)
    @Column
    private Date tanggal;
    @Column
    private String keterangan;
    @Column
    private String batasan;
    @Column
    private BigDecimal donasi;
    @ManyToOne
    @JoinColumn(name = "id_donatur")
    private Donatur donatur;
    @ManyToOne
    @JoinColumn(name = "id_program")
    private Program program;

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

    public Date getTanggal() {
        return tanggal;
    }

    public void setTanggal(Date tanggal) {
        this.tanggal = tanggal;
    }

    public BigDecimal getDonasi() {
        return donasi;
    }

    public void setDonasi(BigDecimal donasi) {
        this.donasi = donasi;
    }

    public Donatur getDonatur() {
        return donatur;
    }

    public void setDonatur(Donatur donatur) {
        this.donatur = donatur;
    }

    public Program getProgram() {
        return program;
    }

    public void setProgram(Program program) {
        this.program = program;
    }
    
    public String getBatasan() {
        return batasan;
    }

    public void setBatasan(String batasan) {
        this.batasan = batasan;
    }
}
