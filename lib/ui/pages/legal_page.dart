import 'dart:async';
import 'package:provider/provider.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../models/data_model.dart';
import '../../services/current_app_service.dart';
import '../../utils/date_formatter.dart'; // Import DateFormatter
import '../widgets/image_helper.dart';

class LegalPage extends StatefulWidget {
  final AppModel app;
  final PageType pageType;
  final String title;
  final List<AppFeature> features;

  const LegalPage({
    super.key,
    required this.app,
    required this.pageType,
    required this.title,
    required this.features,
  });

  @override
  State<LegalPage> createState() => _LegalPageState();
}

class _LegalPageState extends State<LegalPage> {
  final PageController _pageController = PageController();
  bool _isAnimating = false;
  DateTime _lastScrollTime = DateTime.now();
  final Map<String, int> _featureMap = {};
  StreamSubscription<String>? _navSubscription;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Provider.of<CurrentAppService>(
        context,
        listen: false,
      ).setApp(widget.app, type: widget.pageType);

      _navSubscription = Provider.of<CurrentAppService>(context, listen: false)
          .navigationEvents
          .listen((featureTitle) {
            if (featureTitle == 'TOP') {
              _scrollToPage(0);
            } else if (_featureMap.containsKey(featureTitle)) {
              _scrollToPage(_featureMap[featureTitle]!);
            }
          });
    });
  }

  @override
  void dispose() {
    _navSubscription?.cancel();
    _pageController.dispose();
    super.dispose();
  }

  void _handleScroll(PointerSignalEvent event) {
    if (event is PointerScrollEvent) {
      if (_isAnimating) return;
      if (DateTime.now().difference(_lastScrollTime).inMilliseconds < 500) {
        return;
      }

      final double delta = event.scrollDelta.dy;
      if (delta.abs() < 20) return;

      int nextPage = _pageController.page!.round();
      if (delta > 0) {
        nextPage++;
      } else {
        nextPage--;
      }

      _scrollToPage(nextPage);
    }
  }

  Future<void> _scrollToPage(int page) async {
    setState(() {
      _isAnimating = true;
      _lastScrollTime = DateTime.now();
    });

    try {
      await _pageController.animateToPage(
        page,
        duration: const Duration(milliseconds: 800),
        curve: Curves.easeInOutCubic,
      );
    } catch (e) {
      // Ignore
    } finally {
      if (mounted) {
        setState(() {
          _isAnimating = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    _featureMap.clear();
    // 1. Flatten Data into Pages
    final List<Widget> pages = [];

    // -- Header Page --
    pages.add(_buildHeaderPage(context));

    // -- Policy Chapters (Features) --
    for (var feature in widget.features) {
      if (feature.hide == true) continue; // Skip hidden features

      // Record start of feature
      if (!_featureMap.containsKey(feature.title)) {
        _featureMap[feature.title] = pages.length;
      }

      // Create a divider page for the Chapter Title
      pages.add(
        _buildContentPage(
          context,
          feature.title,
          feature.subtitle,
          websiteUrl: feature.websiteUrl,
          lastUpdatedUtc: feature.lastUpdatedUtc,
        ),
      );

      for (var section in feature.sections) {
        if (section.hide == true) continue; // Skip hidden sections
        pages.add(
          _buildSectionPage(
            context,
            section,
            featureLastUpdatedUtc: feature.lastUpdatedUtc,
          ),
        );
      }
    }

    // Empty state
    if (pages.length == 1 && widget.features.isEmpty) {
      pages.add(
        _buildContentPage(
          context,
          'Coming Soon',
          'This policy is yet to be drafted.',
        ),
      );
    }

    return Scaffold(
      body: Stack(
        children: [
          // Fixed Background
          Positioned.fill(
            child: Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [
                    Theme.of(context).colorScheme.surface,
                    Theme.of(context).colorScheme.surfaceContainerHighest
                        .withValues(alpha: 0.3),
                  ],
                ),
              ),
            ),
          ),

          // Content
          Listener(
            onPointerSignal: _handleScroll,
            child: PageView(
              controller: _pageController,
              scrollDirection: Axis.vertical,
              physics: const PageScrollPhysics(),
              children: pages,
            ),
          ),

          // Back Button
          Positioned(
            top: 20,
            left: 20,
            child: SafeArea(
              child: FloatingActionButton.small(
                onPressed: () => Navigator.of(context).pop(),
                child: const Icon(Icons.arrow_back),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPageContainer(BuildContext context, Widget child) {
    return Center(
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 40),
        constraints: const BoxConstraints(maxWidth: 1200),
        child: child,
      ),
    );
  }

  Widget _buildHeaderPage(BuildContext context) {
    String? policyLastUpdated;
    if (widget.pageType == PageType.privacy) {
      policyLastUpdated = widget.app.privacyPolicy.lastUpdatedUtc;
    } else if (widget.pageType == PageType.terms) {
      policyLastUpdated = widget.app.termsAndConditions.lastUpdatedUtc;
    }

    return _buildPageContainer(
      context,
      Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.gavel_rounded,
              size: 80,
              color: Theme.of(context).colorScheme.primary,
            ),
            const SizedBox(height: 32),
            Text(
              widget.title,
              style: Theme.of(
                context,
              ).textTheme.displayLarge?.copyWith(fontWeight: FontWeight.bold),
              textAlign: TextAlign.center,
            ),
            if (policyLastUpdated != null && policyLastUpdated.isNotEmpty)
              Padding(
                padding: const EdgeInsets.only(top: 16.0),
                child: Text(
                  'Last Updated: ${DateFormatter.format(policyLastUpdated)}',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    color: Theme.of(context).colorScheme.secondary,
                  ),
                ),
              ),
            const SizedBox(height: 60),
            Icon(
              Icons.keyboard_arrow_down,
              size: 40,
              color: Theme.of(
                context,
              ).colorScheme.onSurface.withValues(alpha: 0.3),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildContentPage(
    BuildContext context,
    String title,
    String content, {
    String? websiteUrl,
    String? lastUpdatedUtc,
  }) {
    return _buildPageContainer(
      context,
      Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: Theme.of(
              context,
            ).textTheme.displayMedium?.copyWith(fontWeight: FontWeight.bold),
            textAlign: TextAlign.start,
          ),
          if (lastUpdatedUtc != null && lastUpdatedUtc.isNotEmpty)
            Padding(
              padding: const EdgeInsets.only(top: 8.0),
              child: Text(
                'Last Updated: ${DateFormatter.format(lastUpdatedUtc)}',
                style: Theme.of(context).textTheme.labelLarge?.copyWith(
                  color: Theme.of(context).colorScheme.secondary,
                ),
              ),
            ),
          const SizedBox(height: 40),
          Container(
            constraints: const BoxConstraints(maxWidth: 800),
            child: MarkdownBody(
              data: content,
              styleSheet: MarkdownStyleSheet(
                p: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  height: 1.6,
                  fontWeight: FontWeight.normal,
                ),
                // textAlign: WrapAlignment.center, // Removed to default left
              ),
            ),
          ),
          if (websiteUrl != null && websiteUrl.isNotEmpty) ...[
            const SizedBox(height: 32),
            FilledButton.icon(
              onPressed: () => _launchUrl(websiteUrl),
              icon: const Icon(Icons.open_in_new),
              label: const Text('Visit Website'),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildSectionPage(
    BuildContext context,
    FeatureSection section, {
    String? featureLastUpdatedUtc,
  }) {
    Widget imageWidget = const SizedBox.shrink();

    if (section.images.isNotEmpty) {
      if (section.imageRenderer == 'list' ||
          section.imageRenderer == 'default') {
        imageWidget = Column(
          children: section.images.map((img) {
            return Padding(
              padding: const EdgeInsets.only(bottom: 24.0),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(20),
                child: buildImage(img.url, fit: BoxFit.contain),
              ),
            );
          }).toList(),
        );
      } else if (section.imageRenderer == 'grid') {
        imageWidget = GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2,
            crossAxisSpacing: 16,
            mainAxisSpacing: 16,
            childAspectRatio: 16 / 9,
          ),
          itemCount: section.images.length,
          itemBuilder: (context, i) => ClipRRect(
            borderRadius: BorderRadius.circular(16),
            child: buildImage(section.images[i].url),
          ),
        );
      }
    }

    return _buildPageContainer(
      context,
      LayoutBuilder(
        builder: (context, constraints) {
          bool isDesktop = constraints.maxWidth > 900;

          if (isDesktop && section.images.isNotEmpty) {
            return Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Expanded(
                  flex: 1,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      if (section.title.isNotEmpty)
                        Text(
                          section.title,
                          style: Theme.of(context).textTheme.displaySmall
                              ?.copyWith(fontWeight: FontWeight.bold),
                          textAlign: TextAlign.start,
                        ),
                      if ((section.lastUpdatedUtc != null &&
                              section.lastUpdatedUtc!.isNotEmpty) ||
                          (featureLastUpdatedUtc != null &&
                              featureLastUpdatedUtc.isNotEmpty))
                        Padding(
                          padding: const EdgeInsets.only(top: 8, bottom: 0),
                          child: Text(
                            'Last Updated: ${DateFormatter.format(section.lastUpdatedUtc ?? featureLastUpdatedUtc)}',
                            style: Theme.of(context).textTheme.labelMedium
                                ?.copyWith(
                                  color: Theme.of(
                                    context,
                                  ).colorScheme.secondary,
                                ),
                          ),
                        ),
                      const SizedBox(height: 24),
                      MarkdownBody(
                        data: section.content,
                        styleSheet: MarkdownStyleSheet(
                          p: Theme.of(context).textTheme.headlineSmall
                              ?.copyWith(fontSize: 22, height: 1.6),
                        ),
                      ),
                      if (section.websiteUrl != null &&
                          section.websiteUrl!.isNotEmpty) ...[
                        const SizedBox(height: 32),
                        FilledButton.icon(
                          onPressed: () => _launchUrl(section.websiteUrl!),
                          icon: const Icon(Icons.open_in_new),
                          label: const Text('Visit Website'),
                        ),
                      ],
                    ],
                  ),
                ),
                const SizedBox(width: 80),
                Expanded(
                  flex: 1,
                  child: Center(
                    child: SingleChildScrollView(child: imageWidget),
                  ),
                ),
              ],
            );
          } else {
            return SingleChildScrollView(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (section.title.isNotEmpty)
                    Text(
                      section.title,
                      style: Theme.of(context).textTheme.headlineMedium
                          ?.copyWith(fontWeight: FontWeight.bold),
                      textAlign: TextAlign.start,
                    ),
                  const SizedBox(height: 24),
                  MarkdownBody(
                    data: section.content,
                    styleSheet: MarkdownStyleSheet(
                      p: Theme.of(context).textTheme.bodyLarge?.copyWith(
                        fontSize: 18,
                        height: 1.6,
                      ),
                    ),
                  ),
                  const SizedBox(height: 40),
                  imageWidget,
                  if (section.websiteUrl != null &&
                      section.websiteUrl!.isNotEmpty) ...[
                    const SizedBox(height: 32),
                    FilledButton.icon(
                      onPressed: () => _launchUrl(section.websiteUrl!),
                      icon: const Icon(Icons.open_in_new),
                      label: const Text('Visit Website'),
                    ),
                  ],
                  const SizedBox(height: 40),
                ],
              ),
            );
          }
        },
      ),
    );
  }

  Future<void> _launchUrl(String url) async {
    final uri = Uri.parse(url);
    if (!await launchUrl(uri)) {
      throw Exception('Could not launch $url');
    }
  }
}
