import 'dart:async';
import 'package:flutter/material.dart';
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
  int _currentScreenshot = 0;

  // Helper to detect scroll boundary and change page
  bool _handleScrollNotification(ScrollNotification notification) {
    if (notification is ScrollUpdateNotification) {
      final metrics = notification.metrics;

      // Check if we're at the top and trying to scroll up
      if (metrics.pixels <= metrics.minScrollExtent &&
          notification.scrollDelta! < 0) {
        // At top, scrolling up -> go to previous page
        final currentPage = _pageController.page?.round() ?? 0;
        if (currentPage > 0) {
          _pageController.animateToPage(
            currentPage - 1,
            duration: const Duration(milliseconds: 300),
            curve: Curves.easeOut,
          );
        }
        return true;
      }

      // Check if we're at the bottom and trying to scroll down
      if (metrics.pixels >= metrics.maxScrollExtent &&
          notification.scrollDelta! > 0) {
        // At bottom, scrolling down -> go to next page
        final currentPage = _pageController.page?.round() ?? 0;
        _pageController.animateToPage(
          currentPage + 1,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
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
      // TODO: Navigation to specific sections needs to be reimplemented with ScrollController
      // if this feature is needed
      /* _navSubscription = Provider.of<CurrentAppService>(context, listen: false)
          .navigationEvents
          .listen((featureTitle) {
            if (featureTitle == 'TOP') {
              // Scroll to top
            } else if (_featureMap.containsKey(featureTitle)) {
              // Scroll to specific section
            }
          }); */
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
            PageView(
              controller: _pageController,
              scrollDirection: Axis.vertical,
              physics: const PageScrollPhysics(),
              children: pages,
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

            // For list/default: use PageView with indicators if multiple images
            if (section.images.length == 1) {
              return Center(
                child: ConstrainedBox(
                  constraints: BoxConstraints(
                    maxHeight: constraints.maxHeight * 0.8,
                    minHeight: 200,
                  ),
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(20),
                    child: buildImage(
                      section.images[0].url,
                      fit: BoxFit.contain,
                    ),
                  ),
                ),
              );
            }

            // Multiple images: use PageView with indicators
            final pageController = PageController();
            return StatefulBuilder(
              builder: (context, setState) {
                int currentPage = 0;

                return Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    SizedBox(
                      height: constraints.maxWidth > 900 ? 500 : 400,
                      child: PageView.builder(
                        controller: pageController,
                        physics: const ClampingScrollPhysics(),
                        itemCount: section.images.length,
                        onPageChanged: (index) {
                          setState(() {
                            currentPage = index;
                          });
                        },
                        itemBuilder: (context, i) {
                          return Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 8),
                            child: ClipRRect(
                              borderRadius: BorderRadius.circular(20),
                              child: buildImage(
                                section.images[i].url,
                                fit: BoxFit.contain,
                              ),
                            ),
                          );
                        },
                      ),
                    ),
                    const SizedBox(height: 16),
                    // Page indicators
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: List.generate(
                        section.images.length,
                        (index) => Container(
                          margin: const EdgeInsets.symmetric(horizontal: 4),
                          width: 8,
                          height: 8,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: currentPage == index
                                ? Theme.of(context).colorScheme.primary
                                : Theme.of(context).colorScheme.onSurface
                                      .withValues(alpha: 0.3),
                          ),
                        ),
                      ),
                    ),
                  ],
                );
              },
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
                return SizedBox(
                  height: constraints.maxWidth > 900 ? 600 : 500,
                  child: PageView.builder(
                    controller: _screenshotController,
                    scrollDirection: Axis.horizontal,
                    itemCount: app.screenshots.length,
                    onPageChanged: (index) {
                      setState(() {
                        _currentScreenshot = index;
                      });
                    },
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
                );
              },
            ),
            const SizedBox(height: 24),
            // Page indicators
            if (app.screenshots.length > 1)
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: List.generate(
                  app.screenshots.length,
                  (index) => Container(
                    margin: const EdgeInsets.symmetric(horizontal: 4),
                    width: 8,
                    height: 8,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: _currentScreenshot == index
                          ? Theme.of(context).colorScheme.primary
                          : Theme.of(
                              context,
                            ).colorScheme.onSurface.withValues(alpha: 0.3),
                    ),
                  ),
                ),
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
