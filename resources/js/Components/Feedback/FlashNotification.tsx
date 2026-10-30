import { useEffect, useRef } from 'react';
import { router, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { toastSuccess, toastError, toastWarning, toastInfo } from '@/Utils/alert';

export default function FlashNotification() {
    const { flash, errors } = usePage<PageProps>().props;
    const lastNotifiedRef = useRef<string | null>(null);
    const lastErrorRef = useRef<string | null>(null);

    useEffect(() => {
        if (!flash) return;

        const hasMessage = Boolean(flash.success || flash.error || flash.warning || flash.info);
        if (!hasMessage) return;

        const currentKey = JSON.stringify({
            success: flash.success,
            error: flash.error,
            warning: flash.warning,
            info: flash.info,
            timestamp: flash.timestamp,
        });

        if (currentKey === lastNotifiedRef.current) {
            return;
        }

        lastNotifiedRef.current = currentKey;

        if (flash.success) {
            toastSuccess(flash.success);
        } else if (flash.error) {
            toastError(flash.error);
        } else if (flash.warning) {
            toastWarning(flash.warning);
        } else if (flash.info) {
            toastInfo(flash.info);
        }
    }, [flash]);

    // Notify when server validation errors occur
    useEffect(() => {
        if (!errors || Object.keys(errors).length === 0) return;

        // If flash.error was already handled, don't double fire
        if (flash?.error) return;

        const errorKey = JSON.stringify({
            errors,
            timestamp: flash?.timestamp,
        });

        if (errorKey === lastErrorRef.current) {
            return;
        }

        lastErrorRef.current = errorKey;

        const errorCount = Object.keys(errors).length;
        const firstError = Object.values(errors)[0];

        if (typeof firstError === 'string') {
            toastWarning(
                errorCount > 1
                    ? `${firstError} (dan ${errorCount - 1} kolom lainnya)`
                    : firstError,
                'Periksa Input Formulir'
            );
        }
    }, [errors, flash?.error, flash?.timestamp]);

    // Listen to unexpected network or server exceptions in Inertia requests
    useEffect(() => {
        const removeInvalidListener = router.on('invalid', (event) => {
            const status = event.detail.response?.status;
            if (status && status >= 400) {
                event.preventDefault();
                toastError(
                    `Permintaan gagal diproses oleh server (Kode Status: ${status}). Silakan muat ulang halaman dan coba lagi.`,
                    'Gagal Memproses Aksi'
                );
            }
        });

        const removeExceptionListener = router.on('exception', () => {
            toastError(
                'Koneksi ke server terputus atau terjadi gangguan jaringan. Periksa koneksi internet Anda.',
                'Gangguan Jaringan'
            );
        });

        return () => {
            removeInvalidListener();
            removeExceptionListener();
        };
    }, []);

    return null;
}
