/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.alfatih.domain.akuntansi;

import java.math.BigDecimal;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.validator.constraints.NotEmpty;

/**
 *
 * @author ustadho
 */
@Entity
@Table(name = "acc_mata_uang")
public class MataUang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @NotNull
    @NotEmpty
    @Column(unique = true, nullable = false, length = 10)
    private String simbol;
    
    @NotNull
    @NotEmpty
    @Column(unique = true, nullable = false)
    private String nama;
    
    @ColumnDefault(value = "1")
    private BigDecimal rate = new BigDecimal(1);

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSimbol() {
        return simbol;
    }

    public void setSimbol(String simbol) {
        this.simbol = simbol;
    }

    public String getNama() {
        return nama;
    }

    public void setNama(String nama) {
        this.nama = nama;
    }

    public BigDecimal getRate() {
        return rate;
    }

    public void setRate(BigDecimal rate) {
        this.rate = rate;
    }
    
    
}
