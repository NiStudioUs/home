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
      } else if (_nameClicks >= 5 && _themeClicks >= 4) {
        // If they did Name(5) -> Theme(3) -> Name(3) as the last step
        _bannerClicks++; // Reusing bannerClicks variable for the 3rd step if it's Name again
        if (_bannerClicks >= 3) {
          _reset();
          return true;
        }
      } else {
        // Reset if they click name when they shouldn't
        _reset();
        _nameClicks = 1;
      }
    } else if (type == 'theme') {
      if (_nameClicks >= 5 && _themeClicks < 4) {
        _themeClicks++;
      } else {
        _reset();
      }
    } else if (type == 'banner') {
      if (_nameClicks >= 5 && _themeClicks >= 4 && _bannerClicks < 3) {
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
