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
    ) a;

create
or replace view v_accrolenav as
select
    row_number() over (
        order by
            `a`.`productid`,
            `a`.`partnerid`,
            `a`.`levelid`,
            `a`.`navid`,
            `a`.`permid` asc
    ) AS `id`,
    `a`.`rolenavid` AS `rolenavid`,
    `a`.`partnerid` AS `partnerid`,
    `a`.`productid` AS `productid`,
    `a`.`levelid` AS `levelid`,
    `a`.`navid` AS `navid`,
    `a`.`permid` AS `permid`
from
    (
        select
            1 AS `productid`,
            `code_w`.`mer_acc_rolenav`.`id` AS `rolenavid`,
            `code_w`.`mer_acc_rolenav`.`partnerid` AS `partnerid`,
            `code_w`.`mer_acc_rolenav`.`levelid` AS `levelid`,
            `code_w`.`mer_acc_rolenav`.`navid` AS `navid`,
            `code_w`.`mer_acc_rolenav`.`permid` AS `permid`
        from
            `code_w`.`mer_acc_rolenav`
        union
        all
        select
            2 AS `productid`,
            `code_v`.`mer_acc_rolenav`.`id` AS `rolenavid`,
            `code_v`.`mer_acc_rolenav`.`partnerid` AS `partnerid`,
            `code_v`.`mer_acc_rolenav`.`levelid` AS `levelid`,
            `code_v`.`mer_acc_rolenav`.`navid` AS `navid`,
            `code_v`.`mer_acc_rolenav`.`permid` AS `permid`
        from
            `code_v`.`mer_acc_rolenav`
    ) `a`;

CREATE
OR REPLACE VIEW codes.v_packnav as
SELECT
    row_number() OVER(
        ORDER BY
            a.productid,
            a.packageid,
            a.navid asc
    ) AS id,
    a.*
from
    (
        SELECT
            1 productid,
            a.packageid,
            b.name,
            b.price,
            b.color,
            a.navid
        FROM
            code_w.mer_pack_navigation a
            LEFT JOIN code_w.mer_package b ON b.id = a.packageid
        UNION
        ALL
        SELECT
            3 productid,
            a.packageid,
            b.name,
            b.price,
            b.color,
            a.navid
        FROM
            code_v.mer_pack_navigation a
            LEFT JOIN code_v.mer_package b ON b.id = a.packageid
    ) a;

CREATE
OR REPLACE VIEW codes.v_navperm as
SELECT
    row_number() OVER(
        ORDER BY
            productid,
            packageid,
            navid,
            permid asc
    ) AS id,
    a.*
FROM
    (
        SELECT
            1 productid,
            packageid,
            navid,
            permid
        FROM
            code_w.mer_nav_perm
        UNION
        ALL
        SELECT
            3 productid,
            packageid,
            navid,
            permid
        FROM
            code_v.mer_nav_perm
    ) a;