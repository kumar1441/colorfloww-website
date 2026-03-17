/**
 * Try.tsx  —  Web Share Page (Feature 3)
 *
 * Route: /try/:shareId
 *
 * Flow:
 *   1. Fetch share row from Supabase (color + sharer's result image)
 *   2. Show sharer's photo + color + CTA to try it yourself
 *   3. User picks nail photo via file input (camera or gallery, no install needed)
 *   4. POST to HuggingFace Gradio API → get nail masks
 *   5. Apply color overlay on HTML Canvas (mirrors NailOverlaySkia blend logic)
 *   6. Show side-by-side comparison (sharer left, visitor right)
 *   7. Download CTA with App Store + Play Store badges
 */

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Sparkles, Camera, RefreshCw } from 'lucide-react';
import { getShare, ShareRow } from '../../services/supabase';

// ─── Analytics ────────────────────────────────────────────────────────────────

function gaEvent(name: string, params?: Record<string, string>) {
    try { (window as any).gtag?.('event', name, params); } catch { /* ignore */ }
}

// ─── Constants ────────────────────────────────────────────────────────────────

const HF_BASE  = 'https://ravi1441-nailrecognition-v3.hf.space';
const HF_URL   = `${HF_BASE}/gradio_api/call/process_image`;
const TEAL     = '#4A7B6E';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Nail {
    mask: string;          // SVG path string
    box: { x: number; y: number; width: number; height: number };
}

type Stage = 'loading' | 'not_found' | 'ready' | 'processing' | 'result' | 'error';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function hexToRgb(hex: string): { r: number; g: number; b: number } {
    const clean = hex.replace('#', '');
    return {
        r: parseInt(clean.slice(0, 2), 16),
        g: parseInt(clean.slice(2, 4), 16),
        b: parseInt(clean.slice(4, 6), 16),
    };
}

function getColorLuminance(hex: string): number {
    const { r, g, b } = hexToRgb(hex);
    const toLinear = (c: number) => {
        const s = c / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/** Resize image to max 1024px wide, returns a data URL */
async function resizeImage(file: File, maxWidth = 1024): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);
        img.onload = () => {
            const scale = Math.min(1, maxWidth / img.width);
            const w = Math.round(img.width * scale);
            const h = Math.round(img.height * scale);
            const canvas = document.createElement('canvas');
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext('2d')!;
            ctx.drawImage(img, 0, 0, w, h);
            URL.revokeObjectURL(url);
            resolve(canvas.toDataURL('image/jpeg', 0.8));
        };
        img.onerror = reject;
        img.src = url;
    });
}

/** Call HuggingFace Gradio API, return nail mask data */
async function detectNails(dataUrl: string): Promise<Nail[]> {
    // POST
    const postRes = await fetch(HF_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
            data: [{ url: dataUrl, orig_name: 'nail.jpg', meta: { _type: 'gradio.FileData' } }],
        }),
    });
    if (!postRes.ok) throw new Error(`HF POST failed: ${postRes.status}`);
    const { event_id } = await postRes.json();
    if (!event_id) throw new Error('No event_id');

    // GET stream
    const streamRes = await fetch(`${HF_URL}/${event_id}`);
    if (!streamRes.ok) throw new Error(`HF GET failed: ${streamRes.status}`);
    const text = await streamRes.text();

    // Parse SSE — result is always the last data line
    const dataLines = text.split('\n').map(l => l.trim()).filter(l => l.startsWith('data:'));
    if (!dataLines.length) return [];
    const jsonStr = dataLines[dataLines.length - 1].replace('data:', '').trim();
    const resultJson = JSON.parse(jsonStr);

    // Extract detections from second element (V2 API format)
    let detections: any[] | null = null;
    if (Array.isArray(resultJson)) {
        const meta = resultJson[1];
        if (typeof meta === 'string') {
            try {
                const p = JSON.parse(meta);
                detections = Array.isArray(p) ? p : p.detections ?? null;
            } catch { /* ignore */ }
        } else if (Array.isArray(meta)) {
            detections = meta;
        } else if (meta && typeof meta === 'object') {
            detections = meta.detections ?? null;
        }
    }
    if (!Array.isArray(detections)) return [];

    const tighten = (pts: { x: number; y: number }[], f = 0.04) => {
        const n = pts.length;
        if (!n) return pts;
        let cx = 0, cy = 0;
        pts.forEach(p => { cx += p.x; cy += p.y; });
        cx /= n; cy /= n;
        return pts.map(p => ({ x: p.x + (cx - p.x) * f, y: p.y + (cy - p.y) * f }));
    };

    return detections.map((det: any): Nail => {
        const w = det.x2 - det.x1, h = det.y2 - det.y1;
        const cx = det.x1 + w / 2, cy = det.y1 + h / 2;
        const rx = w / 2, ry = h / 2;
        let mask = '';

        const rawPts: { x: number; y: number }[] =
            Array.isArray(det.segments) && det.segments.length
                ? det.segments
                : Array.isArray(det.segmentation) && det.segmentation.length
                    ? det.segmentation.map((s: number[]) => ({ x: s[0], y: s[1] }))
                    : [];

        if (rawPts.length) {
            const t = tighten(rawPts);
            mask = `M ${t[0].x} ${t[0].y}` + t.slice(1).map(p => ` L ${p.x} ${p.y}`).join('') + ' Z';
        } else {
            mask = `M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx + rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx - rx} ${cy} Z`;
        }

        return { mask, box: { x: det.x1, y: det.y1, width: w, height: h } };
    });
}

/**
 * Draw photo + nail overlay onto a canvas element.
 * Mirrors the blend-mode logic in NailOverlaySkia.tsx exactly.
 */
async function drawOverlay(
    canvas: HTMLCanvasElement,
    imageDataUrl: string,
    nails: Nail[],
    colorHex: string,
    imgNativeWidth: number,
    imgNativeHeight: number,
): Promise<void> {
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;

    const lum = getColorLuminance(colorHex);
    const isNearBlack  = lum < 0.08;
    const isLightColor = !isNearBlack && lum > 0.65;

    const primaryBlend        = isNearBlack ? 'multiply' : 'color';
    const primaryOpacity      = isNearBlack ? 0.90 : 0.88;
    const showDarkeningLayer  = !isLightColor && !isNearBlack;
    const darkeningOpacity    = 0.45;
    const showSoftLight       = !isNearBlack;
    const softLightOpacity    = isLightColor ? 0.28 : 0.50;
    const highlightOpacity    = 0.12;

    const { r, g, b } = hexToRgb(colorHex);

    // Load image
    const img = await new Promise<HTMLImageElement>((res, rej) => {
        const i = new Image();
        i.onload = () => res(i);
        i.onerror = rej;
        i.src = imageDataUrl;
    });

    // Fit image (cover) inside canvas
    const imgAspect = img.width / img.height;
    const canvasAspect = W / H;
    let drawW: number, drawH: number, offsetX: number, offsetY: number;
    if (imgAspect > canvasAspect) {
        drawH = H; drawW = H * imgAspect;
        offsetX = (W - drawW) / 2; offsetY = 0;
    } else {
        drawW = W; drawH = W / imgAspect;
        offsetX = 0; offsetY = (H - drawH) / 2;
    }

    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);

    if (!nails.length) return;

    const scale = drawW / imgNativeWidth;

    // Helper: draw color fill over each nail mask with given blend mode + opacity
    const drawNailLayer = (
        blendMode: GlobalCompositeOperation,
        opacity: number,
        fillStyle: string,
    ) => {
        ctx.save();
        ctx.globalCompositeOperation = blendMode;
        ctx.globalAlpha = opacity;
        ctx.translate(offsetX, offsetY);
        ctx.scale(scale, scale);
        ctx.fillStyle = fillStyle;
        for (const nail of nails) {
            const p = new Path2D(nail.mask);
            ctx.fill(p);
        }
        ctx.restore();
    };

    // Layer 1: primary color (color or multiply for near-black)
    drawNailLayer(primaryBlend as GlobalCompositeOperation, primaryOpacity, `rgb(${r},${g},${b})`);

    // Layer 2: multiply darkening pass
    if (showDarkeningLayer) {
        drawNailLayer('multiply', darkeningOpacity, `rgb(${r},${g},${b})`);
    }

    // Layer 3: soft-light depth
    if (showSoftLight) {
        drawNailLayer('soft-light', softLightOpacity, `rgb(${r},${g},${b})`);
    }

    // Layer 4: white screen highlight
    drawNailLayer('screen', highlightOpacity, 'rgb(255,255,255)');
}

// ─── Store badges (reused from Hero.tsx) ──────────────────────────────────────

function AppleStoreBadge() {
    return (
        <a
            href="https://apps.apple.com/us/app/colorfloww-nail-color-try-on/id6758867881"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => gaEvent('share_page_appstore_click')}
            className="inline-flex items-center gap-2 bg-black text-white rounded-xl px-4 py-2 hover:bg-neutral-800 transition-colors shadow-sm"
        >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="white">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <div className="text-left leading-tight">
                <div className="text-[8px] font-light opacity-75 tracking-wide">Download on the</div>
                <div className="text-[13px] font-semibold tracking-tight">App Store</div>
            </div>
        </a>
    );
}

function GooglePlayBadge() {
    return (
        <a
            href="https://play.google.com/store/apps/details?id=com.nailay.colorfloww"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => gaEvent('share_page_playstore_click')}
            className="inline-flex items-center gap-2 bg-black text-white rounded-xl px-4 py-2 hover:bg-neutral-800 transition-colors shadow-sm"
        >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <defs>
                    <linearGradient id="gp-b" x1="0%" y1="50%" x2="100%" y2="50%"><stop offset="0%" stopColor="#00A0FF" /><stop offset="100%" stopColor="#00D2FF" /></linearGradient>
                    <linearGradient id="gp-y" x1="100%" y1="50%" x2="0%" y2="50%"><stop offset="0%" stopColor="#FFE000" /><stop offset="100%" stopColor="#FFBD00" /></linearGradient>
                    <linearGradient id="gp-r" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FF3A44" /><stop offset="100%" stopColor="#C31162" /></linearGradient>
                    <linearGradient id="gp-g" x1="100%" y1="100%" x2="0%" y2="0%"><stop offset="0%" stopColor="#32A071" /><stop offset="100%" stopColor="#2DA771" /></linearGradient>
                </defs>
                <path fill="url(#gp-b)" d="M3.77 1.12a1.49 1.49 0 0 0-.5 1.13v19.5c0 .45.17.87.5 1.13l.13.12 10.9-10.9v-.26L3.9 1z" />
                <path fill="url(#gp-y)" d="M18.46 15.67l-3.65-3.66v-.26l3.65-3.65.08.05 4.33 2.46c1.23.7 1.23 1.84 0 2.54l-4.33 2.46-.08.06z" />
                <path fill="url(#gp-r)" d="M18.54 15.62L14.81 11.9 3.77 22.88c.41.43 1.08.49 1.83.05l12.94-7.31z" />
                <path fill="url(#gp-g)" d="M18.54 8.13L5.6.82C4.85.38 4.18.44 3.77.87l11.04 11.03 3.73-3.77z" />
            </svg>
            <div className="text-left leading-tight">
                <div className="text-[8px] font-light opacity-75 tracking-wide">Get it on</div>
                <div className="text-[13px] font-semibold tracking-tight">Google Play</div>
            </div>
        </a>
    );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function Try() {
    const { shareId } = useParams<{ shareId: string }>();

    const [stage, setStage]         = useState<Stage>('loading');
    const [share, setShare]         = useState<ShareRow | null>(null);
    const [resultDataUrl, setResultDataUrl] = useState<string | null>(null);
    const [errorMsg, setErrorMsg]   = useState('');

    const fileInputRef  = useRef<HTMLInputElement>(null);
    const canvasRef     = useRef<HTMLCanvasElement>(null);

    // Fetch share on mount
    useEffect(() => {
        if (!shareId) { setStage('not_found'); return; }
        getShare(shareId).then(row => {
            if (!row) { setStage('not_found'); return; }
            setShare(row);
            setStage('ready');
            // Increment visit count — fire and forget
            fetch(`https://gzeswsfdturoxxacimfx.supabase.co/rest/v1/rpc/increment_share_visits`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
                },
                body: JSON.stringify({ share_id: shareId }),
            }).catch(() => {});
        });
    }, [shareId]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !share) return;

        setStage('processing');
        setErrorMsg('');

        try {
            // 1. Resize
            const dataUrl = await resizeImage(file);

            // 2. Detect nails
            const nails = await detectNails(dataUrl);

            // 3. Draw overlay on canvas
            const img = await new Promise<HTMLImageElement>((res, rej) => {
                const i = new Image();
                i.onload = () => res(i);
                i.onerror = rej;
                i.src = dataUrl;
            });

            const canvas = canvasRef.current!;
            canvas.width  = img.width;
            canvas.height = img.height;

            await drawOverlay(canvas, dataUrl, nails, share.color_hex, img.width, img.height);

            setResultDataUrl(canvas.toDataURL('image/jpeg', 0.92));
            gaEvent('share_page_result_shown', { color_name: share.color_name, color_hex: share.color_hex });
            setStage('result');
        } catch (err) {
            console.error('[Try] Processing error:', err);
            setErrorMsg('Something went wrong. Please try a different photo.');
            setStage('error');
        }
    };

    // ── Render helpers ──────────────────────────────────────────────────────

    if (stage === 'loading') {
        return (
            <div className="min-h-screen bg-[#F8F6F3] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-[#4A7B6E] border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-500 font-medium" style={{ fontFamily: "'Quicksand', sans-serif" }}>Loading…</p>
                </div>
            </div>
        );
    }

    if (stage === 'not_found') {
        return (
            <div className="min-h-screen bg-[#F8F6F3] flex items-center justify-center px-4">
                <div className="text-center max-w-sm">
                    <div className="text-5xl mb-4">💅</div>
                    <h1 className="text-2xl font-bold text-[#1A1A1A] mb-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                        Link not found
                    </h1>
                    <p className="text-gray-500 mb-8">This share link may have expired or doesn't exist.</p>
                    <a href="/" className="inline-flex items-center gap-2 bg-[#4A7B6E] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#3d6b5f] transition-colors">
                        Try Colorfloww free
                    </a>
                </div>
            </div>
        );
    }

    if (!share) return null;

    return (
        <div className="min-h-screen bg-[#F8F6F3]" style={{ fontFamily: "'Quicksand', sans-serif" }}>

            {/* Hidden canvas for rendering */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Header */}
            <div className="bg-white border-b border-gray-100 px-4 py-4 flex items-center justify-between max-w-2xl mx-auto">
                <a href="/" className="text-xl font-black text-[#1A1A1A] tracking-tight">Colorfloww</a>
                <span className="text-xs text-gray-400 font-medium">Virtual Nail Try-On</span>
            </div>

            <div className="max-w-2xl mx-auto px-4 py-8">

                {/* Color pill + headline */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="inline-flex items-center gap-2.5 bg-white rounded-2xl px-4 py-2.5 shadow-sm border border-gray-100 mb-4">
                        <div
                            className="w-6 h-6 rounded-full border border-black/10 flex-shrink-0"
                            style={{ backgroundColor: share.color_hex }}
                        />
                        <span className="text-sm font-bold text-[#1A1A1A]">{share.color_name}</span>
                    </div>
                    <h1 className="text-3xl font-black text-[#1A1A1A] leading-tight tracking-tight">
                        Your friend tried<br />
                        <span style={{ color: TEAL }}>{share.color_name}</span> 💅
                    </h1>
                    <p className="text-gray-500 mt-2 text-sm">See how it looks on your nails — no app needed</p>
                </motion.div>

                {/* Main content */}
                <AnimatePresence mode="wait">

                    {/* Ready — sharer's photo + CTA */}
                    {(stage === 'ready' || stage === 'error') && (
                        <motion.div
                            key="ready"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            {/* Sharer's result */}
                            {share.sharer_image_url && (
                                <div className="mb-6">
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">Their look</p>
                                    <div className="rounded-3xl overflow-hidden shadow-lg bg-white">
                                        <img
                                            src={share.sharer_image_url}
                                            alt="Sharer's nail look"
                                            className="w-full object-cover max-h-80"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Error message */}
                            {stage === 'error' && (
                                <div className="bg-red-50 border border-red-100 rounded-2xl px-4 py-3 mb-4 text-red-600 text-sm text-center">
                                    {errorMsg}
                                </div>
                            )}

                            {/* CTA card */}
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 text-center">
                                <div
                                    className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                                    style={{ backgroundColor: `${share.color_hex}22` }}
                                >
                                    <Camera size={26} style={{ color: share.color_hex }} />
                                </div>
                                <h2 className="text-lg font-black text-[#1A1A1A] mb-1">Now try it on yours</h2>
                                <p className="text-gray-400 text-sm mb-5">Take a photo of your nails — we'll apply the same color instantly</p>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                                <button
                                    onClick={() => {
                                        gaEvent('share_page_photo_tapped', { color_name: share.color_name, color_hex: share.color_hex });
                                        fileInputRef.current?.click();
                                    }}
                                    className="w-full py-4 rounded-2xl font-bold text-white text-base transition-colors"
                                    style={{ backgroundColor: TEAL }}
                                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#3d6b5f')}
                                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = TEAL)}
                                >
                                    {stage === 'error' ? 'Try another photo' : 'Take a photo of my nails'}
                                </button>
                                <p className="text-[11px] text-gray-300 mt-3 leading-relaxed">
                                    Works on iOS Safari &amp; Android Chrome.<br />
                                    <span className="text-gray-400">Camera blank? Settings → [Browser] → Camera → Allow</span>
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {/* Processing */}
                    {stage === 'processing' && (
                        <motion.div
                            key="processing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-16"
                        >
                            <div className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center"
                                style={{ backgroundColor: `${share.color_hex}22` }}
                            >
                                <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin"
                                    style={{ borderColor: `${share.color_hex} transparent transparent transparent` }}
                                />
                            </div>
                            <p className="font-bold text-[#1A1A1A] text-lg">Applying {share.color_name}…</p>
                            <p className="text-gray-400 text-sm mt-1">Detecting your nails</p>
                        </motion.div>
                    )}

                    {/* Result — hero layout */}
                    {stage === 'result' && resultDataUrl && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {/* Hero: user's result, full width */}
                            <div className="relative rounded-3xl overflow-hidden shadow-xl mb-4">
                                <img
                                    src={resultDataUrl}
                                    alt="Your nails"
                                    className="w-full object-cover"
                                />

                                {/* Color pill overlay — bottom left */}
                                <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5">
                                    <div
                                        className="w-3.5 h-3.5 rounded-full border border-white/30 flex-shrink-0"
                                        style={{ backgroundColor: share.color_hex }}
                                    />
                                    <span className="text-white text-xs font-bold">{share.color_name}</span>
                                    <Sparkles size={9} className="text-white/60" />
                                </div>

                                {/* Friend's thumbnail pip — top right */}
                                {share.sharer_image_url && (
                                    <div className="absolute top-3 right-3 flex flex-col items-end">
                                        <p className="text-white/70 text-[9px] font-semibold uppercase tracking-wider mb-1 drop-shadow">Their look</p>
                                        <div className="w-[72px] h-[72px] rounded-xl overflow-hidden border-2 border-white/50 shadow-lg">
                                            <img
                                                src={share.sharer_image_url}
                                                alt="Friend's nails"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Try again — subtle ghost button */}
                            <button
                                onClick={() => { setStage('ready'); setResultDataUrl(null); }}
                                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-gray-200 text-gray-400 text-sm font-semibold mb-6 hover:bg-gray-50 transition-colors"
                            >
                                <RefreshCw size={13} /> Try a different photo
                            </button>

                            {/* Download CTA — compact white card */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex flex-col items-center gap-3">
                                <div className="text-center">
                                    <h3 className="text-[#1A1A1A] font-black text-base tracking-tight">Try 50+ more colors free</h3>
                                    <p className="text-gray-400 text-xs mt-0.5">iOS &amp; Android · No account needed</p>
                                </div>
                                <div className="flex flex-row gap-2.5">
                                    <AppleStoreBadge />
                                    <GooglePlayBadge />
                                </div>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}
