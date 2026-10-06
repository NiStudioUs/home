import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import '../../models/data_model.dart';
import '../design_tokens.dart';
import '../../utils/scroll_keys.dart';

class HomeHero extends StatelessWidget {
  const HomeHero({super.key});

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    final isMobile = NiTokens.isMobile(context);
    
    return Stack(
      children: [
        const Positioned.fill(
          child: _HeroMesh(),
        ),
        Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: NiTokens.maxWidth),
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: NiTokens.gutter),
              child: isMobile
                ? Column(
                    children: [
                      const _LeftColumn(),
                      const SizedBox(height: 32),
                      const SizedBox(
                        height: 440,
                        child: _RightColumn(),
                      ),
                    ],
                  )
                : Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(flex: 135, child: const _LeftColumn()),
                      const SizedBox(width: 24),
                      Expanded(
                        flex: 65, 
                        child: const SizedBox(
                          height: 600,
                          child: _RightColumn(),
                        ),
                      ),
                    ],
                  ),
            ),
          ),
        ),
      ],
    );
  }
}

class _LeftColumn extends StatefulWidget {
  const _LeftColumn();

  @override
  State<_LeftColumn> createState() => _LeftColumnState();
}

class _LeftColumnState extends State<_LeftColumn> {
  // Simple ping animation for the live dot
  bool _isPingLarge = false;

  @override
  void initState() {
    super.initState();
    _startPing();
  }

  void _startPing() async {
    while (mounted) {
      await Future.delayed(NiTokens.pingPeriod ~/ 2);
      if (mounted) setState(() => _isPingLarge = !_isPingLarge);
    }
  }

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    final dataModel = Provider.of<DataModel>(context);
    
    final appsCount = dataModel.apps.length;
    
    // Find featured app
    AppModel? featuredApp;
    try {
      featuredApp = dataModel.apps.firstWhere((a) => a.id == 'scribble-notes');
    } catch (_) {
      if (dataModel.apps.isNotEmpty) featuredApp = dataModel.apps.first;
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Pill
        Container(
          padding: const EdgeInsets.fromLTRB(12, 7, 16, 7),
          margin: const EdgeInsets.only(bottom: 26),
          decoration: BoxDecoration(
            color: tokens.surface,
            borderRadius: NiTokens.pill,
            border: Border.all(color: tokens.border, width: 1),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              AnimatedContainer(
                duration: NiTokens.pingPeriod ~/ 2,
                width: 8,
                height: 8,
                decoration: BoxDecoration(
                  color: NiTokens.liveDot,
                  shape: BoxShape.circle,
                  boxShadow: [
                    BoxShadow(
                      color: NiTokens.liveDot.withOpacity(_isPingLarge ? 0.0 : 0.6),
                      spreadRadius: _isPingLarge ? 8 : 0,
                    )
                  ],
                ),
              ),
              const SizedBox(width: 10),
              Text('$appsCount apps · private by design', style: NiType.muted(context, 13.6).copyWith(fontWeight: FontWeight.w500)),
            ],
          ),
        ),
        
        // H1
        Text('Your phone.\nYour data.', style: NiType.heroH1(context)),
        ShaderMask(
          shaderCallback: (bounds) => tokens.gradText.createShader(bounds),
          blendMode: BlendMode.srcIn,
          child: Text('Nobody else.', style: NiType.heroH1(context).copyWith(color: Colors.white)),
        ),
        
        const SizedBox(height: 30),
        
        // Lead
        ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 52 * 11.0), // rough max 52ch
          child: Text(
            'Ni Studio Us builds private, offline-first mobile apps — notes, finance, and family history — with clean architecture and no ads.',
            style: NiType.heroLead(context),
          ),
        ),
        
        const SizedBox(height: 26),
        
        // CTA Row
        Wrap(
          spacing: 10,
          runSpacing: 10,
          children: [
            _Button(text: 'Explore apps →', isPrimary: true, onTap: () {
              if (AppScrollKeys.appsKey.currentContext != null) {
                Scrollable.ensureVisible(AppScrollKeys.appsKey.currentContext!, duration: const Duration(milliseconds: 500), curve: Curves.easeInOut);
              }
            }),
            _Button(text: 'Browse features', onTap: () {
              if (AppScrollKeys.featuresKey.currentContext != null) {
                Scrollable.ensureVisible(AppScrollKeys.featuresKey.currentContext!, duration: const Duration(milliseconds: 500), curve: Curves.easeInOut);
              }
            }),
          ],
        ),
        
        const SizedBox(height: 34),
        
        // Spotlight Card
        if (featuredApp != null)
          NiApp(
            appId: featuredApp.id,
            child: _SpotlightCard(app: featuredApp),
          ),
      ],
    );
  }
}

class _Button extends StatefulWidget {
  final String text;
  final bool isPrimary;
  final VoidCallback onTap;

  const _Button({required this.text, this.isPrimary = false, required this.onTap});

  @override
  State<_Button> createState() => _ButtonState();
}

class _ButtonState extends State<_Button> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: widget.onTap,
        child: AnimatedContainer(
          duration: NiTokens.hoverFast,
          transform: Matrix4.translationValues(0, _isHovered ? -2 : 0, 0),
          padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 16),
          decoration: BoxDecoration(
            gradient: widget.isPrimary ? tokens.btnPrimary : null,
            color: widget.isPrimary ? null : tokens.surface,
            borderRadius: NiTokens.pill,
            border: widget.isPrimary ? null : Border.all(color: _isHovered ? tokens.accent : tokens.border, width: 1),
            boxShadow: widget.isPrimary ? tokens.btnPrimaryShadow : null,
          ),
          child: Text(
            widget.text, 
            style: NiType.button(context, large: true).copyWith(
              color: widget.isPrimary ? tokens.accentInk : tokens.text,
            ),
          ),
        ),
      ),
    );
  }
}

class _SpotlightCard extends StatefulWidget {
  final AppModel app;

  const _SpotlightCard({required this.app});

  @override
  State<_SpotlightCard> createState() => _SpotlightCardState();
}

class _SpotlightCardState extends State<_SpotlightCard> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: () => context.go('/apps/${widget.app.id}/'),
        child: AnimatedContainer(
          duration: NiTokens.hoverFast,
          transform: Matrix4.translationValues(0, _isHovered ? -3 : 0, 0),
          constraints: const BoxConstraints(maxWidth: 520),
          padding: const EdgeInsets.fromLTRB(14, 20, 14, 14),
          decoration: BoxDecoration(
            color: tokens.surface.withOpacity(0.85),
            borderRadius: BorderRadius.circular(NiTokens.rSpot),
            border: Border.all(color: _isHovered ? tokens.accent : tokens.border, width: 1),
          ),
          child: ClipRect(
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 8, sigmaY: 8),
              child: Row(
                children: [
                  ClipRRect(
                    borderRadius: BorderRadius.circular(NiTokens.iconRadius(52, small: true)),
                    child: Image.asset(widget.app.iconUrl, width: 52, height: 52),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('FEATURED APP', style: NiType.eyebrow(context).copyWith(fontSize: 10.88)), // .68rem
                        const SizedBox(height: 2),
                        Text(widget.app.name, style: NiType.subH3(context).copyWith(fontSize: 17.6)), // 1.1rem
                        const SizedBox(height: 4),
                        Text(widget.app.shortDescription, style: NiType.muted(context, 13.76)), // .86rem
                      ],
                    ),
                  ),
                  const SizedBox(width: 16),
                  Icon(Icons.arrow_forward, size: 20, color: tokens.accent),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _RightColumn extends StatelessWidget {
  const _RightColumn();

  @override
  Widget build(BuildContext context) {
    final dataModel = Provider.of<DataModel>(context);
    AppModel? featuredApp;
    try {
      featuredApp = dataModel.apps.firstWhere((a) => a.id == 'scribble-notes');
    } catch (_) {
      if (dataModel.apps.isNotEmpty) featuredApp = dataModel.apps.first;
    }
    
    final shots = featuredApp?.screenshots.take(3).toList() ?? [];
    final isMobile = NiTokens.isMobile(context);
    
    // Positions derived from tokens.json (layout.phones.home in actual spec)
    // For now using approximations based on the reference layout maps
    
    return NiApp(
      appId: featuredApp?.id,
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          if (shots.isNotEmpty)
            Positioned(
              left: isMobile ? 0 : 0,
              top: isMobile ? 40 : 80,
              child: _FloatingPhone(url: shots[0].url, delay: 0, rot: -0.1),
            ),
          if (shots.length > 1)
            Positioned(
              left: isMobile ? 120 : 108,
              top: isMobile ? 0 : 5,
              child: _FloatingPhone(url: shots[1].url, delay: 2, rot: 0.05),
            ),
          if (shots.length > 2)
            Positioned(
              left: isMobile ? 80 : 127,
              top: isMobile ? 160 : 135,
              child: _FloatingPhone(url: shots[2].url, delay: 4, rot: 0.15),
            ),
        ],
      ),
    );
  }
}

class _FloatingPhone extends StatefulWidget {
  final String url;
  final int delay;
  final double rot;

  const _FloatingPhone({required this.url, required this.delay, required this.rot});

  @override
  State<_FloatingPhone> createState() => _FloatingPhoneState();
}

class _FloatingPhoneState extends State<_FloatingPhone> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: NiTokens.floatPeriod,
    );
    _animation = Tween<double>(begin: 0, end: NiTokens.floatAmplitude).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOutSine),
    );
    
    Future.delayed(Duration(seconds: widget.delay), () {
      if (mounted) {
        _controller.repeat(reverse: true);
      }
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    final isMobile = NiTokens.isMobile(context);
    final width = isMobile ? 170.0 : 230.0;
    final height = width * (19 / 9);

    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return Transform.translate(
          offset: Offset(0, -_animation.value),
          child: Transform.rotate(
            angle: widget.rot,
            child: child,
          ),
        );
      },
      child: Container(
        width: width,
        height: height,
        padding: const EdgeInsets.all(7),
        decoration: BoxDecoration(
          color: tokens.surface2,
          borderRadius: BorderRadius.circular(NiTokens.rPhone),
          border: Border.all(color: tokens.border, width: 1),
          boxShadow: tokens.shadow,
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(NiTokens.rPhoneScreen),
          child: Image.asset(
            widget.url.isNotEmpty ? widget.url : 'assets/placeholders/screenshot.png',
            fit: BoxFit.cover,
            alignment: Alignment.topCenter,
          ),
        ),
      ),
    );
  }
}

class _HeroMesh extends StatefulWidget {
  const _HeroMesh();

  @override
  State<_HeroMesh> createState() => _HeroMeshState();
}

class _HeroMeshState extends State<_HeroMesh> with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: NiTokens.driftPeriod,
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        // Drift translate(60,40) scale(1.12)
        final val = _controller.value;
        final dx = val * 60;
        final dy = val * 40;
        final s = 1.0 + (val * 0.12);
        
        return Stack(
          children: [
            Positioned(
              left: -140 + dx,
              top: -180 + dy,
              child: Transform.scale(
                scale: s,
                child: _Blob(color: tokens.accent2, size: 560, opacity: tokens.meshOpacity[0]),
              ),
            ),
            // Need delay effects, simplified here by using inverse values
            Positioned(
              right: MediaQuery.sizeOf(context).width * 0.08 - dx, // roughly right 8%
              top: -120 - dy,
              child: Transform.scale(
                scale: 1.12 - (val * 0.12),
                child: _Blob(color: NiTokens.meshPink, size: 480, opacity: tokens.meshOpacity[1]),
              ),
            ),
            Positioned(
              right: -120 + dx,
              bottom: 80 - dy,
              child: Transform.scale(
                scale: s,
                child: _Blob(color: NiTokens.meshBlue, size: 420, opacity: tokens.meshOpacity[2]),
              ),
            ),
          ],
        );
      },
    );
  }
}

class _Blob extends StatelessWidget {
  final Color color;
  final double size;
  final double opacity;

  const _Blob({required this.color, required this.size, required this.opacity});

  @override
  Widget build(BuildContext context) {
    return ImageFiltered(
      imageFilter: ImageFilter.blur(sigmaX: 90, sigmaY: 90),
      child: Container(
        width: size,
        height: size,
        decoration: BoxDecoration(
          color: color.withOpacity(opacity),
          shape: BoxShape.circle,
        ),
      ),
    );
  }
}
