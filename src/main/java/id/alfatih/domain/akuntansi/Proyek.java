/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.alfatih.domain.akuntansi;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.util.Date;
import java.util.Set;
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
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.validator.constraints.NotEmpty;

/**
 *
 * @author ustadho
 */
@Entity
@Table(name = "acc_proyek")
public class Proyek {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @NotEmpty
    @Column(unique = true, length = 20)
    private String kode;

    private Double budget;

    private String keterangan;

    @ManyToOne
    @JoinColumn(name = "id_parent")
    @JsonBackReference
    private Proyek parent;

    @OneToMany(mappedBy = "parent", fetch = FetchType.EAGER)
    @JsonManagedReference
    private Set<Proyek> children;

    @ManyToOne
    @JoinColumn(name = "id_program")
    private Program program;

    @Temporal(TemporalType.DATE)
    private Date durasiAwal;

    @Temporal(TemporalType.DATE)
    private Date durasiAkhir;

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

    public Double getBudget() {
        return budget;
    }

    public void setBudget(Double budget) {
        this.budget = budget;
    }

    public Proyek getParent() {
        return parent;
    }

    public void setParent(Proyek parent) {
        this.parent = parent;
    }

    public String getKeterangan() {
        return keterangan;
    }

    public void setKeterangan(String keterangan) {
        this.keterangan = keterangan;
    }

    public Program getProgram() {
        return program;
    }

    public void setProgram(Program program) {
        this.program = program;
    }

    public Date getDurasiAwal() {
        return durasiAwal;
    }

    public void setDurasiAwal(Date durasiAwal) {
        this.durasiAwal = durasiAwal;
    }

    public Date getDurasiAkhir() {
        return durasiAkhir;
    }

    public void setDurasiAkhir(Date durasiAkhir) {
        this.durasiAkhir = durasiAkhir;
    }

    public Set<Proyek> getChildren() {
        return children;
    }

    public void setChildren(Set<Proyek> children) {
        this.children = children;
    }

    public boolean isExpanded() {
        return expanded;
    }

    public void setExpanded(boolean expanded) {
        this.expanded = expanded;
    }

}
