{{
    config(
        tags=['transform']
    )
}}
 
WITH
skills AS (
    SELECT
    *
from
     {{ref('skills_stg')}} 
)
SELECT * FROM skills