create or replace view v_partRolenav as (
        select row_number() OVER(
                ORDER BY a.levelid asc
            ) AS id,
            a.partnerid,
            a.levelid,
            a.navid
        from (
                select id as partnerid,
                    0 as levelid,
                    0 as navid
                from codes.nuc_partner
                where active > 0
                union all
                select partnerid,
                    levelid,
                    navid
                from code_w.mer_acc_rolenav
            ) a
    );