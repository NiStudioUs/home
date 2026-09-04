import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:palette_generator/palette_generator.dart';
import '../../models/data_model.dart';
import '../widgets/app_tile.dart';
import '../widgets/learning_project_card.dart';
import '../widgets/flutter_app_card.dart';
import '../widgets/image_helper.dart';

import '../../services/current_app_service.dart';
import '../../services/theme_service.dart';
import '../../utils/url_helper.dart';
import '../../utils/constants.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Provider.of<CurrentAppService>(context, listen: false).clearApp();
      _extractThemeColor();
    });
  }

  Future<void> _extractThemeColor() async {
    try {
      final dataModel = Provider.of<DataModel>(context, listen: false);
      final bannerUrl = dataModel.developer.bannerUrl;
      if (bannerUrl.isNotEmpty) {
        final imageProvider = getImageProvider(bannerUrl);
        final palette = await PaletteGenerator.fromImageProvider(imageProvider);
        if (palette.dominantColor != null && mounted) {
          Provider.of<ThemeService>(context, listen: false).updateSeedColor(palette.dominantColor!.color);
        }
      }
    } catch (e) {
      debugPrint('Failed to extract color: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    final dataModel = Provider.of<DataModel>(context);
    final developer = dataModel.developer;
    final demoApps = dataModel.apps.where((a) => a.demoUrl.isNotEmpty).toList();

    return Title(
      title: "Ni Studio Us",
      color: Theme.of(context).primaryColor,
      child: SingleChildScrollView(
        child: Column(
          children: [
            // Cinematic Full-Bleed Hero Section
            SizedBox(
              width: double.infinity,
              height: 450,
              child: Stack(
                fit: StackFit.expand,
                children: [
                  if (developer.bannerUrl.isNotEmpty)
                    Image(
                      image: getImageProvider(developer.bannerUrl),
                      fit: BoxFit.cover,
                    ).animate().fadeIn(duration: 800.ms)
                  else
                    Container(color: Theme.of(context).colorScheme.primaryContainer),
                  // Gradient Overlay for smooth transition
                  Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [
                          Theme.of(context).colorScheme.surface.withValues(alpha: 0.1),
                          Theme.of(context).colorScheme.surface.withValues(alpha: 0.7),
                          Theme.of(context).colorScheme.surface,
                        ],
                        stops: const [0.0, 0.6, 1.0],
                      ),
                    ),
                  ),
                  // Content
                  Center(
                    child: ConstrainedBox(
                      constraints: const BoxConstraints(maxWidth: 1200),
                      child: Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 20),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const SizedBox(height: 40),
                            InkWell(
                              onTap: () => launchUrl(
                                Uri.parse(UrlHelper.resolve('./profile/index.html')),
                              ),
                              borderRadius: BorderRadius.circular(80),
                              child: Hero(
                                tag: 'avatar',
                                child: Material(
                                  elevation: 12,
                                  shadowColor: Theme.of(context).colorScheme.primary.withValues(alpha: 0.5),
                                  shape: const CircleBorder(),
                                  child: CircleAvatar(
                                    radius: 70,
                                    backgroundImage: developer.avatarUrl.isNotEmpty
                                        ? getImageProvider(developer.avatarUrl)
                                        : null,
                                    onBackgroundImageError: developer.avatarUrl.isNotEmpty ? (_, _) {} : null,
                                    child: developer.avatarUrl.isEmpty
                                        ? Text(developer.name[0], style: const TextStyle(fontSize: 48))
                                        : null,
                                  ),
                                ),
                              ),
                            ).animate().scale(delay: 200.ms, duration: 500.ms, curve: Curves.easeOutBack),
                            const SizedBox(height: 24),
                            Text(
                              developer.name,
                              style: Theme.of(context).textTheme.displayMedium?.copyWith(
                                    fontWeight: FontWeight.w900,
                                    color: Theme.of(context).colorScheme.onSurface,
                                    letterSpacing: -1,
                                  ),
                              textAlign: TextAlign.center,
                            ).animate().fadeIn(delay: 400.ms).slideY(begin: 0.2),
                            const SizedBox(height: 8),
                            Text(
                              developer.role,
                              style: Theme.of(context).textTheme.titleLarge?.copyWith(
                                    color: Theme.of(context).colorScheme.primary,
                                    fontWeight: FontWeight.bold,
                                  ),
                              textAlign: TextAlign.center,
                            ).animate().fadeIn(delay: 500.ms).slideY(begin: 0.2),
                            const SizedBox(height: 16),
                            Text(
                              developer.bio,
                              textAlign: TextAlign.center,
                              style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                                    color: Theme.of(context).colorScheme.onSurfaceVariant,
                                  ),
                            ).animate().fadeIn(delay: 600.ms).slideY(begin: 0.2),
                            const SizedBox(height: 24),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: dataModel.socialLinks.map((link) {
                                return Padding(
                                  padding: const EdgeInsets.symmetric(horizontal: 8.0),
                                  child: IconButton(
                                    icon: FaIcon(_getSocialIcon(link.icon)),
                                    color: Theme.of(context).colorScheme.onSurface,
                                    onPressed: () => _launchUrl(link.url),
                                    tooltip: link.platform,
                                    style: IconButton.styleFrom(
                                      backgroundColor: Theme.of(context).colorScheme.surfaceContainerHighest,
                                    ),
                                  ),
                                );
                              }).toList(),
                            ).animate().fadeIn(delay: 700.ms),
                          ],
                        ),
                      ),
                    ),
                  ),
                  if (developer.badge.url.isNotEmpty)
                    Positioned(
                      bottom: 20,
                      right: 20,
                      child: _DeveloperBadge(developer: developer).animate().fadeIn(delay: 800.ms),
                    ),
                ],
              ),
            ),

            // Main Body constrained to 1200px width
            Center(
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 1200),
                child: Column(
                  children: [
                    const SizedBox(height: 60),

            // Apps Section
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Apps',
                    style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 10),
                  const Divider(),
                  const SizedBox(height: 20),
                  LayoutBuilder(
                    builder: (context, constraints) {
                      // Responsive Grid
                      int crossAxisCount = 1;
                      if (constraints.maxWidth > 1200) {
                        crossAxisCount = 4;
                      } else if (constraints.maxWidth > 800) {
                        crossAxisCount = 3;
                      } else if (constraints.maxWidth > 600) {
                        crossAxisCount = 2;
                      }

                      return GridView.builder(
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: crossAxisCount,
                          childAspectRatio: 0.8,
                          crossAxisSpacing: 20,
                          mainAxisSpacing: 20,
                        ),
                        itemCount: dataModel.apps.length,
                        itemBuilder: (context, index) {
                          return AppTile(app: dataModel.apps[index]);
                        },
                      );
                    },
                  ),
                ],
              ),
            ),
            const SizedBox(height: 60),

            // Demo Apps Section
            if (demoApps.isNotEmpty) ...[
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Just Explore the Demo Apps',
                      style: Theme.of(context).textTheme.titleLarge?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Try out the live web versions of our apps directly in your browser.',
                      style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                        color: Theme.of(context).colorScheme.onSurfaceVariant,
                      ),
                    ),
                    const SizedBox(height: 20),
                    const Divider(),
                    const SizedBox(height: 20),
                    LayoutBuilder(
                      builder: (context, constraints) {
                        int crossAxisCount = 1;
                        if (constraints.maxWidth > 1200) {
                          crossAxisCount = 4;
                        } else if (constraints.maxWidth > 800) {
                          crossAxisCount = 3;
                        } else if (constraints.maxWidth > 600) {
                          crossAxisCount = 2;
                        }

                        return GridView.builder(
                          shrinkWrap: true,
                          physics: const NeverScrollableScrollPhysics(),
                          gridDelegate:
                              SliverGridDelegateWithFixedCrossAxisCount(
                                crossAxisCount: crossAxisCount,
                                childAspectRatio: 0.8,
                                crossAxisSpacing: 24,
                                mainAxisSpacing: 24,
                              ),
                          itemCount: demoApps.length,
                          itemBuilder: (context, index) {
                            return _DemoAppCard(app: demoApps[index]);
                          },
                        );
                      },
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 60),
            ],

            // Live Apps Section
            if (dataModel.flutterApps.isNotEmpty) ...[
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Live Apps',
                      style: Theme.of(context).textTheme.titleLarge?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Fully functional web apps built with Flutter.',
                      style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                        color: Theme.of(context).colorScheme.onSurfaceVariant,
                      ),
                    ),
                    const SizedBox(height: 20),
                    const Divider(),
                    const SizedBox(height: 20),
                    LayoutBuilder(
                      builder: (context, constraints) {
                        int crossAxisCount = 1;
                        if (constraints.maxWidth > 1200) {
                          crossAxisCount = 4;
                        } else if (constraints.maxWidth > 800) {
                          crossAxisCount = 3;
                        } else if (constraints.maxWidth > 600) {
                          crossAxisCount = 2;
                        }

                        return GridView.builder(
                          shrinkWrap: true,
                          physics: const NeverScrollableScrollPhysics(),
                          gridDelegate:
                              SliverGridDelegateWithFixedCrossAxisCount(
                                crossAxisCount: crossAxisCount,
                                childAspectRatio: 0.8,
                                crossAxisSpacing: 24,
                                mainAxisSpacing: 24,
                              ),
                          itemCount: dataModel.flutterApps.length,
                          itemBuilder: (context, index) {
                            return FlutterAppCard(
                              app: dataModel.flutterApps[index],
                            );
                          },
                        );
                      },
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 60),
            ],

            // Learning Hub Section
            if (dataModel.learningProjects.isNotEmpty) ...[
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Learning Hub',
                      style: Theme.of(context).textTheme.titleLarge?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'A centralized portfolio of my development projects, experiments, and learning milestones.',
                      style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                        color: Theme.of(context).colorScheme.onSurfaceVariant,
                      ),
                    ),
                    const SizedBox(height: 20),
                    const Divider(),
                    const SizedBox(height: 20),
                    LayoutBuilder(
                      builder: (context, constraints) {
                        int crossAxisCount = 1;
                        if (constraints.maxWidth > 1200) {
                          crossAxisCount = 4;
                        } else if (constraints.maxWidth > 800) {
                          crossAxisCount = 3;
                        } else if (constraints.maxWidth > 600) {
                          crossAxisCount = 2;
                        }

                        return GridView.builder(
                          shrinkWrap: true,
                          physics: const NeverScrollableScrollPhysics(),
                          gridDelegate:
                              SliverGridDelegateWithFixedCrossAxisCount(
                                crossAxisCount: crossAxisCount,
                                childAspectRatio: 0.8,
                                crossAxisSpacing: 24,
                                mainAxisSpacing: 24,
                              ),
                          itemCount: dataModel.learningProjects.length,
                          itemBuilder: (context, index) {
                            return LearningProjectCard(
                              project: dataModel.learningProjects[index],
                            );
                          },
                        );
                      },
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 60),
            ],
                  ],
                ),
              ),
            ),
            // Modern Footer
            Container(
              width: double.infinity,
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    Theme.of(context).colorScheme.surface,
                    Theme.of(context).colorScheme.surfaceContainerHighest,
                  ],
                ),
              ),
              child: Column(
                children: [
                  Container(
                    constraints: const BoxConstraints(maxWidth: 1200),
                    padding: const EdgeInsets.symmetric(
                      vertical: 60,
                      horizontal: 20,
                    ),
                    child: LayoutBuilder(
                      builder: (context, constraints) {
                        final isWide = constraints.maxWidth > 800;

                        return Column(
                          children: [
                            // Footer Header
                            Column(
                              children: [
                                CircleAvatar(
                                  radius: 30,
                                  backgroundImage:
                                      developer.avatarUrl.isNotEmpty
                                      ? getImageProvider(developer.avatarUrl)
                                      : null,
                                  child: developer.avatarUrl.isEmpty
                                      ? Text(
                                          developer.name[0],
                                          style: const TextStyle(fontSize: 24),
                                        )
                                      : null,
                                ),
                                const SizedBox(height: 16),
                                Text(
                                  developer.name,
                                  style: Theme.of(context)
                                      .textTheme
                                      .headlineSmall
                                      ?.copyWith(fontWeight: FontWeight.bold),
                                ),
                                const SizedBox(height: 8),
                                Text(
                                  developer.role,
                                  style: Theme.of(context).textTheme.bodyMedium
                                      ?.copyWith(
                                        color: Theme.of(
                                          context,
                                        ).colorScheme.onSurfaceVariant,
                                      ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 48),

                            // Legal Links Section
                            if (isWide)
                              // Desktop Layout
                              Row(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Expanded(
                                    child: _FooterSection(
                                      title: 'Privacy Policies',
                                      icon: Icons.privacy_tip_outlined,
                                      items: dataModel.apps
                                          .map(
                                            (app) => _FooterLink(
                                              label: app.name,
                                              onTap: () => context.go(
                                                '/app/${app.id}/privacy',
                                              ),
                                            ),
                                          )
                                          .toList(),
                                    ),
                                  ),
                                  const SizedBox(width: 60),
                                  Expanded(
                                    child: _FooterSection(
                                      title: 'Terms & Conditions',
                                      icon: Icons.description_outlined,
                                      items: dataModel.apps
                                          .map(
                                            (app) => _FooterLink(
                                              label: app.name,
                                              onTap: () => context.go(
                                                '/app/${app.id}/terms',
                                              ),
                                            ),
                                          )
                                          .toList(),
                                    ),
                                  ),
                                ],
                              )
                            else
                              // Mobile Layout
                              Column(
                                children: [
                                  _FooterSection(
                                    title: 'Privacy Policies',
                                    icon: Icons.privacy_tip_outlined,
                                    items: dataModel.apps
                                        .map(
                                          (app) => _FooterLink(
                                            label: app.name,
                                            onTap: () => context.go(
                                              '/app/${app.id}/privacy',
                                            ),
                                          ),
                                        )
                                        .toList(),
                                  ),
                                  const SizedBox(height: 40),
                                  _FooterSection(
                                    title: 'Terms & Conditions',
                                    icon: Icons.description_outlined,
                                    items: dataModel.apps
                                        .map(
                                          (app) => _FooterLink(
                                            label: app.name,
                                            onTap: () => context.go(
                                              '/app/${app.id}/terms',
                                            ),
                                          ),
                                        )
                                        .toList(),
                                  ),
                                ],
                              ),

                            const SizedBox(height: 48),

                            // Social Links
                            Wrap(
                              spacing: 16,
                              runSpacing: 16,
                              alignment: WrapAlignment.center,
                              children: dataModel.socialLinks.map((link) {
                                return IconButton(
                                  icon: FaIcon(
                                    _getSocialIcon(link.icon),
                                    size: 20,
                                  ),
                                  onPressed: () => _launchUrl(link.url),
                                  tooltip: link.platform,
                                  style: IconButton.styleFrom(
                                    backgroundColor: Theme.of(
                                      context,
                                    ).colorScheme.surfaceContainerHigh,
                                  ),
                                );
                              }).toList(),
                            ),

                            const SizedBox(height: 32),

                            // Divider
                            Divider(
                              color: Theme.of(context)
                                  .colorScheme
                                  .outlineVariant
                                  .withValues(alpha: 0.5),
                            ),

                            const SizedBox(height: 24),

                            // Copyright
                            Text(
                              '© ${DateTime.now().year} ${developer.name}. All rights reserved.',
                              style: Theme.of(context).textTheme.bodySmall
                                  ?.copyWith(
                                    color: Theme.of(
                                      context,
                                    ).colorScheme.onSurfaceVariant,
                                  ),
                              textAlign: TextAlign.center,
                            ),
                          ],
                        );
                      },
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  dynamic _getSocialIcon(String iconName) {
    switch (iconName.toLowerCase()) {
      case 'github':
        return FontAwesomeIcons.github;
      case 'linkedin':
        return FontAwesomeIcons.linkedin;
      case 'twitter':
        return FontAwesomeIcons.xTwitter;
      case 'instagram':
        return FontAwesomeIcons.instagram;
      case 'facebook':
        return FontAwesomeIcons.facebook;
      default:
        return FontAwesomeIcons.link;
    }
  }

  Future<void> _launchUrl(String url) async {
    final uri = Uri.parse(url);
    if (!await launchUrl(uri)) {
      throw Exception('Could not launch $url');
    }
  }
}

class _DeveloperBadge extends StatefulWidget {
  final Developer developer;
  const _DeveloperBadge({required this.developer});

  @override
  State<_DeveloperBadge> createState() => _DeveloperBadgeState();
}

class _DeveloperBadgeState extends State<_DeveloperBadge> {
  bool _isHovering = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovering = true),
      onExit: (_) => setState(() => _isHovering = false),
      child: InkWell(
        onTap: () =>
            launchUrl(Uri.parse(UrlHelper.resolve('./profile/index.html'))),
        borderRadius: BorderRadius.circular(20),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
          decoration: BoxDecoration(
            color: _isHovering
                ? Theme.of(context).colorScheme.secondaryContainer
                : Colors.transparent,
            borderRadius: BorderRadius.circular(20),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              CircleAvatar(
                radius: 12,
                backgroundImage: getImageProvider(widget.developer.badge.url),
              ),
              if (_isHovering && widget.developer.shortName.isNotEmpty) ...[
                const SizedBox(width: 8),
                Text(
                  widget.developer.shortName,
                  style: Theme.of(context).textTheme.labelLarge?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: Theme.of(context).colorScheme.onSecondaryContainer,
                  ),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}

// Footer Section Widget
class _FooterSection extends StatelessWidget {
  final String title;
  final IconData icon;
  final List<_FooterLink> items;

  const _FooterSection({
    required this.title,
    required this.icon,
    required this.items,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        // Section Header
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          decoration: BoxDecoration(
            color: Theme.of(
              context,
            ).colorScheme.primaryContainer.withValues(alpha: 0.5),
            borderRadius: BorderRadius.circular(20),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                icon,
                size: 18,
                color: Theme.of(context).colorScheme.primary,
              ),
              const SizedBox(width: 8),
              Text(
                title,
                style: Theme.of(context).textTheme.titleSmall?.copyWith(
                  fontWeight: FontWeight.w600,
                  color: Theme.of(context).colorScheme.primary,
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 20),
        // Links
        ...items.map(
          (item) => Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: InkWell(
              onTap: item.onTap,
              borderRadius: BorderRadius.circular(8),
              child: Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 12,
                  vertical: 8,
                ),
                child: Text(
                  item.label,
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: Theme.of(context).colorScheme.onSurfaceVariant,
                  ),
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}

// Footer Link Data Class
class _FooterLink {
  final String label;
  final VoidCallback onTap;

  const _FooterLink({required this.label, required this.onTap});
}

class _DemoAppCard extends StatefulWidget {
  final AppModel app;
  const _DemoAppCard({required this.app});

  @override
  State<_DemoAppCard> createState() => _DemoAppCardState();
}

class _DemoAppCardState extends State<_DemoAppCard> {
  bool _isHovered = false;

  Future<void> _launchUrl() async {
    final url = Uri.parse(UrlHelper.resolve(widget.app.demoUrl));
    if (!await launchUrl(url)) {
      throw Exception('Could not launch ${widget.app.demoUrl}');
    }
  }

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeOutCubic,
        transform: Matrix4.translationValues(0.0, _isHovered ? -8.0 : 0.0, 0.0)
          ..multiply(Matrix4.diagonal3Values(_isHovered ? 1.02 : 1.0, _isHovered ? 1.02 : 1.0, 1.0)),
        decoration: BoxDecoration(
          color: Theme.of(context).colorScheme.surface,
          borderRadius: BorderRadius.circular(32),
          boxShadow: [
            BoxShadow(
              color: _isHovered
                  ? Theme.of(context).colorScheme.primary.withValues(alpha: 0.15)
                  : Colors.black.withValues(alpha: 0.05),
              blurRadius: _isHovered ? 20 : 10,
              offset: Offset(0, _isHovered ? 10 : 4),
            ),
          ],
          border: Border.all(
            color: _isHovered
                ? Theme.of(context).colorScheme.primary.withValues(alpha: 0.5)
                : Theme.of(context).colorScheme.outlineVariant.withValues(alpha: 0.5),
            width: 1.5,
          ),
        ),
        clipBehavior: Clip.antiAlias,
        child: Stack(
          fit: StackFit.passthrough,
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Expanded(
                  child: Container(
                    color: Theme.of(context).colorScheme.surfaceContainerHighest,
                    child: Stack(
                      fit: StackFit.expand,
                      children: [
                        if (widget.app.iconUrl.isNotEmpty)
                          Transform.scale(
                            scale: UIConstants.cardImageScale,
                            child: Image(
                              image: getImageProvider(widget.app.iconUrl),
                              fit: BoxFit.cover,
                            ),
                          )
                        else
                          const Center(
                            child: Icon(Icons.play_circle_fill, size: 48),
                          ),
                        Positioned(
                          top: 16,
                          right: 16,
                          child: Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 12,
                              vertical: 6,
                            ),
                            decoration: BoxDecoration(
                              color: Theme.of(context).colorScheme.primary,
                              borderRadius: BorderRadius.circular(20),
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.black.withValues(alpha: 0.2),
                                  blurRadius: 8,
                                  offset: const Offset(0, 4),
                                ),
                              ],
                            ),
                            child: Text(
                              'LIVE DEMO',
                              style: Theme.of(context).textTheme.labelSmall
                                  ?.copyWith(
                                    fontWeight: FontWeight.bold,
                                    color: Theme.of(context).colorScheme.onPrimary,
                                  ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                Container(
                  color: Theme.of(context).colorScheme.surface,
                  padding: const EdgeInsets.all(24.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        widget.app.name,
                        style: Theme.of(context).textTheme.titleLarge?.copyWith(
                          fontWeight: FontWeight.w900,
                          letterSpacing: -0.5,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ],
                  ),
                ),
              ],
            ),
            Positioned.fill(
              child: Material(
                color: Colors.transparent,
                child: InkWell(
                  onTap: _launchUrl,
                  hoverColor: Theme.of(context).colorScheme.primary.withValues(alpha: 0.1),
                  splashColor: Theme.of(context).colorScheme.primary.withValues(alpha: 0.2),
                  highlightColor: Theme.of(context).colorScheme.primary.withValues(alpha: 0.1),
                ),
              ),
            ),
          ],
        ),
      ),
    ).animate().fadeIn(duration: 500.ms).slideY(begin: 0.1);
  }
}
