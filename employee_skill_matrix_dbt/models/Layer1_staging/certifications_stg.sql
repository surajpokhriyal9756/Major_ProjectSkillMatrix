{{
    config(
        tags=['staging']
    )
}}
 
WITH
certifications AS (
    SELECT
       *
    FROM {{ source('employeeskillmatrix','certifications') }} 
)
SELECT * FROM certifications