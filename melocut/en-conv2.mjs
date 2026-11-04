// More format pages (English). Wired in build.mjs.
export default (NAME) => [
  {
    path: 'wma-to-mp3', tool: 'converter', format: 'mp3', crumb: 'Converters',
    title: `WMA to MP3 Converter Online: Free, No Upload | ${NAME}`,
    description: 'Convert old WMA files from Windows Media Player to MP3 so they play on any phone, car or app. Up to 320 kbps. Free, private, nothing is uploaded.',
    h1: '<em>WMA to MP3</em> converter',
    lead: 'Give old Windows Media Audio files a second life as MP3s that play on iPhone, Android, Mac and in the car.',
    badges: ['Windows Media Audio', 'Up to 320 kbps', 'No upload'],
    steps: [
      ['Open the WMA', 'Choose a .wma file from your device, or drop several at once.'],
      ['Pick a quality', '192 kbps suits most WMA rips. Use 320 kbps if the original was high quality.'],
      ['Download the MP3', 'Press Convert, then Download.'],
    ],
    content: `
    <h2>Where WMA files come from</h2>
    <p>For years, Windows Media Player ripped CDs to WMA by default. If you have an old music folder from a Windows XP or Windows 7 PC, a lot of it is probably WMA. The files still sound fine, but iPhones, Macs, many car stereos and most music apps won't play them.</p>
    <p>${NAME} reads the WMA in your browser and saves a standard MP3. The file stays on your device the whole time, so even a private collection never gets uploaded anywhere.</p>
    <h3>Which quality should I choose?</h3>
    <p>Old WMA rips were often made at 128 or 192 kbps. Converting them to a higher bitrate can't add detail that isn't there, so <strong>192 kbps</strong> is a sensible choice. If the WMA was ripped at a high bitrate or as WMA Lossless, pick <strong>320 kbps</strong> to keep as much as MP3 allows.</p>
    <h3>A whole folder of WMA files</h3>
    <p>Choose or drop several files together, press <strong>Convert all</strong>, and download them one by one or as one ZIP. On a computer this is the quickest way to move an old library over. Keep in mind that tags and album art are not copied to the new files, so you may want to fix song names in your music app afterwards.</p>
    <h3>Protected WMA files</h3>
    <p>Some WMA files bought from old online stores or subscription services have copy protection (DRM). These can't be opened by ${NAME} or any other browser tool. Normal CD rips have no DRM and convert fine.</p>
    <p>Want only part of a song, for example as a ringtone? Convert it first, then open the MP3 in the <a href="/ringtone-maker/">Ringtone Maker</a> or the <a href="/audio-cutter/">Audio Cutter</a>.</p>`,
    faq: [
      ['How do I convert WMA to MP3?', 'Open the WMA file above, choose MP3 and a quality, then press Convert and Download.'],
      ['Can I convert WMA on a Mac or iPhone?', 'Yes. The conversion runs in the browser, so it works on Mac, iPhone and Android even though they cannot play WMA themselves.'],
      ['Why does my WMA file fail to convert?', 'It is probably copy-protected (DRM). Protected WMA files cannot be converted. Unprotected files, like your own CD rips, work normally.'],
      ['Does WMA to MP3 lose quality?', 'Both formats are compressed, so a little. At 192 or 320 kbps it is very hard to hear.'],
    ],
  },
  {
    path: 'aiff-to-mp3', tool: 'converter', format: 'mp3', crumb: 'Converters',
    title: `AIFF to MP3 Converter Online, Free and Private | ${NAME}`,
    description: 'Convert AIFF and AIF files from Mac, GarageBand or Logic to MP3. Files get up to 10 times smaller. Choose up to 320 kbps. Free, nothing is uploaded.',
    h1: '<em>AIFF to MP3</em> converter',
    lead: 'Turn big AIFF and AIF files from your Mac, GarageBand or Logic into small MP3s that are easy to share.',
    badges: ['AIFF and AIF', 'Up to 320 kbps', 'No upload'],
    steps: [
      ['Open the AIFF', 'Choose an .aiff or .aif file, or drop several at once.'],
      ['Pick 320 kbps', 'AIFF is full quality, so keep as much of it as MP3 can.'],
      ['Download the MP3', 'Press Convert, then Download.'],
    ],
    content: `
    <h2>What is an AIFF file?</h2>
    <p>AIFF is Apple's uncompressed audio format, the Mac version of WAV. GarageBand and Logic can bounce songs to AIFF, older iTunes CD imports were often AIFF, and many sample packs and sound effects come as <code>.aif</code> files. The sound is excellent, but a three-minute song takes around 30 MB.</p>
    <p>As a 320 kbps MP3 the same song is about 7 MB and sounds almost identical. That's small enough to send in a chat, upload to a site with a size limit or keep on your phone.</p>
    <h3>Sharing a song you made</h3>
    <p>Finished a track in GarageBand? Export it as AIFF, open it here and save an MP3 for friends, band mates or social media. Use <strong>Auto loudness</strong> in Effects if your mix is much quieter than songs on streaming apps. If you only want to share a short part, drag on the waveform to keep that section and add a fade out.</p>
    <h3>Converting many samples</h3>
    <p>Choose several AIFF files at once and press <strong>Convert all</strong>. You can download each MP3 separately or all of them as one ZIP. Keep the original AIFF files if you might edit them again: an MP3 is great for listening but not for further mixing.</p>
    <h3>Need a different format?</h3>
    <p>For editing on Windows, many apps prefer WAV. Pick WAV in the Format menu, or read about the difference in <a href="/mp3-to-wav/">MP3 to WAV</a>. If you want to keep full quality but save space, choose FLAC: it is lossless and about half the size. The <a href="/wav-to-flac/">WAV to FLAC</a> page explains how it works.</p>`,
    faq: [
      ['Is AIF the same as AIFF?', 'Yes. Both endings are used for the same format, and both convert here.'],
      ['Does AIFF to MP3 lose quality?', 'A little, because MP3 is compressed. At 320 kbps most people cannot hear the difference.'],
      ['Can I convert AIFF on Windows or Android?', 'Yes. The converter runs in the browser, so it works on any computer or phone.'],
    ],
  },
  {
    path: 'mkv-to-mp3', tool: 'video-to-mp3', format: 'mp3', crumb: 'Converters',
    title: `MKV to MP3 Converter: Extract Audio, Free | ${NAME}`,
    description: 'Extract the audio from MKV videos and save it as MP3, M4A or WAV. Up to 320 kbps, right in your browser. Free, no sign-up, the video is never uploaded.',
    h1: '<em>MKV to MP3</em> converter',
    lead: 'Pull the sound out of an MKV video and save it as an MP3 that plays on any device.',
    badges: ['MKV videos', 'Up to 320 kbps', 'No upload'],
    steps: [
      ['Open the MKV', 'Tap the box above and choose the video, or drag it in.'],
      ['Trim it if you want', 'Drag on the waveform to keep only one scene or song.'],
      ['Download the MP3', 'Pick a quality, press Convert, then Download.'],
    ],
    content: `
    <h2>What is inside an MKV file?</h2>
    <p>MKV (Matroska) is a container that can hold video, several audio tracks and subtitles in one file. Screen recorders like OBS, video editors and many download tools save MKV. Phones and some players don't open it, but the audio inside is usually ordinary AAC, Opus, Vorbis or AC-3 sound that ${NAME} can turn into an MP3.</p>
    <h3>Videos with more than one audio track</h3>
    <p>Some MKV files carry several audio tracks, for example two languages, or a commentary next to the main sound. ${NAME} uses the main audio track, usually the first one. If you need a different track, remove the other tracks in a video tool such as MKVToolNix first, then open the file here.</p>
    <h3>Good uses</h3>
    <ul>
      <li>Save the music from a concert or a live stream recording.</li>
      <li>Turn a recorded talk or game commentary into a podcast-style MP3.</li>
      <li>Cut a line from a clip and make it a <a href="/ringtone-maker/">ringtone</a>.</li>
    </ul>
    <h3>Which format?</h3>
    <p><strong>MP3</strong> plays everywhere: choose 320 kbps for music and 128 kbps for speech. <strong>M4A</strong> keeps AAC sound a bit more efficiently, and <strong>WAV</strong> is best if you'll edit the audio in another program. Recording too quiet? Turn on <strong>Auto loudness</strong> in Effects before converting.</p>
    <h3>Big files</h3>
    <p>MKV files of whole films can be huge. ${NAME} accepts files up to 1 GB, and computers handle large videos much better than phones. Other video types have their own pages, like <a href="/avi-to-mp3/">AVI to MP3</a> and <a href="/mov-to-mp3/">MOV to MP3</a>, or use the general <a href="/video-to-mp3/">Video to MP3</a> tool.</p>`,
    faq: [
      ['How do I convert MKV to MP3?', 'Open the MKV above, choose MP3 and a quality, then press Convert and Download.'],
      ['Which audio track is used?', 'The main audio track of the video, usually the first one. Other tracks are ignored.'],
      ['Can I keep the subtitles?', 'No. Only the sound is saved. Subtitles and video are left out.'],
    ],
  },
  {
    path: 'avi-to-mp3', tool: 'video-to-mp3', format: 'mp3', crumb: 'Converters',
    title: `AVI to MP3 Converter Online, Free, No Upload | ${NAME}`,
    description: 'Extract the sound from old AVI videos from cameras and PCs and save it as MP3. Up to 320 kbps, works in your browser. Free and private, nothing is uploaded.',
    h1: '<em>AVI to MP3</em> converter',
    lead: 'Rescue the sound from old AVI videos from digital cameras, camcorders and Windows PCs.',
    badges: ['Old camera videos', 'Up to 320 kbps', 'No upload'],
    steps: [
      ['Open the AVI', 'Choose the .avi file from your device.'],
      ['Select the part you need', 'Drag on the waveform, or keep the whole thing.'],
      ['Download the MP3', 'Press Convert, then Download.'],
    ],
    content: `
    <h2>Old AVI videos, new life</h2>
    <p>AVI was the standard video format on Windows for a long time. Many compact digital cameras from the 2000s also saved their clips as AVI. Those files are often full of birthday songs, school plays and family voices, but modern phones and TVs frequently refuse to play them.</p>
    <p>${NAME} opens the AVI in your browser, takes the audio track and saves it as an MP3 you can keep, share or play in the car. The video never leaves your device.</p>
    <h3>Make old recordings sound better</h3>
    <p>Camera microphones from that era were not great. Before you convert, open <strong>Effects</strong>:</p>
    <ul>
      <li><strong>Auto loudness</strong> makes a quiet recording as loud as streaming apps without distortion.</li>
      <li><strong>AI noise removal</strong> takes out wind, hum and background chatter behind voices.</li>
      <li>Press <strong>Play with effects</strong> to hear the result before you download.</li>
    </ul>
    <p>For a recording that's still too quiet, the <a href="/volume-booster/">Volume Booster</a> lets you push it further.</p>
    <h3>Which quality?</h3>
    <p>Sound in old camera AVIs is often mono and recorded at a low quality, so <strong>128 kbps</strong> is usually enough and keeps the file small. Choose 320 kbps for music videos or clips ripped from DVDs.</p>
    <h3>If the AVI won't open</h3>
    <p>AVI can contain many different codecs. Almost all common ones work, but a few very old or unusual ones can fail. If that happens, try playing the file in VLC: if it has no sound there either, the AVI may not contain an audio track at all. For other video types see <a href="/3gp-to-mp3/">3GP to MP3</a> and <a href="/mkv-to-mp3/">MKV to MP3</a>.</p>`,
    faq: [
      ['How do I convert AVI to MP3?', 'Open the AVI above, choose MP3 and a quality, press Convert and then Download.'],
      ['Can I convert AVI to MP3 on my phone?', 'Yes, it works in the browser on iPhone and Android. Very long videos are easier on a computer.'],
      ['Is the video uploaded?', 'No. Everything happens on your device, so your family videos stay private.'],
    ],
  },
  {
    path: '3gp-to-mp3', tool: 'video-to-mp3', format: 'mp3', crumb: 'Converters',
    title: `3GP to MP3 Converter for Old Phone Videos | ${NAME}`,
    description: 'Convert 3GP videos and recordings from old mobile phones to MP3. Clean up the sound and save it in your browser. Free, private, nothing is uploaded.',
    h1: '<em>3GP to MP3</em> converter',
    lead: 'Save the sound from 3GP videos and voice recordings made on old Nokia, Samsung and other feature phones.',
    badges: ['Old phone videos', 'Noise removal', 'No upload'],
    steps: [
      ['Open the 3GP', 'Choose the .3gp file from your device or memory card.'],
      ['Clean it up', 'Turn on Auto loudness or AI noise removal in Effects if you like.'],
      ['Download the MP3', 'Press Convert, then Download.'],
    ],
    content: `
    <h2>What is a 3GP file?</h2>
    <p>3GP is the video format most mobile phones used before smartphones took over. Nokia, Sony Ericsson, Samsung and many other phones saved camera videos and sometimes voice recordings as <code>.3gp</code>. Today's music apps, iPhones and computers often can't play them, even though the files are tiny.</p>
    <p>${NAME} reads the 3GP and saves the sound as a normal MP3. Many of these files use AMR, a codec made for phone calls, which few players support. The MP3 version plays anywhere, and everything happens on your device, so nothing is uploaded.</p>
    <h3>Getting the best sound</h3>
    <p>Phone microphones from the 2000s recorded in low quality, usually mono. Converting can't add detail, but it can make the recording much easier to listen to:</p>
    <ul>
      <li>Turn on <strong>Auto loudness</strong> to raise quiet voices.</li>
      <li>Turn on <strong>AI noise removal</strong> for wind and background noise.</li>
      <li>Use <strong>128 kbps</strong>. Higher settings only make the file bigger.</li>
    </ul>
    <h3>Ideas for old phone clips</h3>
    <p>Keep a grandparent's voice, save a song from a school concert, or make a funny old clip into a <a href="/ringtone-maker/">ringtone</a>. Only want a few seconds? Drag on the waveform to select them, or open the MP3 in the <a href="/audio-cutter/">Audio Cutter</a> later.</p>
    <h3>Getting the files off the phone</h3>
    <p>Old phones usually stored videos on a memory card. Put the card in a card reader, or connect the phone with a USB cable, and copy the 3GP files to your computer. Then open them here. Videos from newer phones are MP4 or MOV: see <a href="/video-to-mp3/">Video to MP3</a>.</p>`,
    faq: [
      ['How do I convert 3GP to MP3?', 'Open the 3GP above, choose MP3, press Convert and then Download.'],
      ['Why does the MP3 still sound a bit muffled?', 'Old phones recorded at low quality. Converting keeps what is there but cannot restore missing detail. Auto loudness and AI noise removal help a lot with voices.'],
      ['Can I convert 3GP on my phone?', 'Yes. It works in the browser on iPhone and Android, with no app to install.'],
    ],
  },
  {
    path: 'mp3-to-ogg', tool: 'converter', format: 'ogg', crumb: 'Converters',
    title: `MP3 to OGG Converter Online, Free (Vorbis) | ${NAME}`,
    description: 'Convert MP3 to OGG Vorbis for game engines, open-source apps and Linux. Pick the quality and trim the file right in your browser. Free, nothing is uploaded.',
    h1: '<em>MP3 to OGG</em> converter',
    lead: 'Turn MP3s into OGG Vorbis files for games, game engines and open-source software.',
    badges: ['OGG Vorbis', 'For game audio', 'No upload'],
    steps: [
      ['Open the MP3', 'Choose an MP3, or drop several files at once.'],
      ['OGG is already selected', 'Pick a quality. 192 kbps is a good default.'],
      ['Download the OGG', 'Press Convert, then Download.'],
    ],
    content: `
    <h2>Why convert MP3 to OGG?</h2>
    <p>OGG Vorbis is an open, royalty-free audio format. Game engines such as Godot and Unity import it directly, and many games use it for music and sound effects. Linux desktop apps and lots of open-source software also prefer OGG. If a tool asks for <code>.ogg</code>, this is the quick way to get one.</p>
    <h3>Which quality should I pick?</h3>
    <p>${NAME} uses Vorbis quality mode, which adapts the bitrate to the sound. The setting you pick is a rough target:</p>
    <ul>
      <li><strong>192 kbps</strong>: a good default for game music.</li>
      <li><strong>128 kbps</strong>: plenty for voice lines and most sound effects, and smaller.</li>
      <li><strong>320 kbps</strong>: only worth it if the MP3 itself was 320 kbps.</li>
    </ul>
    <p>Both MP3 and OGG are compressed formats, so converting one to the other loses a tiny bit each time. If you still have the original WAV or FLAC, convert that instead for the cleanest result.</p>
    <h3>Prepare game audio in one go</h3>
    <p>Before you convert, drag on the waveform to cut off silence at the start or end, so a music loop starts right on the beat. Open <strong>Effects</strong> to add a fade, change the speed or pitch, or even out the volume with <strong>Auto loudness</strong>. To cut a long track into pieces, use the <a href="/audio-splitter/">Audio Splitter</a>.</p>
    <h3>Many files at once</h3>
    <p>Choose several MP3s together, press <strong>Convert all</strong>, and download them as one ZIP. Handy for a folder of sound effects.</p>
    <p>Need to go the other way? The <a href="/ogg-to-mp3/">OGG to MP3</a> converter turns OGG files back into MP3s for phones and cars.</p>`,
    faq: [
      ['Is the OGG Vorbis or Opus?', 'Vorbis, the type game engines and most apps expect from an .ogg file.'],
      ['Will the OGG be smaller than the MP3?', 'At a similar quality setting it is about the same size, often a little smaller.'],
      ['Does MP3 to OGG lose quality?', 'Slightly, because both formats are compressed. At 192 kbps or higher it is very hard to hear.'],
    ],
  },
  {
    path: 'wav-to-flac', tool: 'converter', format: 'flac', crumb: 'Converters',
    title: `WAV to FLAC Converter: Lossless, Free Online | ${NAME}`,
    description: 'Convert WAV to FLAC online and make files about half the size with no loss in quality. Free, private and quick. Your audio is never uploaded.',
    h1: '<em>WAV to FLAC</em> converter',
    lead: 'Shrink big WAV files to lossless FLAC. Same sound, roughly half the space.',
    badges: ['Lossless', 'About half the size', 'No upload'],
    steps: [
      ['Open the WAV', 'Choose a WAV file, or drop several at once.'],
      ['FLAC is already selected', 'Leave the effects off for an exact copy.'],
      ['Download the FLAC', 'Press Convert, then Download.'],
    ],
    content: `
    <h2>Lossless, but smaller</h2>
    <p>WAV stores every sample uncompressed, about 10 MB per minute for CD-quality stereo. FLAC packs exactly the same audio more tightly, a bit like a ZIP file for sound. Most music ends up around half the size, sometimes smaller for quiet recordings or speech. When you play the FLAC, the sound is identical to the WAV.</p>
    <p>There's no quality setting for FLAC because nothing is thrown away. The quality menu only matters for MP3, M4A and OGG.</p>
    <h3>When FLAC makes sense</h3>
    <ul>
      <li><strong>Archiving</strong> recordings, CD rips or your own songs without losing anything.</li>
      <li><strong>Saving space</strong> on a drive full of WAV files from a recorder or music software.</li>
      <li><strong>Hi-fi players</strong> and music servers that read FLAC and its tags.</li>
    </ul>
    <h3>When to pick something else</h3>
    <p>iPhones don't play FLAC in the Music app, and many car stereos skip it. For everyday listening on a phone, <a href="/wav-to-mp3/">WAV to MP3</a> at 320 kbps is much smaller and sounds very close. Need a WAV back later? The <a href="/flac-to-wav/">FLAC to WAV</a> converter gives you an exact 16-bit copy.</p>
    <h3>Converting a whole folder</h3>
    <p>Choose several WAV files together, press <strong>Convert all</strong>, and download the FLAC files one by one or as one ZIP. Check a couple of the new files play correctly before you delete any originals.</p>
    <h3>Effects change the audio</h3>
    <p>For a true lossless copy, leave <strong>Effects</strong> off and keep the whole file selected. If you do trim the file, add a fade or turn on Auto loudness, the FLAC will hold the changed version, still without any compression loss on top.</p>`,
    faq: [
      ['Does WAV to FLAC lose quality?', 'No. FLAC is lossless: decode it and you get back exactly the same audio as the WAV.'],
      ['How much smaller is FLAC than WAV?', 'Usually around half the size. Quiet or simple recordings shrink more, dense loud music a little less.'],
      ['Can I convert FLAC back to WAV?', 'Yes, with the FLAC to WAV converter, without any loss.'],
    ],
  },
];

// One troubleshooting question per page, appended to the FAQ.
export const extraFaq = {
  'wma-to-mp3': [['The converted MP3s have no song names. Why?', 'Tags and album art are removed from the output for privacy. Add the names in your music app, or rename the files before converting.']],
  'aiff-to-mp3': [['My AIFF file will not open. What can I do?', 'Some rare AIFF-C variants can fail. Export the file again from GarageBand, Logic or Music as standard AIFF or WAV, then try again.']],
  'mkv-to-mp3': [['The MP3 is silent or in the wrong language. Why?', 'MeloCut uses the main audio track, usually the first one. Remove the other tracks with a tool like MKVToolNix, or check the video has sound when you play it.']],
  'avi-to-mp3': [['The AVI plays but the MP3 is silent. Why?', 'Some cameras saved video without sound, or the audio track is damaged. If VLC also plays it silently, there is nothing to extract.']],
  '3gp-to-mp3': [['My 3GP is a voice recording, not a video. Does that work?', 'Yes. Audio-only 3GP files convert the same way, and so do .amr voice recordings.']],
  'mp3-to-ogg': [['Can I make a seamless music loop?', 'Drag the handles on the waveform to cut silence from the start and end before converting. Exact loop points are best set in your game engine.']],
  'wav-to-flac': [['Will my FLAC have tags and album art?', 'No. Metadata is removed from the output for privacy, so add song names and artwork in your music app afterwards.']],
};
