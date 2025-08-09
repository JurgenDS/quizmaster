#!/usr/bin/env bash
set -euo pipefail

# ------------------------------------------------------------
# Start local services required by the workspace
# - PostgreSQL 16
# - Initialize quizmaster DB/user on first run
# ------------------------------------------------------------

export POSTGRES_VERSION=${POSTGRES_VERSION:-16}
export PGDATA=${PGDATA:-/var/lib/postgresql/data}
export DB_NAME=${DB_NAME:-quizmaster}
export DB_USER=${DB_USER:-quizmaster}
export DB_PASS=${DB_PASS:-quizmaster}

ensure_postgres_initialized() {
  if [[ ! -s "$PGDATA/PG_VERSION" ]]; then
    echo "[services] Initializing PostgreSQL data directory in $PGDATA"
    sudo install -d -m 0700 -o postgres -g postgres "$PGDATA"
    sudo -u postgres -H \
      "/usr/lib/postgresql/$POSTGRES_VERSION/bin/initdb" -D "$PGDATA" >/dev/null
  fi
}

start_postgres() {
  echo "[services] Starting PostgreSQL $POSTGRES_VERSION"
  sudo -u postgres -H \
    "/usr/lib/postgresql/$POSTGRES_VERSION/bin/pg_ctl" -D "$PGDATA" -o "-c listen_addresses='*'" -w start >/dev/null
}

create_db_and_user() {
  echo "[services] Ensuring database '$DB_NAME' and user '$DB_USER' exist"
  # Wait for server
  for i in {1..30}; do
    if sudo -u postgres -H psql -h localhost -p 5432 -U postgres -c 'select 1' >/dev/null 2>&1; then
      break
    fi
    sleep 1
  done

  sudo -u postgres -H bash -lc "psql -h localhost -p 5432 -U postgres -tc \"SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'\" | grep -q 1 || createdb -h localhost -p 5432 -U postgres '$DB_NAME'"
  sudo -u postgres -H bash -lc "psql -h localhost -p 5432 -U postgres -tc \"SELECT 1 FROM pg_roles WHERE rolname = '$DB_USER'\" | grep -q 1 || psql -h localhost -p 5432 -U postgres -c \"CREATE USER $DB_USER WITH PASSWORD '$DB_PASS'\""
  sudo -u postgres -H psql -h localhost -p 5432 -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER"
  sudo -u postgres -H psql -h localhost -p 5432 -U postgres -d "$DB_NAME" -c "GRANT ALL PRIVILEGES ON SCHEMA public TO $DB_USER"
}

main() {
  ensure_postgres_initialized
  start_postgres
  create_db_and_user
  echo "[services] All services started"
}

main "$@"


