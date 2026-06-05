import 'dart:async';
import 'package:flutter/material.dart';
import '../models/data_model.dart';

enum PageType { app, privacy, terms }

class CurrentAppService extends ChangeNotifier {
  AppModel? _currentApp;
  PageType _pageType = PageType.app;
  final _navigationController = StreamController<String>.broadcast();

  AppModel? get currentApp => _currentApp;
  PageType get pageType => _pageType;
  Stream<String> get navigationEvents => _navigationController.stream;

  void setApp(AppModel? app, {PageType type = PageType.app}) {
    // Always notify if type changes, even if app is same
    if (_currentApp?.id != app?.id || _pageType != type) {
      _currentApp = app;
      _pageType = type;
      notifyListeners();
    }
  }

  void clearApp() {
    if (_currentApp != null) {
      _currentApp = null;
      _pageType = PageType.app;
      notifyListeners();
    }
  }

  void navigateToFeature(String featureTitle) {
    _navigationController.add(featureTitle);
  }

  void scrollToTop() {
    _navigationController.add('TOP');
  }

  @override
  void dispose() {
    _navigationController.close();
    super.dispose();
  }
}
