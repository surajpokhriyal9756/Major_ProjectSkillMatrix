-- Define a model to calculate the total proficiency score for each emp_id
-- This model will calculate the sum of proficiency_score for each emp_id and store it in a new column called total_proficiency_score
-- You can create this model in a new .sql file in your dbt project under the appropriate directory (e.g., models/mart/total_proficiency_score.sql)
{{
    config(
        tags=['mart']
    )
}}

WITH skills AS (
    SELECT
        name,
        description,
        emp_id,
        CASE
            WHEN proficiency = 'Beginner' THEN 1
            WHEN proficiency = 'Intermediate' THEN 2
            WHEN proficiency = 'Advanced' THEN 3
            ELSE 0  -- Handle NULL or other values gracefully
        END AS proficiency_score
    FROM {{ ref('skill_transform') }}
)

SELECT
    s.*,
    t.total_proficiency_score
FROM skills s
JOIN (
    SELECT
        emp_id,
        SUM(proficiency_score) AS total_proficiency_score
    FROM skills
    GROUP BY emp_id
) t
ON s.emp_id = t.emp_id
