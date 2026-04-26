import React from 'react';
import { Head } from '@inertiajs/react';

interface Props {
    users: Array<{
        id: number;
        name: string;
        email: string;
    }>;
}

export default function Index({ users }: Props) {
    return (
        <>
            <Head title="Daftar User" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Daftar User</h1>
                <pre>{JSON.stringify(users, null, 2)}</pre>
            </div>
        </>
    );
}
