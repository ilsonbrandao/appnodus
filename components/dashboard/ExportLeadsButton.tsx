'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from 'sonner';

interface Lead {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    company: string | null;
    category: string | null;
    score: number | null;
    createdAt: string;
}

export function ExportLeadsButton({ leads }: { leads: any[] }) {
    const handleExport = () => {
        try {
            if (leads.length === 0) {
                toast.error("Sem leads para exportar.");
                return;
            }

            // Cabeçalho do CSV
            const headers = ['ID', 'Nome', 'Email', 'Empresa', 'Telefone', 'Categoria', 'Score', 'Data'];

            // Dados
            const rows = leads.map(l => [
                l.id,
                `"${l.name}"`,
                l.email,
                `"${l.company || ''}"`,
                l.phone || '',
                l.category || 'Novo',
                l.score || 0,
                new Date(l.createdAt).toLocaleDateString()
            ]);

            const csvContent = [
                headers.join(','),
                ...rows.map(row => row.join(','))
            ].join('\n');

            // Criar Blob e Download
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `leads_export_${new Date().toISOString().slice(0, 10)}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast.success(`${leads.length} leads exportados com sucesso!`);
        } catch (e) {
            console.error(e);
            toast.error("Erro ao exportar leads.");
        }
    };

    return (
        <Button variant="outline" onClick={handleExport} className="gap-2">
            <Download className="size-4" />
            Exportar CSV
        </Button>
    );
}
