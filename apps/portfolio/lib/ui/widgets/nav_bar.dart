import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:provider/provider.dart';
import '../../utils/url_helper.dart';

import '../../models/data_model.dart';
import '../../services/theme_service.dart';
import '../../utils/easter_egg.dart';
import '../../services/current_app_service.dart';
import '../widgets/image_helper.dart';

class NavBar extends StatelessWidget {
  const NavBar({super.key});

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth > 700) {
          return const _DesktopNavBar();
        } else {
          return const _MobileNavBar();
        }
      },
    );
  }
}

class _DesktopNavBar extends StatelessWidget {
  const _DesktopNavBar();

  @override
  Widget build(BuildContext context) {
    final dataModel = Provider.of<DataModel>(context);
    final themeService = Provider.of<ThemeService>(context);
    final currentAppService = Provider.of<CurrentAppService>(
      context,
    );
    final currentApp = currentAppService.currentApp;

    List<AppFeature> featuresToShow = [];
    if (currentApp != null) {
      if (currentAppService.pageType == PageType.app) {
        featuresToShow = currentApp.features;
      } else if (currentAppService.pageType == PageType.privacy) {
        featuresToShow = currentApp.privacyPolicy.features;
      } else if (currentAppService.pageType == PageType.terms) {
        featuresToShow = currentApp.termsAndConditions.features;
      }
    }

    return ClipRect(
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
          decoration: BoxDecoration(
            color: Theme.of(context).colorScheme.surface.withValues(alpha: 0.6),
            border: Border(
              bottom: BorderSide(
                color: Theme.of(context).colorScheme.outline.withValues(alpha: 0.1),
                width: 1,
              ),
            ),
          ),
      child: Row(
        children: [
          // Home Icon (No Pill)
          IconButton(
            onPressed: () {
              if (EasterEgg.handle('name')) {
                launchUrl(Uri.parse(UrlHelper.resolve('./profile/index.html#/dev')));
              } else {
                context.go('/');
              }
            },
            icon: Icon(
              Icons.home_rounded,
              size: 28,
              color: Theme.of(context).colorScheme.onSurface,
            ),
            tooltip: 'Home',
          ),

          // Breadcrumb
          if (currentApp != null) ...[
            const SizedBox(width: 8),
            Icon(
              Icons.chevron_right,
              size: 20,
              color: Theme.of(
                context,
              ).colorScheme.onSurface.withValues(alpha: 0.5),
            ),
            const SizedBox(width: 8),
            InkWell(
              onTap: () {
                currentAppService.scrollToTop();
              },
              child: Row(
                children: [
                  if (currentApp.iconUrl.isNotEmpty) ...[
                    // Tiny icon
                    Container(
                      width: 20,
                      height: 20,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(4),
                        image: DecorationImage(
                          image: getImageProvider(currentApp.iconUrl),
                          fit: BoxFit.cover,
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                  ],
                  Text(
                    currentApp.name,
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      color: Theme.of(context).colorScheme.onSurface,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),
          ],

          // Push all menus to the end
          const Spacer(),

          // Features/Links Dropdown (Dynamic)
          if (featuresToShow.isNotEmpty) ...[
            PopupMenuButton<String>(
              position: PopupMenuPosition.under,
              clipBehavior: Clip.antiAlias,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              tooltip: currentAppService.pageType == PageType.app ? 'Features' : 'On this page',
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                child: Row(
                  children: [
                    Text(
                      currentAppService.pageType == PageType.app
                          ? 'Features'
                          : 'On this page',
                      style: TextStyle(color: Theme.of(context).colorScheme.onSurface, fontWeight: FontWeight.bold),
                    ),
                    Icon(Icons.arrow_drop_down, color: Theme.of(context).colorScheme.onSurface),
                  ],
                ),
              ),
              onSelected: (title) => currentAppService.navigateToFeature(title),
              itemBuilder: (context) {
                return featuresToShow.where((f) => f.hide != true).map((feature) {
                  return PopupMenuItem<String>(
                    value: feature.title,
                    child: Text(feature.title),
                  );
                }).toList();
              },
            ),
            const SizedBox(width: 16),
          ],

          // Apps Dropdown
          if (currentApp == null) ...[
            _AppsDropdown(apps: dataModel.apps),
            const SizedBox(width: 16),
          ],

          // How To
          TextButton(
            onPressed: () => context.go('/howto'),
            style: TextButton.styleFrom(
              foregroundColor: Theme.of(context).colorScheme.onSurface,
              textStyle: const TextStyle(fontWeight: FontWeight.bold),
            ),
            child: const Text('How to'),
          ),
          const SizedBox(width: 16),

          // Legal Dropdown
          _LegalDropdown(apps: dataModel.apps),
          const SizedBox(width: 16),

          // Theme Toggle
          IconButton(
            icon: Icon(
              themeService.isDarkMode ? Icons.light_mode : Icons.dark_mode,
              color: Theme.of(context).colorScheme.onSurface,
            ),
            tooltip: 'Toggle Theme',
            onPressed: () {
              if (EasterEgg.handle('theme')) {
                launchUrl(Uri.parse(UrlHelper.resolve('./profile/index.html#/dev')));
              } else {
                themeService.toggleTheme();
              }
            },
          ),
          const SizedBox(width: 8),

          // Developer Profile Icon
          IconButton(
            icon: Icon(
              Icons.person,
              color: Theme.of(context).colorScheme.onSurface,
            ),
            tooltip: 'Developer Profile',
            onPressed: () => launchUrl(Uri.parse(UrlHelper.resolve('./profile/index.html'))),
          ),
        ],
      ),
    ),
  ),
);
}
}

class _MobileNavBar extends StatelessWidget {
  const _MobileNavBar();

  @override
  Widget build(BuildContext context) {
    final dataModel = Provider.of<DataModel>(context);
    final themeService = Provider.of<ThemeService>(context);

    return AppBar(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      elevation: 0,
      bottom: PreferredSize(
        preferredSize: const Size.fromHeight(1.0),
        child: Container(
          color: Theme.of(context).colorScheme.outline.withValues(alpha: 0.2),
          height: 1.0,
        ),
      ),
      title: GestureDetector(
        onTap: () {
          if (EasterEgg.handle('name')) {
            launchUrl(Uri.parse(UrlHelper.resolve('./profile/index.html#/dev')));
          } else {
            context.go('/');
          }
        },
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
          decoration: BoxDecoration(
            color: Theme.of(context).colorScheme.surfaceContainerHighest.withValues(alpha: 0.6),
            borderRadius: BorderRadius.circular(20),
            border: Border.all(
              color: Theme.of(context).colorScheme.outline.withValues(alpha: 0.2),
              width: 1,
            ),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                Icons.home_rounded,
                size: 20,
                color: Theme.of(context).colorScheme.primary,
              ),
              const SizedBox(width: 6),
              Text(
                dataModel.developer.name,
                style: Theme.of(context).textTheme.labelLarge?.copyWith(
                  fontWeight: FontWeight.w600,
                  letterSpacing: 0.3,
                ),
              ),
            ],
          ),
        ),
      ),
      actions: [
        IconButton(
          icon: const Icon(Icons.person),
          onPressed: () => launchUrl(Uri.parse(UrlHelper.resolve('./profile/index.html'))),
        ),
        IconButton(
          icon: Icon(
            themeService.isDarkMode ? Icons.light_mode : Icons.dark_mode,
            color: themeService.isDarkMode ? Colors.amber : Theme.of(context).colorScheme.primary,
          ),
          onPressed: () {
            if (EasterEgg.handle('theme')) {
              launchUrl(Uri.parse(UrlHelper.resolve('./profile/index.html#/dev')));
            } else {
              themeService.toggleTheme();
            }
          },
        ),
        Builder(
          builder: (context) => IconButton(
            icon: const Icon(Icons.menu),
            onPressed: () {
              Scaffold.of(context).openEndDrawer();
            },
          ),
        ),
      ],
    );
  }
}

class _AppsDropdown extends StatelessWidget {
  final List<AppModel> apps;
  const _AppsDropdown({required this.apps});

  @override
  Widget build(BuildContext context) {
    return PopupMenuButton<String>(
      position: PopupMenuPosition.under,
      clipBehavior: Clip.antiAlias,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      tooltip: 'Apps',
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        child: Row(
          children: [
            Text(
              'Apps',
              style: TextStyle(color: Theme.of(context).colorScheme.onSurface, fontWeight: FontWeight.bold),
            ),
            Icon(Icons.arrow_drop_down, color: Theme.of(context).colorScheme.onSurface),
          ],
        ),
      ),
      onSelected: (appId) => context.go('/app/$appId'),
      itemBuilder: (context) {
        return apps.map((app) {
          return PopupMenuItem<String>(
            value: app.id,
            child: Text(app.name),
          );
        }).toList();
      },
    );
  }
}

class _LegalDropdown extends StatelessWidget {
  final List<AppModel> apps;
  const _LegalDropdown({required this.apps});

  @override
  Widget build(BuildContext context) {
    return PopupMenuButton<String>(
      position: PopupMenuPosition.under,
      clipBehavior: Clip.antiAlias,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      tooltip: 'Legal',
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        child: Row(
          children: [
            Text(
              'Legal',
              style: TextStyle(color: Theme.of(context).colorScheme.onSurface, fontWeight: FontWeight.bold),
            ),
            Icon(Icons.arrow_drop_down, color: Theme.of(context).colorScheme.onSurface),
          ],
        ),
      ),
      onSelected: (route) => context.go(route),
      itemBuilder: (context) {
        final List<PopupMenuEntry<String>> items = [];
        for (var app in apps) {
          items.add(
            PopupMenuItem<String>(
              enabled: false,
              child: Text(
                app.name,
                style: const TextStyle(fontWeight: FontWeight.bold),
              ),
            ),
          );
          items.add(
            PopupMenuItem<String>(
              value: '/app/${app.id}/privacy',
              child: const Padding(
                padding: EdgeInsets.only(left: 16.0),
                child: Text('Privacy Policy'),
              ),
            ),
          );
          items.add(
            PopupMenuItem<String>(
              value: '/app/${app.id}/terms',
              child: const Padding(
                padding: EdgeInsets.only(left: 16.0),
                child: Text('Terms & Conditions'),
              ),
            ),
          );
          items.add(const PopupMenuDivider());
        }
        if (items.isNotEmpty) items.removeLast(); // Remove last divider
        return items;
      },
    );
  }
}
