const MetadataKeys = {
    BASE_PATH: 'base_path',
    ROUTERS: 'routers'
} as const;

export type TMetadataKeys = (typeof MetadataKeys)[keyof typeof MetadataKeys]