import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import 'package:url_launcher/url_launcher.dart';
import '../widgets/sticky_container.dart';
import '../../models/data_model.dart';
import '../design_tokens.dart';
import '../widgets/footer.dart';
import '../../utils/url_helper.dart';
import '../../utils/scroll_keys.dart';

class AppDetailsPage extends StatefulWidget {
  final String appId;

  const AppDetailsPage({super.key, required this.appId});

  @override
  State<AppDetailsPage> createState() => _AppDetailsPageState();
}

class _AppDetailsPageState extends State<AppDetailsPage> {
  final ScrollController _scrollController = ScrollController();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _scrollToFragment();
    });
  }

  void _scrollToFragment() {
    final fragment = GoRouterState.of(context).uri.fragment;
    if (fragment.isNotEmpty) {
      final key = AppScrollKeys.featureKeys['${widget.appId}-$fragment'];
      if (key != null && key.currentContext != null) {
        Scrollable.ensureVisible(
          key.currentContext!,
          duration: const Duration(milliseconds: 500),
          curve: Curves.easeInOut,
        );
      }
    }
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final dataModel = Provider.of<DataModel>(context);
    final app = dataModel.apps.firstWhere(
      (a) => a.id == widget.appId,
      orElse: () => AppModel(
        id: 'error', name: 'App Not Found', shortDescription: '', fullDescription: '',
        iconUrl: '', tags: [], features: [], technicalDetails: [], screenshots: [],
        links: [], privacyPolicy: AppPolicy(url: '', features: []), termsAndConditions: AppPolicy(url: '', features: []),
      ),
    );

    final visibleStats = app.technicalDetails.where((f) => f.hide != true).toList();

    if (app.id == 'error') {
      return Scaffold(body: Center(child: Text('App Not Found', style: NiType.heroH1(context))));
    }

    return NiApp(
      appId: app.id,
      child: Scaffold(
        backgroundColor: NiTokens.of(context).bg,
        body: SingleChildScrollView(
          controller: _scrollController,
          padding: const EdgeInsets.only(top: NiTokens.topbarHeight),
          child: Column(
            children: [
              _AppHeader(app: app),
              if (app.screenshots.isNotEmpty) _AppGallery(app: app),
              if (visibleStats.isNotEmpty) _AppTechStats(stats: visibleStats),
              _AppFeatures(app: app, scrollController: _scrollController),
              _BottomCta(app: app),
              const NiFooter(),
            ],
          ),
        ),
      ),
    );
  }
}

class _AppHeader extends StatelessWidget {
  final AppModel app;
  const _AppHeader({required this.app});

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    final isMobile = NiTokens.isMobile(context);
    
    return Stack(
      children: [
        // Background Mesh
        Positioned(
          top: -200,
          right: -100,
          child: ImageFiltered(
            imageFilter: ImageFilter.blur(sigmaX: 120, sigmaY: 120),
            child: Container(
              width: 600,
              height: 600,
              decoration: BoxDecoration(
                color: tokens.accent.withOpacity(tokens.isDark ? 0.4 : 0.15),
                shape: BoxShape.circle,
              ),
            ),
          ),
        ),
        // Content
        Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: NiTokens.maxWidth),
            child: Padding(
              padding: EdgeInsets.fromLTRB(NiTokens.gutter, NiTokens.clampW(context, 60, 10, 120), NiTokens.gutter, 80),
              child: isMobile
                  ? Column(
                      children: [
                        _Icon(app: app),
                        const SizedBox(height: 32),
                        _HeaderCopy(app: app),
                      ],
                    )
                  : Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _Icon(app: app),
                        const SizedBox(width: 40),
                        Expanded(child: _HeaderCopy(app: app)),
                      ],
                    ),
            ),
          ),
        ),
      ],
    );
  }
}

class _Icon extends StatelessWidget {
  final AppModel app;
  const _Icon({required this.app});

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    return Container(
      width: 140,
      height: 140,
      decoration: BoxDecoration(
        color: tokens.surface2,
        borderRadius: BorderRadius.circular(NiTokens.iconRadius(140)),
        boxShadow: tokens.shadow,
        image: DecorationImage(
          image: AssetImage(app.iconUrl),
          fit: BoxFit.cover,
        ),
      ),
    );
  }
}

class _HeaderCopy extends StatelessWidget {
  final AppModel app;
  const _HeaderCopy({required this.app});

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(app.shortName, style: NiType.appH1(context)),
        const SizedBox(height: 20),
        ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 60 * 8.5), // rough 60ch
          child: Text(app.fullDescription, style: NiType.muted(context, 17.6)), // 1.1rem
        ),
        const SizedBox(height: 32),
        Wrap(
          spacing: 12,
          runSpacing: 12,
          children: [
            if (app.status == 'Coming soon' || app.links.isEmpty)
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                decoration: BoxDecoration(
                  color: tokens.surface,
                  borderRadius: NiTokens.pill,
                  border: Border.all(color: tokens.border, width: 1),
                ),
                child: Text('Coming soon', style: NiType.button(context)),
              )
            else
              ...app.links.map((link) => _StoreButton(link: link)),
          ],
        ),
      ],
    );
  }
}

class _StoreButton extends StatefulWidget {
  final AppLink link;
  const _StoreButton({required this.link});

  @override
  State<_StoreButton> createState() => _StoreButtonState();
}

class _StoreButtonState extends State<_StoreButton> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    final isPrimary = widget.link.type.toLowerCase().contains('store') || widget.link.type.toLowerCase().contains('demo');
    
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: () => launchUrl(Uri.parse(UrlHelper.resolve(widget.link.url))),
        child: AnimatedContainer(
          duration: NiTokens.hoverFast,
          transform: Matrix4.translationValues(0, _isHovered ? -2 : 0, 0),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          decoration: BoxDecoration(
            gradient: isPrimary ? tokens.btnPrimary : null,
            color: isPrimary ? null : tokens.surface,
            borderRadius: NiTokens.pill,
            border: isPrimary ? null : Border.all(color: _isHovered ? tokens.accent : tokens.border, width: 1),
            boxShadow: isPrimary ? tokens.btnPrimaryShadow : null,
          ),
          child: Text(
            widget.link.type, 
            style: NiType.button(context).copyWith(
              color: isPrimary ? tokens.accentInk : tokens.text,
            ),
          ),
        ),
      ),
    );
  }
}

class _AppGallery extends StatelessWidget {
  final AppModel app;
  const _AppGallery({required this.app});

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    
    return Container(
      width: double.infinity,
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: NiTokens.gutter),
        child: Row(
          children: app.screenshots.map((s) => Padding(
            padding: const EdgeInsets.only(right: 20),
            child: _GalleryShot(url: s.url),
          )).toList(),
        ),
      ),
    );
  }
}

class _GalleryShot extends StatelessWidget {
  final String url;
  const _GalleryShot({required this.url});

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    return Container(
      width: 270,
      height: 570,
      decoration: BoxDecoration(
        color: tokens.surface,
        borderRadius: BorderRadius.circular(NiTokens.rGallery),
        border: Border.all(color: tokens.surface2, width: 5),
        boxShadow: tokens.shadow,
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(NiTokens.rGallery - 5),
        child: Stack(
          fit: StackFit.expand,
          children: [
            Image.asset(
              url.isNotEmpty ? url : 'assets/placeholders/screenshot.png',
              fit: BoxFit.cover,
            ),
            DecoratedBox(
              decoration: BoxDecoration(
                gradient: RadialGradient(
                  center: Alignment.center,
                  radius: 1.0,
                  colors: [Colors.transparent, Colors.black.withOpacity(0.4)],
                  stops: const [0.5, 1.0],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _AppTechStats extends StatelessWidget {
  final List<AppFeature> stats;
  const _AppTechStats({required this.stats});

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    final isMobile = NiTokens.isMobile(context);

    return Container(
      margin: const EdgeInsets.only(top: 80),
      width: double.infinity,
      decoration: BoxDecoration(
        color: tokens.bgAlt,
        border: Border.symmetric(horizontal: BorderSide(color: tokens.border)),
      ),
      padding: const EdgeInsets.fromLTRB(NiTokens.gutter, 38, NiTokens.gutter, 56),
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: NiTokens.maxWidth),
          child: isMobile
            ? Column(
                children: [
                  for (int i = 0; i < stats.length; i += 2)
                    Padding(
                      padding: EdgeInsets.only(bottom: i + 2 < stats.length ? 24.0 : 0),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Expanded(child: _StatItem(val: stats[i].title, label: stats[i].subtitle)),
                          if (i + 1 < stats.length)
                            Expanded(child: _StatItem(val: stats[i + 1].title, label: stats[i + 1].subtitle))
                          else
                            const Spacer(),
                        ],
                      ),
                    ),
                ],
              )
            : Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: stats.map((s) => Expanded(child: _StatItem(val: s.title, label: s.subtitle))).toList(),
              ),
        ),
      ),
    );
  }
}

class _StatItem extends StatelessWidget {
  final String val;
  final String label;

  const _StatItem({required this.val, required this.label});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(val, style: NiType.statNum(context)),
        const SizedBox(height: 4),
        Text(label, style: NiType.stat(context)),
      ],
    );
  }
}

class _AppFeatures extends StatefulWidget {
  final AppModel app;
  final ScrollController scrollController;
  
  const _AppFeatures({required this.app, required this.scrollController});

  @override
  State<_AppFeatures> createState() => _AppFeaturesState();
}

class _AppFeaturesState extends State<_AppFeatures> {
  int _activeIndex = 0;
  late List<GlobalKey> _keys;
  final GlobalKey _rowKey = GlobalKey();
  double _stickyOffset = 0;

  String _slugify(String text) {
    return text.toLowerCase().replaceAll(RegExp(r'[^a-z0-9]+'), '-').replaceAll(RegExp(r'^-+|-+$'), '');
  }

  @override
  void initState() {
    super.initState();
    final visibleFeatures = widget.app.features.where((f) => f.hide != true).toList();
    _keys = List.generate(visibleFeatures.length, (_) => GlobalKey());
    for(int i = 0; i < visibleFeatures.length; i++) {
       AppScrollKeys.featureKeys['${widget.app.id}-${_slugify(visibleFeatures[i].title)}'] = _keys[i];
    }
    widget.scrollController.addListener(_onScroll);
  }

  void _onScroll() {
    if (!mounted) return;
    
    double newOffset = 0;
    if (_rowKey.currentContext != null) {
      final box = _rowKey.currentContext!.findRenderObject() as RenderBox;
      final position = box.localToGlobal(Offset.zero);
      if (position.dy < 100) {
        newOffset = 100 - position.dy;
        // Clamp it so it doesn't bleed past the row height
        final rowHeight = box.size.height;
        final tocHeight = 400.0; // approximate
        if (newOffset > rowHeight - tocHeight) {
          newOffset = rowHeight - tocHeight;
          if (newOffset < 0) newOffset = 0;
        }
      }
    }

    setState(() {
      _stickyOffset = newOffset;
    });
    
    // Scroll Spy
    for (int i = 0; i < _keys.length; i++) {
      final key = _keys[i];
      if (key.currentContext != null) {
        final box = key.currentContext!.findRenderObject() as RenderBox;
        final position = box.localToGlobal(Offset.zero);
        if (position.dy > 0 && position.dy < 300) {
          if (_activeIndex != i) {
            setState(() {
              _activeIndex = i;
            });
          }
        }
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    final isMobile = NiTokens.isMobile(context);
    final visibleFeatures = widget.app.features.where((f) => f.hide != true).toList();

    if (visibleFeatures.isEmpty) return const SizedBox.shrink();

    final tocCol = Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SizedBox(height: 80), // Added top padding
        Text('FEATURES', style: NiType.eyebrow(context).copyWith(fontSize: 11.52, letterSpacing: 0.12 * 16)),
        const SizedBox(height: 24),
        ...visibleFeatures.asMap().entries.map((entry) {
          final i = entry.key;
          final title = entry.value.title;
          final isActive = i == _activeIndex;
          return Padding(
            padding: const EdgeInsets.symmetric(vertical: 6),
            child: MouseRegion(
              cursor: SystemMouseCursors.click,
              child: GestureDetector(
                onTap: () {
                  setState(() => _activeIndex = i);
                  if (_keys[i].currentContext != null) {
                    Scrollable.ensureVisible(
                      _keys[i].currentContext!,
                      duration: const Duration(milliseconds: 300),
                      curve: Curves.easeInOut,
                      alignment: 0.1,
                    );
                  }
                },
                child: Text(
                  title,
                  style: NiType.muted(context, 13.76).copyWith(
                    color: isActive ? tokens.accent : tokens.muted,
                    fontWeight: isActive ? FontWeight.w700 : FontWeight.w400,
                  ),
                ),
              ),
            ),
          );
        }),
      ],
    );

    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: NiTokens.maxWidth),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: NiTokens.gutter),
          child: isMobile 
            ? Column(
                children: [
                  tocCol,
                  const SizedBox(height: 64),
                  ...visibleFeatures.asMap().entries.map((e) {
                    return Container(
                      key: _keys[e.key],
                      margin: const EdgeInsets.only(bottom: 64),
                      child: _FeatureDeepDive(feature: e.value, isReversed: e.key % 2 == 0)
                    );
                  }),
                ],
              )
            : Row(
                key: _rowKey,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(
                    width: 300,
                    child: Transform.translate(
                      offset: Offset(0, _stickyOffset),
                      child: tocCol,
                    ),
                  ),
                  const SizedBox(width: 64),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: visibleFeatures.asMap().entries.map((e) {
                        return Container(
                          key: _keys[e.key],
                          margin: const EdgeInsets.only(bottom: 120),
                          child: _FeatureDeepDive(feature: e.value, isReversed: e.key % 2 == 0)
                        );
                      }).toList(),
                    ),
                  ),
                ],
              ),
        ),
      ),
    );
  }
}

class _FeatureDeepDive extends StatelessWidget {
  final AppFeature feature;
  final bool isReversed;

  const _FeatureDeepDive({required this.feature, required this.isReversed});

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    final isMobile = NiTokens.isMobile(context);
    
    // We expect the first section to have the content for the deep dive
    final desc = feature.sections.isNotEmpty ? feature.sections.first.content : feature.subtitle;

    final textCol = Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(feature.title, style: NiType.h3(context)),
        const SizedBox(height: 16),
        Text(desc, style: NiType.muted(context)),
      ],
    );
    final firstSectionWithImage = feature.sections.cast<FeatureSection?>().firstWhere((s) => s != null && s.images.isNotEmpty, orElse: () => null);
    final imageUrl = firstSectionWithImage != null ? firstSectionWithImage.images.first.url : 'assets/placeholders/learning.png';

    final mediaCol = ClipRRect(
      borderRadius: BorderRadius.circular(24),
      child: Stack(
        children: [
          Image.asset(
            imageUrl,
            fit: BoxFit.cover,
            width: double.infinity,
          ),
          Positioned.fill(
            child: DecoratedBox(
              decoration: BoxDecoration(
                gradient: RadialGradient(
                  center: Alignment.center,
                  radius: 0.9,
                  colors: [Colors.transparent, Colors.black.withOpacity(0.5)],
                  stops: const [0.6, 1.0],
                ),
              ),
            ),
          ),
        ],
      ),
    );

    return Container(
      margin: const EdgeInsets.only(top: 80),
      child: isMobile
        ? Column(
            children: [
              mediaCol,
              const SizedBox(height: 32),
              textCol,
            ],
          )
        : Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: isReversed
                ? [Expanded(flex: 10, child: mediaCol), const SizedBox(width: 40), Expanded(flex: 12, child: textCol)]
                : [Expanded(flex: 12, child: textCol), const SizedBox(width: 40), Expanded(flex: 10, child: mediaCol)],
          ),
    );
  }
}

class _BottomCta extends StatelessWidget {
  final AppModel app;
  const _BottomCta({required this.app});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 80),
      child: Column(
        children: [
          Text('Ready to try ${app.shortName}?', style: NiType.h2(context), textAlign: TextAlign.center),
          const SizedBox(height: 32),
          if (app.links.isNotEmpty)
            _StoreButton(link: app.links.first)
          else
            _StoreButton(link: AppLink(type: 'Coming soon', url: '')),
        ],
      ),
    );
  }
}
