import fs from 'fs';
import path from 'path';
import * as N3 from 'n3';
import { Standard } from './types';

export async function getStandards(): Promise<Standard[]> {
    try {
        const filePath = path.join(process.cwd(), 'public/data/standards.ttl');

        if (!fs.existsSync(filePath)) {
            console.error(`TTL File not found at: ${filePath}`);
            return [];
        }

        const ttlContent = fs.readFileSync(filePath, 'utf-8');

        const parser = new N3.Parser();
        const store = new N3.Store();

        return new Promise((resolve) => {
            parser.parse(ttlContent, (error: Error | null, quad: N3.Quad | null) => {
                if (error) {
                    console.error('RDF Parsing Error:', error);
                    resolve([]); // Return empty rather than crashing the page
                    return;
                }
                if (quad) {
                    store.add(quad);
                } else {
                    const standards: Standard[] = [];

                    const achievementStandardType = 'https://example.org/kcurr/AchievementStandard';
                    const standards_subjects = store.getSubjects(
                        N3.DataFactory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
                        N3.DataFactory.namedNode(achievementStandardType),
                        null
                    ) as N3.Term[];

                    standards_subjects.forEach((subjectNode: N3.Term) => {
                        const subjectId = subjectNode.value;

                        const code = store.getObjects(subjectNode, N3.DataFactory.namedNode('https://example.org/kcurr/code'), null)[0]?.value;
                        const text = store.getObjects(subjectNode, N3.DataFactory.namedNode('https://example.org/kcurr/text'), null)[0]?.value;

                        const subjectRef = store.getObjects(subjectNode, N3.DataFactory.namedNode('https://example.org/kcurr/subject'), null)[0];
                        const gradeBandRef = store.getObjects(subjectNode, N3.DataFactory.namedNode('https://example.org/kcurr/gradeBand'), null)[0];
                        const domainRef = store.getObjects(subjectNode, N3.DataFactory.namedNode('https://example.org/kcurr/domain'), null)[0];

                        const getLabel = (ref: N3.Term | undefined) => {
                            if (!ref) return '';
                            return store.getObjects(ref, N3.DataFactory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'), null)[0]?.value || '';
                        };

                        if (code && text) {
                            standards.push({
                                id: subjectId,
                                code,
                                content: text,
                                subject: getLabel(subjectRef),
                                grade_level: getLabel(gradeBandRef),
                                category: getLabel(domainRef)
                            });
                        }
                    });
                    resolve(standards);
                }
            });
        });
    } catch (error) {
        console.error('Fatal error in getStandards:', error);
        return [];
    }
}
