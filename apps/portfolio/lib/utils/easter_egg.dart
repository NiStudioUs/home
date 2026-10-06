class EasterEgg {
  static int _homeClicks = 0;
  static int _themeClicks = 0;
  static DateTime? _lastClickTime;

  static bool handle(String type) {
    final now = DateTime.now();
    
    // Reset if more than 10 seconds pass between any click in the sequence
    if (_lastClickTime == null || now.difference(_lastClickTime!) > const Duration(seconds: 10)) {
      _homeClicks = 0;
      _themeClicks = 0;
    }
    _lastClickTime = now;

    if (type == 'home') {
      if (_homeClicks < 3 && _themeClicks == 0) {
        _homeClicks++;
      } else if (_homeClicks >= 3 && _themeClicks >= 4) {
        // Final click!
        _reset();
        return true;
      } else {
        // Reset if they click home at the wrong time
        _reset();
        _homeClicks = 1;
      }
    } else if (type == 'theme') {
      if (_homeClicks >= 3) {
        if (_themeClicks < 4) {
          _themeClicks++;
        }
      } else {
        _reset();
      }
    }

    return false;
  }

  static void _reset() {
    _homeClicks = 0;
    _themeClicks = 0;
  }
}
