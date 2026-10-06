// NiStudioUs design tokens for Flutter: a 1:1 copy of src/style.css + src/accents.json (see ../tokens.json).
// Not compiled here (no Flutter SDK on the machine that wrote it); it uses only stable Flutter APIs.
// Needs Flutter 3.27+ (Color.withValues). On older Flutter, replace `.withValues(alpha: x)` with `.withOpacity(x)`.
//
// Usage:
//   MaterialApp(theme: NiTheme.light(), darkTheme: NiTheme.dark(), themeMode: mode, ...)
//   final t = NiTokens.of(context);            // colours, radii, spacing
//   Text('Nobody else.', style: NiType.heroH1(context))
//   NiApp(appId: 'sms-stack', child: ...)      // per-app accent for everything inside
//
// pubspec: google_fonts (or bundle assets/fonts/inter-400.woff2 + space-grotesk-500.woff2 as variable TTF/WOFF2).
import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

@immutable
class NiTokens extends ThemeExtension<NiTokens> {
  const NiTokens({
    required this.bg,
    required this.bgAlt,
    required this.surface,
    required this.surface2,
    required this.border,
    required this.text,
    required this.muted,
    required this.accent,
    required this.accent2,
    required this.accentInk,
    required this.glow,
    required this.shadow,
    required this.badgeBg,
    required this.badgeFg,
    required this.meshOpacity,
    required this.isDark,
  });

  final Color bg, bgAlt, surface, surface2, border, text, muted, accent, accent2, accentInk, glow, badgeBg, badgeFg;
  final List<BoxShadow> shadow;
  final List<double> meshOpacity; // blob 1, 2, 3
  final bool isDark;

  // ---- fixed colours ----
  static const gradTextEnd = Color(0xFFE6A8FF);
  static const meshPink = Color(0xFFE46BFF);
  static const meshBlue = Color(0xFF3EA8FF);
  static const liveDot = Color(0xFF4ADE80);
  static const lightboxScrim = Color(0xE005050A); // rgba(5,5,10,.88)

  // ---- radii ----
  static const r = 18.0, rCard = 28.0, rMenu = 14.0, rPhone = 28.0, rPhoneScreen = 22.0, rShot = 22.0,
      rGallery = 18.0, rInlineImg = 16.0, rStage = 24.0, rStageIcon = 28.0, rSpot = 20.0, rTlSteps = 14.0, rBrandImg = 9.0;
  static BorderRadius pill = BorderRadius.circular(999);
  static double iconRadius(double size, {bool small = false}) => size * (small ? .22 : .20);

  // ---- layout ----
  static const maxWidth = 1160.0, gutter = 16.0, topbarHeight = 64.0, scrollPaddingTop = 84.0, breakpoint = 900.0;
  static bool isMobile(BuildContext c) => MediaQuery.sizeOf(c).width <= breakpoint;

  /// CSS clamp(minPx, vw%, maxPx) against the current viewport width.
  static double clampW(BuildContext c, double minPx, double vwPercent, double maxPx) =>
      (MediaQuery.sizeOf(c).width * vwPercent / 100).clamp(minPx, maxPx).toDouble();

  // ---- motion (tokens.json → motion) ----
  static const reveal = Duration(milliseconds: 700), revealOffset = 22.0, revealVisibleFraction = .08;
  static const floatPeriod = Duration(seconds: 7), floatAmplitude = 12.0;
  static const driftPeriod = Duration(seconds: 14), marqueePeriod = Duration(seconds: 60), pingPeriod = Duration(seconds: 2);
  static const themeFade = Duration(milliseconds: 250), hoverFast = Duration(milliseconds: 150), hover = Duration(milliseconds: 200);

  static const dark = NiTokens(
    bg: Color(0xFF0B0B10), bgAlt: Color(0xFF0F0F16), surface: Color(0xFF14141C), surface2: Color(0xFF1B1B26),
    border: Color(0xFF25252F), text: Color(0xFFECECF4), muted: Color(0xFF9B9BB3),
    accent: Color(0xFFB4B0FF), accent2: Color(0xFF7C6CFF), accentInk: Color(0xFF14112E),
    glow: Color(0x387C6CFF), // rgba(124,108,255,.22)
    shadow: [BoxShadow(color: Color(0xB3000000), offset: Offset(0, 20), blurRadius: 50, spreadRadius: -20)],
    badgeBg: Color(0x26FFB020), badgeFg: Color(0xFFF5A623), meshOpacity: [.55, .30, .25], isDark: true,
  );

  static const light = NiTokens(
    bg: Color(0xFFF8F7FC), bgAlt: Color(0xFFF0EEF9), surface: Color(0xFFFFFFFF), surface2: Color(0xFFF3F1FB),
    border: Color(0xFFE3E0F0), text: Color(0xFF17152B), muted: Color(0xFF62607A),
    accent: Color(0xFF5B4BDB), accent2: Color(0xFF7C6CFF), accentInk: Color(0xFFFFFFFF),
    glow: Color(0x245B4BDB), // rgba(91,75,219,.14)
    shadow: [BoxShadow(color: Color(0x593C288C), offset: Offset(0, 20), blurRadius: 40, spreadRadius: -22)],
    badgeBg: Color(0x2EF5A623), badgeFg: Color(0xFF8A5300), meshOpacity: [.25, .25, .25], isDark: false,
  );

  /// Per-app accent (src/accents.json). glow = accent2 at 24 % (dark) / 16 % (light).
  static const _apps = {
    'scribble-notes': {'dark': [0xFF5FD3DC, 0xFF2AA3B5], 'light': [0xFF1B6471, 0xFF2AA3B5]},
    'sms-stack': {'dark': [0xFF7AB8FF, 0xFF3B8CF0], 'light': [0xFF1560BD, 0xFF3B8CF0]},
    'iky': {'dark': [0xFFB9A6FF, 0xFF7A5CF0], 'light': [0xFF4B2FB5, 0xFF7A5CF0]},
  };

  NiTokens withApp(String? appId) {
    final a = _apps[appId]?[isDark ? 'dark' : 'light'];
    if (a == null) return this;
    final a2 = Color(a[1]);
    return copyWith(
      accent: Color(a[0]),
      accent2: a2,
      glow: a2.withValues(alpha: isDark ? .24 : .16),
      accentInk: isDark ? const Color(0xFF0B0B10) : Colors.white,
    );
  }

  /// Body text inside docs: text mixed 82 % with muted.
  Color get docText => Color.lerp(muted, text, .82)!;

  /// Card hover border: accent 55 % mixed with border.
  Color get cardHoverBorder => Color.lerp(border, accent, .55)!;

  /// Callout border: accent 40 % mixed with border.
  Color get calloutBorder => Color.lerp(border, accent, .40)!;

  LinearGradient get gradText => LinearGradient(colors: [accent, accent2, gradTextEnd], stops: const [0, .6, 1],
      transform: const GradientRotation(10 * math.pi / 180)); // CSS 100deg ≈ 10° from horizontal

  LinearGradient get btnPrimary => LinearGradient(colors: [accent, accent2], begin: Alignment.topLeft, end: Alignment.bottomRight);

  List<BoxShadow> get btnPrimaryShadow => [BoxShadow(color: accent2, offset: const Offset(0, 10), blurRadius: 28, spreadRadius: -10)];

  List<BoxShadow> get cardHoverShadow => [BoxShadow(color: accent2, offset: const Offset(0, 30), blurRadius: 70, spreadRadius: -40)];

  BoxDecoration card({double radius = r, Color? color}) => BoxDecoration(
        color: color ?? surface, borderRadius: BorderRadius.circular(radius), border: Border.all(color: border));

  static NiTokens of(BuildContext c) => Theme.of(c).extension<NiTokens>()!;

  @override
  NiTokens copyWith({Color? accent, Color? accent2, Color? glow, Color? accentInk}) => NiTokens(
        bg: bg, bgAlt: bgAlt, surface: surface, surface2: surface2, border: border, text: text, muted: muted,
        accent: accent ?? this.accent, accent2: accent2 ?? this.accent2, accentInk: accentInk ?? this.accentInk,
        glow: glow ?? this.glow, shadow: shadow, badgeBg: badgeBg, badgeFg: badgeFg, meshOpacity: meshOpacity, isDark: isDark,
      );

  @override
  NiTokens lerp(ThemeExtension<NiTokens>? other, double t) {
    if (other is! NiTokens) return this;
    Color l(Color a, Color b) => Color.lerp(a, b, t)!;
    return NiTokens(
      bg: l(bg, other.bg), bgAlt: l(bgAlt, other.bgAlt), surface: l(surface, other.surface), surface2: l(surface2, other.surface2),
      border: l(border, other.border), text: l(text, other.text), muted: l(muted, other.muted), accent: l(accent, other.accent),
      accent2: l(accent2, other.accent2), accentInk: l(accentInk, other.accentInk), glow: l(glow, other.glow),
      shadow: BoxShadow.lerpList(shadow, other.shadow, t)!, badgeBg: l(badgeBg, other.badgeBg), badgeFg: l(badgeFg, other.badgeFg),
      meshOpacity: t < .5 ? meshOpacity : other.meshOpacity, isDark: t < .5 ? isDark : other.isDark,
    );
  }
}

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

/// Type scale (tokens.json → typography.scale). Display = Space Grotesk, body = Inter, base 16 / 1.65.
class NiType {
  static TextStyle _display(BuildContext c, double size, FontWeight w, {double height = 1.12, double ls = -.02, Color? color}) =>
      GoogleFonts.spaceGrotesk(fontSize: size, fontWeight: w, height: height, letterSpacing: ls * size, color: color ?? NiTokens.of(c).text);

  static TextStyle _body(BuildContext c, double size, {FontWeight w = FontWeight.w400, double height = 1.65, Color? color}) =>
      GoogleFonts.inter(fontSize: size, fontWeight: w, height: height, color: color ?? NiTokens.of(c).text);

  static const rem = 16.0;

  static TextStyle heroH1(BuildContext c) =>
      _display(c, NiTokens.clampW(c, 3.2 * rem, 9.2, 8 * rem), FontWeight.w700, height: .95, ls: -.045);
  static TextStyle h1(BuildContext c) => _display(c, NiTokens.clampW(c, 2.4 * rem, 5.4, 4.3 * rem), FontWeight.w700);
  static TextStyle appH1(BuildContext c) => _display(c, NiTokens.clampW(c, 2 * rem, 4, 3.2 * rem), FontWeight.w700);
  static TextStyle legalH1(BuildContext c) => _display(c, NiTokens.clampW(c, 2 * rem, 4, 3 * rem), FontWeight.w700);
  static TextStyle notFoundTitle(BuildContext c) => _display(c, NiTokens.clampW(c, 2.4 * rem, 6, 4 * rem), FontWeight.w700);
  static TextStyle h2(BuildContext c) => _display(c, NiTokens.clampW(c, 1.7 * rem, 3, 2.4 * rem), FontWeight.w600);
  static TextStyle h3(BuildContext c) => _display(c, 1.25 * rem, FontWeight.w600);
  static TextStyle hSm(BuildContext c) => _display(c, 1.3 * rem, FontWeight.w600);
  static TextStyle subH3(BuildContext c) => _display(c, 1.12 * rem, FontWeight.w600);
  static TextStyle timelineH2(BuildContext c) => _display(c, 1.5 * rem, FontWeight.w600);
  static TextStyle statNum(BuildContext c) => _display(c, NiTokens.clampW(c, 2.2 * rem, 4.5, 3.6 * rem), FontWeight.w700, ls: -.03);
  static TextStyle appSub(BuildContext c) => _display(c, 1.12 * rem, FontWeight.w500);
  static TextStyle brand(BuildContext c) => _display(c, 1.02 * rem, FontWeight.w600);
  static TextStyle marquee(BuildContext c) => _display(c, 1.05 * rem, FontWeight.w600, color: NiTokens.of(c).muted);
  static TextStyle eyebrow(BuildContext c) =>
      _display(c, .74 * rem, FontWeight.w600, height: 1, ls: .14, color: NiTokens.of(c).accent); // render text.toUpperCase()
  static TextStyle badge(BuildContext c, Color color) => _display(c, .7 * rem, FontWeight.w600, ls: .1, color: color);
  static TextStyle tocLabel(BuildContext c) => _display(c, .72 * rem, FontWeight.w600, ls: .12, color: NiTokens.of(c).muted);
  static TextStyle footerHead(BuildContext c) => _display(c, .86 * rem, FontWeight.w600);

  static TextStyle body(BuildContext c) => _body(c, rem);
  static TextStyle doc(BuildContext c) => _body(c, rem, color: NiTokens.of(c).docText);
  static TextStyle lead(BuildContext c) => _body(c, NiTokens.clampW(c, 1.05 * rem, 1.6, 1.22 * rem), color: NiTokens.of(c).muted);
  static TextStyle heroLead(BuildContext c) => _body(c, NiTokens.clampW(c, 1.1 * rem, 1.7, 1.35 * rem), color: NiTokens.of(c).muted);
  static TextStyle muted(BuildContext c, [double size = rem]) => _body(c, size, color: NiTokens.of(c).muted);
  static TextStyle nav(BuildContext c) => _body(c, .94 * rem, color: NiTokens.of(c).muted);
  static TextStyle button(BuildContext c, {bool large = false}) => _body(c, (large ? 1.02 : .95) * rem, w: FontWeight.w600, height: 1.2);
  static TextStyle tag(BuildContext c) => _body(c, .78 * rem, color: NiTokens.of(c).muted, height: 1.4);
  static TextStyle chip(BuildContext c) => _body(c, .88 * rem, height: 1.4);
  static TextStyle crumbs(BuildContext c) => _body(c, .86 * rem, color: NiTokens.of(c).muted);
  static TextStyle stat(BuildContext c) => _body(c, .86 * rem, color: NiTokens.of(c).muted);
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
        textTheme: GoogleFonts.interTextTheme(ThemeData(brightness: b).textTheme).apply(bodyColor: t.text, displayColor: t.text),
        dividerColor: t.border,
        focusColor: t.accent,
        extensions: [t],
      );
}
