-- rollback of 0001_conventions
drop function if exists vyne_private.block_mutation();
drop function if exists vyne_private.set_updated_at();
drop schema if exists vyne_private;
