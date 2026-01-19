import { createClient } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { standard_code, rating, helpful_tags, comment } = body;

        const supabase = createClient();

        const { data, error } = await supabase
            .from('surveys')
            .insert([
                {
                    standard_code,
                    rating,
                    helpful_tags,
                    comment
                }
            ]);

        if (error) throw error;

        return NextResponse.json({ message: 'Success', data }, { status: 201 });
    } catch (error: any) {
        console.error('Survey API Error:', error);
        return NextResponse.json({ message: error.message || 'Error occurred' }, { status: 500 });
    }
}
