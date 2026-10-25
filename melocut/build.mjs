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

const TOOLS = [
  { slug: 'video-to-mp3', nav: 'Video to MP3', icon: 'video', title: 'Video to MP3', blurb: 'Pull the audio out of any MP4, MOV or WebM video.' },
  { slug: 'ringtone-maker', nav: 'Ringtone Maker', icon: 'bell', title: 'Ringtone Maker', blurb: 'Make an iPhone or Android ringtone from any song.' },
  { slug: 'audio-cutter', nav: 'Audio Cutter', icon: 'cut', title: 'Audio Cutter', blurb: 'Trim songs, cut out parts and add fades.' },
  { slug: 'audio-converter', nav: 'Converter', icon: 'swap', title: 'Audio Converter', blurb: 'MP3, WAV, M4A, OGG and FLAC, plus effects.' },
  { slug: 'audio-joiner', nav: 'Joiner', icon: 'merge', title: 'Audio Joiner', blurb: 'Merge songs and clips into one file, with crossfade.' },
  { slug: 'noise-remover', icon: 'sparkle', title: 'AI Noise Remover', ai: true, blurb: 'A neural network cleans background noise from voices.' },
  { slug: 'slowed-reverb', icon: 'slow', title: 'Slowed + Reverb', blurb: 'Make dreamy slowed and reverb versions of any song.' },
  { slug: 'vocal-remover', icon: 'mic', title: 'Vocal Remover', blurb: 'Make karaoke and instrumental versions of songs.' },
  { slug: '8d-audio', icon: 'orbit', title: '8D Audio', blurb: 'Sound that moves around your head. Use headphones.' },
  { slug: 'bass-booster', icon: 'bass', title: 'Bass Booster', blurb: 'More punch and deeper bass, without distortion.' },
  { slug: 'volume-booster', icon: 'volume', title: 'Volume Booster', blurb: 'Make quiet audio louder and even.' },
  { slug: 'reverse-audio', icon: 'reverse', title: 'Reverse Audio', blurb: 'Play any sound or song backwards.' },
];
const MAIN_NAV = ['video-to-mp3', 'ringtone-maker', 'audio-cutter', 'audio-converter', 'audio-joiner'];
const toolCard = (t) => `<a class="card" href="/${t.slug}/"><div class="ico">${ICONS[t.icon]}</div><b>${t.title}${t.ai ? '<span class="ai">AI</span>' : ''}</b><p>${t.blurb}</p></a>`;
const INSTALL_CALLOUT = `
  <div class="section"><div class="callout"><p>📲 Use ${NAME} like an app: add it to your phone's home screen. It even works offline.</p>
    <a class="btn sm" href="/guides/install-app/">How to install</a></div></div>`;

const WHY = `
  <div class="section">
    <h2>Why people use ${NAME}</h2>
    <div class="cards">
      <div class="card"><div class="ico">${ICONS.lock}</div><b>100% private</b><p>Your files are processed inside your browser. Nothing is uploaded to any server, ever.</p></div>
      <div class="card"><div class="ico">${ICONS.bolt}</div><b>Fast</b><p>No upload or download wait. Even long videos are ready in seconds on most devices.</p></div>
      <div class="card"><div class="ico">${ICONS.phone}</div><b>Works everywhere</b><p>iPhone, Android, Windows, Mac and Chromebook. Install it on your home screen; works offline.</p></div>
      <div class="card"><div class="ico">${ICONS.sparkle}</div><b>Studio effects, free</b><p>Fades, reverb, pitch, bass, 8D and AI noise removal. No watermark, no limits.</p></div>
    </div>
  </div>`;

const PAGES = [
  {
    path: '',
    title: `${NAME} – Free Online Audio Cutter, Ringtone Maker & MP3 Converter`,
    description: 'Cut songs, make iPhone and Android ringtones, and convert video to MP3 for free. Works in your browser; your files are never uploaded.',
    h1: 'Cut, convert & make ringtones — <em>right in your browser</em>',
    lead: 'Free audio tools and studio effects that never upload your files. Pick a tool to start.',
    badges: ['13 free tools', 'AI noise removal', 'Works offline', 'No upload'],
    body: `
  <div class="cards" id="tools" style="margin-top:8px">
    ${TOOLS.map(toolCard).join('\n    ')}
  </div>
  <div class="ad" data-slot="top"></div>
  <div class="section prose">
    <h2>A full effects studio in every tool</h2>
    <p>Every ${NAME} tool has the same <strong>Effects &amp; filters</strong> panel: fade in and fade out with the length you choose, volume, automatic loudness, speed, pitch, bass, treble, reverb, 8D audio, <strong>AI noise removal</strong>, vocal remover, silence removal, reverse and mono. One-tap presets like <em>Slowed + Reverb</em>, <em>Nightcore</em>, <em>Bass Boosted</em> and <em>Karaoke</em> get you there instantly, and <strong>Preview with effects</strong> lets you hear the result before you save.</p>
  </div>
  ${WHY}
  ${INSTALL_CALLOUT}
  <div class="section prose">
    <h2>Audio tools that respect your privacy</h2>
    <p>Most online converters make you upload your files to their servers, wait, and then download the result. ${NAME} works differently: the same professional audio engine that powers desktop apps (FFmpeg) runs directly inside your web browser. Your music, voice notes and videos stay on your device the whole time.</p>
    <p>That makes ${NAME} faster, safer and free of the pop-ups and fake download buttons that are common on converter sites.</p>
  </div>`,
    faq: [
      ['Is MeloCut free?', 'Yes. All tools are free to use, with no sign-up, no watermark and no limit on the number of files.'],
      ['Are my files uploaded?', 'No. Everything happens in your browser on your own device. Your files are never sent to a server.'],
      ['Does it work on iPhone and Android?', 'Yes. MeloCut works in Safari, Chrome, Firefox and Edge on phones, tablets and computers.'],
      ['What file types are supported?', 'MP3, MP4, MOV, M4A, WAV, OGG, OPUS, FLAC, WebM, AAC, AMR, 3GP and most other audio and video formats.'],
      ['Can I install MeloCut as an app?', 'Yes. Add it to your home screen from Safari or Chrome and it opens like an app and works offline. See the install guide.'],
      ['Does MeloCut use AI?', 'The noise remover uses a neural network (RNNoise) that runs on your device to separate voices from background noise. The other effects use classic studio audio processing.'],
    ],
  },
  {
    path: 'video-to-mp3',
    tool: 'video-to-mp3',
    title: `Video to MP3 Converter – Extract Audio from MP4, Free | ${NAME}`,
    description: 'Convert MP4, MOV, WebM and other videos to MP3 online for free. Extract the audio at up to 320 kbps. No upload, no sign-up, works on iPhone and Android.',
    h1: 'Video to <em>MP3</em> converter',
    lead: 'Extract the audio from any video file and save it as MP3, M4A or WAV. Free, private and instant.',
    badges: ['Up to 320 kbps', 'MP4 · MOV · WebM · MKV', 'No upload'],
    steps: [
      ['Choose your video', 'Tap the box above and pick a video from your phone or computer, or drag it in.'],
      ['Trim if you like', 'Keep the whole audio, or drag on the waveform to keep only part of it.'],
      ['Convert & download', 'Choose MP3 and the quality, press Convert, then Download.'],
    ],
    content: `
    <h2>Extract audio from video in seconds</h2>
    <p>Recorded a concert, a lecture or a funny moment on your phone and only need the sound? ${NAME} turns any video into an MP3 you can play anywhere — in your car, in a music app or as a podcast clip.</p>
    <h3>Supported video formats</h3>
    <p>MP4, MOV (iPhone videos), WebM, MKV, AVI, 3GP and more. If your browser can open it, ${NAME} can almost always convert it.</p>
    <h3>Which quality should I choose?</h3>
    <p><strong>320 kbps</strong> gives the best MP3 quality and is the right choice for music. <strong>128 kbps</strong> makes much smaller files and is fine for speech, lectures and voice recordings. Choose <strong>WAV</strong> if you plan to edit the audio further.</p>`,
    faq: [
      ['How do I convert an MP4 to MP3?', 'Open the MP4 file in the box above, choose MP3 and a quality, press Convert and then Download. It takes a few seconds.'],
      ['Can I convert iPhone videos (MOV)?', 'Yes. Pick the video from your Photos or Files app and it will be converted to MP3.'],
      ['Is there a file size limit?', 'Files up to 1 GB are supported. Very large files depend on how much memory your device has.'],
      ['Can I convert YouTube videos?', 'MeloCut works with files on your device. It does not download videos from YouTube or other websites.'],
    ],
  },
  {
    path: 'ringtone-maker',
    tool: 'ringtone',
    title: `Ringtone Maker – Make iPhone & Android Ringtones Free | ${NAME}`,
    description: 'Make a ringtone from any song for free. Cut the best part, add a fade, and save as M4R for iPhone or MP3 for Android. No app, no upload.',
    h1: 'Free <em>ringtone</em> maker',
    lead: 'Pick the best part of any song and turn it into an iPhone (M4R) or Android (MP3) ringtone.',
    badges: ['iPhone M4R', 'Android MP3', 'Fade in & out'],
    steps: [
      ['Choose a song', 'Open any song or video from your device.'],
      ['Pick the best part', 'Drag on the waveform to select up to 40 seconds and press Play to check it.'],
      ['Download your ringtone', 'Choose M4R for iPhone or MP3 for Android, then Convert and Download.'],
    ],
    content: `
    <h2>How to set your ringtone</h2>
    <h3>On iPhone</h3>
    <p>Download the <strong>M4R</strong> file. On a Mac or PC, connect your iPhone and drag the file onto your iPhone in Finder (Mac) or iTunes (Windows). It will appear in <em>Settings → Sounds &amp; Haptics → Ringtone</em>. Without a computer, open the file in <strong>GarageBand</strong> on your iPhone and use <em>Share → Ringtone</em>.</p>
    <h3>On Android</h3>
    <p>Download the <strong>MP3</strong> file, then go to <em>Settings → Sound → Phone ringtone</em> and choose it (on some phones, tap "+" or "Add ringtone"). You can also move it into the <em>Ringtones</em> folder with the Files app.</p>
    <h3>Tips for a great ringtone</h3>
    <p>Start just before the chorus or the most recognisable part, keep it between 20 and 30 seconds, and leave fade in and fade out switched on so it doesn't start or stop abruptly.</p>`,
    faq: [
      ['How long can a ringtone be?', 'iPhone ringtones can be up to 40 seconds. MeloCut limits your selection to 40 seconds so it always works.'],
      ['What is an M4R file?', 'M4R is the ringtone format used by iPhone. It is the same as an M4A (AAC) audio file with a different name.'],
      ['Can I make a ringtone from a video?', 'Yes. Open any video and MeloCut will use its sound.'],
      ['Is the ringtone maker free?', 'Yes, completely free with no watermark and no sign-up.'],
    ],
  },
  {
    path: 'audio-cutter',
    tool: 'cutter',
    title: `Audio Cutter – Trim MP3 & Cut Songs Online, Free | ${NAME}`,
    description: 'Cut and trim MP3 and other audio files online. Keep or remove any part, add fade in and fade out, and save as MP3, M4A, WAV, OGG or FLAC. Free and private.',
    h1: 'Online <em>audio cutter</em>',
    lead: 'Trim the start and end of a song, or cut out a part from the middle. Add fades and save in the format you need.',
    badges: ['Keep or remove a part', 'Fade in & out', 'MP3 · WAV · FLAC'],
    steps: [
      ['Open your audio', 'Choose an MP3, WAV, M4A or any audio or video file.'],
      ['Select the part', 'Drag the handles on the waveform, or type exact start and end times.'],
      ['Keep or remove', 'Choose Keep selection or Remove selection, then Convert and Download.'],
    ],
    content: `
    <h2>Cut audio precisely</h2>
    <p>Use the waveform to see exactly where the music gets loud or quiet, drag the handles to the right spot and press Play to listen before you save. For millisecond precision, type the start and end time directly (for example <code>1:23.5</code>).</p>
    <h3>Remove a part from the middle</h3>
    <p>Switch to <strong>Remove selection</strong> to cut out an intro, a silence, a mistake or an ad from a recording. The two remaining parts are joined automatically.</p>
    <h3>Lossless options</h3>
    <p>Choose <strong>WAV</strong> or <strong>FLAC</strong> to keep full quality, for example when you will edit the file again later.</p>`,
    faq: [
      ['How do I trim an MP3?', 'Open the MP3, drag the handles to the part you want, choose Keep selection and press Convert, then Download.'],
      ['Can I cut a part out of the middle?', 'Yes. Select the part you don’t want and choose Remove selection.'],
      ['Will cutting reduce the quality?', 'Choose 320 kbps MP3 for near-original quality, or WAV/FLAC for no quality loss.'],
      ['Does it work offline?', 'After the first visit the audio engine is cached, so tools keep working even on a slow connection.'],
    ],
  },
  {
    path: 'audio-converter',
    tool: 'converter',
    title: `Audio Converter – MP3, WAV, M4A, OGG, FLAC Online | ${NAME}`,
    description: 'Convert audio files online for free: MP3, WAV, M4A, OGG, FLAC, OPUS and more. Change speed and boost volume. Works on WhatsApp voice notes. No upload.',
    h1: 'Free online <em>audio converter</em>',
    lead: 'Convert between MP3, WAV, M4A, OGG and FLAC. Also great for WhatsApp and Telegram voice notes (OPUS).',
    badges: ['MP3 · WAV · M4A · OGG · FLAC', 'Speed & volume', 'Voice notes'],
    steps: [
      ['Open a file', 'Choose any audio or video file, including WhatsApp .opus voice notes.'],
      ['Choose the format', 'Pick the output format and quality. Adjust speed or volume if you like.'],
      ['Convert & download', 'Press Convert and Download. Done.'],
    ],
    content: `
    <h2>Convert any audio format</h2>
    <p>Open <strong>Effects &amp; filters</strong> to add fades, change speed or pitch, boost bass or volume, clean up noise with AI or add reverb while you convert.</p>
    <p>${NAME} reads almost every audio format — MP3, WAV, M4A, AAC, OGG, OPUS, FLAC, AMR, WMA — and converts it to the format your device or app needs.</p>
    <h3>WhatsApp and Telegram voice notes</h3>
    <p>Voice messages are saved as <code>.opus</code> or <code>.ogg</code> files that many players can’t open. Convert them to MP3 to play them anywhere or share them by email.</p>
    <h3>Slowed, sped up and louder</h3>
    <p>Use <strong>Speed</strong> to make slowed or sped-up versions of songs, or to slow down music you are learning to play. Use <strong>Volume</strong> to boost quiet recordings; a limiter prevents distortion.</p>`,
    faq: [
      ['How do I convert WAV to MP3?', 'Open the WAV file, choose MP3 and a quality, then press Convert and Download.'],
      ['How do I convert a WhatsApp voice note to MP3?', 'Save the voice note (.opus) to your device, open it here, choose MP3 and press Convert.'],
      ['What is the best audio format?', 'MP3 works everywhere. M4A is slightly better quality at the same size. FLAC and WAV are lossless but larger.'],
      ['Can I make a slowed + reverb version?', 'Yes. Tap the Slowed + Reverb preset in Effects, or use the dedicated Slowed + Reverb tool.'],
    ],
  },

  // ---------- effect tools ----------
  {
    path: 'audio-joiner',
    tool: 'joiner',
    title: `Audio Joiner – Merge MP3 Songs Online, Free | ${NAME}`,
    description: 'Join MP3, M4A, WAV and other audio files into one online. Reorder, crossfade and even out the volume. Free, private, no upload.',
    h1: 'Online <em>audio joiner</em>',
    lead: 'Merge several songs, voice notes or clips into one file. Reorder them, add a smooth crossfade and even out the volume.',
    badges: ['Unlimited files', 'Crossfade', 'Even volume'],
    steps: [
      ['Add your files', 'Choose two or more audio or video files. Add more at any time.'],
      ['Put them in order', 'Use the arrows to reorder. Set the crossfade length or turn it off.'],
      ['Join & download', 'Choose the format and press Join files, then Download.'],
    ],
    content: `
    <h2>Make mixes, medleys and long recordings</h2>
    <p>Combine songs into a party mix, join voice notes into one message, or put recording parts back together. A <strong>crossfade</strong> blends each track into the next, and <strong>Even out volume</strong> makes quiet and loud files sound equally loud.</p>
    <h3>Different formats? No problem</h3>
    <p>You can mix MP3, M4A, WAV, OGG, OPUS and even videos in one go. ${NAME} converts them all to the same format automatically.</p>`,
    faq: [
      ['How many files can I join?', 'As many as your device has memory for. Most phones handle dozens of songs.'],
      ['Can I join files without a gap?', 'Yes. Set the crossfade to "off" to join them back to back.'],
      ['Can I join videos?', 'Yes, MeloCut takes the sound from each video and joins the audio into one file.'],
    ],
  },
  {
    path: 'noise-remover',
    tool: 'denoise',
    title: `AI Noise Remover – Clean Background Noise from Audio, Free | ${NAME}`,
    description: 'Remove background noise from voice recordings, voice notes and videos with AI. A neural network runs on your device; nothing is uploaded. Free.',
    h1: '<em>AI</em> noise remover',
    lead: 'A neural network removes wind, traffic, fans and hum from voice recordings, then evens out the volume. It runs on your device.',
    badges: ['Neural network (RNNoise)', 'Voice notes & podcasts', 'No upload'],
    steps: [
      ['Open your recording', 'A voice note, interview, lecture or video.'],
      ['Preview the clean version', 'AI noise removal is already on. Press Preview with effects to hear it.'],
      ['Download', 'Press Convert and Download your clean audio.'],
    ],
    content: `
    <h2>How the AI noise removal works</h2>
    <p>${NAME} uses <strong>RNNoise</strong>, a recurrent neural network trained to tell human speech apart from background noise. It runs completely inside your browser, so even private recordings never leave your phone or computer.</p>
    <h3>Best results</h3>
    <p>It works best on speech: podcasts, interviews, voice notes and video calls. For steady hiss on music, try the <strong>Reduce hiss</strong> filter instead. Combine it with <strong>Auto loudness</strong> and <strong>Remove silences</strong> (both on by default here) for a polished result.</p>`,
    faq: [
      ['Is this real AI?', 'Yes. The noise remover uses RNNoise, a neural network for speech denoising. The model (about 300 KB) downloads the first time you use it and then runs on your device.'],
      ['Will it work on music?', 'It is designed for voices. On music it may remove instruments, so use Reduce hiss for songs.'],
      ['Is my recording uploaded?', 'No. The AI runs in your browser; your file stays on your device.'],
    ],
  },
  {
    path: 'slowed-reverb',
    tool: 'slowed-reverb',
    title: `Slowed + Reverb Maker – Make Slowed Songs Online, Free | ${NAME}`,
    description: 'Make slowed + reverb versions of any song online. Adjust speed, pitch and reverb, preview, and download MP3. Free, no upload, no watermark.',
    h1: '<em>Slowed + reverb</em> maker',
    lead: 'Turn any song into a dreamy slowed + reverb version. Everything is pre-set, and you can fine-tune speed, pitch and reverb.',
    badges: ['Speed & pitch', 'Reverb', 'Nightcore too'],
    steps: [
      ['Open a song', 'Choose any song from your device.'],
      ['Tune the vibe', 'Speed 0.85× with reverb is set. Adjust and press Preview with effects.'],
      ['Download', 'Convert and save as MP3.'],
    ],
    content: `
    <h2>The perfect slowed + reverb settings</h2>
    <p>The classic sound is <strong>speed 0.80–0.90×</strong>, <strong>pitch −1 to −3 semitones</strong> and <strong>reverb 35–55%</strong>. For the sped-up / nightcore style, tap the <em>Nightcore</em> preset.</p>`,
    faq: [
      ['How do I make a slowed + reverb song?', 'Open the song here. The slowed + reverb effect is already set; press Preview, adjust if you like, then Convert and Download.'],
      ['Can I make sped-up or nightcore versions?', 'Yes, tap the Nightcore preset or raise the speed and pitch.'],
    ],
  },
  {
    path: 'vocal-remover',
    tool: 'karaoke',
    title: `Vocal Remover – Make Karaoke & Instrumental Online, Free | ${NAME}`,
    description: 'Remove vocals from songs to make karaoke and instrumental tracks online. Free, private and instant; nothing is uploaded.',
    h1: '<em>Vocal remover</em> &amp; karaoke maker',
    lead: 'Remove the singer from a song to make a karaoke or instrumental version.',
    badges: ['Karaoke', 'Instrumental', 'Instant preview'],
    steps: [
      ['Open a song', 'Choose a stereo song from your device.'],
      ['Preview', 'Vocal remover is on. Press Preview with effects to check the result.'],
      ['Download', 'Convert and save your karaoke track.'],
    ],
    content: `
    <h2>How it works</h2>
    <p>In most studio songs the lead vocal is mixed in the centre, while instruments are spread left and right. The vocal remover cancels what is in the centre, leaving the instruments. It works instantly and on any device.</p>
    <h3>Limits</h3>
    <p>Results depend on the mix: bass and drums in the centre get quieter too, and reverb on the voice may remain. Live recordings and mono files don't work. Add a little <strong>Bass</strong> in Effects to bring the low end back.</p>`,
    faq: [
      ['Does it work on every song?', 'It works best on studio songs with a centred lead vocal. Mono recordings cannot be separated this way.'],
      ['Why is the bass quieter?', 'Bass is often mixed in the centre too. Raise the Bass slider in Effects to restore it.'],
    ],
  },
  {
    path: '8d-audio',
    tool: '8d',
    title: `8D Audio Converter – Make 8D Songs Online, Free | ${NAME}`,
    description: 'Convert any song to 8D audio online: sound that moves around your head. Preview with headphones and download MP3. Free, no upload.',
    h1: '<em>8D audio</em> converter',
    lead: 'Make the music travel around your head. Put on headphones, preview and download.',
    badges: ['Use headphones', 'Adjustable reverb', 'MP3 · WAV'],
    steps: [
      ['Open a song', 'Choose any song from your device.'],
      ['Put on headphones', 'Press Preview with effects to hear it move.'],
      ['Download', 'Convert and save your 8D version.'],
    ],
    content: `
    <h2>What is 8D audio?</h2>
    <p>8D audio slowly pans the sound from ear to ear with a touch of reverb, so it feels like the music is circling around you. It only works with headphones or earbuds.</p>`,
    faq: [['Why don’t I hear the 8D effect?', 'You need headphones or earbuds. On a single speaker the effect disappears.']],
  },
  {
    path: 'bass-booster',
    tool: 'bass',
    title: `Bass Booster – Boost Bass in MP3 Online, Free | ${NAME}`,
    description: 'Boost the bass of any song online for free. Choose how much, preview, and download. A limiter prevents distortion. No upload.',
    h1: '<em>Bass booster</em>',
    lead: 'Give any song deeper, punchier bass. Choose the amount, preview and download.',
    badges: ['Up to +15 dB', 'No distortion', 'Preview'],
    steps: [
      ['Open a song', 'Choose any song or video.'],
      ['Set the boost', 'Use the Bass slider (+10 dB is set) and press Preview.'],
      ['Download', 'Convert and save.'],
    ],
    content: `
    <h2>Bass boost without distortion</h2>
    <p>${NAME} boosts the low frequencies around 110 Hz and then evens out the volume with a limiter, so the bass hits harder without crackling. For small phone speakers, +6 to +10 dB sounds best.</p>`,
    faq: [['How much bass boost should I use?', 'Start at +8 to +10 dB. Above +12 dB is very heavy and best for headphones or car speakers.']],
  },
  {
    path: 'volume-booster',
    tool: 'volume',
    title: `Volume Booster – Make Audio Louder Online, Free | ${NAME}`,
    description: 'Make quiet MP3s, voice notes and videos louder online for free. Auto loudness evens out the volume without distortion. No upload.',
    h1: '<em>Volume booster</em>',
    lead: 'Make quiet recordings louder and evenly loud, like streaming apps, without distortion.',
    badges: ['Up to 300%', 'Auto loudness', 'No distortion'],
    steps: [
      ['Open your file', 'A quiet song, voice note, lecture or video.'],
      ['Choose the boost', 'Auto loudness is on. Adjust the Volume slider and Preview.'],
      ['Download', 'Convert and save.'],
    ],
    content: `
    <h2>Louder, but clean</h2>
    <p><strong>Auto loudness</strong> measures the whole file and sets it to the same loudness that Spotify and YouTube use, so quiet recordings become clear and loud. A limiter stops peaks from crackling.</p>`,
    faq: [['Will boosting the volume cause distortion?', 'No. A limiter keeps peaks under control, so the result is louder without clipping.']],
  },
  {
    path: 'reverse-audio',
    tool: 'reverse',
    title: `Reverse Audio – Play Songs Backwards Online, Free | ${NAME}`,
    description: 'Reverse any audio or song online and hear it backwards. Free, instant, no upload.',
    h1: '<em>Reverse</em> audio',
    lead: 'Play any sound, voice or song backwards. Find hidden messages or make cool sound effects.',
    badges: ['Instant', 'Any format', 'No upload'],
    steps: [
      ['Open a file', 'Any song, voice note or video.'],
      ['Preview', 'Reverse is on. Press Preview with effects.'],
      ['Download', 'Convert and save.'],
    ],
    content: `
    <h2>Backwards audio for fun and effects</h2>
    <p>Reverse your voice for a challenge, find "hidden messages" in songs, or make reverse cymbal swells for your own music. Combine it with reverb for a classic reverse-reverb sound.</p>`,
    faq: [['Can I reverse just part of a song?', 'Yes. Drag on the waveform to select the part you want, then convert.']],
  },
  // ---------- guides ----------
  {
    path: 'guides',
    title: `Guides – Ringtones, Installing the App & More | ${NAME}`,
    description: `Step-by-step guides: install ${NAME} on your phone, set a custom ringtone on iPhone and Android, and find your downloaded files.`,
    h1: 'Guides',
    lead: 'Short step-by-step guides to get the most out of MeloCut.',
    plain: true,
    body: `<div class="cards">
      <a class="card" href="/guides/install-app/"><div class="ico">${ICONS.phone}</div><b>Install MeloCut on your phone</b><p>Add it to your home screen and use it offline, like an app.</p></a>
      <a class="card" href="/guides/set-ringtone/"><div class="ico">${ICONS.bell}</div><b>Set a custom ringtone</b><p>iPhone and Android, with or without a computer.</p></a>
      <a class="card" href="/guides/find-downloads/"><div class="ico">${ICONS.book}</div><b>Where are my downloads?</b><p>Find your files on iPhone, Android, Windows and Mac.</p></a>
    </div>`,
  },
  {
    path: 'guides/install-app',
    title: `How to Install ${NAME} on iPhone & Android (Free App) | ${NAME}`,
    description: `Add ${NAME} to your iPhone or Android home screen in 3 taps. It opens like an app and works offline. Free, no app store needed.`,
    h1: 'Install MeloCut on your phone',
    lead: 'No app store needed. Add MeloCut to your home screen and it opens full screen like a normal app, and even works offline.',
    plain: true,
    content: `
    <div class="callout install-native"><p>Your browser can install MeloCut right now.</p><a class="btn sm install-btn" href="#">📲 Install app</a></div>
    <h2>iPhone &amp; iPad (Safari)</h2>
    <ol class="guide-steps">
      <li>Open <strong>${SITE_URL.replace('https://', '')}</strong> in <strong>Safari</strong>.</li>
      <li>Tap the <strong>Share</strong> button (the square with an arrow pointing up) at the bottom of the screen.</li>
      <li>Scroll down and tap <strong>Add to Home Screen</strong>, then <strong>Add</strong>.</li>
      <li>Open MeloCut from your home screen. It now runs full screen like an app.</li>
    </ol>
    <h2>Android (Chrome)</h2>
    <ol class="guide-steps">
      <li>Open <strong>${SITE_URL.replace('https://', '')}</strong> in <strong>Chrome</strong>.</li>
      <li>Tap <strong>Install app</strong> if it pops up, or tap the <strong>⋮</strong> menu at the top right.</li>
      <li>Tap <strong>Install app</strong> (or <strong>Add to Home screen</strong>), then <strong>Install</strong>.</li>
      <li>MeloCut appears in your app drawer and on your home screen.</li>
    </ol>
    <h2>Windows, Mac &amp; Chromebook</h2>
    <ol class="guide-steps">
      <li>In <strong>Chrome</strong> or <strong>Edge</strong>, click the install icon (a screen with a down arrow) at the right end of the address bar.</li>
      <li>Click <strong>Install</strong>. MeloCut opens in its own window and gets a desktop icon.</li>
    </ol>
    <h2>Works offline</h2>
    <p>After you have used a tool once, MeloCut keeps the audio engine on your device, so the tools keep working on a plane or with a bad connection.</p>`,
    faq: [
      ['Is the MeloCut app free?', 'Yes, it is the same free website, just installed on your home screen.'],
      ['Does it take a lot of space?', 'No. About 30 MB for the audio engine, much smaller than most apps.'],
      ['How do I remove it?', 'Delete it like any other app: long-press the icon and choose Remove.'],
    ],
  },
  {
    path: 'guides/set-ringtone',
    title: `How to Set a Custom Ringtone on iPhone & Android (2026) | ${NAME}`,
    description: 'Step-by-step: make a ringtone from any song and set it on iPhone (with GarageBand or a computer) or Android. Free.',
    h1: 'How to set a custom ringtone',
    lead: 'First make your ringtone with the free Ringtone Maker, then follow the steps for your phone.',
    plain: true,
    content: `
    <div class="callout"><p>🔔 Don't have a ringtone yet? Make one in 30 seconds.</p><a class="btn sm" href="/ringtone-maker/">Open Ringtone Maker</a></div>
    <h2>iPhone without a computer (GarageBand)</h2>
    <ol class="guide-steps">
      <li>In the Ringtone Maker choose <strong>MP3</strong> (or M4A) and download your ringtone. It is saved in the <strong>Files</strong> app, in Downloads.</li>
      <li>Install <strong>GarageBand</strong> (free, from Apple) and open it. Start any instrument, e.g. Audio Recorder.</li>
      <li>Tap the <strong>tracks view</strong> button, then the <strong>loop</strong> icon (top right) → <strong>Files</strong> → <strong>Browse items from the Files app</strong>, and pick your ringtone.</li>
      <li>Drag it onto the track, tap the <strong>⌄</strong> arrow (top left) → <strong>My Songs</strong>.</li>
      <li>Long-press the song → <strong>Share</strong> → <strong>Ringtone</strong> → <strong>Export</strong> → <strong>Use sound as… Standard Ringtone</strong>.</li>
    </ol>
    <h2>iPhone with a Mac or PC</h2>
    <ol class="guide-steps">
      <li>Choose <strong>M4R (iPhone ringtone)</strong> in the Ringtone Maker and download it on your computer.</li>
      <li>Connect your iPhone with a cable. Open <strong>Finder</strong> (Mac) or <strong>iTunes</strong>/<strong>Apple Devices</strong> (Windows) and select your iPhone.</li>
      <li>Drag the <strong>.m4r</strong> file onto your iPhone in the sidebar. It syncs in seconds.</li>
      <li>On the iPhone open <strong>Settings → Sounds &amp; Haptics → Ringtone</strong> and pick it.</li>
    </ol>
    <h2>Android</h2>
    <ol class="guide-steps">
      <li>Choose <strong>MP3</strong> in the Ringtone Maker and download it.</li>
      <li>Open <strong>Settings → Sound &amp; vibration → Phone ringtone</strong>.</li>
      <li>Tap <strong>+</strong>, <strong>Add ringtone</strong> or <strong>My sounds</strong> (the name varies by phone) and choose your file from Downloads.</li>
      <li>To set it for one contact only: open the contact → <strong>⋮</strong> → <strong>Set ringtone</strong>.</li>
    </ol>
    <h2>Tips</h2>
    <p>Keep ringtones between 20 and 30 seconds, start just before the chorus, and leave the fade in/out on. Raise <strong>Volume</strong> in Effects if your ringtone is too quiet.</p>`,
    faq: [
      ['Why doesn’t my ringtone show up on iPhone?', 'It must be shorter than 40 seconds and in M4R format when using a computer. MeloCut handles both for you.'],
      ['Can I set a notification sound too?', 'Yes. On iPhone choose Text Tone in Sounds & Haptics; on Android choose Notification sound.'],
    ],
  },
  {
    path: 'guides/find-downloads',
    title: `Where Are My Downloaded Files? iPhone, Android, PC | ${NAME}`,
    description: 'Find the files you downloaded from MeloCut on iPhone, Android, Windows and Mac, and move them to your music app.',
    h1: 'Where are my downloads?',
    lead: 'Downloaded a file but can’t find it? Here is where it goes on each device.',
    plain: true,
    content: `
    <h2>iPhone &amp; iPad</h2>
    <ol class="guide-steps">
      <li>Open the <strong>Files</strong> app → <strong>Browse</strong> → <strong>On My iPhone</strong> (or iCloud Drive) → <strong>Downloads</strong>.</li>
      <li>Tap the file to play it, or long-press → <strong>Share</strong> to send it to WhatsApp, GarageBand or another app.</li>
    </ol>
    <h2>Android</h2>
    <ol class="guide-steps">
      <li>Open the <strong>Files</strong> (or <strong>My Files</strong>) app → <strong>Downloads</strong>.</li>
      <li>Most music players find new MP3s automatically. If not, move the file to the <strong>Music</strong> folder.</li>
    </ol>
    <h2>Windows &amp; Mac</h2>
    <ol class="guide-steps">
      <li>Open your <strong>Downloads</strong> folder (File Explorer on Windows, Finder on Mac).</li>
      <li>In Chrome you can also press <strong>Ctrl+J</strong> (Windows) or <strong>⌘+Shift+J</strong> (Mac) to see recent downloads.</li>
    </ol>`,
  },
  {
    path: 'privacy',
    title: `Privacy Policy | ${NAME}`,
    description: `How ${NAME} handles your data: your files never leave your device.`,
    h1: 'Privacy policy',
    plain: true,
    content: `
    <p><em>Last updated: ${UPDATED}</em></p>
    <h2>Your files</h2>
    <p>${NAME} processes audio and video files entirely inside your web browser. Your files are <strong>never uploaded</strong> to our servers or to anyone else, and we cannot see, store or share them.</p>
    <h2>Technical data</h2>
    <p>Like every website, our hosting provider receives standard technical information (such as your IP address and browser type) when you load a page. The audio engine and, when you use AI noise removal, the small RNNoise model are downloaded from the jsDelivr content delivery network. After that they run on your device.</p>
    <h2>Advertising and cookies</h2>
    <p>${NAME} may show ads from Google AdSense. Google and its partners use cookies to show ads based on your previous visits to this and other websites. You can opt out of personalised advertising at <a href="https://adssettings.google.com" rel="nofollow">Google Ads Settings</a> or <a href="https://www.aboutads.info/choices" rel="nofollow">aboutads.info</a>. Learn more in <a href="https://policies.google.com/technologies/ads" rel="nofollow">how Google uses information from sites that use its services</a>.</p>
    <p>Visitors in the EEA, UK and Switzerland are asked for consent before personalised ads are shown.</p>
    <h2>Analytics</h2>
    <p>We may use privacy-friendly, cookie-free analytics to count page views and which tools are used. No personal data is collected.</p>
    <h2>Contact</h2>
    <p>Questions? Email <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>`,
  },
  {
    path: 'about',
    title: `About & Contact | ${NAME}`,
    description: `About ${NAME}, free private audio tools, and how to contact us.`,
    h1: 'About MeloCut',
    plain: true,
    content: `
    <p>${NAME} is a set of free audio tools — a ringtone maker, audio cutter and joiner, video to MP3 converter, audio converter, AI noise remover and a full effects studio — that work entirely in your web browser.</p>
    <p>We built it because most converter sites are slow, full of pop-ups and make you upload your personal files. ${NAME} runs the FFmpeg audio engine on your own device instead, so it is faster and your files stay private.</p>
    <h2>Contact</h2>
    <p>Ideas, bug reports or business enquiries: <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>
    <h2>Terms of use</h2>
    <p>${NAME} is provided as is, without warranty. Only use it with files you own or have the right to use, and respect copyright.</p>`,
  },
];

// ---------- templates ----------
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const strip = (s) => s.replace(/<[^>]+>/g, '');

function jsonLd(p) {
  const url = `${SITE_URL}/${p.path ? p.path + '/' : ''}`;
  const graph = [
    { '@type': 'WebSite', '@id': `${SITE_URL}/#site`, name: NAME, url: `${SITE_URL}/` },
  ];
  if (!p.plain) {
    graph.push({
      '@type': 'WebApplication', name: p.path ? `${NAME} ${strip(p.h1)}` : NAME, url,
      applicationCategory: 'MultimediaApplication', operatingSystem: 'Any (web browser)',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, description: p.description,
    });
  }
  if (p.faq) {
    graph.push({ '@type': 'FAQPage', mainEntity: p.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
  }
  if (p.steps) {
    graph.push({ '@type': 'HowTo', name: `How to use the ${NAME} ${strip(p.h1)}`, step: p.steps.map(([n, t], i) => ({ '@type': 'HowToStep', position: i + 1, name: n, text: t })) });
  }
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
}

function page(p) {
  const url = `${SITE_URL}/${p.path ? p.path + '/' : ''}`;
  const navLinks = TOOLS.filter((t) => MAIN_NAV.includes(t.slug)).map((t) => `<a href="/${t.slug}/"${p.path === t.slug ? ' aria-current="page"' : ''}>${t.nav}</a>`).join('')
    + `<a href="/#tools">All tools</a><a href="/guides/"${p.path.startsWith('guides') ? ' aria-current="page"' : ''}>Guides</a>`;
  const others = TOOLS.filter((t) => t.slug !== p.path);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#6d4aff">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="${NAME}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${NAME}">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE_URL}/og.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/assets/style.css">
<script src="/assets/config.js"></script>
<script src="/assets/site.js" defer></script>
${p.tool ? '<script type="module" src="/assets/app.js"></script>\n<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>' : ''}
<script type="application/ld+json">${jsonLd(p)}</script>
</head>
<body>
<header class="top">
  <div class="wrap">
    <a class="logo" href="/"><img src="/assets/logo.svg" width="32" height="32" alt="">${NAME}</a>
    <nav class="nav" aria-label="Tools">${navLinks}</nav>
    <a class="btn sm install-btn" href="/guides/install-app/">📲 Install</a>
    <button class="menu-btn" type="button" aria-label="Menu"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
  </div>
</header>
<main class="wrap">
  <div class="hero"${p.plain ? ' style="text-align:left;padding-bottom:0"' : ''}>
    <h1>${p.h1}</h1>
    ${p.lead ? `<p>${p.lead}</p>` : ''}
    ${p.badges ? `<div class="badges">${p.badges.map((b) => `<span class="badge">${b}</span>`).join('')}</div>` : ''}
  </div>
  ${p.tool ? `<div class="tool" data-tool="${p.tool}"><noscript>Please enable JavaScript to use this tool.</noscript></div>
  <div class="ad" data-slot="top"></div>` : ''}
  ${p.body || ''}
  ${p.steps ? `<div class="section"><h2>How it works</h2><div class="steps">${p.steps.map(([n, t]) => `<div class="card"><b>${n}</b><p>${t}</p></div>`).join('')}</div></div>` : ''}
  ${p.content ? `<div class="section prose">${p.content}</div>` : ''}
  ${p.tool ? `<div class="ad" data-slot="middle"></div>${WHY}` : ''}
  ${p.tool ? `<div class="section"><h2>More free tools</h2><div class="cards">${others.map(toolCard).join('')}</div></div>${INSTALL_CALLOUT}` : ''}
  ${p.faq ? `<div class="section"><h2>Questions &amp; answers</h2>${p.faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>` : ''}
  ${p.plain ? '' : '<div class="ad" data-slot="bottom"></div>'}
</main>
<footer>
  <div class="wrap">
    <div>© <span data-year></span> ${NAME} · Free, private audio tools</div>
    <nav aria-label="Footer">${TOOLS.map((t) => `<a href="/${t.slug}/">${t.title}</a>`).join('')}<a href="/guides/">Guides</a><a href="/guides/install-app/">Install the app</a><a href="/about/">About &amp; contact</a><a href="/privacy/">Privacy</a></nav>
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
  lead: 'That page doesn’t exist. Try one of our tools:', plain: false,
  body: `<div class="cards">${TOOLS.map(toolCard).join('')}</div>`,
}).replace('<link rel="canonical"', '<meta name="robots" content="noindex">\n<link rel="canonical"'));
fs.writeFileSync(path.join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map((p) => `  <url><loc>${SITE_URL}/${p.path ? p.path + '/' : ''}</loc><lastmod>${UPDATED}</lastmod></url>`).join('\n')}
</urlset>
`);
console.log(`Built ${PAGES.length + 1} pages for ${SITE_URL}`);
