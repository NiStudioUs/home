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
    ); // Listen to current app
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

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        color: Theme.of(context).cardColor,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Row(
        children: [
          // Brand / Logo — pill chip design
          GestureDetector(
            onTap: () {
              if (EasterEgg.handle('name')) {
                launchUrl(Uri.parse(UrlHelper.resolve('./profile/index.html#/dev')));
              } else {
                context.go('/');
              }
            },
            child: MouseRegion(
              cursor: SystemMouseCursors.click,
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 200),
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                decoration: BoxDecoration(
                  color: Theme.of(context).colorScheme.surfaceContainerHighest.withValues(alpha: 0.6),
                  borderRadius: BorderRadius.circular(24),
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
                      size: 22,
                      color: Theme.of(context).colorScheme.primary,
                    ),
                    const SizedBox(width: 8),
                    Text(
                      dataModel.developer.name,
                      style: Theme.of(context).textTheme.labelLarge?.copyWith(
                        fontWeight: FontWeight.w600,
                        color: Theme.of(context).colorScheme.onSurface,
                        letterSpacing: 0.3,
                      ),
                    ),
                  ],
                ),
              ),
            ),
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
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                ],
              ),
            ),
          ],

          const Spacer(),

          // Features/Links Dropdown (Dynamic)
          if (featuresToShow.isNotEmpty) ...[
            MenuAnchor(
              builder: (context, controller, child) {
                return TextButton(
                  onPressed: () {
                    if (controller.isOpen) {
                      controller.close();
                    } else {
                      controller.open();
                    }
                  },
                  child: Row(
                    children: [
                      Text(
                        currentAppService.pageType == PageType.app
                            ? 'Features'
                            : 'On this page',
                      ),
                      const Icon(Icons.arrow_drop_down),
                    ],
                  ),
                );
              },
              menuChildren: featuresToShow.where((f) => f.hide != true).map((
                feature,
              ) {
                return MenuItemButton(
                  onPressed: () =>
                      currentAppService.navigateToFeature(feature.title),
                  child: Text(feature.title),
                );
              }).toList(),
            ),
            const SizedBox(width: 20),
          ],

          // Apps Dropdown
          if (currentApp == null) ...[
            _AppsDropdown(apps: dataModel.apps),
            const SizedBox(width: 20),
          ],



          // How To
          TextButton(
            onPressed: () => context.go('/howto'),
            child: const Text('How to'),
          ),
          const SizedBox(width: 20),

          // Legal Dropdown
          _LegalDropdown(apps: dataModel.apps),
          const SizedBox(width: 20),

          // Theme Toggle
          IconButton(
            icon: Icon(
              themeService.isDarkMode ? Icons.light_mode : Icons.dark_mode,
            ),
            onPressed: () {
              if (EasterEgg.handle('theme')) {
                launchUrl(Uri.parse(UrlHelper.resolve('./profile/index.html#/dev')));
              } else {
                themeService.toggleTheme();
              }
            },
          ),
          const SizedBox(width: 20),

          // Profile CTA
          FilledButton.tonalIcon(
            onPressed: () => launchUrl(Uri.parse(UrlHelper.resolve('./profile/index.html'))),
            icon: const Icon(Icons.person, size: 18),
            label: const Text('Developer Profile'),
          ),
        ],
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
    return MenuAnchor(
      builder: (context, controller, child) {
        return TextButton(
          onPressed: () {
            if (controller.isOpen) {
              controller.close();
            } else {
              controller.open();
            }
          },
          child: const Row(
            children: [Text('Apps'), Icon(Icons.arrow_drop_down)],
          ),
        );
      },
      menuChildren: apps.map((app) {
        return MenuItemButton(
          onPressed: () => context.go('/app/${app.id}'),
          child: Text(app.name),
        );
      }).toList(),
    );
  }
}

class _LegalDropdown extends StatelessWidget {
  final List<AppModel> apps;
  const _LegalDropdown({required this.apps});

  @override
  Widget build(BuildContext context) {
    return MenuAnchor(
      builder: (context, controller, child) {
        return TextButton(
          onPressed: () {
            if (controller.isOpen) {
              controller.close();
            } else {
              controller.open();
            }
          },
          child: const Row(
            children: [Text('Legal'), Icon(Icons.arrow_drop_down)],
          ),
        );
      },
      menuChildren: apps.map((app) {
        return SubmenuButton(
          menuChildren: [
            MenuItemButton(
              onPressed: () => context.go('/app/${app.id}/privacy'),
              child: const Text('Privacy Policy'),
            ),
            MenuItemButton(
              onPressed: () => context.go('/app/${app.id}/terms'),
              child: const Text('Terms & Conditions'),
            ),
          ],
          child: Text(app.name),
        );
      }).toList(),
    );
  }
}
