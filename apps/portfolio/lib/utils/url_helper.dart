import 'package:web/web.dart' as web;

class UrlHelper {
  static const _useDevPorts = bool.fromEnvironment('USE_DEV_PORTS', defaultValue: false);
  static const _profilePort = String.fromEnvironment('PROFILE_PORT', defaultValue: '5174');
  static const _learningPort = String.fromEnvironment('LEARNING_PORT', defaultValue: '5175');

  static String _getThemeQuery() {
    try {
      final theme = web.window.localStorage.getItem('ni_studio_theme');
      if (theme != null) {
        return '?theme=$theme';
      }
    } catch (_) {}
    return '';
  }

  /// Resolves a relative path to a local Vite dev server URL if Hot Reload Mode is active.
  /// Otherwise, returns the original relative path for production or dev:all.
  static String resolve(String path) {
    if (!_useDevPorts) return path;

    if (path.contains('profile/')) {
      final themeQuery = _getThemeQuery();
      final hashIndex = path.indexOf('#');
      final hashPath = hashIndex != -1 ? path.substring(hashIndex) : '#/';
      return 'http://localhost:$_profilePort/$themeQuery$hashPath';
    }
    
    if (path.contains('learning/')) {
      // If it's a specific chapter (not served by Vite dynamically), fallback or try to route.
      // Usually, the Vite dev server for learning hub runs on the root.
      // If they are just going to the learning index:
      if (path == 'learning/' || path == 'learning/index.html' || path == './learning/index.html') {
        return 'http://localhost:$_learningPort/';
      }
      
      // If it's a nested static app like chapter-1, Vite dev server might not serve it directly
      // unless it's in public/. We will still point to the dev server in case it is configured.
      return 'http://localhost:$_learningPort/${path.replaceFirst(RegExp(r'.*?learning/'), '')}';
    }

    return path;
  }
}
