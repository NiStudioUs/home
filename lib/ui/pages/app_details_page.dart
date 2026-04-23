import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:go_router/go_router.dart';
import '../../models/data_model.dart';
import '../../services/current_app_service.dart';
import '../widgets/image_helper.dart';

class AppDetailsPage extends StatefulWidget {
  final String appId;
  const AppDetailsPage({super.key, required this.appId});

  @override
  State<AppDetailsPage> createState() => _AppDetailsPageState();
}

class _AppDetailsPageState extends State<AppDetailsPage> {
  final PageController _pageController = PageController();
  final PageController _screenshotController = PageController();
  final Map<String, int> _featureMap = {};
  StreamSubscription<String>? _navSubscription;

  bool _isAnimatingPage = false;

  void _goToPreviousPage() {
    if (_isAnimatingPage) return;
    _isAnimatingPage = true;
    _pageController
        .previousPage(
          duration: const Duration(milliseconds: 600),
          curve: Curves.fastOutSlowIn,
        )
        .then((_) {
          Future.delayed(const Duration(milliseconds: 250), () {
            if (mounted) _isAnimatingPage = false;
          });
        });
  }

  void _goToNextPage() {
    if (_isAnimatingPage) return;
    _isAnimatingPage = true;
    _pageController
        .nextPage(
          duration: const Duration(milliseconds: 600),
          curve: Curves.fastOutSlowIn,
        )
        .then((_) {
          Future.delayed(const Duration(milliseconds: 250), () {
            if (mounted) _isAnimatingPage = false;
          });
        });
  }

  // Helper to detect scroll boundary and change page
  bool _handleScrollNotification(ScrollNotification notification) {
    if (_isAnimatingPage) return true;

    if (notification is ScrollUpdateNotification &&
        notification.scrollDelta != null) {
      final metrics = notification.metrics;
      if (metrics.pixels <= metrics.minScrollExtent &&
          notification.scrollDelta! < 0) {
        _goToPreviousPage();
        return true;
      }
      if (metrics.pixels >= metrics.maxScrollExtent &&
          notification.scrollDelta! > 0) {
        _goToNextPage();
        return true;
      }
    } else if (notification is OverscrollNotification) {
      if (notification.overscroll < 0) {
        _goToPreviousPage();
        return true;
      } else if (notification.overscroll > 0) {
        _goToNextPage();
        return true;
      }
    }
    return false;
  }

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _updateCurrentApp();
      _navSubscription = Provider.of<CurrentAppService>(context, listen: false)
          .navigationEvents
          .listen((featureTitle) {
            if (featureTitle == 'TOP') {
              _pageController.animateToPage(
                0,
                duration: const Duration(milliseconds: 400),
                curve: Curves.easeInOut,
              );
            } else if (_featureMap.containsKey(featureTitle)) {
              _pageController.animateToPage(
                _featureMap[featureTitle]!,
                duration: const Duration(milliseconds: 400),
                curve: Curves.easeInOut,
              );
            }
          });
    });
  }

  @override
  void didUpdateWidget(AppDetailsPage oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.appId != oldWidget.appId) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        _updateCurrentApp();
      });
    }
  }

  void _updateCurrentApp() {
    final dataModel = Provider.of<DataModel>(context, listen: false);
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
        privacyPolicy: AppPolicy(url: '', features: []),
        termsAndConditions: AppPolicy(url: '', features: []),
      ),
    );
    if (app.id != 'error') {
      Provider.of<CurrentAppService>(context, listen: false).setApp(app);
    }
  }

  @override
  void dispose() {
    _navSubscription?.cancel();
    _pageController.dispose();
    _screenshotController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    _featureMap.clear(); // Reset map
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
        privacyPolicy: AppPolicy(url: '', features: []),
        termsAndConditions: AppPolicy(url: '', features: []),
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
      if (feature.hide == true) continue; // Skip hidden features

      // Record start of feature
      if (!_featureMap.containsKey(feature.title)) {
        _featureMap[feature.title] = pages.length;
      }

      if (feature.subtitle.isNotEmpty) {
        pages.add(
          _buildContentPage(
            context,
            feature.title,
            feature.subtitle,
            websiteUrl: feature.websiteUrl,
          ),
        );
      }

      for (var section in feature.sections) {
        if (section.hide == true) continue; // Skip hidden sections
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
        if (feature.hide == true) continue;
        if (feature.subtitle.isNotEmpty) {
          pages.add(
            _buildContentPage(context, feature.title, feature.subtitle),
          );
        }
        for (var section in feature.sections) {
          if (section.hide == true) continue;
          pages.add(_buildSectionPage(context, section));
        }
      }
    }

    // -- Screenshots --
    if (app.screenshots.isNotEmpty) {
      pages.add(_buildScreenshotsPage(context, app));
    }

    return Title(
      title: "NSU - ${app.name}",
      color: Theme.of(context).primaryColor,
      child: Scaffold(
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

            // Snap scrolling layout for all devices
            Focus(
              autofocus: true,
              onKeyEvent: (FocusNode node, KeyEvent event) {
                if (event is KeyDownEvent) {
                  if (event.logicalKey == LogicalKeyboardKey.arrowDown ||
                      event.logicalKey == LogicalKeyboardKey.pageDown) {
                    _goToNextPage();
                    return KeyEventResult.handled;
                  } else if (event.logicalKey == LogicalKeyboardKey.arrowUp ||
                      event.logicalKey == LogicalKeyboardKey.pageUp) {
                    _goToPreviousPage();
                    return KeyEventResult.handled;
                  }
                }
                return KeyEventResult.ignored;
              },
              child: PageView(
                controller: _pageController,
                scrollDirection: Axis.vertical,
                physics: const PageScrollPhysics(),
                children: pages,
              ),
            ),
          ],
        ),
      ),
    );
  }

  // --- Page Builders ---

  Widget _buildPageContainer(BuildContext context, Widget child) {
    return Center(
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 40),
        constraints: const BoxConstraints(
          maxWidth: 1200,
        ), // Widen for immersive feel
        child: child, // Center vertically in viewport
      ),
    );
  }

  Widget _buildHeaderPage(BuildContext context, AppModel app) {
    return _buildPageContainer(
      context,
      NotificationListener<ScrollNotification>(
        onNotification: _handleScrollNotification,
        child: ListView(
          physics: const BouncingScrollPhysics(),
          children: [
            Container(
              alignment: Alignment.center,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    width: 140, // Larger Icon
                    height: 140,
                    margin: const EdgeInsets.only(bottom: 32),
                    decoration: BoxDecoration(
                      color: Theme.of(
                        context,
                      ).colorScheme.surfaceContainerHighest,
                      borderRadius: BorderRadius.circular(28),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withValues(alpha: 0.1),
                          blurRadius: 30,
                          offset: const Offset(0, 15),
                        ),
                      ],
                    ),
                    child: app.iconUrl.isNotEmpty
                        ? ClipRRect(
                            borderRadius: BorderRadius.circular(28),
                            child: Image(
                              image: getImageProvider(app.iconUrl),
                              fit: BoxFit.cover,
                              color: Theme.of(
                                context,
                              ).colorScheme.surfaceContainerHighest,
                              colorBlendMode: BlendMode.softLight,
                            ),
                          )
                        : const Icon(Icons.apps, size: 70),
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
                      final isPlayStore =
                          link.type.toLowerCase() == 'play store';
                      final icon = isPlayStore
                          ? const FaIcon(FontAwesomeIcons.googlePlay)
                          : const Icon(Icons.download);
                      final label = isPlayStore
                          ? 'Get on Google Play'
                          : link.type;

                      return FilledButton.icon(
                        onPressed: () => _launchUrl(link.url),
                        icon: icon,
                        label: Text(label),
                        style: FilledButton.styleFrom(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 32,
                            vertical: 20,
                          ),
                          textStyle: const TextStyle(fontSize: 18),
                          backgroundColor: isPlayStore ? Colors.black : null,
                          foregroundColor: isPlayStore ? Colors.white : null,
                        ),
                      );
                    }).toList(),
                  ),
                  const SizedBox(height: 24),
                  // Privacy Policy and Terms & Conditions links
                  Wrap(
                    spacing: 24,
                    runSpacing: 12,
                    alignment: WrapAlignment.center,
                    children: [
                      TextButton.icon(
                        onPressed: () {
                          context.go('/app/${widget.appId}/privacy');
                        },
                        icon: const Icon(Icons.privacy_tip_outlined, size: 18),
                        label: const Text('Privacy Policy'),
                        style: TextButton.styleFrom(
                          foregroundColor: Theme.of(
                            context,
                          ).colorScheme.primary,
                        ),
                      ),
                      TextButton.icon(
                        onPressed: () {
                          context.go('/app/${widget.appId}/terms');
                        },
                        icon: const Icon(Icons.description_outlined, size: 18),
                        label: const Text('Terms & Conditions'),
                        style: TextButton.styleFrom(
                          foregroundColor: Theme.of(
                            context,
                          ).colorScheme.primary,
                        ),
                      ),
                    ],
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
  }) {
    return _buildPageContainer(
      context,
      NotificationListener<ScrollNotification>(
        onNotification: _handleScrollNotification,
        child: ListView(
          physics: const BouncingScrollPhysics(),
          children: [
            Text(
              title,
              style: Theme.of(
                context,
              ).textTheme.displayMedium?.copyWith(fontWeight: FontWeight.bold),
              textAlign: TextAlign.start,
            ),
            const SizedBox(height: 40),
            Container(
              constraints: const BoxConstraints(maxWidth: 800),
              child: MarkdownBody(
                data: content,
                styleSheet: MarkdownStyleSheet(
                  p: Theme.of(context).textTheme.bodyLarge?.copyWith(
                    fontSize: 20,
                    height: 1.5,
                    fontWeight: FontWeight.normal,
                  ),
                ),
                onTapLink: (text, href, title) {
                  if (href != null) {
                    _launchUrl(href);
                  }
                },
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
      ),
    );
  }

  Widget _buildSectionPage(BuildContext context, FeatureSection section) {
    return _buildPageContainer(
      context,
      LayoutBuilder(
        builder: (context, constraints) {
          // Responsive breakpoint
          final isWideScreen = constraints.maxWidth > 900;

          // Build image widget with PageView for multiple images
          Widget buildImageWidget() {
            if (section.images.isEmpty) {
              return const SizedBox.shrink();
            }

            // For grid renderer, keep existing behavior
            if (section.imageRenderer == 'grid') {
              return GridView.builder(
                shrinkWrap: true,
                physics: const ClampingScrollPhysics(),
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

            // For list/default: use our new interactive gallery viewer
            return ImageGalleryViewer(
              images: section.images.map((img) => img.url).toList(),
              height: constraints.maxWidth > 900 ? 500 : 400,
            );
          }

          // Responsive layout: side-by-side on wide screens, stacked otherwise
          if (isWideScreen && section.images.isNotEmpty) {
            return Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Expanded(
                  flex: 1,
                  child: SingleChildScrollView(
                    physics: const BouncingScrollPhysics(),
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
                            textAlign: TextAlign.start,
                          ),
                        const SizedBox(height: 24),
                        MarkdownBody(
                          data: section.content,
                          styleSheet: MarkdownStyleSheet(
                            p: Theme.of(context).textTheme.bodyLarge?.copyWith(
                              fontSize: isWideScreen ? 22 : 18,
                              height: 1.6,
                            ),
                          ),
                          onTapLink: (text, href, title) {
                            if (href != null) {
                              _launchUrl(href);
                            }
                          },
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
                ),
                const SizedBox(width: 80), // More space
                Expanded(flex: 1, child: Center(child: buildImageWidget())),
              ],
            );
          } else {
            return NotificationListener<ScrollNotification>(
              onNotification: _handleScrollNotification,
              child: ListView(
                physics: const BouncingScrollPhysics(),
                children: [
                  if (section.title.isNotEmpty &&
                      section.title != 'Introduction')
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
                        height: 1.5,
                      ),
                    ),
                    onTapLink: (text, href, title) {
                      if (href != null) {
                        _launchUrl(href);
                      }
                    },
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
                  if (section.images.isNotEmpty) ...[
                    const SizedBox(height: 40),
                    buildImageWidget(),
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

  Widget _buildScreenshotsPage(BuildContext context, AppModel app) {
    return _buildPageContainer(
      context,
      NotificationListener<ScrollNotification>(
        onNotification: _handleScrollNotification,
        child: ListView(
          physics: const BouncingScrollPhysics(),
          children: [
            Text(
              'Screenshots',
              style: Theme.of(
                context,
              ).textTheme.displayMedium?.copyWith(fontWeight: FontWeight.bold),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 40),
            LayoutBuilder(
              builder: (context, constraints) {
                return ImageGalleryViewer(
                  images: app.screenshots.map((s) => s.url).toList(),
                  height: constraints.maxWidth > 900 ? 600 : 500,
                  viewportFraction: 0.8,
                );
              },
            ),
          ],
        ),
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

class ImageGalleryViewer extends StatefulWidget {
  final List<String> images;
  final double height;
  final double viewportFraction;

  const ImageGalleryViewer({
    super.key,
    required this.images,
    required this.height,
    this.viewportFraction = 1.0,
  });

  @override
  State<ImageGalleryViewer> createState() => _ImageGalleryViewerState();
}

class _ImageGalleryViewerState extends State<ImageGalleryViewer> {
  late PageController _pageController;
  int _currentPage = 0;

  @override
  void initState() {
    super.initState();
    _pageController = PageController(viewportFraction: widget.viewportFraction);
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  void _openFullScreenDialog(int initialIndex) {
    showDialog(
      context: context,
      useSafeArea: false,
      builder: (context) => FullScreenGalleryDialog(
        images: widget.images,
        initialIndex: initialIndex,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (widget.images.isEmpty) return const SizedBox.shrink();

    final hasMultiple = widget.images.length > 1;

    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        SizedBox(
          height: widget.height,
          child: Stack(
            children: [
              PageView.builder(
                controller: _pageController,
                physics: const ClampingScrollPhysics(),
                itemCount: widget.images.length,
                onPageChanged: (index) {
                  setState(() {
                    _currentPage = index;
                  });
                },
                itemBuilder: (context, index) {
                  return Padding(
                    padding: widget.viewportFraction < 1.0
                        ? const EdgeInsets.symmetric(horizontal: 16)
                        : const EdgeInsets.symmetric(horizontal: 8),
                    child: Center(
                      child: _InteractiveImage(
                        imageUrl: widget.images[index],
                        onTap: () => _openFullScreenDialog(index),
                      ),
                    ),
                  );
                },
              ),
              // Prev Button Overlay
              if (hasMultiple)
                Positioned(
                  left: 16,
                  top: 0,
                  bottom: 0,
                  child: Center(
                    child: IconButton.filled(
                      onPressed: () {
                        if (_currentPage > 0) {
                          _pageController.previousPage(
                            duration: const Duration(milliseconds: 300),
                            curve: Curves.easeInOut,
                          );
                        }
                      },
                      icon: const Icon(Icons.chevron_left),
                      style: IconButton.styleFrom(
                        backgroundColor: Colors.black54,
                        foregroundColor: Colors.white,
                      ),
                    ),
                  ),
                ),
              // Next Button Overlay
              if (hasMultiple)
                Positioned(
                  right: 16,
                  top: 0,
                  bottom: 0,
                  child: Center(
                    child: IconButton.filled(
                      onPressed: () {
                        if (_currentPage < widget.images.length - 1) {
                          _pageController.nextPage(
                            duration: const Duration(milliseconds: 300),
                            curve: Curves.easeInOut,
                          );
                        }
                      },
                      icon: const Icon(Icons.chevron_right),
                      style: IconButton.styleFrom(
                        backgroundColor: Colors.black54,
                        foregroundColor: Colors.white,
                      ),
                    ),
                  ),
                ),
            ],
          ),
        ),
        if (hasMultiple) ...[
          const SizedBox(height: 16),
          // Clickable Page indicators
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: List.generate(
              widget.images.length,
              (index) => GestureDetector(
                onTap: () {
                  _pageController.animateToPage(
                    index,
                    duration: const Duration(milliseconds: 300),
                    curve: Curves.easeInOut,
                  );
                },
                child: Container(
                  margin: const EdgeInsets.symmetric(
                    horizontal: 6,
                    vertical: 8,
                  ),
                  width: _currentPage == index ? 24 : 8,
                  height: 8,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(4),
                    color: _currentPage == index
                        ? Theme.of(context).colorScheme.primary
                        : Theme.of(
                            context,
                          ).colorScheme.onSurface.withValues(alpha: 0.3),
                  ),
                ),
              ),
            ),
          ),
        ],
      ],
    );
  }
}

class _InteractiveImage extends StatefulWidget {
  final String imageUrl;
  final VoidCallback onTap;

  const _InteractiveImage({required this.imageUrl, required this.onTap});

  @override
  State<_InteractiveImage> createState() => _InteractiveImageState();
}

class _InteractiveImageState extends State<_InteractiveImage> {
  bool _isHovering = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      onEnter: (_) => setState(() => _isHovering = true),
      onExit: (_) => setState(() => _isHovering = false),
      child: GestureDetector(
        onTap: widget.onTap,
        child: AnimatedScale(
          scale: _isHovering ? 1.03 : 1.0,
          duration: const Duration(milliseconds: 200),
          curve: Curves.easeOutCubic,
          child: Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(20),
              boxShadow: _isHovering
                  ? [
                      BoxShadow(
                        color: Colors.black.withValues(alpha: 0.2),
                        blurRadius: 20,
                        offset: const Offset(0, 10),
                      ),
                    ]
                  : [],
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(20),
              child: buildImage(widget.imageUrl, fit: BoxFit.contain),
            ),
          ),
        ),
      ),
    );
  }
}

class FullScreenGalleryDialog extends StatefulWidget {
  final List<String> images;
  final int initialIndex;

  const FullScreenGalleryDialog({
    super.key,
    required this.images,
    required this.initialIndex,
  });

  @override
  State<FullScreenGalleryDialog> createState() =>
      _FullScreenGalleryDialogState();
}

class _FullScreenGalleryDialogState extends State<FullScreenGalleryDialog> {
  late PageController _pageController;
  late int _currentPage;

  @override
  void initState() {
    super.initState();
    _currentPage = widget.initialIndex;
    _pageController = PageController(initialPage: _currentPage);
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Dialog.fullscreen(
      backgroundColor: Colors.black.withValues(alpha: 0.95),
      child: Stack(
        children: [
          // Main PageView
          PageView.builder(
            controller: _pageController,
            itemCount: widget.images.length,
            onPageChanged: (index) {
              setState(() {
                _currentPage = index;
              });
            },
            itemBuilder: (context, index) {
              return InteractiveViewer(
                // Enables pinch to zoom!
                minScale: 1.0,
                maxScale: 4.0,
                child: Padding(
                  padding: const EdgeInsets.all(40),
                  child: buildImage(widget.images[index], fit: BoxFit.contain),
                ),
              );
            },
          ),

          // Close button
          Positioned(
            top: 16,
            right: 16,
            child: IconButton(
              onPressed: () => Navigator.of(context).pop(),
              icon: const Icon(Icons.close, color: Colors.white, size: 32),
            ),
          ),

          // Prev Button
          if (widget.images.length > 1)
            Positioned(
              left: 16,
              top: 0,
              bottom: 0,
              child: Center(
                child: IconButton.filled(
                  onPressed: () {
                    if (_currentPage > 0) {
                      _pageController.previousPage(
                        duration: const Duration(milliseconds: 300),
                        curve: Curves.easeInOut,
                      );
                    }
                  },
                  icon: const Icon(Icons.chevron_left, size: 40),
                  style: IconButton.styleFrom(
                    backgroundColor: Colors.white24,
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.all(16),
                  ),
                ),
              ),
            ),

          // Next Button
          if (widget.images.length > 1)
            Positioned(
              right: 16,
              top: 0,
              bottom: 0,
              child: Center(
                child: IconButton.filled(
                  onPressed: () {
                    if (_currentPage < widget.images.length - 1) {
                      _pageController.nextPage(
                        duration: const Duration(milliseconds: 300),
                        curve: Curves.easeInOut,
                      );
                    }
                  },
                  icon: const Icon(Icons.chevron_right, size: 40),
                  style: IconButton.styleFrom(
                    backgroundColor: Colors.white24,
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.all(16),
                  ),
                ),
              ),
            ),

          // Bottom Indicators
          if (widget.images.length > 1)
            Positioned(
              bottom: 30,
              left: 0,
              right: 0,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: List.generate(
                  widget.images.length,
                  (index) => GestureDetector(
                    onTap: () {
                      _pageController.animateToPage(
                        index,
                        duration: const Duration(milliseconds: 300),
                        curve: Curves.easeInOut,
                      );
                    },
                    child: Container(
                      margin: const EdgeInsets.symmetric(horizontal: 6),
                      width: _currentPage == index ? 24 : 8,
                      height: 8,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(4),
                        color: _currentPage == index
                            ? Colors.white
                            : Colors.white38,
                      ),
                    ),
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}
