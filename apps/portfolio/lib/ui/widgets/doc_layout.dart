import 'dart:async';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../services/current_app_service.dart';
import '../design_tokens.dart';
import 'footer.dart';
import 'sticky_container.dart';

class DocLayout extends StatefulWidget {
  final String title;
  final String? subtitle;
  final List<String> tocItems;
  final List<Widget> sections;
  final List<GlobalKey>? headingKeys;
  final Widget? bottomContent;

  const DocLayout({
    super.key,
    required this.title,
    this.subtitle,
    required this.tocItems,
    required this.sections,
    this.headingKeys,
    this.bottomContent,
  });

  @override
  State<DocLayout> createState() => _DocLayoutState();
}

class _DocLayoutState extends State<DocLayout> {
  int _activeIndex = 0;
  final ScrollController _scrollController = ScrollController();
  late List<GlobalKey> _keys;
  double _scrollY = 0;
  StreamSubscription<String>? _navSub;

  List<GlobalKey> get _effectiveKeys => widget.headingKeys ?? _keys;

  @override
  void initState() {
    super.initState();
    _keys = List.generate(widget.sections.length, (_) => GlobalKey());
    _scrollController.addListener(_onScroll);

    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      try {
        final currentAppService = Provider.of<CurrentAppService>(context, listen: false);
        _navSub = currentAppService.navigationEvents.listen((title) {
          final index = widget.tocItems.indexOf(title);
          if (index != -1) {
            _scrollTo(index);
          }
        });
      } catch (_) {}
    });
  }

  @override
  void didUpdateWidget(covariant DocLayout oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.sections.length != oldWidget.sections.length) {
      _keys = List.generate(widget.sections.length, (_) => GlobalKey());
    }
  }

  void _scrollTo(int index) {
    final keys = _effectiveKeys;
    if (index < 0 || index >= keys.length) return;
    setState(() => _activeIndex = index);
    final key = keys[index];
    if (key.currentContext != null) {
      Scrollable.ensureVisible(
        key.currentContext!,
        duration: const Duration(milliseconds: 350),
        curve: Curves.easeInOut,
        alignment: 0.5,
      );
    }
  }

  void _onScroll() {
    if (!mounted) return;
    setState(() {
      _scrollY = _scrollController.offset;
    });

    final viewportHeight = MediaQuery.of(context).size.height;
    final centerTarget = viewportHeight / 2;
    int closestIndex = _activeIndex;
    double minDistance = double.infinity;

    final keys = _effectiveKeys;
    for (int i = 0; i < keys.length; i++) {
      final key = keys[i];
      if (key.currentContext != null) {
        final box = key.currentContext!.findRenderObject() as RenderBox?;
        if (box != null && box.hasSize) {
          final position = box.localToGlobal(Offset.zero);
          final distance = (position.dy - centerTarget).abs();
          if (position.dy <= centerTarget + 120 && distance < minDistance) {
            minDistance = distance;
            closestIndex = i;
          }
        }
      }
    }

    if (_activeIndex != closestIndex) {
      setState(() {
        _activeIndex = closestIndex;
      });
    }
  }

  @override
  void dispose() {
    _navSub?.cancel();
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    final isMobile = NiTokens.isMobile(context);

    final tocCol = Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('ON THIS PAGE', style: NiType.eyebrow(context).copyWith(fontSize: 11.52, letterSpacing: 0.12 * 16)),
        const SizedBox(height: 24),
        ...widget.tocItems.asMap().entries.map((entry) {
          final i = entry.key;
          final title = entry.value;
          final isActive = i == _activeIndex;
          return MouseRegion(
            cursor: SystemMouseCursors.click,
            child: GestureDetector(
              behavior: HitTestBehavior.opaque,
              onTap: () => _scrollTo(i),
              child: Padding(
                padding: const EdgeInsets.symmetric(vertical: 6),
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

    return Scaffold(
      backgroundColor: tokens.bg,
      body: CustomScrollView(
        controller: _scrollController,
        slivers: [
          // Top padding for topbar
          const SliverToBoxAdapter(child: SizedBox(height: NiTokens.topbarHeight)),
          
          // Header
          SliverToBoxAdapter(
            child: Center(
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: NiTokens.maxWidth),
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(NiTokens.gutter, 80, NiTokens.gutter, 60),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(widget.title, style: NiType.legalH1(context)),
                      if (widget.subtitle != null) ...[
                        const SizedBox(height: 16),
                        Text(widget.subtitle!, style: NiType.muted(context, 17.6)),
                      ],
                    ],
                  ),
                ),
              ),
            ),
          ),

          // Main Content
          if (isMobile)
            SliverToBoxAdapter(
              child: Center(
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: NiTokens.maxWidth),
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: NiTokens.gutter),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        tocCol,
                        const SizedBox(height: 64),
                        ...widget.sections.asMap().entries.map((e) {
                          return Container(key: _keys[e.key], child: e.value);
                        }),
                        if (widget.bottomContent != null) widget.bottomContent!,
                      ],
                    ),
                  ),
                ),
              ),
            )
          else
            SliverToBoxAdapter(
              child: Center(
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: NiTokens.maxWidth),
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: NiTokens.gutter),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(
                          width: 300,
                          child: StickyContainer(
                            scrollY: _scrollY,
                            headerHeight: 200,
                            child: tocCol,
                          ),
                        ),
                        const SizedBox(width: 64),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              ...widget.sections.asMap().entries.map((e) {
                                return Container(key: _keys[e.key], child: e.value);
                              }),
                              if (widget.bottomContent != null) widget.bottomContent!,
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),

          // Footer
          const SliverToBoxAdapter(child: NiFooter()),
        ],
      ),
    );
  }
}


