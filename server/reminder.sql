psql -U salihapopal -d postgres 

## Connect to postgres DB first
psql -h localhost -U salihapopal -d postgres

## Then create needed DB 
Example: create database big_spenders;

## change to the created DB (e.g. big_spenders)
\c big_spenders;

## See the current connection information

\conninfo

