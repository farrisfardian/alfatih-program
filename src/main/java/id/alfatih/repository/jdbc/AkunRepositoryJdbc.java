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
public class AkunRepositoryJdbc {

    @Autowired
    MapResultSet mr;

    @Autowired
    DataSource dataSource;

    public Object filterAkun(String search) {
        String query = "SELECT r.id, r.kode, r.nama, r.id_kelompok, r.id_parent,  \n"
                + "       r.keterangan, ja.nama as kelompok\n"
                + "  FROM \n"
                + "(SELECT *, case when id_parent is null then id else id_parent end as order_by\n"
                + "  FROM acc_akun) r "
                + "  left join acc_kelompok_akun ja on ja.id = r.id_kelompok"
                + " where coalesce(r.nama,'')||coalesce(r.kode,'') ilike '%" + (search == null ? "" : search) + "%' order by order_by, id;";
        return mr.mapList(query);
    }

}
