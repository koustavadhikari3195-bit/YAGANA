export type Package = {
    id: string;
    title: string;
    price: number;
    description: string | null;
    category: "Freelancer" | "Team";
    features: string[];
    is_team_package: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
};

export type MediaAsset = {
    id: string;
    storage_path: string;
    thumbnail_path: string | null;
    category: "Portrait" | "Bride" | "Groom" | "Events";
    is_featured: boolean;
    alt_text: string | null;
    file_size: number | null;
    upload_date: string;
};

export type SiteContent = {
    key: string;
    value: string;
    updated_at: string;
};

export type FileRecord = {
    id: string;
    name: string;
    storage_path: string;
    file_size: number | null;
    mime_type: string;
    upload_date: string;
};
