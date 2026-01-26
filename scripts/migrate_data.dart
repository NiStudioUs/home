// ignore_for_file: avoid_print

import 'dart:convert';
import 'dart:io';

void main() async {
  print('Starting Migration...');

  final appIds = ['app1', 'app2'];
  final List<Map<String, dynamic>> processedApps = [];

  for (final appId in appIds) {
    print('\nProcessing $appId...');

    // 1. Setup Directories
    final appExtDir = Directory('assets-ext/$appId');
    // Check for docs-assets/all or images/
    final appDocsDir = Directory('assets-ext/$appId/docs-assets/all');
    final appImagesDir = Directory('assets-ext/$appId/images');
    final destinationImagesDir = Directory('assets/images/$appId');

    if (!appExtDir.existsSync()) {
      print('Warning: assets-ext/$appId does not exist. Skipping.');
      continue;
    }

    // Create destination directory
    if (!destinationImagesDir.existsSync()) {
      destinationImagesDir.createSync(recursive: true);
    }

    // 2. Read and Parse JSON
    final jsonFile = File('${appExtDir.path}/data.json');
    if (!jsonFile.existsSync()) {
      print('Error: data.json not found in ${appExtDir.path}. Skipping.');
      continue;
    }

    final content = jsonFile.readAsStringSync();
    final sourceData = jsonDecode(content);

    // 3. Transform Data
    final app = _transformPreFormattedApp(sourceData, appId);
    processedApps.add(app);

    // 4. Copy Images and Update Paths
    bool imagesFound = false;
    if (appDocsDir.existsSync()) {
      print('Found docs-assets directory, copying from there...');
      _processImages(appDocsDir, destinationImagesDir);
      imagesFound = true;
    }
    if (appImagesDir.existsSync()) {
      print('Found images directory, copying from there...');
      _processImages(appImagesDir, destinationImagesDir);
      imagesFound = true;
    }

    if (!imagesFound) {
      print(
        'Warning: No source image directory found for $appId (checked images/ and docs-assets/all/)',
      );
    }
  }

  // 5. Create Final JSON
  final finalData = {
    "socialLinks": [
      // {
      //   "platform": "GitHub",
      //   "url": "https://github.com/",
      //   "icon": "github",
      // },
    ],
    "developer": {
      "name": "Ni Studio Us",
      "shortName": "Karthik",
      "bio":
          "Mobile App Developer specialized in Flutter. Privacy-focused solutions.",
      "role": "Flutter Developer",
      "avatarUrl": "",
      "email": "karthik@example.com",
      "badge": {
        "url": "assets/developers/karthik.png",
        "caption": "Lead Developer",
      },
    },
    "apps": processedApps,
  };

  final targetFile = File('assets/data.json');
  targetFile.writeAsStringSync(
    const JsonEncoder.withIndent('  ').convert(finalData),
  );

  print('\nMigration Complete! Data written to assets/data.json');
}

Map<String, dynamic> _transformPreFormattedApp(
  Map<String, dynamic> source,
  String appId,
) {
  // Deep clone to avoid mutating original referencing if needed
  final app = Map<String, dynamic>.from(source);

  // Recursively fix image paths in the map
  _fixImagePathsInMap(app, appId);

  return app;
}

void _fixImagePathsInMap(Map<String, dynamic> map, String appId) {
  for (var key in map.keys) {
    var value = map[key];
    if (value is String) {
      map[key] = _fixPath(value, appId);
    } else if (value is List) {
      _fixImagePathsInList(value, appId);
    } else if (value is Map<String, dynamic>) {
      _fixImagePathsInMap(value, appId);
    }
  }
}

void _fixImagePathsInList(List list, String appId) {
  for (var i = 0; i < list.length; i++) {
    var value = list[i];
    if (value is String) {
      list[i] = _fixPath(value, appId);
    } else if (value is Map<String, dynamic>) {
      _fixImagePathsInMap(value, appId);
    } else if (value is List) {
      _fixImagePathsInList(value, appId);
    }
  }
}

String _fixPath(String path, String appId) {
  // User provided paths like "../images/filename.png" or "../docs-assets/all/filename.png"
  // OR "tool-generated/filename.png"
  // We want to normalize them to "assets/images/$appId/filename.png"
  if ((path.contains('images/') ||
          path.contains('docs-assets/') ||
          path.contains('tool-generated/') ||
          path.contains(r'..')) &&
      (path.endsWith('.png') ||
          path.endsWith('.jpg') ||
          path.endsWith('.jpeg'))) {
    final fileName = path.split('/').last;
    return 'assets/images/$appId/$fileName';
  }
  return path;
}

void _processImages(Directory sourceDir, Directory targetDir) {
  if (!sourceDir.existsSync()) return;

  final files = sourceDir.listSync();
  for (var file in files) {
    if (file is File) {
      final fileName = file.uri.pathSegments.last;
      file.copySync('${targetDir.path}/$fileName');
      // print('Copied $fileName'); // Optional: comment out to reduce noise
    }
  }
}
