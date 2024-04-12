{{
    config(
        tags=['mart']
    )
}}


-- Define a CTE to select certifications from the staging table
WITH certifications AS (
    SELECT
       title,
       issuingorganization,
       certificate_id,
       issuancedate,
       expirationdate,
       description,
       emp_id,           
       CASE
            WHEN approval = 'Approved' THEN 1
            WHEN approval = 'Rejected' THEN 0
            ELSE NULL
       END AS approval_numeric
    FROM
       {{ref('certificate_transform')}} 
)

-- Select the number of approved and rejected certificates for each employee
SELECT 
    emp_id,
    SUM(CASE WHEN approval_numeric = 1 THEN 1 ELSE 0 END) AS num_approved_certificates,
    SUM(CASE WHEN approval_numeric = 0 THEN 1 ELSE 0 END) AS num_rejected_certificates
FROM 
    certifications
GROUP BY 
    emp_id

