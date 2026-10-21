<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use Inertia\Inertia;
use Inertia\Response;

class InquiryController extends Controller
{
    public function index(): Response
    {
        $inquiries = Inquiry::orderBy('is_read', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/Inquiries/Index', [
            'inquiries' => $inquiries,
        ]);
    }

    public function toggleRead(Inquiry $inquiry)
    {
        $inquiry->update([
            'is_read' => !$inquiry->is_read,
        ]);

        return back()->with('success', 'Status pesan berhasil diubah.');
    }

    public function destroy(Inquiry $inquiry)
    {
        $inquiry->delete();

        return back()->with('success', 'Pesan berhasil dihapus.');
    }
}
