{{
    config(
        tags=['staging']
    )
}}
 
WITH
skills AS (
    SELECT
       *
    FROM {{ source('employeeskillmatrix','skills') }}
)
SELECT * FROM skills