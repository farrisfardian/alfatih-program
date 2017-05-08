/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.alfatih.domain.akademik;

import com.fasterxml.jackson.annotation.JsonBackReference;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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
@Table(name = "m_tahun_ajaran")
public class TahunAjaran {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, length = 5, nullable = false)
    private String kode;

    @Column(name = "tahun_awal", length = 4)
    private String tahunAwal;

    @Column(name = "tahun_akhir", length = 4)
    private String tahunAkhir;

    public String getKode() {
        return kode;
    }

    public void setKode(String kode) {
        this.kode = kode;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTahunAwal() {
        return tahunAwal;
    }

    public void setTahunAwal(String tahunAwal) {
        this.tahunAwal = tahunAwal;
    }

    public String getTahunAkhir() {
        return tahunAkhir;
    }

    public void setTahunAkhir(String tahunAkhir) {
        this.tahunAkhir = tahunAkhir;
    }

}
