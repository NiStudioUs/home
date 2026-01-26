import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:go_router/go_router.dart';
import '../../models/data_model.dart';
import '../widgets/app_tile.dart';
import '../widgets/image_helper.dart';

import '../../services/current_app_service.dart';

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
    });
  }

  @override
  Widget build(BuildContext context) {
    final dataModel = Provider.of<DataModel>(context);
    final developer = dataModel.developer;

    return Title(
      title: "Ni Studio Us",
      color: Theme.of(context).primaryColor,
      child: SingleChildScrollView(
        child: Column(
          children: [
            // Hero Section
            Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(vertical: 60, horizontal: 20),
              decoration: BoxDecoration(
                image: developer.bannerUrl.isNotEmpty
                    ? DecorationImage(
                        image: getImageProvider(developer.bannerUrl),
                        fit: BoxFit.cover,
                        colorFilter: ColorFilter.mode(
                          Colors.black.withValues(alpha: 0.5),
                          BlendMode.darken,
                        ),
                      )
                    : null,
                color: developer.bannerUrl.isEmpty
                    ? Theme.of(
                        context,
                      ).colorScheme.primaryContainer.withValues(alpha: 0.3)
                    : null,
              ),
              child: Stack(
                children: [
                  Column(
                    children: [
                      CircleAvatar(
                        radius: 60,
                        backgroundImage: developer.avatarUrl.isNotEmpty
                            ? getImageProvider(developer.avatarUrl)
                            : null,
                        onBackgroundImageError: developer.avatarUrl.isNotEmpty
                            ? (_, _) {}
                            : null,
                        child: developer.avatarUrl.isEmpty
                            ? Text(
                                developer.name[0],
                                style: const TextStyle(fontSize: 40),
                              )
                            : null,
                      ),
                      const SizedBox(height: 20),
                      if (developer.bannerUrl.isEmpty) ...[
                        Text(
                          developer.name,
                          style: Theme.of(context).textTheme.displaySmall
                              ?.copyWith(
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                              ),
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: 10),
                        Text(
                          developer.role,
                          style: Theme.of(context).textTheme.titleMedium
                              ?.copyWith(color: Colors.white70),
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: 20),
                        Text(
                          developer.bio,
                          textAlign: TextAlign.center,
                          style: Theme.of(
                            context,
                          ).textTheme.bodyLarge?.copyWith(color: Colors.white),
                        ),
                        const SizedBox(height: 30),
                      ],
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: dataModel.socialLinks.map((link) {
                          return Padding(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 8.0,
                            ),
                            child: IconButton(
                              icon: FaIcon(
                                _getSocialIcon(link.icon),
                                color: Colors.white,
                              ),
                              onPressed: () => _launchUrl(link.url),
                              tooltip: link.platform,
                            ),
                          );
                        }).toList(),
                      ),
                    ],
                  ),
                  if (developer.badge.url.isNotEmpty)
                    Positioned(
                      bottom: 0,
                      right: 0,
                      child: _DeveloperBadge(developer: developer),
                    ),
                ],
              ),
            ),

            const SizedBox(height: 40),

            // Apps Section
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Apps',
                    style: Theme.of(context).textTheme.headlineMedium?.copyWith(
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

  IconData _getSocialIcon(String iconName) {
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
