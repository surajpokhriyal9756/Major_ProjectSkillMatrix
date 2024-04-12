{{
    config(
        tags=['transform']
    )
}}

-- Define a CTE to select certifications from the staging table
WITH certifications AS (
    SELECT
       title,
       issuingorganization,
       certificate_id,
       DATE_TRUNC('DAY', issuancedate::DATE) AS issuancedate,
       DATE_TRUNC('DAY', expirationdate::DATE) AS expirationdate,
       description,
       emp_id,
       approval       
    FROM
       {{ref('certifications_stg')}} 
)

-- Select the number of approved and rejected certificates for each employee
SELECT 
    *
FROM 
    certifications
