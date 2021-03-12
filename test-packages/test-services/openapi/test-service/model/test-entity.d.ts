import { SimpleTestEntity } from './simple-test-entity';
export declare type TestEntity = {
    keyProperty: string;
    stringProperty?: string;
    dateProperty?: string;
    dateTimeProperty?: string;
    int32Property?: number;
    int64Property?: number;
    floatProperty?: number;
    doubleProperty?: number;
    linkedSimpleTestEntity?: SimpleTestEntity;
    linkedSimpleTestEntityCollection?: SimpleTestEntity[];
} | Record<string, any>;
//# sourceMappingURL=test-entity.d.ts.map