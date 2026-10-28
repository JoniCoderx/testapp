# MeloCut Android app

A Trusted Web Activity (made with Bubblewrap) that opens https://melocut.com full screen.
Package: `com.melocut.app`.

## Build

Needs JDK 17+ and the Android SDK (platform 36, build-tools 35).

```sh
echo "sdk.dir=/path/to/android/sdk" > local.properties
./gradlew bundleRelease          # app/build/outputs/bundle/release/app-release.aab
jarsigner -keystore melocut-upload.keystore -sigalg SHA256withRSA -digestalg SHA-256 \
  app/build/outputs/bundle/release/app-release.aab upload
```

For each update, raise `versionCode` and `versionName` in `app/build.gradle` and `twa-manifest.json`.

## Signing key

`melocut-upload.keystore` (alias `upload`) is the upload key. It is **not** in git; the owner keeps it.
If it is lost, request an upload key reset in Play Console (Play App Signing).

The site proves ownership with `site/.well-known/assetlinks.json`. After the first upload to Play
Console, add the **App signing key** SHA-256 from Play Console → Test and release → App integrity
to that file, next to the upload key fingerprint.
