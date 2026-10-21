import React, { useState, useEffect } from 'react';

interface ToolIconProps {
    name: string;
    slug?: string;
    iconUrl?: string | null;
    className?: string;
}

export default function ToolIcon({ name, slug, iconUrl, className = 'w-6 h-6' }: ToolIconProps) {
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        setImageError(false);
    }, [iconUrl]);

    // Only render an image if iconUrl is a valid web path or file URL
    const isValidUrl =
        Boolean(
            iconUrl &&
            (iconUrl.startsWith('/') ||
                iconUrl.startsWith('http://') ||
                iconUrl.startsWith('https://') ||
                iconUrl.endsWith('.svg') ||
                iconUrl.endsWith('.png') ||
                iconUrl.endsWith('.jpg') ||
                iconUrl.endsWith('.jpeg') ||
                iconUrl.endsWith('.webp'))
        );

    if (isValidUrl && iconUrl && !imageError) {
        return (
            <img
                src={iconUrl}
                alt={name}
                className={`${className} object-contain rounded shrink-0`}
                loading="lazy"
                onError={() => setImageError(true)}
            />
        );
    }

    const s = (slug || name.toLowerCase().replace(/[^a-z0-9]/g, '-')).toLowerCase();

    // Map tools to clean 2-letter technical monograms with curated badge tones
    let monogram = name.slice(0, 2).toUpperCase();
    let bg = 'bg-stone-100 text-stone-700 border-stone-200';

    if (s.includes('premiere')) {
        monogram = 'Pr';
        bg = 'bg-stone-900 text-stone-100 border-stone-800';
    } else if (s.includes('after-effects') || s.includes('ae')) {
        monogram = 'Ae';
        bg = 'bg-stone-900 text-stone-100 border-stone-800';
    } else if (s.includes('davinci') || s.includes('resolve')) {
        monogram = 'Dv';
        bg = 'bg-stone-900 text-stone-100 border-stone-800';
    } else if (s.includes('capcut')) {
        monogram = 'Cc';
        bg = 'bg-stone-100 text-stone-800 border-stone-300';
    } else if (s.includes('laravel')) {
        monogram = 'Lv';
        bg = 'bg-stone-100 text-amber-900 border-amber-200';
    } else if (s.includes('react')) {
        monogram = 'Re';
        bg = 'bg-stone-100 text-stone-800 border-stone-300';
    } else if (s.includes('postgres') || s.includes('psql')) {
        monogram = 'Pg';
        bg = 'bg-stone-100 text-stone-800 border-stone-300';
    } else if (s.includes('tailwind')) {
        monogram = 'Tw';
        bg = 'bg-stone-100 text-stone-800 border-stone-300';
    } else if (s.includes('typescript') || s.includes('ts')) {
        monogram = 'Ts';
        bg = 'bg-stone-100 text-stone-800 border-stone-300';
    } else if (s.includes('inertia')) {
        monogram = 'In';
        bg = 'bg-stone-100 text-stone-800 border-stone-300';
    } else if (s.includes('git') || s.includes('github')) {
        monogram = 'Gt';
        bg = 'bg-stone-100 text-stone-800 border-stone-300';
    } else if (s.includes('figma')) {
        monogram = 'Fg';
        bg = 'bg-stone-100 text-stone-800 border-stone-300';
    } else if (s.includes('docker')) {
        monogram = 'Dk';
        bg = 'bg-stone-100 text-stone-800 border-stone-300';
    }

    return (
        <span
            className={`inline-flex items-center justify-center font-mono font-bold text-[10px] rounded border ${bg} ${className} shrink-0`}
            title={name}
        >
            {monogram}
        </span>
    );
}
