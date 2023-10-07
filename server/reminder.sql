psql -U salihapopal -d postgres 

## Connect to postgres DB first
psql -h localhost -U salihapopal -d database-name

## Then create needed DB 
Example: create database  business-problem-city-farm;

## change to the created DB (e.g. big_spenders)
\c big_spenders;
 \c[onnect] {[DBNAME|- USER|- HOST|- PORT|-] | conninfo}
 \c business-problem-city-farm - postgres - 5432
## See the current connection information

\conninfo

