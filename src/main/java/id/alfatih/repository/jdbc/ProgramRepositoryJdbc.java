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
public class ProgramRepositoryJdbc {

    @Autowired
    MapResultSet mr;

    @Autowired
    DataSource dataSource;

    public Object filterProgram(String search) {
        String query = "SELECT r.id, r.aktif, r.budget, r.kode, r.mulai, r.nama, r.pelaksana, r.selesai, r.status, \n" +
"       r.id_parent, r.id_tahun_ajaran, ta.kode as kode_tahun_ajaran from\n"
                + "(SELECT *, case when id_parent is null then id else id_parent end as order_by\n"
                + "  FROM acc_program) r "
                + "join m_tahun_ajaran ta on ta.id=r.id_tahun_ajaran "
                + "where coalesce(r.nama,'')||coalesce(r.kode,'') ilike '%" + (search == null ? "" : search) + "%' order by order_by, id;";
        return mr.mapList(query);
    }

}
