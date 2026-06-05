import 'package:flutter/material.dart';
import 'package:web/web.dart' as web;

class ThemeService extends ChangeNotifier {
  ThemeMode _themeMode = ThemeMode.light;

  ThemeService() {
    try {
      final savedTheme = web.window.localStorage.getItem('ni_studio_theme');
      if (savedTheme == 'dark') {
        _themeMode = ThemeMode.dark;
      } else {
        _themeMode = ThemeMode.light;
      }
    } catch (e) {
      // Fallback if not running on web
      _themeMode = ThemeMode.light;
    }
  }

  ThemeMode get themeMode => _themeMode;

  bool get isDarkMode {
    if (_themeMode == ThemeMode.system) {
      // access via WidgetsBinding
      // For simplicity in service, we might rely on UI to check.
      // But we can check platform dispatcher.
      return WidgetsBinding.instance.platformDispatcher.platformBrightness ==
          Brightness.dark;
    }
    return _themeMode == ThemeMode.dark;
  }

  void toggleTheme() {
    if (_themeMode == ThemeMode.light) {
      _themeMode = ThemeMode.dark;
      try {
        web.window.localStorage.setItem('ni_studio_theme', 'dark');
      } catch (_) {}
    } else {
      _themeMode = ThemeMode.light;
      try {
        web.window.localStorage.setItem('ni_studio_theme', 'light');
      } catch (_) {}
    }
    notifyListeners();
  }

  void setTheme(ThemeMode mode) {
    _themeMode = mode;
    notifyListeners();
  }
}
