/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.alfatih.repository.jdbc;

import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author cak-ust
 */
@Repository
public class ProyekRepositoryJdbc {

    @Autowired
    MapResultSet mr;

    @Autowired
    DataSource dataSource;

    public Object filterProyek(String search) {
        String query = "SELECT r.id, r.budget, r.kode, r.keterangan, \n"
                + "       r.id_parent, id_program from\n"
                + "(SELECT *, case when id_parent is null then id else id_parent end as order_by\n"
                + "  FROM acc_proyek) r "
                + "where coalesce(r.keterangan,'')||coalesce(r.kode,'') ilike '%" + (search == null ? "" : search) + "%' order by order_by, id;";
        return mr.mapList(query);
    }

    public Object filterProyekByProgram(Integer search) {
        String query = "SELECT r.id, r.budget, r.kode, r.keterangan, \n"
                + "       r.id_parent, id_program from\n"
                + "(SELECT *, case when id_parent is null then id else id_parent end as order_by\n"
                + "  FROM acc_proyek) r "
                + "where r.id_program = " + search + " order by order_by, id;";
        return mr.mapList(query);
    }

}
