import Swal, { SweetAlertIcon } from 'sweetalert2';

// Reusable SweetAlert2 Toast Mixin with elegant editorial styling
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    showCloseButton: true,
    timer: 4000,
    timerProgressBar: true,
    background: '#FFFFFF',
    color: '#1C1917',
    customClass: {
        popup: 'rounded-2xl border border-stone-200/90 shadow-xl font-sans text-xs p-3.5 backdrop-blur-md',
        title: 'text-xs font-heading font-bold text-stone-900 leading-snug',
        htmlContainer: 'text-[11px] font-sans text-stone-600 mt-0.5 leading-relaxed',
        timerProgressBar: 'bg-amber-500/80',
        closeButton: 'text-stone-400 hover:text-stone-700 transition-colors focus:outline-none',
    },
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    },
});

/**
 * Display a floating toast notification.
 */
export const showToast = (icon: SweetAlertIcon, title: string, text?: string) => {
    return Toast.fire({
        icon,
        title,
        text,
    });
};

export const toastSuccess = (message: string, title = 'Berhasil') => {
    return showToast('success', title, message);
};

export const toastError = (message: string, title = 'Terjadi Kesalahan') => {
    return showToast('error', title, message);
};

export const toastWarning = (message: string, title = 'Peringatan') => {
    return showToast('warning', title, message);
};

export const toastInfo = (message: string, title = 'Informasi') => {
    return showToast('info', title, message);
};

/**
 * Beautiful confirmation dialog replacing window.confirm().
 * Returns a Promise<boolean> that resolves to true when user confirms.
 */
export const confirmDialog = async ({
    title = 'Apakah Anda yakin?',
    text = 'Tindakan ini tidak dapat dibatalkan.',
    confirmButtonText = 'Ya, Lanjutkan',
    cancelButtonText = 'Batal',
    isDanger = true,
}: {
    title?: string;
    text?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    isDanger?: boolean;
}): Promise<boolean> => {
    const result = await Swal.fire({
        title,
        text,
        icon: isDanger ? 'warning' : 'question',
        showCancelButton: true,
        confirmButtonText,
        cancelButtonText,
        reverseButtons: true,
        background: '#FFFFFF',
        color: '#1C1917',
        buttonsStyling: false,
        customClass: {
            popup: 'rounded-3xl border border-stone-200/90 shadow-2xl p-6 font-sans max-w-sm sm:max-w-md',
            title: 'text-lg font-heading font-extrabold text-stone-900 tracking-tight',
            htmlContainer: 'text-xs font-sans text-stone-600 mt-2 leading-relaxed',
            actions: 'flex items-center justify-end gap-2.5 mt-6 w-full',
            confirmButton: isDanger
                ? 'inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-mono text-xs font-bold transition-all shadow-sm cursor-pointer'
                : 'inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-950 active:scale-95 text-white font-mono text-xs font-bold transition-all shadow-sm cursor-pointer',
            cancelButton:
                'inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200/80 active:scale-95 text-stone-700 font-mono text-xs font-semibold transition-all border border-stone-200/80 cursor-pointer',
        },
    });

    return result.isConfirmed;
};

/**
 * Centered modal alert for significant messages.
 */
export const showAlertModal = ({
    icon,
    title,
    text,
    confirmButtonText = 'Mengerti',
}: {
    icon: SweetAlertIcon;
    title: string;
    text?: string;
    confirmButtonText?: string;
}) => {
    return Swal.fire({
        icon,
        title,
        text,
        confirmButtonText,
        background: '#FFFFFF',
        color: '#1C1917',
        buttonsStyling: false,
        customClass: {
            popup: 'rounded-3xl border border-stone-200/90 shadow-2xl p-6 font-sans max-w-sm sm:max-w-md',
            title: 'text-lg font-heading font-extrabold text-stone-900 tracking-tight',
            htmlContainer: 'text-xs font-sans text-stone-600 mt-2 leading-relaxed',
            confirmButton:
                'inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-950 text-white font-mono text-xs font-bold transition-all shadow-sm cursor-pointer',
        },
    });
};

export default {
    showToast,
    toastSuccess,
    toastError,
    toastWarning,
    toastInfo,
    confirmDialog,
    showAlertModal,
};

