import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../models/data_model.dart';
import '../widgets/image_helper.dart';

class AppDetailsPage extends StatefulWidget {
  final String appId;
  const AppDetailsPage({super.key, required this.appId});

  @override
  State<AppDetailsPage> createState() => _AppDetailsPageState();
}

class _AppDetailsPageState extends State<AppDetailsPage> {
  final PageController _pageController = PageController();
  bool _isAnimating = false;
  DateTime _lastScrollTime = DateTime.now();

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  void _handleScroll(PointerSignalEvent event) {
    if (event is PointerScrollEvent) {
      if (_isAnimating) return; // Ignore if already animating

      // Debounce: prevent rapid fires if the animation flag somehow missed or for extra safety
      if (DateTime.now().difference(_lastScrollTime).inMilliseconds < 500)
        return;

      final double delta = event.scrollDelta.dy;

      // Threshold to ignore tiny accidental scrolls (e.g. trackpads)
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
    // Basic bounds check, though animateToPage handles it partially, better to be safe
    // We assume we can't know the max pages easily without tracking it,
    // but animateToPage won't crash if out of bounds, just won't go there.
    // However, knowing the max page is useful.
    // We will just try to animate.

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
      // Ignore errors (e.g. out of bounds)
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
    final dataModel = Provider.of<DataModel>(context);
    final app = dataModel.apps.firstWhere(
      (element) => element.id == widget.appId,
      orElse: () => AppModel(
        id: 'error',
        name: 'App Not Found',
        shortDescription: '',
        fullDescription: '',
        iconUrl: '',
        features: [],
        technicalDetails: [],
        screenshots: [],
        links: [],
        privacyPolicy: AppPolicy(url: '', sections: []),
        termsAndConditions: AppPolicy(url: '', sections: []),
        descriptionImages: [],
      ),
    );

    if (app.id == 'error') {
      return const Scaffold(body: Center(child: Text('App Not Found')));
    }

    // 1. Flatten Data into Pages
    final List<Widget> pages = [];

    // -- Header Page --
    pages.add(_buildHeaderPage(context, app));

    // -- About Page (Full Description) --
    // We treat this as a Section Page so it can handle images (descriptionImages) and layout consistently
    pages.add(
      _buildSectionPage(
        context,
        FeatureSection(
          title: 'About',
          content: app.fullDescription,
          images: app.descriptionImages,
          imageRenderer: 'default', // or whatever default you prefer
        ),
      ),
    );

    // -- Features --
    for (var feature in app.features) {
      if (feature.subtitle.isNotEmpty) {
        pages.add(_buildContentPage(context, feature.title, feature.subtitle));
      }

      for (var section in feature.sections) {
        pages.add(_buildSectionPage(context, section));
      }
    }

    // -- Technical Details --
    if (app.technicalDetails.isNotEmpty) {
      pages.add(
        _buildContentPage(
          context,
          'Technical Details',
          'A deep dive into the technology powering this app.',
        ),
      );
      for (var feature in app.technicalDetails) {
        if (feature.subtitle.isNotEmpty) {
          pages.add(
            _buildContentPage(context, feature.title, feature.subtitle),
          );
        }
        for (var section in feature.sections) {
          pages.add(_buildSectionPage(context, section));
        }
      }
    }

    // -- Screenshots --
    if (app.screenshots.isNotEmpty) {
      pages.add(_buildScreenshotsPage(context, app));
    }

    return Scaffold(
      body: Stack(
        children: [
          // Fixed Background (Subtle Gradient)
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

          // Snap Scrolling Content with Custom Listener
          Listener(
            onPointerSignal: _handleScroll,
            child: PageView(
              controller: _pageController,
              scrollDirection: Axis.vertical,
              physics:
                  const NeverScrollableScrollPhysics(), // Disable default scroll
              children: pages,
            ),
          ),
        ],
      ),
    );
  }

  // --- Page Builders ---

  Widget _buildPageContainer(BuildContext context, Widget child) {
    return Center(
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 40),
        constraints: const BoxConstraints(
          maxWidth: 1200,
        ), // Widen for immersive feel
        child: Center(child: child), // Center vertically in viewport
      ),
    );
  }

  Widget _buildHeaderPage(BuildContext context, AppModel app) {
    return _buildPageContainer(
      context,
      Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            width: 140, // Larger Icon
            height: 140,
            margin: const EdgeInsets.only(bottom: 32),
            decoration: BoxDecoration(
              color: Theme.of(context).colorScheme.surfaceContainerHighest,
              borderRadius: BorderRadius.circular(28),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.1),
                  blurRadius: 30,
                  offset: const Offset(0, 15),
                ),
              ],
              image: app.iconUrl.isNotEmpty
                  ? DecorationImage(
                      image: getImageProvider(app.iconUrl),
                      fit: BoxFit.cover,
                    )
                  : null,
            ),
            child: app.iconUrl.isEmpty
                ? const Icon(Icons.apps, size: 70)
                : null,
          ),
          Text(
            app.name,
            style: Theme.of(context).textTheme.displayLarge?.copyWith(
              // Larger Title
              fontWeight: FontWeight.bold,
              height: 1.1,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 24),
          Text(
            app.shortDescription,
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
              color: Theme.of(context).colorScheme.secondary,
              fontWeight: FontWeight.w400,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 48),
          Wrap(
            spacing: 16,
            runSpacing: 16,
            alignment: WrapAlignment.center,
            children: app.links.map((link) {
              return FilledButton.icon(
                onPressed: () => _launchUrl(link.url),
                icon: const Icon(Icons.download),
                label: Text(link.type),
                style: FilledButton.styleFrom(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 32,
                    vertical: 20,
                  ),
                  textStyle: const TextStyle(fontSize: 18),
                ),
              );
            }).toList(),
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
    );
  }

  Widget _buildContentPage(BuildContext context, String title, String content) {
    return _buildPageContainer(
      context,
      Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Text(
            title,
            style: Theme.of(
              context,
            ).textTheme.displayMedium?.copyWith(fontWeight: FontWeight.bold),
            textAlign: TextAlign.center,
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
                textAlign: WrapAlignment.center,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSectionPage(BuildContext context, FeatureSection section) {
    Widget imageWidget = const SizedBox.shrink();

    // Build Image Widget (Same logic for both, but refined)
    if (section.images.isNotEmpty) {
      if (section.imageRenderer == 'list' ||
          section.imageRenderer == 'default') {
        // Treat default as list of images
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
            // Side-by-Side (Desktop) - Centered Vertically
            return Row(
              crossAxisAlignment:
                  CrossAxisAlignment.center, // Center vertically
              children: [
                Expanded(
                  flex: 1,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      if (section.title.isNotEmpty &&
                          section.title != 'Introduction')
                        Text(
                          section.title,
                          style: Theme.of(context).textTheme.displaySmall
                              ?.copyWith(fontWeight: FontWeight.bold),
                        ),
                      const SizedBox(height: 24),
                      MarkdownBody(
                        data: section.content,
                        styleSheet: MarkdownStyleSheet(
                          p: Theme.of(context).textTheme.headlineSmall
                              ?.copyWith(
                                // Larger font
                                fontSize: 22, // specific bump
                                height: 1.6,
                              ),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: 80), // More space
                Expanded(
                  flex: 1,
                  child: Center(
                    child: SingleChildScrollView(
                      // Allow scrolling just the image column if it's very tall
                      child: imageWidget,
                    ),
                  ),
                ),
              ],
            );
          } else {
            // Mobile / Stacked
            return SingleChildScrollView(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (section.title.isNotEmpty &&
                      section.title != 'Introduction')
                    Text(
                      section.title,
                      style: Theme.of(context).textTheme.headlineMedium
                          ?.copyWith(fontWeight: FontWeight.bold),
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
                  const SizedBox(height: 40), // Bottom padding
                ],
              ),
            );
          }
        },
      ),
    );
  }

  Widget _buildScreenshotsPage(BuildContext context, AppModel app) {
    return _buildPageContainer(
      context,
      Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            'Screenshots',
            style: Theme.of(
              context,
            ).textTheme.displayMedium?.copyWith(fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 60),
          SizedBox(
            height: 600, // Taller area for screenshots
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: app.screenshots.length,
              itemBuilder: (context, i) {
                return Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24),
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(24),
                    child: buildImage(
                      app.screenshots[i].url,
                      fit: BoxFit.contain,
                    ),
                  ),
                );
              },
            ),
          ),
        ],
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
