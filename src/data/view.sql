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
    a.active > 0;

select
    row_number() over (
        order by
            `a`.`partnerid`,
            `a`.`levelid`
    ) AS `id`,
    `a`.`partnerid` AS `partnerid`,
    `a`.`levelid` AS `levelid`,
    `a`.`navid` AS `navid`
from
    (
        select
            `codes`.`nuc_partner`.`id` AS `partnerid`,
            0 AS `levelid`,
            0 AS `navid`
        from
            `codes`.`nuc_partner`
        where
            `codes`.`nuc_partner`.`active` > 0
        union
        all
        select
            `code_w`.`mer_acc_rolenav`.`partnerid` AS `partnerid`,
            `code_w`.`mer_acc_rolenav`.`levelid` AS `levelid`,
            `code_w`.`mer_acc_rolenav`.`navid` AS `navid`
        from
            `code_w`.`mer_acc_rolenav`
    ) `a`