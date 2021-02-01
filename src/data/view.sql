create
or replace view v_partRolenav as (
    select
        row_number() OVER(
            ORDER BY
                a.levelid asc
        ) AS id,
        a.partnerid,
        a.levelid,
        a.navid
    from
        (
            select
                id as partnerid,
                0 as levelid,
                0 as navid
            from
                codes.nuc_partner
            where
                active > 0
            union
            all
            select
                partnerid,
                levelid,
                navid
            from
                code_w.mer_acc_rolenav
        ) a
);

select
    row_number() OVER(
        ORDER BY
            a.productid asc
    ) AS id,
    a.*
from
    (
        SELECT
            1 as productid,
            id as packageid,
            `name`,
            price,
            navigation,
            `active`
        FROM
            code_w.mer_package
        union
        all
        SELECT
            2 as productid,
            id as packageid,
            `name`,
            price,
            navigation,
            `active`
        FROM
            code_v.mer_package
    ) a
where
    a.active > 0