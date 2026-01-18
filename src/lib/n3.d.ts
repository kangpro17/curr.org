declare module 'n3' {
    export class Parser {
        constructor(options?: any);
        parse(content: string, callback: (error: Error | null, quad: Quad | null, prefixes: any) => void): void;
    }
    export class Store {
        constructor();
        add(quad: Quad): void;
        getSubjects(predicate: any, object: any, graph: any): any[];
        getObjects(subject: any, predicate: any, graph: any): any[];
    }
    export interface Quad {
        subject: Term;
        predicate: Term;
        object: Term;
        graph: Term;
    }
    export interface Term {
        value: string;
        termType: string;
    }
    export const DataFactory: {
        namedNode(value: string): Term;
        literal(value: string): Term;
    };
}
