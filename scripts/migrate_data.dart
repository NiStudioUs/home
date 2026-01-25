// ignore_for_file: avoid_print

import 'dart:convert';
import 'dart:io';

void main() async {
  print('Starting Migration...');

  // 1. Setup Directories
  final app2ExtDir = Directory('assets-ext/app2');
  // Check for docs-assets/all or images/
  final app2DocsDir = Directory('assets-ext/app2/docs-assets/all');
  final app2ImagesDir = Directory('assets-ext/app2/images');
  final destinationImagesDir = Directory('assets/images/app2');

  if (!app2ExtDir.existsSync()) {
    print('Error: assets-ext/app2 does not exist.');
    return;
  }

  // Create destination directory
  if (!destinationImagesDir.existsSync()) {
    destinationImagesDir.createSync(recursive: true);
  }

  // 2. Read and Parse JSON
  final jsonFile = File('${app2ExtDir.path}/data.json');
  if (!jsonFile.existsSync()) {
    print('Error: data.json not found in ${app2ExtDir.path}');
    return;
  }

  final content = jsonFile.readAsStringSync();
  final sourceData = jsonDecode(content);

  // 3. Transform Data
  final app = _transformPreFormattedApp(sourceData);

  // 4. Copy Images and Update Paths
  if (app2DocsDir.existsSync()) {
    print('Found docs-assets directory, copying from there...');
    _processImages(app2DocsDir, destinationImagesDir, app);
  }
  if (app2ImagesDir.existsSync()) {
    print('Found images directory, copying from there...');
    _processImages(app2ImagesDir, destinationImagesDir, app);
  } else if (!app2DocsDir.existsSync()) {
    print(
      'Warning: No source image directory found (checked images/ and docs-assets/all/)',
    );
  }

  // 5. Create Final JSON
  final finalData = {
    "developer": {
      "name": "Karthik Subramanian",
      "bio":
          "Mobile App Developer specialized in Flutter. Privacy-focused solutions.",
      "role": "Flutter Developer",
      "avatarUrl": "",
      "email": "karthik@example.com",
      "socialLinks": [
        {
          "platform": "GitHub",
          "url": "https://github.com/karthiksubramanian",
          "icon": "github",
        },
        {
          "platform": "LinkedIn",
          "url": "https://linkedin.com",
          "icon": "linkedin",
        },
      ],
    },
    "apps": [app],
  };

  final targetFile = File('assets/data.json');
  targetFile.writeAsStringSync(
    const JsonEncoder.withIndent('  ').convert(finalData),
  );

  print('Migration Complete! Data written to assets/data.json');
}

Map<String, dynamic> _transformPreFormattedApp(Map<String, dynamic> source) {
  // Deep clone to avoid mutating original referencing if needed
  final app = Map<String, dynamic>.from(source);

  // Recursively fix image paths in the map
  _fixImagePathsInMap(app);

  return app;
}

void _fixImagePathsInMap(Map<String, dynamic> map) {
  for (var key in map.keys) {
    var value = map[key];
    if (value is String) {
      map[key] = _fixPath(value);
    } else if (value is List) {
      _fixImagePathsInList(value);
    } else if (value is Map<String, dynamic>) {
      _fixImagePathsInMap(value);
    }
  }
}

void _fixImagePathsInList(List list) {
  for (var i = 0; i < list.length; i++) {
    var value = list[i];
    if (value is String) {
      list[i] = _fixPath(value);
    } else if (value is Map<String, dynamic>) {
      _fixImagePathsInMap(value);
    } else if (value is List) {
      _fixImagePathsInList(value);
    }
  }
}

String _fixPath(String path) {
  // User provided paths like "../images/filename.png" or "../docs-assets/all/filename.png"
  // We want to normalize them to "assets/images/app2/filename.png"
  if ((path.contains('images/') ||
          path.contains('docs-assets/') ||
          path.contains(r'..')) &&
      (path.endsWith('.png') ||
          path.endsWith('.jpg') ||
          path.endsWith('.jpeg'))) {
    final fileName = path.split('/').last;
    return 'assets/images/app2/$fileName';
  }
  return path;
}

void _processImages(
  Directory sourceDir,
  Directory targetDir,
  Map<String, dynamic> appData,
) {
  if (!sourceDir.existsSync()) return;

  final files = sourceDir.listSync();
  for (var file in files) {
    if (file is File) {
      final fileName = file.uri.pathSegments.last;
      file.copySync('${targetDir.path}/$fileName');
      print('Copied $fileName');
    }
  }
}
