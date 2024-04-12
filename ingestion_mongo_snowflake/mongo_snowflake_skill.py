import snowflake.connector
from pymongo import MongoClient
import pandas as pd


# MongoDB connection settings
MONGO_CONNECTION_STRING = "mongodb+srv://surajpokhriyal150:an0oe792KCBkYhK4@cluster0.tqahn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
MONGO_DB_NAME = "test"

# Snowflake connection settings
SNOWFLAKE_ACCOUNT = "su61976.central-india.azure"
SNOWFLAKE_USER = "surajpokhriyal"
SNOWFLAKE_PASSWORD = "Snowflake@123"
SNOWFLAKE_DATABASE = "EMPLOYEESKILLMATRIX"
SNOWFLAKE_SCHEMA = "USER"
SNOWFLAKE_WAREHOUSE = "COMPUTE_WH"

# Establish connection to MongoDB
mongo_client = MongoClient(MONGO_CONNECTION_STRING)
mongo_db = mongo_client[MONGO_DB_NAME]


# Establish connection to Snowflake
snowflake_conn = snowflake.connector.connect(
    user=SNOWFLAKE_USER,
    password=SNOWFLAKE_PASSWORD,
    account=SNOWFLAKE_ACCOUNT,
    warehouse=SNOWFLAKE_WAREHOUSE,
    database=SNOWFLAKE_DATABASE,
    schema=SNOWFLAKE_SCHEMA
)


# Create a cursor
cursor = snowflake_conn.cursor()

# # Check MongoDB connection
if mongo_client.server_info():
    print("MongoDB connection successful")
else:
    print("Failed to connect to MongoDB")



# Check Snowflake connection
try:
    snowflake_conn
    print("Connection to Snowflake successful!")
    
except Exception as e:
    print(f"Error connecting to Snowflake: {str(e)}")



def get_users_collection():
    pass


data = list(mongo_db.skills.find())
df = pd.DataFrame(data)
df.to_csv("skills.csv", index=False)


# # Iterate through the DataFrame rows
# for index, row in df.iterrows():
#     # Prepare the values for the SQL INSERT statement
#     values = []
#     for val, dtype in zip(row, df.dtypes):
#         if dtype == 'object':  # If the data type is object, treat it as string
#             escaped_val = str(val).replace("'", "\\'")
#             # print(escaped_val)
#             values.append(f"'{escaped_val}'")
#         elif dtype == 'datetime64[ns]':  # If the data type is datetime, format it accordingly
#             values.append(f"'{val.strftime('%Y-%m-%d %H:%M:%S')}'")
#         else:
#             values.append(str(val))

#     # Construct the SQL INSERT statement
#     insert_query = f"INSERT INTO skills VALUES ({','.join(values)});"
    
    # Execute the INSERT statement
    # cursor.execute(insert_query)
# Commit the changes to the database
snowflake_conn.commit()


# Close connections
mongo_client.close()
snowflake_conn.close()



