export type EntityType<T> = Omit<T, 'created_at' | 'updated_at' | 'deleted_at'>
