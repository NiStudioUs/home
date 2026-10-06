import 'package:flutter/material.dart';
import 'package:ni_design_system/ni_design_system.dart';
export 'package:ni_design_system/ni_design_system.dart';

/// Wrap an app's subtree (its pages, home card, feature row, spotlight) to switch to that app's accent.
class NiApp extends StatelessWidget {
  const NiApp({super.key, required this.appId, required this.child});
  final String? appId;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Theme(data: theme.copyWith(extensions: [NiTokens.of(context).withApp(appId)]), child: child);
  }
}

/// ThemeData for both modes, carrying NiTokens.
class NiTheme {
  static ThemeData dark() => _build(NiTokens.dark, Brightness.dark);
  static ThemeData light() => _build(NiTokens.light, Brightness.light);

  static ThemeData _build(NiTokens t, Brightness b) => ThemeData(
        brightness: b,
        useMaterial3: true,
        scaffoldBackgroundColor: t.bg,
        colorScheme: ColorScheme.fromSeed(seedColor: t.accent2, brightness: b).copyWith(
          primary: t.accent, secondary: t.accent2, surface: t.surface, onPrimary: t.accentInk, onSurface: t.text, outline: t.border),
        textTheme: ThemeData(brightness: b).textTheme.apply(fontFamily: 'Inter', bodyColor: t.text, displayColor: t.text),
        dividerColor: t.border,
        focusColor: t.accent,
        extensions: [t],
      );
}
