{{
    config(
        tags=['staging']
    )
}}
 
WITH
projects AS (
    SELECT
       *
    FROM {{ source('employeeskillmatrix','projects') }}
)
SELECT * FROM projects