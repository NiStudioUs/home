import 'dart:async';
import 'package:flutter/material.dart';
import '../../models/data_model.dart';
import '../design_tokens.dart';

/// Renders an app icon that automatically cycles through variant launcher icons
/// (such as the 6 Edgewise themed 3D icons: emerald, botanical, sage, lavender, ocean, ochre)
/// on both the homepage and app details / how-to pages.
class CyclingAppIcon extends StatefulWidget {
  final AppModel app;
  final double size;
  final BorderRadius? borderRadius;
  final Duration interval;
  final Duration transitionDuration;

  const CyclingAppIcon({
    super.key,
    required this.app,
    required this.size,
    this.borderRadius,
    this.interval = const Duration(milliseconds: 2800),
    this.transitionDuration = const Duration(milliseconds: 650),
  });

  static const List<String> edgewiseIcons = [
    'assets/images/edgewise/icon_theme_emerald.png',
    'assets/images/edgewise/icon_theme_botanical.png',
    'assets/images/edgewise/icon_theme_sage.png',
    'assets/images/edgewise/icon_theme_lavender.png',
    'assets/images/edgewise/icon_theme_ocean.png',
    'assets/images/edgewise/icon_theme_ochre.png',
  ];

  @override
  State<CyclingAppIcon> createState() => _CyclingAppIconState();
}

class _CyclingAppIconState extends State<CyclingAppIcon> {
  int _currentIndex = 0;
  Timer? _cycleTimer;
  bool _precached = false;

  bool get _hasVariants => widget.app.id == 'edgewise';

  List<String> get _icons => _hasVariants ? CyclingAppIcon.edgewiseIcons : [widget.app.iconUrl];

  @override
  void initState() {
    super.initState();
    if (_hasVariants) {
      _startCycling();
    }
  }

  @override
  void didUpdateWidget(covariant CyclingAppIcon oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.app.id != widget.app.id) {
      _cycleTimer?.cancel();
      _currentIndex = 0;
      if (_hasVariants) {
        _startCycling();
      }
    }
  }

  void _startCycling() {
    _cycleTimer?.cancel();
    _cycleTimer = Timer.periodic(widget.interval, (_) {
      if (!mounted) return;
      setState(() {
        _currentIndex = (_currentIndex + 1) % _icons.length;
      });
    });
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (!_precached && _hasVariants) {
      _precached = true;
      for (final iconPath in CyclingAppIcon.edgewiseIcons) {
        precacheImage(AssetImage(iconPath), context);
      }
    }
  }

  @override
  void dispose() {
    _cycleTimer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final effectiveRadius = widget.borderRadius ??
        BorderRadius.circular(
          NiTokens.iconRadius(widget.size, small: widget.size < 60),
        );

    final currentIconPath = _icons[_currentIndex % _icons.length];

    Widget content;
    if (_hasVariants) {
      content = AnimatedSwitcher(
        duration: widget.transitionDuration,
        switchInCurve: Curves.easeInOut,
        switchOutCurve: Curves.easeInOut,
        layoutBuilder: (currentChild, previousChildren) {
          return Stack(
            fit: StackFit.passthrough,
            alignment: Alignment.center,
            children: <Widget>[
              ...previousChildren,
              ?currentChild,
            ],
          );
        },
        transitionBuilder: (child, animation) {
          return FadeTransition(opacity: animation, child: child);
        },
        child: Image.asset(
          currentIconPath,
          key: ValueKey<String>(currentIconPath),
          width: widget.size,
          height: widget.size,
          fit: BoxFit.cover,
          filterQuality: FilterQuality.medium,
        ),
      );
    } else {
      content = Image.asset(
        currentIconPath,
        width: widget.size,
        height: widget.size,
        fit: BoxFit.cover,
        errorBuilder: (context, error, stackTrace) => SizedBox(
          width: widget.size,
          height: widget.size,
          child: const Icon(Icons.apps, color: Colors.grey),
        ),
      );
    }

    return ClipRRect(
      borderRadius: effectiveRadius,
      child: SizedBox(
        width: widget.size,
        height: widget.size,
        child: content,
      ),
    );
  }
}
