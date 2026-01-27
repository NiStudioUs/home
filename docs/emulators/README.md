# Emulators (Android + Flutter)

This guide focuses on Android emulators on Linux (works similarly on macOS/Windows, but paths differ).

## Prereqs

- Android SDK installed (Android Studio or command-line tools)
- Environment variables (adjust paths):

```bash
export ANDROID_SDK_ROOT="$HOME/Android/Sdk"
export PATH="$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools:$ANDROID_SDK_ROOT/emulator:$PATH"
```

Quick sanity checks:

```bash
sdkmanager --version
adb version
emulator -version
avdmanager list avd
```

---

## “Tabs”

- [Android: System Images](#android-system-images-remote)
- [Android: AVDs (Emulators)](#android-avds-emulators-on-your-machine)
- [Run / Boot / Troubleshoot](#run--boot--troubleshoot)
- [Delete (AVDs + Images)](#delete-avds--images)
- [Flutter Integration](#flutter-integration)

---

## Android: System Images (remote)

These are the downloadable emulator OS images ("remote images") you can install via `sdkmanager`.

### List available remote system images

```bash
sdkmanager --list | sed -n '/Available Packages:/,/Available Updates:/p' | grep -E 'system-images;android-' | head
```

Tip: list only Android 34 images:

```bash
sdkmanager --list | grep -E '^\s*system-images;android-34;'
```

### Install a system image (example)

Pick one line from `sdkmanager --list`, then install it:

```bash
sdkmanager "system-images;android-34;google_apis;x86_64"
```

Also ensure platform + tools exist (recommended):

```bash
sdkmanager "platform-tools" "emulator" "platforms;android-34"
```

### List installed system images

```bash
sdkmanager --list_installed | grep -E '^system-images;'
```

---

## Android: AVDs (Emulators) on your machine

An AVD is a local emulator configuration (device + system image).

### List available device profiles

```bash
avdmanager list device
```

To confirm the Pixel Tablet profile exists:

```bash
avdmanager list device | grep -i "pixel.*tablet" -n
```

### Create an AVD

Example: Pixel 7, Android 34, Google APIs x86_64:

```bash
avdmanager create avd \
  --name "pixel7_api34" \
  --package "system-images;android-34;google_apis;x86_64" \
  --device "pixel_7" \
  --tag "google_apis" \
  --abi "x86_64"
```

Example: Pixel Tablet, Android 36, Google Play image (recommended for Play-related testing):

1) Confirm the system image exists remotely:

```bash
sdkmanager --list | grep -E "^\s*system-images;android-36;google_apis_playstore;x86_64"
```

2) Install it (if not already installed):

```bash
sdkmanager "system-images;android-36;google_apis_playstore;x86_64"
```

3) Create the AVD:

```bash
avdmanager create avd \
  --name "pixel_tablet" \
  --package "system-images;android-36;google_apis_playstore;x86_64" \
  --device "pixel_tablet" \
  --tag "google_apis_playstore" \
  --abi "x86_64"
```

If prompted about a custom hardware profile, answering `no` is usually fine.

### List AVDs

```bash
avdmanager list avd
```

Or just list names:

```bash
emulator -list-avds
```

---

## Run / Boot / Troubleshoot

### Start an emulator

```bash
emulator -avd pixel7_api34
```

### Cold boot / wipe data

```bash
emulator -avd pixel7_api34 -no-snapshot-load
emulator -avd pixel7_api34 -wipe-data
```

### Common performance flags

```bash
emulator -avd pixel7_api34 -gpu host
```

### Confirm device is connected

```bash
adb devices
adb shell getprop ro.build.version.release
```

---

## Delete (AVDs + Images)

### Delete an AVD (emulator config)

```bash
avdmanager delete avd --name "pixel7_api34"
```

Also optional cleanup (AVD files), if anything remains:

```bash
rm -rf "$HOME/.android/avd/pixel7_api34.avd" "$HOME/.android/avd/pixel7_api34.ini"
```

### Uninstall a system image (delete downloaded image)

First list installed images:

```bash
sdkmanager --list_installed | grep -E '^system-images;'
```

Then uninstall the one you no longer want:

```bash
sdkmanager --uninstall "system-images;android-34;google_apis;x86_64"
```

Notes:
- Uninstalling a system image used by an AVD will break that AVD. Delete the AVD first.

---

## Flutter Integration

Flutter can list and launch emulators it detects.

### List emulators Flutter can see

```bash
flutter emulators
```

### Launch an emulator from Flutter

```bash
flutter emulators --launch pixel7_api34
```

### Run your app on the emulator

```bash
flutter devices
flutter run -d emulator-5554
```

Tip: if multiple emulators/devices are attached, use `flutter devices` to pick the correct id.


# Screenshots

Screenshot

```bash
adb exec-out screencap -p > screenshot.png
```

Screenshot with timestamp
```bash
adb exec-out screencap -p > "screenshot_$(date +%Y%m%d_%H%M%S).png"
```