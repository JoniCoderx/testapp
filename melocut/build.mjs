// Generates the static HTML pages in ./site from the page definitions below.
//   node build.mjs                     (uses https://melocut.com)
//   SITE_URL=https://example.com node build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), 'site');
const SITE_URL = (process.env.SITE_URL || 'https://melocut.com').replace(/\/$/, '');
const EMAIL = process.env.CONTACT_EMAIL || 'hello@melocut.com';
const NAME = 'MeloCut';
const UPDATED = new Date().toISOString().slice(0, 10);
const LEGAL_UPDATED = 'October 26, 2026'; // change by hand when the privacy policy or terms change

const ICONS = {
  video: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="14" height="14" rx="2"/><path d="m16 10 6-3v10l-6-3"/></svg>',
  bell: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/></svg>',
  cut: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12"/></svg>',
  swap: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3l4 4-4 4"/><path d="M3 7h18"/><path d="M7 21l-4-4 4-4"/><path d="M21 17H3"/></svg>',
  lock: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  bolt: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9z"/></svg>',
  phone: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/></svg>',
  free: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12v9H4v-9M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 1 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 1 0 0-5C13 2 12 7 12 7z"/></svg>',
  merge: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>',
  slow: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  orbit: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14v-2a9 9 0 0 1 18 0v2"/><path d="M21 15a2 2 0 0 1-2 2h-1v-5h3zM3 15a2 2 0 0 0 2 2h1v-5H3z"/></svg>',
  bass: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><circle cx="12" cy="14" r="4"/><path d="M12 6h.01"/></svg>',
  volume: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/></svg>',
  sparkle: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></svg>',
  mic: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 17v5M3 3l18 18"/></svg>',
  reverse: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>',
  book: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>',
};

// ---------- tools and conversions ----------
const TOOLS = [
  { slug: 'video-to-mp3', nav: 'Video to MP3', icon: 'video', title: 'Video to MP3', blurb: 'Get the sound out of an MP4, MOV or WebM video.' },
  { slug: 'ringtone-maker', nav: 'Ringtone Maker', icon: 'bell', title: 'Ringtone Maker', blurb: 'Turn part of a song into an iPhone or Android ringtone.' },
  { slug: 'audio-cutter', nav: 'Audio Cutter', icon: 'cut', title: 'Audio Cutter', blurb: 'Trim a song or cut a piece out of the middle.' },
  { slug: 'audio-converter', nav: 'Audio Converter', icon: 'swap', title: 'Audio Converter', blurb: 'Switch between MP3, WAV, M4A, OGG and FLAC.' },
  { slug: 'audio-joiner', nav: 'Audio Joiner', icon: 'merge', title: 'Audio Joiner', blurb: 'Put several songs or clips together into one file.' },
  { slug: 'noise-remover', icon: 'sparkle', title: 'AI Noise Remover', ai: true, blurb: 'Clean up background noise in voice recordings.' },
  { slug: 'slowed-reverb', icon: 'slow', title: 'Slowed + Reverb', blurb: 'Make a slowed version of a song with reverb.' },
  { slug: 'vocal-remover', icon: 'mic', title: 'Vocal Remover', blurb: 'Take the singer out for a karaoke track.' },
  { slug: '8d-audio', icon: 'orbit', title: '8D Audio', blurb: 'Sound that moves from ear to ear. Use headphones.' },
  { slug: 'bass-booster', icon: 'bass', title: 'Bass Booster', blurb: 'Add more low end to any song.' },
  { slug: 'volume-booster', icon: 'volume', title: 'Volume Booster', blurb: 'Make quiet recordings louder.' },
  { slug: 'reverse-audio', icon: 'reverse', title: 'Reverse Audio', blurb: 'Play any sound backwards.' },
];
// Format landing pages: same converter, output format picked in advance.
const CONVERSIONS = [
  { slug: 'mp4-to-mp3', label: 'MP4 to MP3' },
  { slug: 'wav-to-mp3', label: 'WAV to MP3' },
  { slug: 'm4a-to-mp3', label: 'M4A to MP3' },
  { slug: 'whatsapp-audio-to-mp3', label: 'WhatsApp audio to MP3' },
  { slug: 'mp3-to-wav', label: 'MP3 to WAV' },
  { slug: 'flac-to-mp3', label: 'FLAC to MP3' },
];
const MAIN_NAV = ['video-to-mp3', 'ringtone-maker', 'audio-cutter', 'audio-converter', 'audio-joiner'];
const toolCard = (t) => `<a class="card" href="/${t.slug}/"><div class="ico">${ICONS[t.icon]}</div><b>${t.title}${t.ai ? '<span class="ai">AI</span>' : ''}</b><p>${t.blurb}</p></a>`;
const CONVERSION_LINKS = `<div class="chips-links">${CONVERSIONS.map((c) => `<a class="chip" href="/${c.slug}/">${c.label}</a>`).join('')}</div>`;
const INSTALL_CALLOUT = `
  <div class="section"><div class="callout"><p>You can add ${NAME} to your phone's home screen and open it like an app. After your first visit, the tools also work offline.</p>
    <a class="btn sm" href="/guides/install-app/">How to install</a></div></div>`;

const WHY = `
  <div class="section">
    <h2>Why use ${NAME}</h2>
    <div class="cards">
      <div class="card"><div class="ico">${ICONS.lock}</div><b>Your files stay with you</b><p>Everything happens in your browser. Nothing gets uploaded, so nobody else ever sees your files.</p></div>
      <div class="card"><div class="ico">${ICONS.bolt}</div><b>No waiting</b><p>There's no upload and no download queue. A song usually takes a few seconds. Long videos take a bit longer.</p></div>
      <div class="card"><div class="ico">${ICONS.phone}</div><b>Phone or computer</b><p>Works in Safari, Chrome, Edge and Firefox. You can also install it on your home screen.</p></div>
      <div class="card"><div class="ico">${ICONS.sparkle}</div><b>Free, no watermark</b><p>No account and nothing added to your audio. Use it as often as you like, with files up to 1 GB.</p></div>
    </div>
  </div>`;

// ---------- pages ----------
const PAGES = [
  {
    path: '',
    title: `Free Audio Cutter, Ringtone Maker & MP3 Converter | ${NAME}`,
    description: 'Cut songs, make ringtones for iPhone and Android, add effects and convert video to MP3. Free, and your files never leave your device.',
    h1: 'Cut songs, make ringtones and add effects, <em>right in your browser</em>',
    lead: 'Free audio tools that work on your phone or computer. Your files are never uploaded. Pick a tool to start.',
    badges: ['12 free tools', 'AI noise removal', 'No upload', 'No sign-up'],
    body: `
  <div class="cards" id="tools" style="margin-top:8px">
    ${TOOLS.map(toolCard).join('\n    ')}
  </div>
  <div class="section"><h2>Popular conversions</h2>${CONVERSION_LINKS}</div>
  <div class="ad" data-slot="top"></div>
  <div class="section prose">
    <h2>Effects in every tool</h2>
    <p>Each tool has an <strong>Effects &amp; filters</strong> panel. You can set fade in and fade out, volume, speed, pitch, bass, treble and reverb, or switch on 8D audio, AI noise removal, the vocal remover and more. Presets like <em>Slowed + Reverb</em>, <em>Nightcore</em> and <em>Bass Boosted</em> set everything with one tap.</p>
    <p>A second waveform shows what your effects do while you move the sliders, and <strong>Preview with effects</strong> plays the result before you save it.</p>
  </div>
  ${WHY}
  ${INSTALL_CALLOUT}
  <div class="section prose">
    <h2>How it works</h2>
    <p>Most converter sites make you upload your file, wait, and download it again. ${NAME} runs FFmpeg, the audio engine used by a lot of desktop software, directly in your browser. Your songs, voice notes and videos stay on your device the whole time. There are no pop-ups and no fake download buttons. The site is free because it shows a few ads, and they're always labelled.</p>
  </div>`,
    faq: [
      ['Is MeloCut free?', 'Yes. Every tool is free, paid for by a few labelled ads. There is no sign-up and no watermark.'],
      ['Are my files uploaded anywhere?', 'No. All processing happens in your browser on your own device.'],
      ['Does it work on iPhone and Android?', 'Yes. It works in Safari, Chrome, Firefox and Edge on phones, tablets and computers.'],
      ['Which file types can I open?', 'MP3, MP4, MOV, M4A, WAV, OGG, OPUS, FLAC, WebM, AAC, AMR, 3GP and most other audio and video formats.'],
      ['Can I install MeloCut as an app?', 'Yes. Add it to your home screen from Safari or Chrome. It opens full screen, and tools you have used before keep working offline. The install guide shows the steps.'],
      ['Does MeloCut use AI?', 'The noise remover uses RNNoise, a small neural network that separates speech from background noise. It runs on your device. The other effects are standard audio processing.'],
    ],
  },
  {
    path: 'video-to-mp3', tool: 'video-to-mp3', crumb: 'Tools',
    title: `Video to MP3 Converter, Free and Online | ${NAME}`,
    description: 'Convert MP4, MOV, WebM and other videos to MP3 in your browser. Up to 320 kbps, no upload, no sign-up. Works on iPhone and Android.',
    h1: 'Video to <em>MP3</em> converter',
    lead: 'Take the sound from any video and save it as MP3, M4A or WAV. It runs on your device, so even big videos are quick.',
    badges: ['Up to 320 kbps', 'MP4, MOV, WebM, MKV', 'No upload'],
    steps: [
      ['Choose your video', 'Tap the box above and pick a video, or drag one in.'],
      ['Trim it if you want', 'Keep all of the audio, or drag on the waveform to keep only part of it.'],
      ['Convert and download', 'Pick MP3 and a quality, press Convert, then Download.'],
    ],
    content: `
    <h2>Get the audio from a video</h2>
    <p>Filmed a concert, a lecture or something funny and only need the sound? Open the video here and save the audio as an MP3 you can play in your car, in a music app or anywhere else.</p>
    <h3>Which videos work?</h3>
    <p>MP4, MOV (the format iPhones record in), WebM, MKV, AVI and 3GP. If your browser can open the file, it will almost always work.</p>
    <h3>Which quality should I pick?</h3>
    <p>Use <strong>320 kbps</strong> for music. <strong>128 kbps</strong> is plenty for speech and makes much smaller files. Pick <strong>WAV</strong> if you want to edit the audio afterwards.</p>`,
    faq: [
      ['How do I convert MP4 to MP3?', 'Open the MP4 above, choose MP3 and a quality, press Convert and then Download. It takes a few seconds.'],
      ['Can I convert iPhone videos?', 'Yes. Pick the video from Photos or Files and it converts like any other.'],
      ['Is there a size limit?', 'Files up to 1 GB work. Very large files depend on how much memory your device has.'],
      ['Can I convert YouTube videos?', 'MeloCut works with files on your device. It does not download from YouTube or other sites.'],
    ],
  },
  {
    path: 'ringtone-maker', tool: 'ringtone', crumb: 'Tools',
    title: `Ringtone Maker for iPhone and Android, Free | ${NAME}`,
    description: 'Make a ringtone from any song. Pick the best part, add a fade and save it as M4R for iPhone or MP3 for Android. Free, no app needed.',
    h1: '<em>Ringtone maker</em> for iPhone and Android',
    lead: 'Pick your favorite part of a song and save it as a ringtone for iPhone (M4R) or Android (MP3).',
    badges: ['iPhone M4R', 'Android MP3', 'Fade in and out'],
    steps: [
      ['Choose a song', 'Open any song or video from your device.'],
      ['Pick the part you like', 'Drag on the waveform to select up to 40 seconds. Press Play to check it.'],
      ['Download the ringtone', 'Choose M4R for iPhone or MP3 for Android, then Convert and Download.'],
    ],
    content: `
    <h2>Setting the ringtone on your phone</h2>
    <h3>iPhone</h3>
    <p>With a computer: download the <strong>M4R</strong> file, connect your iPhone and drag the file onto it in Finder (Mac) or iTunes (Windows). It then shows up in <em>Settings → Sounds &amp; Haptics → Ringtone</em>. Without a computer, open the file in <strong>GarageBand</strong> on your iPhone and use <em>Share → Ringtone</em>.</p>
    <h3>Android</h3>
    <p>Download the <strong>MP3</strong>, go to <em>Settings → Sound → Phone ringtone</em> and pick it. On some phones you tap "+" or "Add ringtone" first.</p>
    <p>The <a href="/guides/set-ringtone/">ringtone guide</a> walks through every step, including the exact menu names on each phone.</p>
    <h3>A few tips</h3>
    <p>Start just before the chorus, keep it between 20 and 30 seconds, and leave the fades on so it doesn't start or stop suddenly.</p>`,
    faq: [
      ['How long can a ringtone be?', 'iPhone allows up to 40 seconds, so MeloCut stops your selection there.'],
      ['What is an M4R file?', 'It is the ringtone format iPhones use. Inside it is a normal M4A (AAC) audio file.'],
      ['Can I make a ringtone from a video?', 'Yes. Open the video and MeloCut uses its sound.'],
      ['Is it free?', 'Yes, completely free, with no watermark and no sign-up.'],
    ],
  },
  {
    path: 'audio-cutter', tool: 'cutter', crumb: 'Tools',
    title: `Audio Cutter: Trim MP3 and Cut Songs Online | ${NAME}`,
    description: 'Trim MP3s and other audio online. Keep a part or cut one out, add fades, and save as MP3, M4A, WAV, OGG or FLAC. Free and private.',
    h1: '<em>Audio cutter</em>: trim MP3 and cut songs',
    lead: 'Trim the start and end of a song, or remove a part from the middle. Add fades and save in the format you need.',
    badges: ['Keep or remove a part', 'Fade in and out', 'MP3, WAV, FLAC'],
    steps: [
      ['Open your audio', 'Choose an MP3, WAV, M4A or any audio or video file.'],
      ['Select the part', 'Drag the handles on the waveform, or type the exact start and end times.'],
      ['Keep it or remove it', 'Choose Keep selection or Remove selection, then Convert and Download.'],
    ],
    content: `
    <h2>Cut exactly where you want</h2>
    <p>The waveform shows where the music gets loud or quiet. Drag the handles to the right spot and press Play to listen before you save. For exact cuts, type the times yourself, for example <code>1:23.5</code>.</p>
    <h3>Remove something from the middle</h3>
    <p>Switch to <strong>Remove selection</strong> to take out an intro, a long pause, a mistake or an ad. The two parts on either side get joined automatically.</p>
    <h3>Keep full quality</h3>
    <p>Choose <strong>WAV</strong> or <strong>FLAC</strong> if you'll edit the file again later. Both are lossless.</p>`,
    faq: [
      ['How do I trim an MP3?', 'Open the MP3, drag the handles to the part you want, choose Keep selection, then press Convert and Download.'],
      ['Can I cut a part out of the middle?', "Yes. Select the part you don't want and choose Remove selection."],
      ['Does cutting lower the quality?', 'Pick 320 kbps MP3 to keep it close to the original, or WAV or FLAC for no loss at all.'],
      ['Does it work offline?', 'Yes, once you have used a tool online one time. The audio engine is then saved on your device.'],
    ],
  },
  {
    path: 'audio-converter', tool: 'converter', crumb: 'Tools',
    title: `Audio Converter: MP3, WAV, M4A, OGG, FLAC | ${NAME}`,
    description: 'Convert audio online for free: MP3, WAV, M4A, OGG, FLAC and OPUS. Change speed and volume too. Works with WhatsApp voice notes. No upload.',
    h1: '<em>Audio converter</em> for MP3, WAV, M4A, OGG and FLAC',
    lead: 'Convert between MP3, WAV, M4A, OGG and FLAC. It also opens WhatsApp and Telegram voice notes (OPUS).',
    badges: ['MP3, WAV, M4A, OGG, FLAC', 'Speed and volume', 'Voice notes'],
    steps: [
      ['Open a file', 'Any audio or video file, including WhatsApp .opus voice notes.'],
      ['Pick the format', 'Choose the output format and quality. Add effects if you like.'],
      ['Convert and download', 'Press Convert, then Download.'],
    ],
    content: `
    <h2>Convert almost any audio file</h2>
    <p>${NAME} opens MP3, WAV, M4A, AAC, OGG, OPUS, FLAC, AMR and WMA, and saves to the format your phone, car or app needs.</p>
    <p>Open <strong>Effects &amp; filters</strong> if you also want to add fades, change the speed or pitch, boost the bass or volume, clean up noise or add reverb.</p>
    <h3>Popular conversions</h3>
    ${CONVERSION_LINKS}
    <h3>WhatsApp and Telegram voice notes</h3>
    <p>Voice messages are saved as <code>.opus</code> or <code>.ogg</code> files that a lot of players won't open. Convert them to MP3 and they play anywhere.</p>`,
    faq: [
      ['How do I convert WAV to MP3?', 'Open the WAV, choose MP3 and a quality, then press Convert and Download.'],
      ['How do I convert a WhatsApp voice note to MP3?', 'Save the voice note (.opus) to your device, open it here, choose MP3 and press Convert.'],
      ['Which audio format is best?', 'MP3 plays everywhere. M4A sounds a little better at the same size. FLAC and WAV keep full quality but are bigger.'],
      ['Can I make a slowed + reverb version?', 'Yes. Tap the Slowed + Reverb preset in Effects, or use the Slowed + Reverb tool.'],
    ],
  },
  // ---------- format landing pages ----------
  {
    path: 'mp4-to-mp3', tool: 'video-to-mp3', format: 'mp3', crumb: 'Converters',
    title: `MP4 to MP3 Converter, Free and Private | ${NAME}`,
    description: 'Convert MP4 to MP3 online in a few seconds. Up to 320 kbps, no upload, no sign-up, no watermark. Works on iPhone, Android and PC.',
    h1: '<em>MP4 to MP3</em> converter',
    lead: 'Open an MP4 and save its sound as an MP3. It runs in your browser, so the video never leaves your device.',
    badges: ['Up to 320 kbps', 'No upload', 'Free'],
    steps: [
      ['Open the MP4', 'Tap the box above and choose your video.'],
      ['Pick a quality', '320 kbps for music, 128 kbps for speech.'],
      ['Download the MP3', 'Press Convert, then Download.'],
    ],
    content: `
    <h2>Why convert MP4 to MP3?</h2>
    <p>An MP4 holds both video and sound. If you only want to listen, an MP3 is much smaller and plays on every phone, car stereo and music app.</p>
    <h3>Only need part of it?</h3>
    <p>Drag on the waveform to keep just the section you want, for example one song from a concert video.</p>`,
    faq: [
      ['Will the MP3 sound as good as the video?', 'At 320 kbps the difference is very hard to hear.'],
      ['How big will the MP3 be?', 'About 2.4 MB per minute at 320 kbps, or about 1 MB per minute at 128 kbps.'],
    ],
  },
  {
    path: 'wav-to-mp3', tool: 'converter', format: 'mp3', crumb: 'Converters',
    title: `WAV to MP3 Converter, Free and Online | ${NAME}`,
    description: 'Convert WAV to MP3 online and make your files up to 10 times smaller. Choose 128 to 320 kbps. Free, private, no upload.',
    h1: '<em>WAV to MP3</em> converter',
    lead: 'Turn large WAV files into MP3s that are easy to share and play anywhere.',
    badges: ['Up to 10× smaller', '128 to 320 kbps', 'No upload'],
    steps: [
      ['Open the WAV', 'Choose a WAV file from your device.'],
      ['Pick a quality', '320 kbps keeps it closest to the original.'],
      ['Download the MP3', 'Press Convert, then Download.'],
    ],
    content: `
    <h2>WAV or MP3?</h2>
    <p>WAV files are uncompressed, so a three-minute song takes around 30 MB. As an MP3 at 320 kbps it's about 7 MB and sounds almost the same. That makes it much easier to email, upload or keep on your phone.</p>
    <p>Keep the WAV as well if you plan to edit the recording later.</p>`,
    faq: [
      ['Does converting WAV to MP3 lose quality?', 'A little, because MP3 is compressed. At 320 kbps most people cannot hear it.'],
      ['Can I convert several WAV files at once?', 'Convert them one after another, or join them into one MP3 with the Audio Joiner.'],
    ],
  },
  {
    path: 'm4a-to-mp3', tool: 'converter', format: 'mp3', crumb: 'Converters',
    title: `M4A to MP3 Converter, Free and Online | ${NAME}`,
    description: 'Convert M4A to MP3 online: iPhone voice memos, iTunes audio and more. Free, private and quick. No upload, no sign-up.',
    h1: '<em>M4A to MP3</em> converter',
    lead: 'Convert iPhone voice memos and other M4A files to MP3 so they play on any device.',
    badges: ['Voice memos', 'iTunes audio', 'No upload'],
    steps: [
      ['Open the M4A', 'Choose the file. On iPhone, share a voice memo to Files first.'],
      ['Pick a quality', '128 kbps is fine for voice, 320 kbps for music.'],
      ['Download the MP3', 'Press Convert, then Download.'],
    ],
    content: `
    <h2>About M4A files</h2>
    <p>M4A is the audio format Apple uses for voice memos and iTunes downloads. It sounds good, but some older players, cars and Windows apps don't support it. MP3 works everywhere.</p>
    <h3>Voice memos with background noise?</h3>
    <p>Turn on <strong>AI noise removal</strong> in Effects before you convert, or use the <a href="/noise-remover/">AI Noise Remover</a>.</p>`,
    faq: [
      ['How do I get a voice memo off my iPhone?', 'In Voice Memos, tap the memo, then Share → Save to Files. Then open it here.'],
      ['Can I convert protected iTunes songs?', 'No. Songs with copy protection (DRM) cannot be converted.'],
    ],
  },
  {
    path: 'whatsapp-audio-to-mp3', tool: 'converter', format: 'mp3', crumb: 'Converters',
    title: `WhatsApp Audio to MP3 (OPUS to MP3), Free | ${NAME}`,
    description: 'Convert WhatsApp and Telegram voice notes (.opus, .ogg) to MP3 so they play anywhere. Free and private: your messages never get uploaded.',
    h1: '<em>WhatsApp audio</em> to MP3',
    lead: 'Convert WhatsApp and Telegram voice notes (.opus or .ogg) to MP3. Your messages stay on your phone.',
    badges: ['OPUS and OGG', 'Private', 'Free'],
    steps: [
      ['Save the voice note', 'In WhatsApp, long-press the voice note → Share (or Export) → Save to Files.'],
      ['Open it here', 'Tap the box above and choose the .opus file.'],
      ['Download the MP3', 'Press Convert, then Download.'],
    ],
    content: `
    <h2>Why WhatsApp voice notes don't play everywhere</h2>
    <p>WhatsApp saves voice messages as OPUS audio. It's a good format for speech, but many music players, editors and older phones can't open it. An MP3 plays everywhere and is easy to email or keep.</p>
    <h3>Private by design</h3>
    <p>Voice notes are personal, so it matters that ${NAME} never uploads them. The conversion happens on your own phone or computer.</p>
    <h3>Several voice notes?</h3>
    <p>Use the <a href="/audio-joiner/">Audio Joiner</a> to put them into one MP3.</p>`,
    faq: [
      ['Where does WhatsApp save voice notes on Android?', 'Usually in Internal storage → Android → media → com.whatsapp → WhatsApp → Media → WhatsApp Voice Notes.'],
      ['Can I make a voice note louder?', 'Yes. Raise Volume or turn on Auto loudness in Effects before converting.'],
    ],
  },
  {
    path: 'mp3-to-wav', tool: 'converter', format: 'wav', crumb: 'Converters',
    title: `MP3 to WAV Converter, Free and Online | ${NAME}`,
    description: 'Convert MP3 to WAV online for editing, DJ software or CD burning. Free, quick and private. Nothing is uploaded.',
    h1: '<em>MP3 to WAV</em> converter',
    lead: 'Convert MP3s to WAV for editing software, DJ apps or burning CDs.',
    badges: ['16-bit WAV', 'For editing', 'No upload'],
    steps: [
      ['Open the MP3', 'Choose an MP3 from your device.'],
      ['WAV is already selected', 'Add effects first if you want.'],
      ['Download the WAV', 'Press Convert, then Download.'],
    ],
    content: `
    <h2>When you need a WAV</h2>
    <p>Some editing programs, samplers and CD burning apps only take WAV. Converting gives you a file they all accept.</p>
    <p>One thing to know: converting an MP3 to WAV doesn't bring back quality the MP3 already lost. The WAV sounds the same as the MP3, it's just bigger and easier to edit.</p>`,
    faq: [
      ['Will MP3 to WAV improve the quality?', 'No. It keeps the quality the MP3 has, in a format that is easier to edit.'],
      ['Why is the WAV so much bigger?', 'WAV is uncompressed, so it uses about 10 MB per minute.'],
    ],
  },
  {
    path: 'flac-to-mp3', tool: 'converter', format: 'mp3', crumb: 'Converters',
    title: `FLAC to MP3 Converter, Free and Online | ${NAME}`,
    description: 'Convert FLAC to MP3 online so your music plays on any phone, car or player. Choose up to 320 kbps. Free and private.',
    h1: '<em>FLAC to MP3</em> converter',
    lead: 'Convert lossless FLAC music to MP3 for your phone, car or any player.',
    badges: ['Up to 320 kbps', 'Smaller files', 'No upload'],
    steps: [
      ['Open the FLAC', 'Choose a FLAC file from your device.'],
      ['Pick 320 kbps', 'That keeps it as close to the original as MP3 allows.'],
      ['Download the MP3', 'Press Convert, then Download.'],
    ],
    content: `
    <h2>FLAC or MP3?</h2>
    <p>FLAC keeps every detail of the original recording, but the files are large and not every device plays them. A 320 kbps MP3 is around a third of the size and sounds very close, which is ideal for phones and cars.</p>`,
    faq: [
      ['Should I delete my FLAC files after converting?', 'Keep them if you have the space. You can always make new MP3s from them, but not the other way round.'],
    ],
  },
  // ---------- effect tools ----------
  {
    path: 'audio-joiner', tool: 'joiner', crumb: 'Tools',
    title: `Audio Joiner: Merge MP3 Songs Online, Free | ${NAME}`,
    description: 'Join MP3, M4A, WAV and other audio files into one. Reorder them, listen, add a crossfade and even out the volume. Free and private.',
    h1: '<em>Audio joiner</em>: merge songs into one file',
    lead: 'Put several songs, voice notes or clips together into one file. Listen to each one, change the order and add a crossfade.',
    badges: ['2 or more files', 'Crossfade', 'Even volume'],
    steps: [
      ['Add your files', 'Choose two or more audio or video files. You can add more later.'],
      ['Put them in order', 'Tap ▶ to listen, use the arrows to reorder, and set the crossfade or turn it off.'],
      ['Join, listen, download', 'Press Join files, listen to the result, then Download.'],
    ],
    content: `
    <h2>Mixes, medleys and long recordings</h2>
    <p>Make a party mix, join voice notes into one message, or put the parts of a recording back together. A <strong>crossfade</strong> blends each track into the next one, and <strong>Even out volume</strong> stops quiet files from sounding much softer than loud ones.</p>
    <h3>Different formats are fine</h3>
    <p>You can mix MP3, M4A, WAV, OGG, OPUS and videos in one go. ${NAME} converts them all to the same format first.</p>`,
    faq: [
      ['How many files can I join?', 'Two or more. There is no fixed limit: each file can be up to 1 GB, and the total depends on your device memory. Most phones handle dozens of songs.'],
      ['Can I join files with no gap?', 'Yes. Turn the crossfade off and they play straight after each other.'],
      ['Can I join videos?', 'Yes. MeloCut takes the sound from each video and joins the audio.'],
    ],
  },
  {
    path: 'noise-remover', tool: 'denoise', crumb: 'Tools',
    title: `AI Noise Remover for Voice Recordings, Free | ${NAME}`,
    description: 'Remove background noise from voice recordings, voice notes and videos with AI. It runs on your device, nothing is uploaded. Free.',
    h1: '<em>AI</em> noise remover',
    lead: 'Remove wind, traffic, fans and hum from voice recordings. A small neural network does the work on your own device.',
    badges: ['Neural network (RNNoise)', 'Voice notes and podcasts', 'No upload'],
    steps: [
      ['Open your recording', 'A voice note, interview, lecture or video.'],
      ['Listen to the clean version', 'AI noise removal is already on. Press Preview with effects.'],
      ['Download', 'Press Convert, then Download.'],
    ],
    content: `
    <h2>How the AI part works</h2>
    <p>${NAME} uses <strong>RNNoise</strong>, a neural network trained to tell speech apart from background noise. The model is about 300 KB and runs in your browser, so private recordings never leave your phone or computer.</p>
    <p>In our own test with a voice recorded next to a running fan, the noise in the pauses between words dropped by about 18 dB, which sounds roughly a third as loud, while the voice kept its level. Results depend on the recording, so press Preview and listen for yourself.</p>
    <h3>Getting the best result</h3>
    <p>It's made for speech: podcasts, interviews, voice notes and calls. On music it can remove instruments too, so for songs use <strong>Reduce hiss</strong> instead. <strong>Auto loudness</strong> and <strong>Remove silences</strong> are switched on here as well, which gives a cleaner result.</p>`,
    faq: [
      ['Is this real AI?', 'Yes. It uses RNNoise, a neural network for cleaning up speech. The model downloads the first time you use it and then runs on your device.'],
      ['Does it work on music?', 'It is designed for voices. On songs it may remove instruments, so use Reduce hiss for music.'],
      ['Is my recording uploaded?', 'No. Everything runs in your browser.'],
    ],
  },
  {
    path: 'slowed-reverb', tool: 'slowed-reverb', crumb: 'Tools',
    title: `Slowed + Reverb Maker, Free and Online | ${NAME}`,
    description: 'Make slowed + reverb versions of any song. Adjust speed, pitch and reverb, listen first, and download an MP3. Free, no watermark.',
    h1: '<em>Slowed + reverb</em> maker',
    lead: 'Make a slowed + reverb version of any song. The settings are ready to go, and you can adjust speed, pitch and reverb.',
    badges: ['Speed and pitch', 'Reverb', 'Nightcore too'],
    steps: [
      ['Open a song', 'Choose any song from your device.'],
      ['Adjust it', 'Speed 0.85× with reverb is already set. Change it and press Preview with effects.'],
      ['Download', 'Convert and save it as an MP3.'],
    ],
    content: `
    <h2>Good starting settings</h2>
    <p>Most slowed + reverb edits use a speed of <strong>0.80 to 0.90×</strong>, pitch <strong>1 to 3 semitones lower</strong> and reverb around <strong>35 to 55%</strong>. For a sped-up or nightcore version, tap the <em>Nightcore</em> preset.</p>`,
    faq: [
      ['How do I make a slowed + reverb song?', 'Open the song here. The effect is already set, so press Preview, change anything you like, then Convert and Download.'],
      ['Can I make a sped-up version?', 'Yes. Tap the Nightcore preset or raise the speed and pitch.'],
    ],
  },
  {
    path: 'vocal-remover', tool: 'karaoke', crumb: 'Tools',
    title: `Vocal Remover: Karaoke and Instrumental, Free | ${NAME}`,
    description: 'Remove vocals from songs to make karaoke and instrumental tracks. Free, private and quick. Nothing is uploaded.',
    h1: '<em>Vocal remover</em> and karaoke maker',
    lead: 'Take the singer out of a stereo song for a karaoke version. It removes what sits in the middle of the mix, so it is not AI stem separation: bass and drums get a bit quieter too.',
    badges: ['Karaoke', 'Stereo songs', 'Preview first'],
    steps: [
      ['Open a song', 'Choose a stereo song from your device.'],
      ['Listen first', 'The vocal remover is already on. Press Preview with effects.'],
      ['Download', 'Convert and save your karaoke track.'],
    ],
    content: `
    <h2>How it works</h2>
    <p>In most studio songs the lead vocal sits in the middle of the stereo mix, while instruments are spread left and right. The vocal remover cancels out what's in the middle and keeps the rest.</p>
    <h3>What it can't do</h3>
    <p>Bass and drums are often in the middle too, so they get quieter. Reverb on the voice can stay behind. Live recordings and mono files don't work, and ${NAME} will tell you if a file is mono. Turning up <strong>Bass</strong> in Effects brings some of the low end back.</p>`,
    faq: [
      ['Does it work on every song?', 'It works best on studio songs with the vocal in the center. Mono recordings cannot be separated this way.'],
      ['Why is the bass quieter?', 'Bass is often in the center of the mix too. Raise the Bass slider to bring it back.'],
    ],
  },
  {
    path: '8d-audio', tool: '8d', crumb: 'Tools',
    title: `8D Audio Converter: Make 8D Songs, Free | ${NAME}`,
    description: 'Turn any song into 8D audio that moves around your head. Listen with headphones, then download an MP3. Free, no upload.',
    h1: '<em>8D audio</em> converter',
    lead: 'Make the music move around your head. Put on headphones, listen, then download.',
    badges: ['Use headphones', 'Adjustable reverb', 'MP3 or WAV'],
    steps: [
      ['Open a song', 'Choose any song from your device.'],
      ['Put on headphones', 'Press Preview with effects to hear it move.'],
      ['Download', 'Convert and save your 8D version.'],
    ],
    content: `
    <h2>What is 8D audio?</h2>
    <p>8D audio slowly pans the sound from one ear to the other and adds a bit of reverb, so the music seems to circle around you. You need headphones or earbuds to hear it.</p>`,
    faq: [["Why can't I hear the 8D effect?", 'You need headphones or earbuds. On one speaker the effect disappears.']],
  },
  {
    path: 'bass-booster', tool: 'bass', crumb: 'Tools',
    title: `Bass Booster: Boost Bass in MP3 Online, Free | ${NAME}`,
    description: 'Boost the bass of any song online. Choose how much, listen first and download. A limiter keeps it from distorting. Free, no upload.',
    h1: '<em>Bass booster</em>',
    lead: 'Give any song deeper, punchier bass. Choose how much, listen, then download.',
    badges: ['Up to +15 dB', 'No distortion', 'Preview first'],
    steps: [
      ['Open a song', 'Choose any song or video.'],
      ['Set the boost', 'The Bass slider starts at +10 dB. Change it and press Preview.'],
      ['Download', 'Convert and save.'],
    ],
    content: `
    <h2>More bass without crackling</h2>
    <p>${NAME} raises the low frequencies around 110 Hz and then evens out the volume with a limiter, so the bass hits harder without distorting. On phone speakers, +6 to +10 dB usually sounds best.</p>`,
    faq: [['How much bass boost should I use?', 'Start around +8 to +10 dB. Above +12 dB is very heavy and suits headphones or car speakers.']],
  },
  {
    path: 'volume-booster', tool: 'volume', crumb: 'Tools',
    title: `Volume Booster: Make Audio Louder Online, Free | ${NAME}`,
    description: 'Make quiet MP3s, voice notes and videos louder. Auto loudness evens the volume out without distortion. Free, no upload.',
    h1: '<em>Volume booster</em>',
    lead: 'Make quiet recordings louder and keep the volume even, without distortion.',
    badges: ['Up to 300%', 'Auto loudness', 'No distortion'],
    steps: [
      ['Open your file', 'A quiet song, voice note, lecture or video.'],
      ['Choose the boost', 'Auto loudness is on. Change the Volume slider and press Preview.'],
      ['Download', 'Convert and save.'],
    ],
    content: `
    <h2>Louder, but still clean</h2>
    <p><strong>Auto loudness</strong> measures the whole file and brings it to about the same loudness Spotify and YouTube use, so quiet recordings become clear. A limiter keeps the loudest moments from crackling.</p>`,
    faq: [['Will boosting the volume cause distortion?', 'No. A limiter keeps the peaks under control, so the result is louder without clipping.']],
  },
  {
    path: 'reverse-audio', tool: 'reverse', crumb: 'Tools',
    title: `Reverse Audio: Play Songs Backwards Online | ${NAME}`,
    description: 'Reverse any song, voice note or sound and hear it backwards. Free, quick and private. Nothing is uploaded.',
    h1: '<em>Reverse</em> audio',
    lead: 'Play any sound, voice or song backwards. Good for challenges, sound effects and finding "hidden messages".',
    badges: ['Quick', 'Any format', 'No upload'],
    steps: [
      ['Open a file', 'Any song, voice note or video.'],
      ['Listen', 'Reverse is already on. Press Preview with effects.'],
      ['Download', 'Convert and save.'],
    ],
    content: `
    <h2>Ideas</h2>
    <p>Record yourself saying something and play it backwards for a reverse-speech challenge, look for "hidden messages" in songs, or make reverse cymbal swells for your own music. Add some reverb for the classic reverse-reverb sound.</p>`,
    faq: [['Can I reverse just part of a song?', 'Yes. Drag on the waveform to select the part, then convert.']],
  },
  // ---------- guides ----------
  {
    path: 'guides', crumb: null, plain: true,
    title: `Guides: Ringtones, Installing the App and More | ${NAME}`,
    description: `Step-by-step guides: install ${NAME} on your phone, set a custom ringtone on iPhone and Android, and find your downloaded files.`,
    h1: 'Guides',
    lead: 'Short step-by-step guides.',
    body: `<div class="cards">
      <a class="card" href="/guides/install-app/"><div class="ico">${ICONS.phone}</div><b>Install MeloCut on your phone</b><p>Add it to your home screen in a few taps.</p></a>
      <a class="card" href="/guides/set-ringtone/"><div class="ico">${ICONS.bell}</div><b>Set a custom ringtone</b><p>iPhone and Android, with or without a computer.</p></a>
      <a class="card" href="/guides/find-downloads/"><div class="ico">${ICONS.book}</div><b>Where are my downloads?</b><p>Find your files on iPhone, Android, Windows and Mac.</p></a>
      <a class="card" href="/guides/best-audio-format/"><div class="ico">${ICONS.swap}</div><b>Which audio format should you use?</b><p>MP3, M4A, WAV, FLAC and what kbps means.</p></a>
      <a class="card" href="/guides/clean-up-voice-memo/"><div class="ico">${ICONS.sparkle}</div><b>Clean up a voice memo</b><p>Trim it, remove noise and make it louder.</p></a>
      <a class="card" href="/guides/ringtone-from-video/"><div class="ico">${ICONS.video}</div><b>Make a ringtone from a video</b><p>Use a sound from your own videos as your ringtone.</p></a>
    </div>`,
  },
  {
    path: 'guides/install-app', crumb: 'Guides', plain: true,
    title: `How to Install ${NAME} on iPhone and Android | ${NAME}`,
    description: `Add ${NAME} to your iPhone or Android home screen in a few taps. It opens like an app and keeps working offline once you've used it. Free, no app store needed.`,
    h1: 'Install MeloCut on your phone',
    lead: "You don't need an app store. Add MeloCut to your home screen and it opens full screen like any other app.",
    content: `
    <div class="callout install-native"><p>Your browser can install MeloCut right now.</p><a class="btn sm install-btn" href="#">Install app</a></div>
    <h2>iPhone and iPad (Safari)</h2>
    <ol class="guide-steps">
      <li>Open <strong>${SITE_URL.replace('https://', '')}</strong> in <strong>Safari</strong>.</li>
      <li>Tap the <strong>Share</strong> button, the square with an arrow pointing up, at the bottom of the screen.</li>
      <li>Scroll down and tap <strong>Add to Home Screen</strong>, then <strong>Add</strong>.</li>
      <li>Open MeloCut from your home screen. It now opens full screen like an app.</li>
    </ol>
    <h2>Android (Chrome)</h2>
    <ol class="guide-steps">
      <li>Open <strong>${SITE_URL.replace('https://', '')}</strong> in <strong>Chrome</strong>.</li>
      <li>Tap <strong>Install app</strong> if it pops up, or tap the <strong>⋮</strong> menu in the top right.</li>
      <li>Tap <strong>Install app</strong> (on some phones <strong>Add to Home screen</strong>), then <strong>Install</strong>.</li>
      <li>MeloCut now shows up in your app drawer and on your home screen.</li>
    </ol>
    <h2>Windows, Mac and Chromebook</h2>
    <ol class="guide-steps">
      <li>In <strong>Chrome</strong> or <strong>Edge</strong>, click the install icon at the right end of the address bar.</li>
      <li>Click <strong>Install</strong>. MeloCut opens in its own window and gets a desktop icon.</li>
    </ol>
    <h2>Using it offline</h2>
    <p>The first time you use a tool you need an internet connection, because the audio engine (about 30 MB) is downloaded then. After that it is saved on your device, so the tools keep working on a plane or with a bad connection. Open one tool while you're online before you travel.</p>`,
    faq: [
      ['Is the app free?', 'Yes. It is the same free website, just on your home screen.'],
      ['How much space does it take?', 'About 30 MB for the audio engine, which is less than most apps.'],
      ['How do I remove it?', 'Like any other app: long-press the icon and choose Remove.'],
    ],
  },
  {
    path: 'guides/set-ringtone', crumb: 'Guides', plain: true,
    title: `How to Set a Custom Ringtone on iPhone and Android | ${NAME}`,
    description: 'Make a ringtone from any song and set it on your iPhone (with GarageBand or a computer) or Android phone. Step by step, free.',
    h1: 'How to set a custom ringtone',
    lead: 'First make your ringtone with the free Ringtone Maker, then follow the steps for your phone.',
    content: `
    <div class="callout"><p>🔔 No ringtone yet? Making one takes about 30 seconds.</p><a class="btn sm" href="/ringtone-maker/">Open Ringtone Maker</a></div>
    <h2>iPhone without a computer (GarageBand)</h2>
    <ol class="guide-steps">
      <li>In the Ringtone Maker choose <strong>MP3</strong> (or M4A) and download your ringtone. It goes to the <strong>Files</strong> app, in Downloads.</li>
      <li>Install <strong>GarageBand</strong> (free, made by Apple) and open it. Start any instrument, for example Audio Recorder.</li>
      <li>Tap the <strong>tracks view</strong> button, then the <strong>loop</strong> icon in the top right → <strong>Files</strong> → <strong>Browse items from the Files app</strong>, and pick your ringtone.</li>
      <li>Drag it onto the track, then tap the <strong>⌄</strong> arrow in the top left → <strong>My Songs</strong>.</li>
      <li>Long-press the song → <strong>Share</strong> → <strong>Ringtone</strong> → <strong>Export</strong> → <strong>Use sound as… Standard Ringtone</strong>.</li>
    </ol>
    <h2>iPhone with a Mac or PC</h2>
    <ol class="guide-steps">
      <li>Choose <strong>M4R (iPhone ringtone)</strong> in the Ringtone Maker and download it on your computer.</li>
      <li>Connect your iPhone with a cable. Open <strong>Finder</strong> on a Mac, or <strong>iTunes</strong> or <strong>Apple Devices</strong> on Windows, and select your iPhone.</li>
      <li>Drag the <strong>.m4r</strong> file onto your iPhone in the sidebar. It copies over in a few seconds.</li>
      <li>On the iPhone open <strong>Settings → Sounds &amp; Haptics → Ringtone</strong> and pick it.</li>
    </ol>
    <h2>Android</h2>
    <ol class="guide-steps">
      <li>Choose <strong>MP3</strong> in the Ringtone Maker and download it.</li>
      <li>Open <strong>Settings → Sound &amp; vibration → Phone ringtone</strong>.</li>
      <li>Tap <strong>+</strong>, <strong>Add ringtone</strong> or <strong>My sounds</strong> (the name depends on your phone) and pick the file from Downloads.</li>
      <li>For one contact only: open the contact → <strong>⋮</strong> → <strong>Set ringtone</strong>.</li>
    </ol>
    <h2>Tips</h2>
    <p>Keep it between 20 and 30 seconds, start just before the chorus and leave the fades on. If it's too quiet, raise <strong>Volume</strong> in Effects.</p>`,
    faq: [
      ["Why doesn't my ringtone show up on my iPhone?", 'It has to be under 40 seconds, and in M4R format if you copy it from a computer. MeloCut takes care of both.'],
      ['Can I set a text tone too?', 'Yes. On iPhone choose Text Tone in Sounds & Haptics. On Android choose Notification sound.'],
    ],
  },
  {
    path: 'guides/find-downloads', crumb: 'Guides', plain: true,
    title: `Where Are My Downloaded Files? iPhone, Android, PC | ${NAME}`,
    description: 'Find the files you downloaded from MeloCut on iPhone, Android, Windows and Mac, and move them to your music app.',
    h1: 'Where are my downloads?',
    lead: "Downloaded a file and can't find it? Here's where it goes on each device.",
    content: `
    <h2>iPhone and iPad</h2>
    <ol class="guide-steps">
      <li>Open the <strong>Files</strong> app → <strong>Browse</strong> → <strong>On My iPhone</strong> (or iCloud Drive) → <strong>Downloads</strong>.</li>
      <li>Tap the file to play it, or long-press → <strong>Share</strong> to send it to WhatsApp, GarageBand or another app.</li>
    </ol>
    <h2>Android</h2>
    <ol class="guide-steps">
      <li>Open the <strong>Files</strong> or <strong>My Files</strong> app → <strong>Downloads</strong>.</li>
      <li>Most music players find new MP3s on their own. If yours doesn't, move the file to the <strong>Music</strong> folder.</li>
    </ol>
    <h2>Windows and Mac</h2>
    <ol class="guide-steps">
      <li>Open your <strong>Downloads</strong> folder in File Explorer (Windows) or Finder (Mac).</li>
      <li>In Chrome you can also press <strong>Ctrl+J</strong> on Windows or <strong>⌘+Shift+J</strong> on Mac to see recent downloads.</li>
    </ol>`,
  },
  {
    path: 'guides/best-audio-format', crumb: 'Guides', plain: true,
    title: `MP3, M4A, WAV or FLAC: Which Audio Format to Use | ${NAME}`,
    description: 'A plain guide to audio formats and bitrates: when to use MP3, M4A, WAV, FLAC or OGG, and what 128, 192 and 320 kbps actually mean.',
    h1: 'Which audio format should you use?',
    lead: 'MP3, M4A, WAV, FLAC, OGG and what kbps means, explained without the jargon.',
    content: `
    <h2>The short answer</h2>
    <p>Use <strong>MP3 at 320 kbps</strong> for music you want to play anywhere, <strong>MP3 at 128 kbps</strong> for speech, and <strong>WAV or FLAC</strong> only if you plan to edit the file again.</p>
    <h2>The formats</h2>
    <h3>MP3</h3>
    <p>Plays on every phone, computer, car and speaker made in the last 25 years. It throws away sound most people can't hear to keep files small. At 320 kbps it's very hard to tell apart from the original.</p>
    <h3>M4A (AAC)</h3>
    <p>Apple's default. It sounds slightly better than MP3 at the same size, and it's what iPhone voice memos and ringtones (M4R) use. Some older players and cars don't support it.</p>
    <h3>WAV</h3>
    <p>Uncompressed, so nothing is lost and editing programs love it. The downside is size: about 10 MB per minute.</p>
    <h3>FLAC</h3>
    <p>Also lossless, but compressed to roughly half the size of WAV. Good for keeping a music collection at full quality. Not every device plays it.</p>
    <h3>OGG and OPUS</h3>
    <p>Open formats used by apps like WhatsApp and Telegram. They're efficient, especially for voice, but many players can't open them, which is why people convert them to MP3.</p>
    <h2>What kbps means</h2>
    <p>Kbps (kilobits per second) is how much data is used for each second of sound. More data means better sound and bigger files.</p>
    <ol class="guide-steps">
      <li><strong>128 kbps</strong>: about 1 MB per minute. Fine for podcasts, lectures and voice notes.</li>
      <li><strong>192 kbps</strong>: about 1.4 MB per minute. Good for music on phone speakers.</li>
      <li><strong>256 to 320 kbps</strong>: about 2 to 2.4 MB per minute. Best for music on headphones or a good speaker.</li>
    </ol>
    <h2>One thing to avoid</h2>
    <p>Converting a small MP3 to WAV or a higher bitrate doesn't bring back lost quality. It just makes the file bigger. Always start from the best original you have.</p>
    <div class="callout"><p>Ready to convert a file?</p><a class="btn sm" href="/audio-converter/">Open the converter</a></div>`,
    faq: [
      ['Is 320 kbps better than 128 kbps?', 'Yes, for music. For speech, 128 kbps already sounds clear and the file is less than half the size.'],
      ['Which format do iPhones use for ringtones?', 'M4R, which is an M4A file with a different name. The Ringtone Maker creates it for you.'],
    ],
  },
  {
    path: 'guides/clean-up-voice-memo', crumb: 'Guides', plain: true,
    title: `How to Trim and Clean Up a Voice Memo or Recording | ${NAME}`,
    description: 'Cut the start and end of a voice memo, remove background noise and long pauses, make it louder and save it as MP3. Works on iPhone and Android.',
    h1: 'How to clean up a voice memo',
    lead: 'Trim it, remove background noise and long pauses, make it louder, and save it as an MP3 you can share.',
    content: `
    <h2>1. Get the recording onto your phone's files</h2>
    <ol class="guide-steps">
      <li><strong>iPhone Voice Memos:</strong> tap the memo, then <strong>Share → Save to Files</strong>.</li>
      <li><strong>Android recorder:</strong> recordings are usually already in <strong>Files → Recordings</strong>.</li>
      <li><strong>WhatsApp voice note:</strong> long-press it → <strong>Share</strong> or <strong>Export</strong> → Save to Files.</li>
    </ol>
    <h2>2. Open it in the noise remover</h2>
    <p>Go to the <a href="/noise-remover/">AI Noise Remover</a> and open the file. AI noise removal, Auto loudness and Remove silences are already switched on.</p>
    <h2>3. Trim the start and end</h2>
    <p>Drag the handles on the waveform so the selection starts just before the first word and ends just after the last one. Press <strong>Play</strong> to check.</p>
    <h2>4. Listen before saving</h2>
    <p>Press <strong>Preview with effects</strong>. If the voice sounds thin, lower the Treble slider a little. If it's still too quiet, raise Volume.</p>
    <h2>5. Save it</h2>
    <p>Choose <strong>MP3</strong> and <strong>128 kbps</strong> (plenty for speech), press Convert, then Download.</p>
    <h2>Recording tips for next time</h2>
    <ol class="guide-steps">
      <li>Hold the phone about a hand's width from your mouth, slightly to the side.</li>
      <li>Record in a room with soft things like curtains or a sofa. Bare rooms echo.</li>
      <li>Turn off fans and close the window if you can. Noise removal helps, but less noise is always better.</li>
    </ol>`,
    faq: [
      ['Will AI noise removal work on music?', 'It is made for voices. On music it can remove instruments, so for songs use Reduce hiss instead.'],
      ['Is my recording uploaded?', 'No. Everything runs on your own device.'],
    ],
  },
  {
    path: 'guides/ringtone-from-video', crumb: 'Guides', plain: true,
    title: `How to Make a Ringtone from a Video | ${NAME}`,
    description: 'Turn the sound from a video you recorded or saved into an iPhone or Android ringtone. Pick the best part, add a fade, set it on your phone.',
    h1: 'How to make a ringtone from a video',
    lead: "Got a video with a sound you love, like your kid laughing, a concert clip or a funny moment? Here's how to make it your ringtone.",
    content: `
    <h2>1. Open the video in the Ringtone Maker</h2>
    <p>Go to the <a href="/ringtone-maker/">Ringtone Maker</a> and choose the video from your Photos, Gallery or Files. MeloCut uses the sound and ignores the picture.</p>
    <h2>2. Pick the part you want</h2>
    <p>Drag on the waveform to select up to 40 seconds. The loud parts show up as tall bars, which makes the good moments easy to find. Press <strong>Play</strong> to check.</p>
    <h2>3. Make it sound good as a ringtone</h2>
    <ol class="guide-steps">
      <li>Leave <strong>Fade in</strong> and <strong>Fade out</strong> on so it doesn't start or stop abruptly.</li>
      <li>Phone videos are often quiet. Open <strong>Effects</strong> and turn on <strong>Auto loudness</strong>.</li>
      <li>If there's wind or crowd noise behind a voice, turn on <strong>AI noise removal</strong>.</li>
    </ol>
    <h2>4. Save it in the right format</h2>
    <p>Choose <strong>M4R</strong> for iPhone or <strong>MP3</strong> for Android, then Convert and Download.</p>
    <h2>5. Set it on your phone</h2>
    <p>Follow the <a href="/guides/set-ringtone/">ringtone setup guide</a> for iPhone (with GarageBand or a computer) or Android.</p>`,
    faq: [
      ['Can I use a video I downloaded from social media?', 'Only use videos you made yourself or have permission to use, and respect copyright.'],
      ['Why is my ringtone too quiet?', 'Turn on Auto loudness or raise Volume in Effects before converting.'],
    ],
  },
  {
    path: 'terms', crumb: null, plain: true,
    title: `Terms of Use | ${NAME}`,
    description: `The terms for using ${NAME}, a set of free audio tools that run in your web browser.`,
    h1: 'Terms of use',
    content: `
    <p><em>Last updated: ${LEGAL_UPDATED}</em></p>
    <h2>Using MeloCut</h2>
    <p>${NAME} is free to use, at home or at work. You don't need an account. By using the site you agree to these terms.</p>
    <h2>Your files and your responsibility</h2>
    <p>Your files are processed on your own device and never sent to us. You are responsible for the files you open and the files you create. Only use audio and video you own or have permission to use. Editing a song with ${NAME} does not give you any rights to it: you can share or sell what you make only if you hold the rights to the original audio.</p>
    <h2>No warranty</h2>
    <p>${NAME} is provided as is. We work hard to make it reliable, but we can't promise it will always be available or free of errors. Keep a copy of your original files.</p>
    <h2>Limitation of liability</h2>
    <p>To the extent the law allows, we are not liable for any loss or damage that comes from using ${NAME}, including lost or damaged files.</p>
    <h2>Third-party services</h2>
    <p>The site loads its audio engine from the jsDelivr network and may show ads from Google. Their own terms and privacy policies apply to those services. See our <a href="/privacy/">privacy policy</a> for details.</p>
    <h2>Changes</h2>
    <p>We may update these terms. The date at the top shows when they last changed.</p>
    <h2>Contact</h2>
    <p>Questions about these terms: <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>`,
  },
  {
    path: 'privacy', crumb: null, plain: true,
    title: `Privacy Policy | ${NAME}`,
    description: `How ${NAME} handles your data. Your audio and video files never leave your device.`,
    h1: 'Privacy policy',
    content: `
    <p><em>Last updated: ${LEGAL_UPDATED}</em></p>
    <h2>Who we are</h2>
    <p>${NAME} (melocut.com) is run by an independent developer. For anything about your data, email <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>
    <h2>Your files</h2>
    <p>${NAME} processes audio and video files entirely inside your web browser. Your files are <strong>never uploaded</strong> to our servers or anyone else's. We can't see, store or share them, so there is nothing for us to keep or delete.</p>
    <h2>Services the site uses</h2>
    <ol class="guide-steps">
      <li><strong>Cloudflare</strong> hosts the site. Like any web host, it receives your IP address and browser details when you load a page, to deliver the page and protect it from attacks. Cloudflare keeps these logs for a short time under its own <a href="https://www.cloudflare.com/privacypolicy/" rel="nofollow">privacy policy</a>.</li>
      <li><strong>jsDelivr</strong> delivers the audio engine and, if you use AI noise removal, the small RNNoise model. Your browser downloads them once and they then run on your device. See the <a href="https://www.jsdelivr.com/terms/privacy-policy-jsdelivr-net" rel="nofollow">jsDelivr privacy policy</a>.</li>
      <li><strong>Google AdSense</strong> shows ads, as described below.</li>
    </ol>
    <h2>Advertising and cookies</h2>
    <p>${NAME} is free because it shows ads from Google AdSense. Google and its partners may use cookies and similar technology to show ads and to measure them, including ads based on your earlier visits to this and other websites. You can turn off personalized ads at <a href="https://adssettings.google.com" rel="nofollow">Google Ads Settings</a> or <a href="https://www.aboutads.info/choices" rel="nofollow">aboutads.info</a>. More details are in <a href="https://policies.google.com/technologies/ads" rel="nofollow">how Google uses information from sites that use its services</a>.</p>
    <p>Visitors in the EEA, the UK and Switzerland see a consent message from Google before any personalized ads are shown, and can change their choice at any time with the privacy link it adds to the page.</p>
    <p>${NAME} itself sets no cookies. The site saves its own files (the pages and the audio engine) in your browser's cache so the tools load faster and work offline. You can remove them by clearing your browser's site data.</p>
    <h2>Analytics</h2>
    <p>We don't use any analytics or tracking of our own.</p>
    <h2>Your rights</h2>
    <p>Since we don't collect personal data ourselves, there is usually nothing for us to show, change or delete. For data held by Google or Cloudflare, use the links above. You can still email us with any question or request.</p>
    <h2>Changes</h2>
    <p>If this policy changes, we update it here and change the date at the top.</p>
    <p>Questions? Email <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>`,
  },
  {
    path: 'about', crumb: null, plain: true,
    title: `About and Contact | ${NAME}`,
    description: `About ${NAME}, a set of free audio tools that run in your browser, and how to get in touch.`,
    h1: 'About MeloCut',
    content: `
    <p>${NAME} is a set of free audio tools: a ringtone maker, an audio cutter and joiner, a video to MP3 converter, an audio converter, an AI noise remover and an effects panel. They all run in your web browser.</p>
    <p>We made it because most converter sites are slow, covered in pop-ups and want you to upload your personal files. ${NAME} runs the FFmpeg audio engine on your own device instead, so it's quicker and your files stay private.</p>
    <h2>Contact</h2>
    <p>Ideas, bug reports or business questions: <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>
    <p>Please read our <a href="/terms/">terms of use</a> and <a href="/privacy/">privacy policy</a>.</p>`,
  },
];

// ---------- templates ----------
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const strip = (s) => s.replace(/<[^>]+>/g, '');
const urlOf = (p) => `${SITE_URL}/${p.path ? p.path + '/' : ''}`;
const ogImage = (p) => (fs.existsSync(path.join(ROOT, 'og', `${p.path ? p.path.replace(/\//g, '-') : 'home'}.jpg`))
  ? `${SITE_URL}/og/${p.path ? p.path.replace(/\//g, '-') : 'home'}.jpg` : `${SITE_URL}/og.jpg`);

// Breadcrumb trail: Home › (Tools | Converters | Guides) › page
function crumbs(p) {
  if (!p.path || p.path === '404') return null;
  const trail = [{ name: 'Home', url: `${SITE_URL}/` }];
  if (p.crumb === 'Tools') trail.push({ name: 'Tools', url: `${SITE_URL}/#tools` });
  if (p.crumb === 'Converters') trail.push({ name: 'Audio Converter', url: `${SITE_URL}/audio-converter/` });
  if (p.crumb === 'Guides') trail.push({ name: 'Guides', url: `${SITE_URL}/guides/` });
  trail.push({ name: strip(p.h1).replace(/\s+/g, ' ').trim(), url: urlOf(p) });
  return trail;
}

function jsonLd(p) {
  const url = urlOf(p);
  const graph = [
    { '@type': 'WebSite', '@id': `${SITE_URL}/#site`, name: NAME, url: `${SITE_URL}/`, inLanguage: 'en', publisher: { '@id': `${SITE_URL}/#org` } },
    { '@type': 'Organization', '@id': `${SITE_URL}/#org`, name: NAME, url: `${SITE_URL}/`, logo: `${SITE_URL}/icon-512.png`, email: EMAIL },
    { '@type': 'WebPage', '@id': `${url}#page`, url, name: p.title, description: p.description, inLanguage: 'en', isPartOf: { '@id': `${SITE_URL}/#site` },
      primaryImageOfPage: ogImage(p), dateModified: UPDATED },
  ];
  if (!p.plain && p.path) {
    graph.push({
      '@type': 'WebApplication', name: `${NAME} ${strip(p.h1)}`, url, applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Any (web browser)', browserRequirements: 'Requires JavaScript and a modern browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, description: p.description,
      ...(p.badges ? { featureList: p.badges } : {}), isAccessibleForFree: true,
    });
  }
  const trail = crumbs(p);
  if (trail) graph.push({ '@type': 'BreadcrumbList', itemListElement: trail.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })) });
  if (p.faq) graph.push({ '@type': 'FAQPage', mainEntity: p.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
  if (p.steps) graph.push({ '@type': 'HowTo', name: strip(p.h1).replace(/\s+/g, ' ').trim(), step: p.steps.map(([n, t], i) => ({ '@type': 'HowToStep', position: i + 1, name: n, text: t })) });
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
}

function page(p) {
  const url = urlOf(p);
  const img = ogImage(p);
  const navLinks = TOOLS.filter((t) => MAIN_NAV.includes(t.slug)).map((t) => `<a href="/${t.slug}/"${p.path === t.slug ? ' aria-current="page"' : ''}>${t.nav}</a>`).join('')
    + `<a href="/#tools">All tools</a><a href="/guides/"${p.path.startsWith('guides') ? ' aria-current="page"' : ''}>Guides</a>`;
  const others = TOOLS.filter((t) => t.slug !== p.path);
  const trail = crumbs(p);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#6d4aff">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="${NAME}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${NAME}">
<meta property="og:locale" content="en_US">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${img}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(strip(p.h1).replace(/\s+/g, ' ').trim())} on ${NAME}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(p.title)}">
<meta name="twitter:description" content="${esc(p.description)}">
<meta name="twitter:image" content="${img}">
<meta name="google-adsense-account" content="ca-pub-2388733415031298">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2388733415031298" crossorigin="anonymous"></script>
<link rel="stylesheet" href="/assets/style.css">
<script src="/assets/config.js" defer></script>
<script src="/assets/site.js" defer></script>
${p.tool ? '<link rel="modulepreload" href="/assets/app.js">\n<script type="module" src="/assets/app.js"></script>\n<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>' : ''}
<script type="application/ld+json">${jsonLd(p)}</script>
</head>
<body>
<header class="top">
  <div class="wrap">
    <a class="logo" href="/" aria-label="${NAME} home"><img src="/assets/logo.svg" width="32" height="32" alt="">${NAME}</a>
    <nav class="nav" aria-label="Tools">${navLinks}</nav>
    <a class="btn sm install-btn" href="/guides/install-app/">${ICONS.phone.replace(/22/g, '16')} Install app</a>
    <button class="menu-btn" type="button" aria-label="Menu"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
  </div>
</header>
<main class="wrap">
  ${trail ? `<nav class="crumbs" aria-label="Breadcrumb">${trail.map((c, i) => (i < trail.length - 1 ? `<a href="${c.url.replace(SITE_URL, '')}">${c.name}</a>` : `<span aria-current="page">${c.name}</span>`)).join('<span class="sep">›</span>')}</nav>` : ''}
  <div class="hero"${p.plain ? ' style="text-align:left;padding-bottom:0"' : ''}>
    <h1>${p.h1}</h1>
    ${p.lead ? `<p>${p.lead}</p>` : ''}
    ${p.badges ? `<div class="badges">${p.badges.map((b) => `<span class="badge">${b}</span>`).join('')}</div>` : ''}
  </div>
  ${p.tool ? `<div class="tool" data-tool="${p.tool}"${p.format ? ` data-format="${p.format}"` : ''}><noscript>Please turn on JavaScript to use this tool.</noscript></div>
  <div class="ad" data-slot="top"></div>` : ''}
  ${p.body || ''}
  ${p.steps ? `<div class="section"><h2>How it works</h2><div class="steps">${p.steps.map(([n, t]) => `<div class="card"><b>${n}</b><p>${t}</p></div>`).join('')}</div></div>` : ''}
  ${p.content ? `<div class="section prose">${p.content}</div>` : ''}
  ${p.tool ? '<div class="ad" data-slot="middle"></div>' : ''}
  ${p.tool ? `<div class="section"><h2>More free tools</h2><div class="cards rail">${others.map(toolCard).join('')}</div></div>
  <div class="section"><h2>Popular conversions</h2>${CONVERSION_LINKS}</div>${INSTALL_CALLOUT}` : ''}
  ${p.faq ? `<div class="section"><h2>Questions and answers</h2>${p.faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>` : ''}
  ${p.plain ? '' : '<div class="ad" data-slot="bottom"></div>'}
</main>
<footer>
  <div class="wrap">
    <div>© <span data-year></span> ${NAME} · Free audio tools that run in your browser</div>
    <div class="fcols">
      <nav aria-label="Tools"><b>Tools</b>${TOOLS.map((t) => `<a href="/${t.slug}/">${t.title}</a>`).join('')}</nav>
      <nav aria-label="Conversions"><b>Conversions</b>${CONVERSIONS.map((c) => `<a href="/${c.slug}/">${c.label}</a>`).join('')}</nav>
      <nav aria-label="More"><b>Help and info</b><a href="/guides/">Guides</a><a href="/guides/install-app/">Install the app</a><a href="/about/">About and contact</a><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a></nav>
    </div>
  </div>
</footer>
</body>
</html>
`;
}

for (const p of PAGES) {
  const dir = path.join(ROOT, p.path);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page(p));
}
fs.writeFileSync(path.join(ROOT, '404.html'), page({
  path: '404', title: `Page not found | ${NAME}`, description: 'Page not found.', h1: 'Page not found',
  lead: "That page doesn't exist, or it moved. Pick a tool below, or go back to the <a href=\"/\">home page</a> or the <a href=\"/guides/\">guides</a>.", plain: false,
  body: `<div class="cards">${TOOLS.map(toolCard).join('')}</div><div class="section"><h2>Popular conversions</h2>${CONVERSION_LINKS}</div>`,
}).replace('<meta name="robots" content="index, follow, max-image-preview:large">', '<meta name="robots" content="noindex">'));
fs.writeFileSync(path.join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
const priority = (p) => (!p.path ? '1.0' : p.tool ? '0.9' : p.path.startsWith('guides') ? '0.7' : '0.4');
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${PAGES.map((p) => `  <url><loc>${urlOf(p)}</loc><lastmod>${UPDATED}</lastmod><priority>${priority(p)}</priority><image:image><image:loc>${ogImage(p)}</image:loc></image:image></url>`).join('\n')}
</urlset>
`);
// Page list for the social-image generator (og.mjs).
fs.writeFileSync(path.join(path.dirname(ROOT), 'pages.json'), JSON.stringify(PAGES.map((p) => ({ slug: p.path ? p.path.replace(/\//g, '-') : 'home', h1: strip(p.h1).replace(/\s+/g, ' ').trim(), lead: strip(p.lead || '') })), null, 1));
console.log(`Built ${PAGES.length + 1} pages for ${SITE_URL}`);
