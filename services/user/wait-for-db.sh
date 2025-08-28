#!/bin/sh
# wait-for-db.sh
set -e

host="$1"
shift

until pg_isready -h "$host"; do
  echo "Waiting for database..."
  sleep 2
done

exec "$@"