import 'package:flutter/foundation.dart';

class EasterEgg {
  static int _nameClicks = 0;
  static int _themeClicks = 0;
  static int _bannerClicks = 0;
  static DateTime? _lastClickTime;

  static bool handle(String type) {
    final now = DateTime.now();
    
    // Reset if more than 10 seconds pass between any click in the sequence
    if (_lastClickTime == null || now.difference(_lastClickTime!) > const Duration(seconds: 10)) {
      _nameClicks = 0;
      _themeClicks = 0;
      _bannerClicks = 0;
    }
    _lastClickTime = now;

    if (type == 'name') {
      if (_nameClicks < 5) {
        _nameClicks++;
      } else if (_nameClicks >= 5 && _themeClicks == 0) {
        // Allow extra taps on name to be forgiving
        _nameClicks = 5;
      } else if (_nameClicks >= 5 && _themeClicks >= 4) {
        // If they did Name(>=5) -> Theme(>=4) -> Name(3) as the last step
        _bannerClicks++; 
        if (_bannerClicks >= 3) {
          _reset();
          return true;
        }
      } else {
        // Reset if they click name when they shouldn't (e.g. while in the middle of theme taps)
        _reset();
        _nameClicks = 1;
      }
    } else if (type == 'theme') {
      if (_nameClicks >= 5) {
        if (_themeClicks < 4) {
          _themeClicks++;
        }
        // If >= 4, we just let them keep tapping theme, it won't reset.
      } else {
        _reset();
      }
    } else if (type == 'banner') {
      if (_nameClicks >= 5 && _themeClicks >= 4) {
        _bannerClicks++;
        if (_bannerClicks >= 3) {
          _reset();
          return true;
        }
      } else {
        _reset();
      }
    }

    return false;
  }

  static void _reset() {
    _nameClicks = 0;
    _themeClicks = 0;
    _bannerClicks = 0;
  }
}
