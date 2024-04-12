{{
    config(
        tags=['staging']
    )
}}
 
WITH
users AS (
    SELECT
       *
    FROM {{ source('employeeskillmatrix','users') }} 
)
SELECT * FROM users


